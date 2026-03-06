# Dashboard - Sales Orders

## Overview

The Sales Orders Dashboard provides comprehensive query operations for retrieving, filtering, and tracking sales orders. This includes querying for individual orders, retrieving paginated lists of orders, and accessing detailed information about order status, items, assets, and payment history.

## Query Operations

### Query: salesOrder

Retrieve a specific sales order by its unique identifier.

#### Endpoint
- **Query**: `salesOrder`
- **Input**: `id: ID!` (The unique identifier of the sales order)
- **Return Type**: `SalesOrder`

#### Query Example

```graphql
query {
  salesOrder(id: "SO-001") {
    id
    salesOrderNumber
    customerReference
    orderDate
    totalExcl
    tax
    balanceOutstanding
    isPaid
    isActive
    status
    lastModifiedDate
    customer {
      id
      name
      code
    }
    contact {
      fullName
      emailAddress
      telephoneNumber
    }
    salesOrderDetails {
      rowNumber
      sku
      quantity
      unitPriceExcl
      unitDiscountExcl
      lineTotalExcl
      lineTax
    }
    deliveryDetail {
      service
      courier
      courierContactNumber
      waybill
      weight
      totalExcl
    }
    jobCards {
      jobCardNumber
      status
      created
      isActive
    }
    assets(where: {}) {
      id
      assetId
      name
      type
      url
    }
  }
}
```

**Use Case**: Retrieve complete details for a specific order when you have its ID.

### Query: salesOrderBySalesOrderNumber

Retrieve a sales order using its sales order number (reference number).

#### Endpoint
- **Query**: `salesOrderBySalesOrderNumber`
- **Input**: `salesOrderNumber: String!` (The unique sales order number)
- **Return Type**: `SalesOrder`

#### Query Example

```graphql
query {
  salesOrderBySalesOrderNumber(salesOrderNumber: "SO-2026-001234") {
    id
    salesOrderNumber
    status
    orderDate
    totalExcl
    customer {
      name
      code
    }
    salesOrderDetails {
      sku
      quantity
      unitPriceExcl
      lineTotalExcl
    }
  }
}
```

**Use Case**: When you have a sales order number (e.g., from a confirmation email or invoice) and want to look up the full order details.

### Query: salesOrders

Retrieve a paginated and filtered list of sales orders.

#### Endpoint
- **Query**: `salesOrders`
- **Input Parameters**:
  - `after: String` - Cursor for pagination (returns elements after this cursor)
  - `before: String` - Cursor for pagination (returns elements before this cursor)
  - `first: Int` - Number of elements to return from the start (default: 50, max: 1000)
  - `last: Int` - Number of elements to return from the end
  - `where: SalesOrderFilterInput` - Filter criteria (optional)
- **Return Type**: `SalesOrdersConnection` (paginated list with edges, nodes, pageInfo, and totalCount)

#### Basic Query Example

```graphql
query {
  salesOrders(first: 10) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        salesOrderNumber
        customerReference
        orderDate
        status
        totalExcl
        isPaid
      }
    }
    nodes {
      id
      salesOrderNumber
      status
    }
  }
}
```

**Use Case**: Display a paginated list of orders in a dashboard or report.

#### Advanced Query with Filtering

```graphql
query {
  salesOrders(
    first: 20
    where: {
      and: [
        { isActive: { eq: true } }
        { Status: { eq: DELIVERY_PENDING } }
        { orderDate: { gte: "2026-01-01" } }
      ]
    }
  ) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      salesOrderNumber
      customer {
        name
      }
      orderDate
      totalExcl
      status
      deliveryDetail {
        waybill
        courier
      }
    }
  }
}
```

**Use Case**: Filter orders by status, date range, and active status to find orders requiring action.

### Query: salesOrderAsset

Retrieve a specific sales order asset by its unique identifier.

#### Endpoint
- **Query**: `salesOrderAsset`
- **Input**: `id: ID!` (The unique identifier of the sales order asset)
- **Return Type**: `SalesOrderAsset`

#### Query Example

```graphql
query {
  salesOrderAsset(id: "ASSET-001") {
    id
    assetId
    name
    type
    url
    created
  }
}
```

**Use Case**: Retrieve metadata and download link for a specific order asset (tax invoice, proof of collection, etc.).

## Response Objects

### SalesOrder

