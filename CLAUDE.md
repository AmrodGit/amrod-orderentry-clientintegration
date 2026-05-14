# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is (and isn't)

This is the **client integration package** for the Amrod Order Entry / Logo Library APIs — it is **not** the API server. The server lives at `https://moyo-dgw.{env}.amrod.co.za/graphql/` (env ∈ `dev`, `qa`, `uat`, plus production). This repo ships three deliverables for external integrators:

1. **Markdown documentation** under [docs/](docs/) — the primary deliverable; most PRs are doc changes.
2. **C# SDK** under [SDK/Amrod - Order Entry/](SDK/Amrod%20-%20Order%20Entry/) — a thin .NET 8 wrapper around a StrawberryShake-generated GraphQL client. Namespace `Amrod.OrderEntry`.
3. **Bruno sample collection** under [samples/bruno/](samples/bruno/) — ready-to-run GraphQL/HTTP requests that mirror the docs and are the canonical executable examples.
4. **GraphQl Schema reference** https://moyo-dgw.uat.amrod.co.za/graphql/schema.graphql

A small console driver at [samples/Amrod - Order Entry - Console Sample/Program.cs](samples/Amrod%20-%20Order%20Entry%20-%20Console%20Sample/Program.cs) exercises the SDK against the dev gateway.

## Build & run

The solution targets **.NET 8** (`global.json` pins `8.0.404`, `rollForward: latestMinor`) and uses **central package management** via [SDK/Directory.Packages.props](SDK/Directory.Packages.props) — add `PackageReference` (no `Version=`) in the csproj, then add/update `PackageVersion` in `Directory.Packages.props`.

```powershell
# Restore + build the whole solution (run from the SDK folder)
dotnet build "SDK/Amrod - Order Entry.sln"

# Run the console sample (drives the SDK against moyo-dgw.dev)
dotnet run --project "samples/Amrod - Order Entry - Console Sample"
```

There is **no test project** in the solution — don't fabricate a test command. `FluentAssertions` is listed in `Directory.Packages.props` but isn't referenced.

### Regenerating the StrawberryShake client

The GraphQL client (`AmrodDataGatewayGraphQlClient`) is generated at build time from [SDK/Amrod - Order Entry/Gateway/schema.graphql](SDK/Amrod%20-%20Order%20Entry/Gateway/schema.graphql) plus all `*.graphql` operation files under `Gateway/Queries/` and `Gateway/Mutations/`. The `dotnet-graphql` tool is registered in [SDK/Amrod - Order Entry/.config/dotnet-tools.json](SDK/Amrod%20-%20Order%20Entry/.config/dotnet-tools.json). To pull a fresh schema from the gateway:

```powershell
# From SDK/Amrod - Order Entry/
dotnet tool restore
dotnet graphql update
```

Codegen config lives in [Gateway/.graphqlrc.json](SDK/Amrod%20-%20Order%20Entry/Gateway/.graphqlrc.json) (client name, gateway URL, records=false for inputs/entities).

### Formatting

C# is formatted by **CSharpier** with [SDK/.csharpierrc](SDK/.csharpierrc) — **tabs**, `printWidth: 120`. Match this when editing C#; don't normalize to spaces.

## SDK architecture

Public entry point is the DI extension `services.AddAmrodDataGateway(opts => opts.GatewayUri = ...)` in [SDK/Amrod - Order Entry/DependencyInjection.cs](SDK/Amrod%20-%20Order%20Entry/DependencyInjection.cs). It wires:

- `AmrodDataGatewayGraphQlClient` — **generated** by StrawberryShake. Don't edit the generated code; change the `.graphql` operation files or add new ones under `Gateway/{Queries,Mutations}/<Entity>/` and rebuild.
- `GatewayCustomHttpMessageHandler` — `DelegatingHandler` that injects the `x-gateway-impersonate` header. Note that high-level service methods (e.g. `ArtworkService.CreateArtworkAsync`) currently bypass this handler by creating their own `HttpClient` via `IHttpClientFactory` and setting the header manually (see [Services/LogoLibrary/ArtworkService.cs](SDK/Amrod%20-%20Order%20Entry/Services/LogoLibrary/ArtworkService.cs)) — when adding a new query/mutation that needs impersonation, follow that same pattern rather than relying on the handler.
- `GatewayImpersonationProvider` — scoped state holding `CustomerCode` + `ContactCode`; set via `IArtworkService.SetImpersonation(...)`.

Service layer pattern (see `IArtworkService` / `ArtworkService`):
- One service interface per entity (`IArtworkService`, `IArtworkFolderService`, `IArtworkTagService`); only `IArtworkService` is currently registered in `DependencyInjection.cs` — register additional ones there when exposing them.
- Mutations extend `BaseMutationService` and call `EnsureNoErrors(result.Data?.X.Errors)` after `result.EnsureNoErrors()` (the SDK error helper). `BaseMutationService` uses reflection to extract `Code` / `__typename` / `Message` from the GraphQL error union types and throws `MutationException` ([Models/Exceptions/MutationException.cs](SDK/Amrod%20-%20Order%20Entry/Models/Exceptions/MutationException.cs)).
- Queries return `PagedResult<T>` ([Models/PagedResult.cs](SDK/Amrod%20-%20Order%20Entry/Models/PagedResult.cs)) carrying a cursor + an opaque `State` blob (`ArtworkPageState`, `ArtworkFolderContentsPageState`) that `GetNextPageAsync` / `GetPreviousPageAsync` consume — preserve this shape for new paged queries so callers can iterate uniformly.
- DTOs in `Models/` are hand-written; `Models/Mappers/` uses **Riok.Mapperly** source generators (`[Mapper]` partial classes) to map the generated GraphQL types to public DTOs.

