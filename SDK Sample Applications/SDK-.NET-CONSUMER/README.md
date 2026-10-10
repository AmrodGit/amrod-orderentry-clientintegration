# Amrod .NET SDK Consumer

This repository is a .NET 8 console sample with a self-contained implementation of the Amrod GraphQL SDK. The SDK source is in `Amrod.SDK.Consumer/Amrod.SDK`; it is compiled into the sample project and has no project dependency on `C:\Projects\SDK-.NET`.

## Requirements

- .NET SDK 8.0 or later
- An Amrod GraphQL endpoint
- OAuth client credentials or an existing bearer token
- A customer-contact ID and customer code when the gateway requires impersonation

## Setup

1. Restore dependencies with `dotnet restore`.
2. Configure the `Amrod` values using environment variables or local `appsettings.json` values.
3. Build with `dotnet build`.
4. Run the sample with `dotnet run` only after replacing the placeholder order details in `Program.cs`.

`appsettings.json` deliberately contains no credentials. Environment variables override file values. Use double underscores for nested configuration:

```powershell
$env:Amrod__GraphQlUrl = "https://api.example/graphql"
$env:Amrod__TokenUrl = "https://auth.example/application/o/token/"
$env:Amrod__ClientId = "client-id"
$env:Amrod__Username = "username"
$env:Amrod__Secret = "secret"
```

Keep real credentials in a secret store, user secrets, or deployment configuration. Rotate any credential that has previously been committed or shared.

## Authentication and impersonation

`OAuthClientCredentialsProvider` obtains a bearer token with the `amrod.integration amrod.gateway` scopes and caches it until one minute before expiry. `JwtAuthProvider` accepts an existing bearer token.

For gateway impersonation, construct `GatewayImpersonationProvider` with the **customer contact ID** (`Viewer.ImpersonationScope[].CustomerContacts[].Id`) and the customer code. The provider sends `x-gateway-impersonate` as base64-encoded `<contactId>;<customerCode>`.

## SDK surface

| Property | Supported operations | Response type |
| --- | --- | --- |
| `Viewer` | `GetViewerAsync` | `Viewer` |
| `SalesOrders` | `GetByNumberAsync`, `GetByIdAsync`, `ListAsync`, `GetWithJobCardsAsync` | `SalesOrder` or `SalesOrdersConnection` |
| `CreditNotes` | `GetByIdAsync`, `GetByNumberAsync`, `ListAsync`, `GetBySalesOrderNumberAsync`, `GetByDateRangeAsync` | `CreditNote` or `CreditNotesConnection` |
| `JobCards` | `GetByIdAsync`, `GetByNumberAsync`, `GetWithAssetsAndProofsAsync`, `GetBySalesOrderNumberAsync`, `ListAsync` | `JobCard` or `JobCardsConnection` |
| `Orders` | `PlaceOrderAsync`, `ValidateOrderAsync` | `PlaceOrderResponse` or `OrderMutationResponse` |
| `JobCardWorkflow` | `ApproveAsync`, `UpdateBrandingAsync`, `RequestChangeAsync` | `WorkflowMutationResponse` |

The model classes in `Amrod.SDK.Models` expose the selected fields for these operations, including pagination (`PageInfo` and connection/edge classes), request payloads, order results, warnings, and mutation errors.

## Create a sales order

`PlaceOrderInput` and `PlaceOrderRequest` both map to GraphQL `PlaceOrderInput`; `PlaceOrderRequest.SalesOrderNumber` is a convenience alias for GraphQL's required `orderNumber`. Use a unique value for each submission. `PlaceOrderAsync` only creates an order when `ValidateOnly` is `false`.

```csharp
using Amrod.SDK;
using Amrod.SDK.Apis;
using Amrod.SDK.Models;

PlaceOrderResponse response = await sdk.Orders.PlaceOrderAsync(
    new PlaceOrderRequest
    {
        SalesOrderNumber = "CUSTOMER-ORDER-0001",
        Options = new OrderOptions
        {
            OrderType = "STANDARD",
            ValidateOnly = false,
            ApplyInclusiveBranding = false
        },
        Collection = new OrderCollection
        {
            CollectionType = "COLLECTION_HEAD_OFFICE"
        },
        Contact = new OrderContactDetail
        {
            Notifications = new OrderContactNotificationDetail
            {
                Order = new OrderContact
                {
                    FirstName = "Jane",
                    LastName = "Customer",
                    Email = "jane@example.com",
                    ContactNumber = "+27110000000"
                }
            }
        },
        Details =
        [
            new OrderGroup
            {
                Id = "group-1",
                Items = [new OrderLine { Sku = "REAL-SKU", Quantity = 10, Price = 25.00m }]
            }
        ]
    });
```