The main sales order object containing comprehensive order information.

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID! | Unique identifier for the sales order |
| `salesOrderNumber` | String! | The sales order reference number |
| `customerReference` | String! | Customer's reference number for the order |
| `customer` | Customer | Related customer information (name, code, contact) |
| `contact` | CustomerContact | Primary contact for the order |
| `orderDate` | Date! | Date the order was placed |
| `status` | SalesOrderStatus! | Current status of the order |
| `isActive` | Boolean! | Whether the order is currently active |
| `isPaid` | Boolean! | Whether the order has been fully paid |
| `lineCount` | Int! | Number of line items in the order |
| `internalLineCount` | Int! | Number of internal line items |
| `salesOrderDetails` | [SalesOrderDetail!]! | List of order items and their details |
| `internalDetails` | [SalesOrderInternalDetail]! | Internal order details |
| `totalExcl` | Decimal! | Order total excluding VAT |
| `tax` | Decimal! | VAT amount |
| `discountExcl` | Decimal! | VAT exclusive discount |
| `balanceOutstanding` | Decimal! | Remaining balance to be paid |
| `invoiceNumber` | String | Associated invoice number (if invoiced) |
| `invoiceDate` | DateTime | Date the invoice was issued |
| `deliveryDetail` | SalesOrderDeliveryDetail | Delivery information |
| `collectionBranch` | Branch | Branch for collection (if applicable) |
| `packaging` | Packaging | Packaging details for the order |
| `packagingCount` | Int! | Number of packages |
| `jobCards` | [JobCard!]! | Associated job cards |
| `assets` | [SalesOrderAsset]! | Assets associated with the order (invoices, proofs, etc.) |
| `paymentHistory` | [SalesOrderPaymentHistory]! | Payment transaction history |
| `lastModifiedDate` | DateTime! | Last modification timestamp |

### SalesOrderDetail

Individual item details within a sales order.

| Field | Type | Description |
|-------|------|-------------|
| `rowNumber` | Int! | Line item number in the order |
| `sku` | String! | Product SKU/identifier |
| `quantity` | Int! | Quantity ordered |
| `unitPriceExcl` | Decimal! | Unit price excluding VAT |
| `unitDiscountExcl` | Decimal! | Discount per unit (VAT exclusive) |
| `lineTotalExcl` | Decimal! | Total for this line excluding VAT |
| `lineTax` | Decimal! | VAT for this line |

### SalesOrderDeliveryDetail

Delivery and logistics information for the order.

| Field | Type | Description |
|-------|------|-------------|
| `service` | String! | Delivery service type |
| `courier` | String | Courier company name |
| `courierContactNumber` | String | Courier contact number |
| `waybill` | String! | Waybill/tracking number |
| `weight` | Float! | Total shipment weight |
| `weightUnitOfMeasure` | UnitOfMeasure | Unit of measurement (kg, lbs, etc.) |
| `totalExcl` | Decimal! | Delivery charge excluding VAT |

### SalesOrderAsset

Files and documents associated with a sales order.

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID! | Unique identifier for the asset |
| `assetId` | String! | The asset ID reference |
| `name` | String! | Display name of the asset |
| `type` | SalesOrderAssetType! | Asset type (see enum below) |
| `url` | URL | Download/view URL for the asset |
| `created` | DateTime! | Date the asset was created |

### SalesOrderAssetType Enum

Asset types available for sales orders:

| Value | Description |
|-------|-------------|
| `UNKNOWN` | Asset type could not be determined |
| `SALES_ORDER` | The actual sales order document |
| `TAX_INVOICE` | Tax invoice/VAT invoice |
| `COLLECTION_NOTE` | Collection authorization document |
| `PROOF_OF_COLLECTION` | Proof that order was collected |

### SalesOrderStatus Enum

Possible status values for a sales order:

| Status | Description |
|--------|-------------|
| `NEW` | Order just created, not yet processed |
| `RECEIVED_BY_WAREHOUSE` | Order received at warehouse |
| `PICKED` | Items picked from warehouse inventory |
| `RECEIVED_AT_BRANCH` | Order arrived at collection branch |
| `READY_FOR_COLLECTION` | Order ready for customer collection |
| `DISPATCH_PENDING` | Awaiting dispatch to courier |
| `DELIVERY_PENDING` | With courier, awaiting delivery |
| `DELIVERY_IN_TRANSIT` | Currently in transit to customer |
| `READY_FOR_TRANSIT` | Prepared and ready for transit |
| `IN_TRANSIT` | In transit to destination |
| `CLOSED` | Order completed successfully |
| `CANCELLED` | Order cancelled |

### SalesOrderPaymentHistory

Payment transaction record for a sales order.

| Field | Type | Description |
|-------|------|-------------|
| `date` | DateTime! | Date of the payment |
| `amount` | Decimal! | Payment amount |
| `paymentType` | PaymentType! | Type of payment (see enum) |

## Common Use Cases

### Use Case 1: Display Order Status Dashboard

Show a summary of orders by status:

```graphql
query OrderStatusSummary {
  pending: salesOrders(
    first: 100
    where: { Status: { eq: DELIVERY_PENDING } }
  ) {
    totalCount
    nodes {
      salesOrderNumber
      customer { name }
      totalExcl
      deliveryDetail { waybill }
    }
  }
  
  inTransit: salesOrders(
    first: 100
    where: { Status: { eq: DELIVERY_IN_TRANSIT } }
  ) {
    totalCount
    nodes {
      salesOrderNumber
      customer { name }
    }
  }
}
```

### Use Case 2: Customer Order History

Retrieve all recent orders for a specific customer:

```graphql
query CustomerOrders {
  recentOrders: salesOrders(
    first: 10
    where: {
      and: [
        { isActive: { eq: true } }
        { orderDate: { gte: "2026-01-01" } }
      ]
    }
  ) {
    nodes {
      salesOrderNumber
      orderDate
      status
      totalExcl
      invoiceNumber
    }
  }
}
```

### Use Case 3: Order with Complete Details

Get full order information including items, delivery, and assets:

```graphql
query FullOrderDetails($orderId: ID!) {
  salesOrder(id: $orderId) {
    salesOrderNumber
    customer { name, code }
    status
    salesOrderDetails {
      sku
      quantity
      unitPriceExcl
      lineTotalExcl
    }
    deliveryDetail {
      waybill
      courier
      service
      weight
    }
    assets {
      type
      name
      url
    }
    paymentHistory {
      date
      amount
    }
  }
}
```

### Use Case 4: Outstanding Payments Report

Find orders with outstanding balances:

```graphql
query OutstandingPayments {
  salesOrders(
    first: 50
    where: {
      and: [
        { isPaid: { eq: false } }
        { isActive: { eq: true } }
      ]
    }
  ) {
    totalCount
    nodes {
      salesOrderNumber
      customer { name }
      totalExcl
      balanceOutstanding
      lastModifiedDate
    }
  }
}
```

## Filtering Options

The `SalesOrderFilterInput` provides the following filter fields:

| Field | Filter Type | Example |
|-------|-----------|---------|
| `salesOrderNumber` | String | Filter by order number |
| `InvoiceNumber` | String | Filter by invoice number |
| `CustomerReference` | String | Filter by customer reference |
| `isActive` | Boolean | Filter by active status (true/false) |
| `Status` | Enum | Filter by order status (NEW, DELIVERY_PENDING, etc.) |
| `orderDate` | DateTime | Filter by order date (supports gte, lte, eq, etc.) |
| `and` | Array | Combine multiple filters with AND logic |
| `or` | Array | Combine multiple filters with OR logic |

## Pagination

Sales orders queries support cursor-based pagination:

```graphql
query PaginatedOrders {
  page1: salesOrders(first: 50) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      salesOrderNumber
      status
    }
  }
  
  page2: salesOrders(first: 50, after: "CURSOR_FROM_PAGE1") {
    pageInfo {
      hasPreviousPage
      startCursor
    }
    nodes {
      salesOrderNumber
      status
    }
  }
}
```

**Best Practices**:
- Use `first: 50` as default for good balance of performance and data
- Store `endCursor` from response to fetch next page

## Error Handling

Queries may return errors in the following scenarios:

### NotFound Error
When a specific sales order ID cannot be found:

```graphql
{
  errors: [
    {
      message: "Sales order not found",
      extensions: {
        code: "NOT_FOUND"
      }
    }
  ]
}
```

**Resolution**: Verify the order ID or sales order number is correct.

### Unauthorized Error
When the user lacks permission to view certain orders:

```graphql
{
  errors: [
    {
      message: "You do not have permission to access this resource",
      extensions: {
        code: "UNAUTHORIZED"
      }
    }
  ]
}
```

**Resolution**: Contact administrator to grant appropriate permissions.

### Invalid Filter Error
When filter parameters are invalid:

```graphql
{
  errors: [
    {
      message: "Invalid filter parameter",
      extensions: {
        code: "BAD_REQUEST"
      }
    }
  ]
}
```

**Resolution**: Review filter syntax and enum values.

## Authentication

All sales order queries require valid authentication. For details on authentication and security, refer to [authentication.md](../authentication.md).

## Related Documentation

- [Place Sales Order](./place-sales-order.md) - Create new sales orders
- [Request Job Card Change](./request-change-jobcard.md) - Modify existing orders
- [Order Entry Overview](./order-entry-overview.md) - High-level order management concepts
- [Error Handling](../error-handling.md) - Comprehensive error handling guide
- [Authentication](../authentication.md) - API authentication and security

## API Schema Reference

For the complete GraphQL schema definition, refer to:
- **Schema File**: `{ENV_BASE_URI}/graphql/schema.graphql`

## Examples and Testing

Bruno collection examples for testing the `placeOrder` mutation:
- Location: `/samples/bruno/Order Entry/Sales Orders/`
- Environments available: `UAT`, `PROD`

For testing guidance and sample payloads, refer to the Bruno collection documentation.
