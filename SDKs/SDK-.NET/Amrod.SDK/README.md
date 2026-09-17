# Amrod .NET SDK

A .NET 8 client for the Amrod Order Entry GraphQL API. The SDK provides typed request and response models for viewer details, sales orders, credit notes, job cards, order placement, and job-card workflow actions.

## Requirements

- .NET SDK 8.0 or later
- An Amrod GraphQL endpoint
- A valid access token or OAuth client credentials
- A customer/contact impersonation scope when required by the gateway

## Install

Reference the project from another solution:

```xml
<ProjectReference Include="..\Amrod.SDK\Amrod.SDK.csproj" />
```

Or build the SDK directly:

```powershell
dotnet build Amrod.SDK.csproj
```

## Configuration

`AmrodSdk` is constructed from `AmrodSdkOptions`.

```csharp
using Amrod.SDK;
using Amrod.SDK.Auth;

var sdk = new AmrodSdk(new AmrodSdkOptions
{
    Endpoint = Environment.GetEnvironmentVariable("AMROD_GRAPHQL_ENDPOINT")!,
    AuthProvider = new JwtAuthProvider(
        Environment.GetEnvironmentVariable("AMROD_ACCESS_TOKEN")!)
});
```

`Endpoint` is required. The SDK sends all operations to that URL using HTTP POST.

## Environment Variables

The SDK does not read environment variables itself; applications should read them and build `AmrodSdkOptions`. These names are recommended:

| Variable | Required | Description |
| --- | --- | --- |
| `AMROD_GRAPHQL_ENDPOINT` | Yes | GraphQL endpoint, for example `https://api-uat.amrodtech.co.za/graphql`. |
| `AMROD_ACCESS_TOKEN` | JWT auth | Bearer token passed in the `Authorization` header. |
| `AMROD_TOKEN_URL` | OAuth auth | OAuth token endpoint. |
| `AMROD_CLIENT_ID` | OAuth auth | OAuth client ID. |
| `AMROD_USERNAME` | OAuth auth | Username used to create the OAuth client-secret value. |
| `AMROD_SECRET` | OAuth auth | Secret used to create the OAuth client-secret value. Keep this outside source control. |
| `AMROD_CONTACT_ID` | Impersonation | Customer-contact ID to impersonate. |
| `AMROD_CUSTOMER_CODE` | Impersonation | Customer code to impersonate. |

For local development, use user secrets, an ignored `.env` file, or your deployment platform's secret store. Do not commit credentials.

## Authentication

### Static JWT

Use `JwtAuthProvider` when your application already owns a bearer token.

```csharp
var options = new AmrodSdkOptions
{
    Endpoint = "https://api-uat.amrodtech.co.za/graphql",
    AuthProvider = new JwtAuthProvider("access-token")
};
```

The provider sends `Authorization: Bearer <token>`.

### OAuth Client Credentials

`OAuthClientCredentialsProvider` retrieves and caches tokens until one minute before expiry. It requests the `amrod.integration amrod.gateway` scopes.

```csharp
var authProvider = new OAuthClientCredentialsProvider(
    new HttpClient(),
    Environment.GetEnvironmentVariable("AMROD_TOKEN_URL")!,
    Environment.GetEnvironmentVariable("AMROD_CLIENT_ID")!,
    Environment.GetEnvironmentVariable("AMROD_USERNAME")!,
    Environment.GetEnvironmentVariable("AMROD_SECRET")!);

var sdk = new AmrodSdk(new AmrodSdkOptions
{
    Endpoint = Environment.GetEnvironmentVariable("AMROD_GRAPHQL_ENDPOINT")!,
    AuthProvider = authProvider
});
```

### Gateway Impersonation

When the gateway requires a customer context, set `ImpersonationProvider`. `GatewayImpersonationProvider` base64-encodes `<contactId>;<customerCode>` and sends it in `x-gateway-impersonate`.

```csharp
var sdk = new AmrodSdk(new AmrodSdkOptions
{
    Endpoint = Environment.GetEnvironmentVariable("AMROD_GRAPHQL_ENDPOINT")!,
    AuthProvider = new JwtAuthProvider(
        Environment.GetEnvironmentVariable("AMROD_ACCESS_TOKEN")!),
    ImpersonationProvider = new GatewayImpersonationProvider(
        Guid.Parse(Environment.GetEnvironmentVariable("AMROD_CONTACT_ID")!),
        Environment.GetEnvironmentVariable("AMROD_CUSTOMER_CODE")!)
});
```

Custom authentication and impersonation are supported through `IAuthProvider` and `IImpersonationProvider` respectively. Each interface has one asynchronous method returning the header value.