Required request fields are order number, order type, validate flag, collection type, notification order contact, at least one group ID, and at least one item SKU/quantity. Optional branding is supplied through `OrderGroup.Branding`, including branding code, position, logo IDs, colors, metadata, packing instructions, reference, and special instructions.

For a non-creating preview, call `ValidateOrderAsync`; it always submits `validateOnly: true`.

Inspect `response.Errors` before reading `response.PlaceOrderPayloadType`. `ApiError.TypeName` is the GraphQL union member (`__typename`), and `Message` provides the server error message. On success, `PlaceOrderPayloadType.Orders` contains order/sales-order numbers, totals, lead times, line results, branding costs, and warnings.

## Query contracts

All read methods use the following parameter and response contracts:

| API | Method | Parameters | Result |
| --- | --- | --- | --- |
| `Viewer` | `GetViewerAsync` | None | `Viewer`: identity, customer, contact, and impersonation scopes. |
| `SalesOrders` | `GetByNumberAsync` | Sales-order number | `SalesOrder?` with customer, contact, line, balance, tax, and payment fields. |
| `SalesOrders` | `GetByIdAsync` | GraphQL ID | `SalesOrder?`. |
| `SalesOrders` | `ListAsync` | Optional `first`, `after`, `before` | `SalesOrdersConnection`. |
| `SalesOrders` | `GetWithJobCardsAsync` | Sales-order number | `SalesOrder?` including `JobCards`. |
| `CreditNotes` | `GetByIdAsync` or `GetByNumberAsync` | GraphQL ID or credit-note number | `CreditNote?`. |
| `CreditNotes` | `ListAsync` | Optional `first`, `after`, `before` | `CreditNotesConnection`. |
| `CreditNotes` | `GetBySalesOrderNumberAsync` | Sales-order number | `CreditNotesConnection`. |
| `CreditNotes` | `GetByDateRangeAsync` | ISO 8601 UTC start/end values | `CreditNotesConnection`. |
| `JobCards` | `GetByIdAsync` or `GetByNumberAsync` | GraphQL ID or job-card number | `JobCard?`. |
| `JobCards` | `GetWithAssetsAndProofsAsync` | Job-card number | `JobCard?` including assets, proofs, and proof options. |
| `JobCards` | `GetBySalesOrderNumberAsync` | Sales-order number | `JobCardsConnection`. |
| `JobCards` | `ListAsync` | Optional `first`, `after`, `before` | `JobCardsConnection`. |

Connection results contain `TotalCount`, `Nodes`, `Edges`, and `PageInfo`. Pass `PageInfo.EndCursor` as `after` to request the next page. `GetBy...Async` methods return `null` when no matching node is returned.

## Job-card workflows

`ApproveAsync(jobCardNumber, proofId, optionNumber)` approves a proof. The optional option number identifies a proof option.

`UpdateBrandingAsync` accepts `UpdateJobCardBrandingRequest`, which has a master job-card number and `JobCards`. Each `JobCardBrandingRequest` has a job-card number and `BrandingDetailInput`.

`RequestChangeAsync` accepts `RequestJobCardChangeRequest`, which has a sales-order number, a change-request type string, and `JobCards`. `BrandingDetailInput` supports `BrandingCode`, `Position`, `LogoPosition`, `Logos`, `LogoSize`, `LogoSizeType`, `Colors`, `Metadata`, `PackingInstructions`, `Reference`, and `SpecialInstructions`.

Each workflow call returns `WorkflowMutationResponse`. Check `Errors`, then use `ResultPayloadType?.Result` for the success flag and `ResultPayloadType?.Status` for the server status.

## Error behavior

Transport-level GraphQL errors cause `GraphQlSdkClient.ExecuteAsync` to throw `InvalidOperationException`. Business and validation errors for order and workflow mutations are returned in their response `Errors` collections.