## Authentication & impersonation (cross-cutting)

Both the SDK and the Bruno collection rely on the same two-piece auth model. When changing samples or docs, keep them consistent:

- **OAuth 2.0 client_credentials** with scopes `amrod.integration amrod.gateway`. The Bruno `client_secret` is **Base64(IDP_USERNAME:IDP_SECRET)** — the encoding is performed in the collection-wide pre-request script in [samples/bruno/collection.bru](samples/bruno/collection.bru), not stored encoded.
- **Impersonation header** `x-gateway-impersonate: Base64("<contactGuid>;<customerCode>")`. Same script in `collection.bru` computes this from `CONTACT_ID` + `CUSTOMER_CODE` env vars. The SDK does the equivalent encoding in `GatewayCustomHttpMessageHandler` and `ArtworkService`.

Environment files [samples/bruno/environments/](samples/bruno/environments/) (Local/Dev/QA/UAT) hold `ROOT_URL`, `CUSTOMER_CODE`, `CONTACT_ID`, and secret-marked IDP vars.

## Bruno sample conventions

- Folders use **Title Case** (`Logo Library`, `Order Entry`, `Job Cards`); files use **kebab-case** (`create-artwork-session.bru`, `place-order-with-branding.bru`).
- Each functional area has a `folder.bru`; each request has a `meta { seq }` ordering.
- When a request produces an ID the next request needs (e.g. `artworkId`, `uploadUri`, `salesOrderId`), use a `script:post-response` block to `bru.setEnvVar(...)` so the workflow is runnable end-to-end. Both `create-artwork-session.bru` and the place-order samples follow this pattern.
- The blob upload step is a raw HTTP `PUT` to the Azure Blob SAS URI returned by `createArtwork.artworkSession.uploadUri` — not a GraphQL call. Keep `auth: none` and `x-ms-blob-type: BlockBlob` on that request.

Conventions and required structure are documented in [samples/.agents/bruno_samples.md](samples/.agents/bruno_samples.md).

## Documentation conventions

The docs structure is prescribed in [docs/.agents/documentation-guide.md](docs/.agents/documentation-guide.md) — read it before adding or restructuring docs. Key points:

- Per-functional-area folders: `docs/order-entry/`, `docs/logo-library/`, `docs/assets/`. Each has a `README.md` index.
- `error-handling.md`, `authentication.md`, `support.md` are dedicated cross-cutting docs at `docs/` root — link to them rather than duplicating.
- Cross-link related operations (e.g. `update-jobcard-branding.md` ↔ `request-change-jobcard.md` ↔ `jobcard-branding-position-changes.md`) so the doc graph stays navigable. The "Related Operations" section at the bottom of each doc is load-bearing.
- File names: **kebab-case** (`place-sales-order.md`, `dashboard-jobcards.md`).
- A copy of the live schema lives at [docs/.agents/schema.graphql](docs/.agents/schema.graphql) for agent consumption — keep it in sync with `SDK/Amrod - Order Entry/Gateway/schema.graphql` when the gateway schema changes.

### Sample data to use in examples

Always use values from this allowlist (`docs/.agents/documentation-guide.md` is the source of truth) so examples stay consistent and runnable:

- **Product SKUs**: `BAG-612-BU`, `BAS-3000-G-Y`, `PEN-701-BU`, `GF-AM-1000-BU-0`, etc.
- **Branding methods**: `DP-A`, `DP-B`, `LA`–`LG`, `PA`–`PC`, `SA-M`, `SA`, `SB`, `SC`, `SP`, `SUB-A`–`SUB-E`, `CMT-BNM`.
- **Branding positions**: `A`–`G`.
- **Collection types**: `COLLECTION_HEAD_OFFICE`, `BRANCH_DELIVERY` (the latter requires a branch code).
- **Branch codes**: `JHB`, `DBN`, `CPT`, `PLA`, `BFN`.
- **Quantities**: even numbers between 10 and 500.
- **Contact**: `John Doe <john.doe@example.com>`.

## Domain rules that affect example correctness

These constraints recur across docs and samples — if you're writing a job card example, double-check them:

- **Branding position changes** (`docs/order-entry/jobcard-branding-position-changes.md`) have two hard rules: target position must be **unoccupied**, and the branding method must be **identical** to the current method (no `SA → SC`, no `DP-A → DP-B`).
- **Status-aware mutation selection**: use `updateJobCardBrandingInfo` only when a job card is `AWAITING_INFO`; for `AWAITING_APPROVAL` / `AWAITING_LAYOUT` / `AWAITING_PAYMENT` use `requestChangeJobCard`. Mixing these up is the most common doc mistake.
- **`placeOrder` with `validateOnly: true`** is the standard pre-flight — pricing and lead-time docs assume integrators call it before the real submission.

## Release notes

Notable releases are documented in [RELEASE_NOTES.md](RELEASE_NOTES.md) at repo root. When making a non-trivial documentation change (new guide, restructured workflow, new domain rule), add or extend an entry there following the existing format.