## SDK Surface

| SDK property | Operations |
| --- | --- |
| `sdk.Viewer` | Current identity, customer, contact, and impersonation scopes. |
| `sdk.SalesOrders` | Find by ID/number, list orders, and include job cards. |
| `sdk.CreditNotes` | Find by ID/number, list, filter by sales order, and filter by date range. |
| `sdk.JobCards` | Find by ID/number, list, filter by sales order, and load assets/proofs. |
| `sdk.Orders` | Place or validate an order. |
| `sdk.JobCardWorkflow` | Approve a job card, update branding, or request a change. |

## Viewer

```csharp
var viewer = await sdk.Viewer.GetViewerAsync();

Console.WriteLine(viewer.Identity);
Console.WriteLine(viewer.Customer.Name);
```

The response is a `Viewer` with `Identity`, `IdentityType`, `Customer`, `CustomerContact`, and `ImpersonationScope`.

## Sales Orders

```csharp
var order = await sdk.SalesOrders.GetByNumberAsync("SO-2026-001234");
var orderById = await sdk.SalesOrders.GetByIdAsync("SO-001");
var orderWithJobs = await sdk.SalesOrders.GetWithJobCardsAsync("SO-2026-001234");
```

`SalesOrder` includes customer/contact details, amounts, payment and active flags, line details, and, when requested through `GetWithJobCardsAsync`, `JobCards`.

List orders with cursor pagination:

```csharp
var page = await sdk.SalesOrders.ListAsync(first: 20);

if (page.PageInfo.HasNextPage)
{
    var nextPage = await sdk.SalesOrders.ListAsync(
        first: 20,
        after: page.PageInfo.EndCursor);
}
```

`SalesOrdersConnection`, `CreditNotesConnection`, and `JobCardsConnection` expose `TotalCount`, `Edges`, `Nodes`, and `PageInfo`.

## Credit Notes

```csharp
var creditNote = await sdk.CreditNotes.GetByNumberAsync("CN-2026-001234");
var byId = await sdk.CreditNotes.GetByIdAsync("CN-001");
var forOrder = await sdk.CreditNotes.GetBySalesOrderNumberAsync("SO-2026-001234");
var monthly = await sdk.CreditNotes.GetByDateRangeAsync(
    "2026-01-01T00:00:00Z",
    "2026-01-31T23:59:59Z");
```

`CreditNote` contains identifiers, date, tax/exclusive totals, document URI, and `CreditNoteDetails` when selected by the operation.

## Job Cards

```csharp
var jobCard = await sdk.JobCards.GetByNumberAsync("JC-2026-001234");
var detailed = await sdk.JobCards.GetWithAssetsAndProofsAsync("JC-2026-001234");
var orderJobs = await sdk.JobCards.GetBySalesOrderNumberAsync("SO-2026-001234");
```

`JobCard` can include branding details, schedule dates, assets, proofs/options, line details, and parent sales-order data. Use `GetWithAssetsAndProofsAsync` when production needs the full asset/proof response.

## Place and Validate Orders

`PlaceOrderInput` maps to the GraphQL `PlaceOrderInput` argument. Enums serialize as their GraphQL names, for example `OrderType.Standard` becomes `STANDARD`.

```csharp
using Amrod.SDK.Models;

var input = new PlaceOrderInput
{
    OrderNumber = "ORD-20260830-001",
    Options = new OrderOptions
    {
        OrderType = OrderType.Standard,
        ValidateOnly = false
    },
    Collection = new OrderCollection
    {
        CollectionType = OrderCollectionType.Courier
    },
    Contact = new OrderContactDetail
    {
        Notifications = new OrderContactNotificationDetail
        {
            Order = new OrderContact
            {
                FirstName = "Jane",
                LastName = "Smith",
                Email = "jane.smith@example.com",
                ContactNumber = "+27-11-555-1234"
            }
        }
    },
    Details =
    [
        new OrderGroup
        {
            Id = "group-1",
            Items =
            [
                new OrderLine { Sku = "MUG-450-WH", Quantity = 100, Price = 8.99m }
            ]
        }
    ]
};

PlaceOrderResponse response = await sdk.Orders.PlaceOrderAsync(input);

if (response.Errors.Count > 0)
{
    foreach (var error in response.Errors)
    {
        Console.WriteLine($"{error.TypeName}: {error.Message}");
    }
    return;
}

var order = response.PlaceOrderPayloadType!.Orders.Single();
Console.WriteLine(order.SalesOrderNumber);
```

To calculate pricing, lead times, and validation failures without creating an order:

```csharp
PlaceOrderResponse preview = await sdk.Orders.ValidateOrderAsync(input);
```

`ValidateOrderAsync` forces `input.Options.ValidateOnly` to `true`; `PlaceOrderAsync` uses the value supplied in the input.

### Branding Request Example

Add `Branding` to an `OrderGroup` for branded goods:

```csharp
input.Options.ApplyInclusiveBranding = true;
input.Details[0].Branding =
[
    new BrandingDetail
    {
        BrandingCode = "LA",
        Position = "A",
        LogoPosition = OrderBrandingLogoPositionType.TopCenter,
        Logos = ["logo-id-1"],
        LogoSize = 20m,
        LogoSizeType = OrderBrandingLogoSizeType.Width,
        Reference = "JOB-20260830-0001",
        Colors =
        [
            new BrandingColorInput
            {
                Type = OrderBrandingColorType.Hex,
                Code = "#FFD700"
            }
        ]
    }
];
```

### Place Order Response

`PlaceOrderResponse` contains:

| Property | Meaning |
| --- | --- |
| `Errors` | Mutation-level business/validation errors. Inspect before using a result. |
| `PlaceOrderPayloadType.Orders` | Processed order results: order number, sales-order number, order date, total, lead times, and grouped item results. |
| `PlaceOrderPayloadType.Warnings` | Non-blocking warnings such as price discrepancies. |

An `OrderItem` includes group-level items and optional branding pricing in `Details`. `SalesOrderNumber` can be absent during validate-only processing.

## Job Card Workflow

Approve a proof:

```csharp
var approval = await sdk.JobCardWorkflow.ApproveAsync(new ApproveJobCardInput
{
    JobCardNumber = "JC-2026-001234",
    ProofId = "proof-asset-12345",
    OptionNumber = 1
});

bool approved = approval.ResultPayloadType?.Result == true;
```

Update branding information:

```csharp
var update = await sdk.JobCardWorkflow.UpdateBrandingAsync(
    new UpdateJobCardBrandingRequest
    {
        MasterJobCardNumber = "JC-2026-001234",
        JobCards =
        [
            new JobCardBrandingRequest
            {
                JobCardNumber = "JC-2026-001234",
                BrandingDetail = new BrandingDetail
                {
                    BrandingCode = "DP-A",
                    Position = "A",
                    Logos = ["logo-id-1"]
                }
            }
        ]
    });
```

Request a change:

```csharp
var change = await sdk.JobCardWorkflow.RequestChangeAsync(
    new RequestJobCardChangeRequest
    {
        SalesOrderNumber = "SO-2026-001234",
        ChangeRequestType = JobCardChangeRequestType.CustomerRequest,
        JobCards =
        [
            new JobCardBrandingRequest
            {
                JobCardNumber = "JC-2026-001234",
                BrandingDetail = new BrandingDetail
                {
                    BrandingCode = "DP-A",
                    Position = "A",
                    SpecialInstructions = "Move logo to the top-right corner."
                }
            }
        ]
    });
```

`ApproveJobCardResponse`, `UpdateJobCardBrandingResponse`, and `RequestJobCardChangeResponse` each contain `Errors` and an optional `ResultPayloadType`. A successful workflow mutation has `ResultPayloadType.Result == true`.

## Errors

The SDK has two error channels:

1. Top-level GraphQL transport/execution errors cause `GraphQlSdkClient.ExecuteAsync` to throw `InvalidOperationException` with the server messages.
2. Business and validation errors returned inside order/workflow mutations are represented by `ApiError` in the response `Errors` collection. `TypeName` contains GraphQL's `__typename`; `Message` is populated by the current operation selections.

Always inspect mutation `Errors` before consuming `PlaceOrderPayloadType` or `ResultPayloadType`.

## GraphQL Documents

The `graphql` directory contains the operation documents corresponding to the SDK endpoints:

- `SalesOrder.graphql` and `viewer.graphql`
- `sales-orders.graphql`
- `credit-notes.graphql`
- `job-cards.graphql`
- `order-entry.graphql`

The SDK currently executes inline GraphQL strings through `GraphQL.Client`. The documents are maintained as operation references and can be validated against `schema.graphql`. Strawberry Shake generated-client integration is not currently enabled.

## Build

```powershell
dotnet restore
dotnet build Amrod.SDK.csproj
dotnet pack Amrod.SDK.csproj --configuration Release
```

The package version and NuGet metadata are declared in `Amrod.SDK.csproj`. GraphQL operation documents are validated against the pinned `schema.graphql` contract by the repository CI workflow.