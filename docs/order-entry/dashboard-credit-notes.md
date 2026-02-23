# Dashboard - Credit Notes

## Overview

The Credit Notes Dashboard provides comprehensive query operations for retrieving and tracking credit notes. This includes querying for individual credit notes by ID or credit note number, retrieving paginated lists of credit notes with advanced filtering, and accessing detailed information about line items and associated assets.

## Query Operations

### Query: creditNote

Retrieve a specific credit note by its unique identifier.

#### Endpoint
- **Query**: `creditNote`
- **Input**: `creditNoteId: ID!` (The unique identifier of the credit note)
- **Return Type**: `CreditNote`

#### Query Example

```graphql
query {
  creditNote(creditNoteId: "CN-001") {
    id
    creditNoteNumber
    creditNoteDate
    totalExcl
    tax
    assetUri
    creditNoteDetails {
      sku
      quantity
    }
  }
}
```

**Use Case**: Retrieve complete details for a specific credit note when you have its ID.

### Query: creditNoteByCreditNoteNumber

Retrieve a credit note using its credit note number.

#### Endpoint
- **Query**: `creditNoteByCreditNoteNumber`
- **Input**: `creditNoteNumber: String!` (The unique credit note number)
- **Return Type**: `CreditNote`

#### Query Example

```graphql
query {
  creditNoteByCreditNoteNumber(creditNoteNumber: "CN-2026-001234") {
    id
    creditNoteNumber
    creditNoteDate
    totalExcl
    tax
    creditNoteDetails {
      sku
      quantity
    }
  }
}
```

**Use Case**: When you have a credit note number and want to look up the full credit note details.

### Query: creditNotes

Retrieve a paginated and filtered list of credit notes.

#### Endpoint
- **Query**: `creditNotes`
- **Input Parameters**:
  - `after: String` - Cursor for pagination (returns elements after this cursor)
  - `before: String` - Cursor for pagination (returns elements before this cursor)
  - `first: Int` - Number of elements to return from the start (default: 50, max: 1000)
  - `last: Int` - Number of elements to return from the end
  - `where: CreditNoteFilterInput` - Filter criteria (optional)
- **Return Type**: `CreditNotesConnection` (paginated list with edges, nodes, pageInfo, and totalCount)

#### Basic Query Example

```graphql
query {
  creditNotes(first: 10) {
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
        creditNoteNumber
        creditNoteDate
        totalExcl
        tax
        creditNoteDetails {
          sku
          quantity
        }
      }
    }
  }
}
```

**Use Case**: Retrieve a paginated list of all credit notes for the current customer context.

## Advanced Filtering

### Filter by Credit Note Number

Filter credit notes by their number using exact match or contains operations.

```graphql
query {
  creditNotes(
    first: 20
    where: {
      creditNoteNumber: {
        eq: "CN-2026-001234"
      }
    }
  ) {
    totalCount
    nodes {
      id
      creditNoteNumber
      creditNoteDate
      totalExcl
      tax
    }
  }
}
```

**Filter Options**:
- `eq: String` - Exact match
- `contains: String` - Partial match (substring)
- `in: [String]` - Match any value in the provided list

**Example - Search by Credit Note Number Contains**:
```graphql
query {
  creditNotes(
    first: 20
    where: {
      creditNoteNumber: {
        contains: "2026"
      }
    }
  ) {
    nodes {
      creditNoteNumber
      totalExcl
    }
  }
}
```

### Filter by Credit Note Date

Filter credit notes by their date range using comparison operators.

```graphql
query {
  creditNotes(
    first: 20
    where: {
      creditNoteDate: {
        gte: "2026-01-01"
        lte: "2026-02-28"
      }
    }
  ) {
    nodes {
      creditNoteNumber
      creditNoteDate
      totalExcl
    }
  }
}
```

**Filter Options**:
- `gt: DateTime` - Greater than
- `gte: DateTime` - Greater than or equal to
- `lt: DateTime` - Less than
- `lte: DateTime` - Less than or equal to

