# Amrod TypeScript SDK

A TypeScript/Node.js client for the Amrod Order Entry GraphQL API. The SDK provides typed request and response models for viewer details, sales orders, credit notes, job cards, order placement, and job-card workflow actions, matching the feature set of the [.NET SDK](../SDK-.NET/Amrod.SDK/README.md).

## Requirements

- Node.js 18 or later (for the built-in `fetch`/`URLSearchParams` used by the OAuth provider)
- An Amrod GraphQL endpoint
- A valid access token or OAuth client credentials
- A customer/contact impersonation scope when required by the gateway

## Install

Build the package:

```powershell
npm install
npm run build
```

Reference it from another package using a relative `file:` dependency (there is no published npm package yet):

```json
{
  "dependencies": {
    "@amrod/sdk-ts": "file:../../SDKs/SDK-TS"
  }
}
```

## Configuration

`AmrodSdk` is constructed from `SdkOptions`.

```ts
import { AmrodSdk, JwtAuthProvider } from "@amrod/sdk-ts";

const sdk = new AmrodSdk({
  endpoint: process.env.AMROD_GRAPHQL_ENDPOINT!,
  authProvider: new JwtAuthProvider(process.env.AMROD_ACCESS_TOKEN!),
});
```

`endpoint` is required. The SDK sends all operations to that URL using HTTP POST.

## Environment Variables

