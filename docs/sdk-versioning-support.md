# SDK Versioning and Support

Both SDKs use semantic versioning.

- **MAJOR**: incompatible public API, model, authentication, or supported-runtime changes.
- **MINOR**: backward-compatible operations, models, and capabilities.
- **PATCH**: backward-compatible fixes, documentation, and dependency updates.

The .NET package version is declared in `SDKs/SDK-.NET/Amrod.SDK/Amrod.SDK.csproj`. The TypeScript package version is declared in `SDKs/SDK-TS/package.json`. A release must update both versions when the public SDK contract changes and must add a release-notes entry.

Breaking changes require a migration note and a deprecation period where practical. Deprecated APIs remain documented for at least one minor release before removal unless required by a security or upstream API change.

The SDKs support the currently maintained .NET 8 and Node.js 18 LTS-compatible runtimes. Security fixes are prioritized for the latest published version. Older versions receive fixes only when the issue is critical and the fix can be applied without changing their public contract.

Release validation must pass the repository CI workflow, including .NET builds, TypeScript typechecking, GraphQL generation, and schema contract validation.