### Combined Filtering

Apply multiple filters using the `and` and `or` operators.

```graphql
query {
  creditNotes(
    first: 20
    where: {
      and: [
        {
          creditNoteNumber: {
            contains: "2026"
          }
        }
        {
          creditNoteDate: {
            gte: "2026-01-01"
          }
        }
      ]
    }
  ) {
    totalCount
    nodes {
      creditNoteNumber
      creditNoteDate
      totalExcl
      creditNoteDetails {
        sku
        quantity
      }
    }
  }
}
```

## Credit Note Structure

### CreditNote Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier of the credit note |
| `creditNoteNumber` | `String!` | The credit note number |
| `creditNoteDate` | `DateTime!` | The date of the credit note |
| `totalExcl` | `Float!` | Total amount excluding tax |
| `tax` | `Float!` | Tax amount for the credit note |
| `assetUri` | `URL!` | URI to access the credit note asset/document |
| `internalId` | `Int!` | Internal identifier of the credit note |
| `creditNoteDetails` | `[CreditNoteDetail!]!` | Line items associated with the credit note |

### CreditNoteDetail Fields

| Field | Type | Description |
|-------|------|-------------|
| `sku` | `String!` | Stock keeping unit identifier for the product |
| `quantity` | `Int!` | Quantity for the credit note detail |

## Use Cases

### Use Case 1: Retrieve All Credit Notes for the Customer

```graphql
query GetAllCreditNotes($firstPage: Int = 50) {
  creditNotes(first: $firstPage) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      creditNoteNumber
      creditNoteDate
      totalExcl
      tax
      creditNoteDetails {
        sku
        quantity
      }
    }
  }
}
```

**Use**: Retrieve a paginated view of all credit notes for dashboard display.

### Use Case 2: Find Credit Notes by Date Range

```graphql
query GetCreditNotesInDateRange($startDate: DateTime!, $endDate: DateTime!) {
  creditNotes(
    first: 100
    where: {
      creditNoteDate: {
        gte: $startDate
        lte: $endDate
      }
    }
  ) {
    totalCount
    nodes {
      creditNoteNumber
      creditNoteDate
      totalExcl
      tax
    }
  }
}
```

**Variables**:
```json
{
  "startDate": "2026-01-01",
  "endDate": "2026-02-28"
}
```

**Use**: Generate financial reports for a specific period.

### Use Case 3: Search Credit Notes by Number

```graphql
query SearchCreditNotes($searchTerm: String!) {
  creditNotes(
    first: 100
    where: {
      creditNoteNumber: {
        contains: $searchTerm
      }
    }
  ) {
    nodes {
      id
      creditNoteNumber
      creditNoteDate
      totalExcl
      creditNoteDetails {
        sku
        quantity
      }
    }
  }
}
```

**Variables**:
```json
{
  "searchTerm": "2026"
}
```

**Use**: Quickly find a specific credit note when you know part of its number.

### Use Case 4: Retrieve Specific Credit Note with Line Items

```graphql
query GetCreditNoteDetails($creditNoteNumber: String!) {
  creditNoteByCreditNoteNumber(creditNoteNumber: $creditNoteNumber) {
    id
    creditNoteNumber
    creditNoteDate
    totalExcl
    tax
    assetUri
    creditNoteDetails {
      sku
      quantity
    }
  }
}
```

**Variables**:
```json
{
  "creditNoteNumber": "CN-2026-001234"
}
```

**Use**: Retrieve complete details for a specific credit note including line items and asset URI.

### Use Case 5: Retrieve All Credit Notes for a Specific Sales Order

```graphql
query GetCreditNotesBySalesOrder($salesOrderNumber: String!) {
  creditNotes(
    first: 100
    where: {
      SalesOrder: {
        salesOrderNumber: {
          eq: $salesOrderNumber
        }
      }
    }
  ) {
    totalCount
    nodes {
      id
      creditNoteNumber
      creditNoteDate
      totalExcl
      tax
      creditNoteDetails {
        sku
        quantity
      }
    }
  }
}
```