The SDK does not read environment variables itself; applications should read them (for example with [`dotenv`](https://www.npmjs.com/package/dotenv)) and build `SdkOptions`. These names are recommended:

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

For local development, use an ignored `.env` file or your deployment platform's secret store. Do not commit credentials.

## Authentication

### Static JWT

Use `JwtAuthProvider` when your application already owns a bearer token.

```ts
import { AmrodSdk, JwtAuthProvider } from "@amrod/sdk-ts";

const sdk = new AmrodSdk({
  endpoint: "https://api-uat.amrodtech.co.za/graphql",
  authProvider: new JwtAuthProvider("access-token"),
});
```

The provider sends `Authorization: Bearer <token>`.

### OAuth Client Credentials

`OAuthClientCredentialsProvider` retrieves and caches tokens until one minute before expiry. It requests the `amrod.integration amrod.gateway` scopes.

```ts
import { AmrodSdk, OAuthClientCredentialsProvider } from "@amrod/sdk-ts";

const authProvider = new OAuthClientCredentialsProvider(
  process.env.AMROD_TOKEN_URL!,
  process.env.AMROD_CLIENT_ID!,
  process.env.AMROD_USERNAME!,
  process.env.AMROD_SECRET!
);

const sdk = new AmrodSdk({
  endpoint: process.env.AMROD_GRAPHQL_ENDPOINT!,
  authProvider,
});
```

### Gateway Impersonation

When the gateway requires a customer context, set `impersonationProvider`. `GatewayImpersonationProvider` base64-encodes `<contactId>;<customerCode>` and sends it in `x-gateway-impersonate`.

```ts
import { AmrodSdk, JwtAuthProvider, GatewayImpersonationProvider } from "@amrod/sdk-ts";

const sdk = new AmrodSdk({
  endpoint: process.env.AMROD_GRAPHQL_ENDPOINT!,
  authProvider: new JwtAuthProvider(process.env.AMROD_ACCESS_TOKEN!),
  impersonationProvider: new GatewayImpersonationProvider(
    process.env.AMROD_CONTACT_ID!,
    process.env.AMROD_CUSTOMER_CODE!
  ),
});
```

Custom authentication and impersonation are supported through the `AuthProvider` and `ImpersonationProvider` interfaces. Each interface has one asynchronous method returning the header value.

## Logging

`SdkOptions.logger` accepts a `Logger` (`debug`/`info`/`warn`/`error`). The SDK ships `noopLogger` (default) and `consoleLogger`:

```ts
import { AmrodSdk, JwtAuthProvider, consoleLogger } from "@amrod/sdk-ts";

const sdk = new AmrodSdk({
  endpoint: process.env.AMROD_GRAPHQL_ENDPOINT!,
  authProvider: new JwtAuthProvider(process.env.AMROD_ACCESS_TOKEN!),
  logger: consoleLogger,
});
```

Pass the same logger to `OAuthClientCredentialsProvider` (as its fifth constructor argument) to see token-acquisition diagnostics.

## SDK Surface

| SDK property | Operations |
| --- | --- |
| `sdk.viewer` | Current identity, customer, contact, and impersonation scopes. |
| `sdk.salesOrders` | Find by ID/number, list orders, and include job cards. |
| `sdk.creditNotes` | Find by ID/number, list, filter by sales order, and filter by date range. |
| `sdk.jobCards` | Find by ID/number, list, filter by sales order, and load assets/proofs. |
| `sdk.orders` | Place or validate an order. |
| `sdk.jobCardWorkflow` | Approve a job card, update branding, or request a change. |

## Viewer

```ts
const viewer = await sdk.viewer.getViewer();

console.log(viewer.identity);
console.log(viewer.customer.name);
```

The response is a `Viewer` with `identity`, `identityType`, `customer`, `customerContact`, and `impersonationScope`.

## Sales Orders

```ts
const order = await sdk.salesOrders.getByNumber("SO-2026-001234");
const orderById = await sdk.salesOrders.getById("SO-001");
const orderWithJobs = await sdk.salesOrders.getWithJobCards("SO-2026-001234");
```

`SalesOrder` includes customer/contact details, amounts, payment and active flags, line details, and, when requested through `getWithJobCards`, `jobCards`.

List orders with cursor pagination:

```ts
const page = await sdk.salesOrders.list(20);

if (page.pageInfo.hasNextPage) {
  const nextPage = await sdk.salesOrders.list(20, page.pageInfo.endCursor ?? undefined);
}
```

`SalesOrdersConnection`, `CreditNotesConnection`, and `JobCardsConnection` expose `totalCount`, `edges`, `nodes`, and `pageInfo`.

## Credit Notes

```ts
const creditNote = await sdk.creditNotes.getByNumber("CN-2026-001234");
const byId = await sdk.creditNotes.getById("CN-001");
const forOrder = await sdk.creditNotes.getBySalesOrderNumber("SO-2026-001234");
const monthly = await sdk.creditNotes.getByDateRange(
  "2026-01-01T00:00:00Z",
  "2026-01-31T23:59:59Z"
);
```

`CreditNote` contains identifiers, date, tax/exclusive totals, document URI, and `creditNoteDetails` when selected by the operation.

## Job Cards

```ts
const jobCard = await sdk.jobCards.getByNumber("JC-2026-001234");
const detailed = await sdk.jobCards.getWithAssetsAndProofs("JC-2026-001234");
const orderJobs = await sdk.jobCards.getBySalesOrderNumber("SO-2026-001234");
```

`JobCard` can include branding details, schedule dates, assets, proofs/options, line details, and parent sales-order data. Use `getWithAssetsAndProofs` when production needs the full asset/proof response.

## Place and Validate Orders

`PlaceOrderInput` maps to the GraphQL `PlaceOrderInput` argument. `PlaceOrderRequest` is a convenience alias, matching the .NET SDK's `PlaceOrderRequest`: it uses `salesOrderNumber` instead of `orderNumber` and is converted with `toPlaceOrderInput`, which `sdk.orders.placeOrder`/`validateOrder` call internally.

```ts
import { PlaceOrderRequest } from "@amrod/sdk-ts";

const request: PlaceOrderRequest = {
  salesOrderNumber: "ORD-20260830-001",
  options: {
    orderType: "STANDARD",
    validateOnly: false,
  },
  collection: {
    collectionType: "COURIER",
  },
  contact: {
    notifications: {
      order: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        contactNumber: "+27-11-555-1234",
      },
    },
  },
  details: [
    {
      id: "group-1",
      items: [{ sku: "MUG-450-WH", quantity: 100, price: 8.99 }],
    },
  ],
};

const response = await sdk.orders.placeOrder(request);

if (response.errors.length > 0) {
  for (const error of response.errors) {
    console.log(`${error.__typename}: ${error.message}`);
  }
} else {
  const order = response.placeOrderPayloadType!.orders[0];
  console.log(order.salesOrderNumber);
}
```

To calculate pricing, lead times, and validation failures without creating an order:

```ts
const preview = await sdk.orders.validateOrder(request);
```

`validateOrder` forces `options.validateOnly` to `true`; `placeOrder` uses the value supplied in the request.

### Branding Request Example

Add `branding` to an order group for branded goods:

```ts
request.options.applyInclusiveBranding = true;
request.details[0].branding = [
  {
    brandingCode: "LA",
    position: "A",
    logoPosition: "TOP_CENTER",
    logos: ["logo-id-1"],
    logoSize: 20,
    logoSizeType: "WIDTH",
    reference: "JOB-20260830-0001",
    colors: [{ type: "HEX", code: "#FFD700" }],
  },
];
```

### Place Order Response

`PlaceOrderResponse` contains:

| Property | Meaning |
| --- | --- |
| `errors` | Mutation-level business/validation errors. Inspect before using a result. |
| `placeOrderPayloadType.orders` | Processed order results: order number, sales-order number, order date, total, lead times, and grouped item results. |
| `placeOrderPayloadType.warnings` | Non-blocking warnings such as price discrepancies. |

An `OrderItem` includes group-level items and optional branding pricing in `details`. `salesOrderNumber` can be absent during validate-only processing.

## Job Card Workflow

Approve a proof:

```ts
const approval = await sdk.jobCardWorkflow.approve({
  jobCardNumber: "JC-2026-001234",
  proofId: "proof-asset-12345",
  optionNumber: 1,
});

const approved = approval.resultPayloadType?.result === true;
```

Update branding information:

```ts
const update = await sdk.jobCardWorkflow.updateBranding({
  masterJobCardNumber: "JC-2026-001234",
  jobCards: [
    {
      jobCardNumber: "JC-2026-001234",
      brandingDetail: {
        brandingCode: "DP-A",
        position: "A",
        logos: ["logo-id-1"],
      },
    },
  ],
});
```

Request a change:

```ts
const change = await sdk.jobCardWorkflow.requestChange({
  salesOrderNumber: "SO-2026-001234",
  changeRequestType: "CUSTOMER_REQUEST",
  jobCards: [
    {
      jobCardNumber: "JC-2026-001234",
      brandingDetail: {
        brandingCode: "DP-A",
        position: "A",
        specialInstructions: "Move logo to the top-right corner.",
      },
    },
  ],
});
```

`approve`, `updateBranding`, and `requestChange` all return a `WorkflowMutationResponse` with `errors` and an optional `resultPayloadType`. A successful workflow mutation has `resultPayloadType.result === true`.

## Errors

The SDK has two error channels:

1. Transport/network failures and top-level GraphQL execution errors cause `GraphQlSdkClient.execute` to throw `AmrodApiException`, which carries `statusCode` and `graphQlErrors` when available. Failures acquiring or applying credentials throw `AmrodAuthenticationException`.
2. Business and validation errors returned inside order/workflow mutations are represented by `ApiError` in the response `errors` array. `__typename` contains GraphQL's type discriminator; `message` is populated by the current operation selections.

Always inspect mutation `errors` before consuming `placeOrderPayloadType` or `resultPayloadType`.

```ts
import { AmrodApiException, AmrodAuthenticationException } from "@amrod/sdk-ts";

try {
  await sdk.viewer.getViewer();
} catch (err) {
  if (err instanceof AmrodAuthenticationException) {
    console.error("Authentication failed:", err.message);
  } else if (err instanceof AmrodApiException) {
    console.error("Gateway error:", err.statusCode, err.graphQlErrors);
  } else {
    throw err;
  }
}
```

## Build

```powershell
npm install
npm run build
```

`npm run dev` rebuilds on change; `npm run clean` removes `dist`.
