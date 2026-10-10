# Amrod TypeScript SDK Consumer

A Node.js console sample that consumes the [Amrod TypeScript SDK](../../SDKs/SDK-TS/README.md) (`@amrod/sdk-ts`) via a relative `file:` dependency. It mirrors the [.NET SDK console sample](../SDK-.NET-CONSUMER/README.md): it authenticates, prints the viewer and impersonation scopes, looks up a sales order, and places a new order when none is found.

## Requirements

- Node.js 18 or later
- An Amrod GraphQL endpoint
- OAuth client credentials
- The [`@amrod/sdk-ts`](../../SDKs/SDK-TS) package built (`npm run build` in `SDKs/SDK-TS`)

## Setup

1. Build the SDK once: `npm install && npm run build` in `SDKs/SDK-TS`.
2. Install this sample's dependencies: `npm install`. This links `@amrod/sdk-ts` from `../../SDKs/SDK-TS`.
3. Copy `.env.example` to `.env` and fill in real values:

   ```
   AMROD_GRAPHQL_ENDPOINT=https://api.example/graphql
   AMROD_TOKEN_URL=https://auth.example/application/o/token/
   AMROD_CLIENT_ID=client-id
   AMROD_USERNAME=username
   AMROD_SECRET=secret
   ```

4. Run the sample: `npm run start` (or `npm run dev` to watch for changes).

`.env` is git-ignored. Keep real credentials in a secret store, user secrets, or deployment configuration. Rotate any credential that has previously been committed or shared.

## What the sample does

1. Requests an OAuth token with `OAuthClientCredentialsProvider` and confirms one was received.
2. Calls `sdk.viewer.getViewer()` and prints identity, customer, and impersonation scopes.
3. Builds a second SDK instance with `GatewayImpersonationProvider` using the first impersonation scope/contact.
4. Looks up sales order `SO06273610` with `sdk.salesOrders.getByNumber`.
5. If not found, places a new order with `sdk.orders.placeOrder` and prints the result; otherwise prints the existing order's details.

Replace the placeholder sales-order number and order details in `src/index.ts` with real values for your environment before relying on the output.

## Error handling

The sample wraps its logic in a top-level `catch` that distinguishes `AmrodAuthenticationException` (credential/token failures), `AmrodApiException` (gateway/GraphQL errors, including `statusCode` and `graphQlErrors`), and unexpected errors, setting a non-zero exit code on failure. `consoleLogger` is passed to the SDK and the OAuth provider for diagnostic logging.

## SDK surface

See the [SDK README](../../SDKs/SDK-TS/README.md) for the full API surface (`viewer`, `salesOrders`, `creditNotes`, `jobCards`, `orders`, `jobCardWorkflow`), request/response models, and error types.