**Variables**:
```json
{
  "salesOrderNumber": "SO-2026-001234"
}
```

**Use**: Retrieve all credit notes associated with a specific sales order to track adjustments and returns for that order.

## Pagination

The Credit Notes query supports cursor-based pagination for efficient data retrieval.

### Forward Pagination Example

```graphql
query GetNextPage($first: Int!, $after: String) {
  creditNotes(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      creditNoteNumber
      totalExcl
    }
  }
}
```

**Variables for First Page**:
```json
{
  "first": 50
}
```

**Variables for Subsequent Pages**:
```json
{
  "first": 50,
  "after": "cursor-from-previous-response"
}
```

### Backward Pagination Example

```graphql
query GetPreviousPage($last: Int!, $before: String) {
  creditNotes(last: $last, before: $before) {
    pageInfo {
      hasPreviousPage
      startCursor
    }
    nodes {
      creditNoteNumber
      totalExcl
    }
  }
}
```

## Response Examples

### Successful Single Credit Note Response

```json
{
  "data": {
    "creditNoteByCreditNoteNumber": {
      "id": "cn-12345",
      "creditNoteNumber": "CN-2026-001234",
      "creditNoteDate": "2026-02-15T10:30:00Z",
      "totalExcl": 1250.50,
      "tax": 187.58,
      "assetUri": "https://cdn.example.com/credit-notes/CN-2026-001234.pdf",
      "internalId": 98765,
      "creditNoteDetails": [
        {
          "sku": "PEN-701-BU",
          "quantity": 100
        },
        {
          "sku": "BAG-612-BU",
          "quantity": 50
        }
      ]
    }
  }
}
```

### Successful Paginated Response

```json
{
  "data": {
    "creditNotes": {
      "totalCount": 25,
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": "cursor-001",
        "endCursor": "cursor-050"
      },
      "edges": [
        {
          "cursor": "cursor-001",
          "node": {
            "id": "cn-12345",
            "creditNoteNumber": "CN-2026-001234",
            "creditNoteDate": "2026-02-15T10:30:00Z",
            "totalExcl": 1250.50,
            "tax": 187.58,
            "creditNoteDetails": [
              {
                "sku": "PEN-701-BU",
                "quantity": 100
              }
            ]
          }
        }
      ]
    }
  }
}
```

## Error Handling

### Not Found Error

```json
{
  "data": {
    "creditNoteByCreditNoteNumber": null
  }
}
```

**Cause**: The credit note number does not exist or is not accessible to the current customer.

**Solution**: Verify the credit note number is correct and belongs to your organization.

### Invalid Filter

```json
{
  "errors": [
    {
      "message": "Invalid filter input",
      "extensions": {
        "code": "GRAPHQL_VALIDATION_FAILED"
      }
    }
  ]
}
```

**Cause**: The filter input does not match the expected format.

**Solution**: Review the filter specifications and ensure field names and types are correct.

## Tips & Best Practices

✅ **Do**:
- Use cursor-based pagination for large result sets
- Combine filters to narrow results and improve performance
- Include only the fields you need in your query
- Use variables for dynamic query parameters
- Cache credit note data when appropriate to reduce API calls
- Validate credit note totals match your accounting records

❌ **Don't**:
- Retrieve all credit notes without pagination in production
- Ignore error responses
- Assume credit note numbers are unique across all regions
- Hardcode credit note numbers in your application
- Forget to include tax calculations in financial reports

## Related Documentation

- **[Place Sales Order](./place-sales-order.md)** - Create new orders
- **[Dashboard - Sales Orders](./dashboard-sales-orders.md)** - Retrieve sales order details
- **[Error Handling](../error-handling.md)** - Error codes and troubleshooting
- **[Authentication](../authentication.md)** - API authentication and security
