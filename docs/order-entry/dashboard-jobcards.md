# Dashboard - Job Cards

## Overview

The Job Cards dashboard provides comprehensive query capabilities for retrieving, filtering, and analyzing job card data. This documentation covers all available query operations for accessing job card information from the system.

## Retrieving Job Card Details

### Query Job Card by Job Card Number

This is the most direct way to retrieve a specific job card when you already know its number:

```graphql
query GetJobCardByNumber($jobCardNumber: String!) {
  jobCardByJobCardNumber(jobCardNumber: $jobCardNumber) {
    id
    jobCardNumber
    salesOrderNumber
    status
    jobCardBrandingDetail {
      brandingCode
      brandingPosition
      brandingPlacement
      logo
      colors
      brandingSizeWidth
      brandingSizeHeight
      foilColor
      siliconeColor
      vinylColor
      repeatOption
      repeatReference
    }
    jobCardDate {
      dueDate
      internalDueDate
      leadTime
      internalLeadTime
    }
    jobCardAssets {
      id
      downloadUrl
      fileName
      mimeType
      type
    }
  }
}
```

**Variables:**
```json
{
  "jobCardNumber": "JOB-001234"
}
```

**Response Example:**
```json
{
  "data": {
    "jobCardByJobCardNumber": {
      "id": "job-card-id-12345",
      "jobCardNumber": "JOB-001234",
      "salesOrderNumber": "SO-001234",
      "status": "IN_PROGRESS",
      "jobCardBrandingDetail": {
        "brandingCode": "DP-A",
        "brandingPosition": "A",
        "brandingPlacement": "FRONT",
        "logo": "Logo A",
        "colors": "#FF0000",
        "brandingSizeWidth": 25.5,
        "brandingSizeHeight": 30.0,
        "foilColor": "GOLD",
        "siliconeColor": null,
        "vinylColor": null,
        "repeatOption": "NONE",
        "repeatReference": null
      },
      "jobCardDate": {
        "dueDate": "2026-02-28",
        "internalDueDate": "2026-02-25",
        "leadTime": 7,
        "internalLeadTime": 5
      },
      "jobCardAssets": [
        {
          "id": "asset-001",
          "downloadUrl": "https://cdn.example.com/assets/jc-001.pdf",
          "fileName": "job-card-spec.pdf",
          "mimeType": "application/pdf",
          "type": "SPECIFICATION"
        }
      ]
    }
  }
}
```

### Query Job Cards with Filters

If you need to find multiple job cards based on specific criteria:

```graphql
query GetJobCards($first: Int, $where: JobCardFilterInput) {
  jobCards(first: $first, where: $where) {
    edges {
      node {
        id
        jobCardNumber
        salesOrderNumber
        status
        jobCardBrandingDetail {
          brandingCode
          brandingPosition
          brandingPlacement
          logo
          colors
          brandingSizeWidth
          brandingSizeHeight
          repeatOption
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

#### Filter by Status

Query job cards with a specific status:

```json
{
  "first": 50,
  "where": {
    "status": {
      "eq": "IN_PROGRESS"
    }
  }
}
```

**Status Values:**
- `PENDING` - Job card created but not yet started
- `IN_PROGRESS` - Job card is currently being processed
- `READY_FOR_APPROVAL` - Job card work complete, awaiting approval
- `APPROVED` - Job card has been approved
- `COMPLETED` - Job card work finished and delivered
- `ON_HOLD` - Job card processing paused
- `CANCELLED` - Job card cancelled

#### Filter by Sales Order Number

Query all job cards associated with a specific sales order:

```json
{
  "first": 50,
  "where": {
    "salesOrderNumber": {
      "eq": "SO-005432"
    }
  }
}
```

#### Filter by Job Card Number

Query with partial job card number match:

```json
{
  "first": 50,
  "where": {
    "jobCardNumber": {
      "contains": "JOB-001"
    }
  }
}
```

#### Filter by Branding Code

Query job cards using a specific branding method:

```json
{
  "first": 50,
  "where": {
    "jobCardBrandingDetail": {
      "brandingCode": {
        "eq": "DP-A"
      }
    }
  }
}
```

#### Combined Filters

Apply multiple filters in a single query:

```graphql
query GetFilteredJobCards {
  jobCards(
    first: 50
    where: {
      and: [
        { status: { eq: IN_PROGRESS } }
        { salesOrderNumber: { eq: "SO-005432" } }
      ]
    }
  ) {
    edges {
      node {
        id
        jobCardNumber
        salesOrderNumber
        status
        jobCardBrandingDetail {
          brandingCode
          brandingPosition
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Query Job Card by ID

If you have the job card's unique identifier:

```graphql
query GetJobCard($id: ID!) {
  jobCard(id: $id) {
    id
    jobCardNumber
    salesOrderNumber
    status
    jobCardBrandingDetail {
      brandingCode
      brandingPosition
      brandingPlacement
      logo
      colors
      brandingSizeWidth
      brandingSizeHeight
      foilColor
      siliconeColor
      vinylColor
      repeatOption
      repeatReference
    }
    jobCardDate {
      dueDate
      actionDate
    }
  }
}
```

**Variables:**
```json
{
  "id": "job-card-id-here"
}
```

### Query Job Card Assets

Retrieve assets (artwork files, specifications, etc.) associated with a job card:

```graphql
query GetJobCardAssets($assetId: ID!) {
  jobCardAsset(id: $assetId) {
    id
    downloadUrl
    fileName
    mimeType
    type
    created
    modified
  }
}
```

**Asset Types:**
- `SPECIFICATION` - Job card specification document
- `ARTWORK` - Artwork or design file
- `PROOF` - Proof document for customer approval
- `INSTRUCTION` - Special instructions or notes
- `REFERENCE` - Reference document

### Query Multiple Job Cards (Pagination)

For large result sets, use pagination to retrieve job cards in batches:

```graphql
query GetJobCardsWithPagination($first: Int, $after: String, $where: JobCardFilterInput) {
  jobCards(first: $first, after: $after, where: $where) {
    edges {
      cursor
      node {
        id
        jobCardNumber
        salesOrderNumber
        status
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

**Variables for first batch:**
```json
{
  "first": 25,
  "where": {
    "status": {
      "eq": "IN_PROGRESS"
    }
  }
}
```

**Variables for next batch (use `endCursor` from previous result):**
```json
{
  "first": 25,
  "after": "cursor-from-previous-response",
  "where": {
    "status": {
      "eq": "IN_PROGRESS"
    }
  }
}
```

## Job Card Fields Reference

### JobCard Type

The main job card object contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier for the job card |
| `jobCardNumber` | `String!` | The job card number (e.g., "JOB-001234") |
| `salesOrderNumber` | `String!` | The associated sales order number |
| `status` | `JobCardStatus!` | Current status of the job card |
| `jobCardBrandingDetail` | `JobCardBrandingDetail!` | Branding specifications and details |
| `jobCardDate` | `JobCardDate` | Date-related information (due dates, lead times) |
| `jobCardAssets` | `[JobCardAsset!]` | Associated asset files and documents |

### JobCardBrandingDetail Type

Contains all branding-related information:

| Field | Type | Description |
|-------|------|-------------|
| `brandingCode` | `String!` | The branding method code (e.g., "DP-A") |
| `brandingPosition` | `String!` | The position code where branding is applied (e.g., "A") |
| `brandingPlacement` | `String` | The placement description (e.g., "FRONT", "BACK") |
| `logo` | `String!` | The logo identifier or name |
| `colors` | `String` | Color specification string |
| `brandingSizeWidth` | `Float` | Width of the branding in millimeters |
| `brandingSizeHeight` | `Float` | Height of the branding in millimeters |
| `foilColor` | `String` | Foil color for foil-based branding |
| `siliconeColor` | `String` | Silicon color for silicone-based branding |
| `vinylColor` | `String` | Vinyl color for vinyl-based branding |
| `repeatOption` | `JobCardRepeatType!` | Repeat type: `NONE`, `LOGO`, or `EXACT` |
| `repeatReference` | `String` | Reference to previous job card for repeat |

### JobCardDate Type

Date and timing information:

| Field | Type | Description |
|-------|------|-------------|
| `dueDate` | `Date` | Customer-facing due date |
| `internalDueDate` | `Date` | Internal manufacturing due date |
| `actionDate` | `Date` | Date when action is required |
| `leadTime` | `Int` | Customer lead time in days |
| `internalLeadTime` | `Int` | Internal lead time in days |

### JobCardAsset Type

Asset files associated with a job card:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique identifier for the asset |
| `downloadUrl` | `String` | URL to download the asset file |
| `fileName` | `String` | Name of the asset file |
| `mimeType` | `String` | MIME type of the file (e.g., "application/pdf") |
| `type` | `JobCardAssetType!` | Type of asset (SPECIFICATION, ARTWORK, PROOF, etc.) |
| `created` | `DateTime!` | Creation timestamp |
| `modified` | `DateTime!` | Last modification timestamp |

## Common Use Cases

### Use Case 1: Get All Job Cards for a Sales Order

Retrieve all job cards associated with a specific sales order:

```graphql
query GetJobCardsForOrder($salesOrderNumber: String!) {
  jobCards(
    first: 100
    where: {
      salesOrderNumber: {
        eq: $salesOrderNumber
      }
    }
  ) {
    edges {
      node {
        id
        jobCardNumber
        status
        jobCardBrandingDetail {
          brandingCode
          brandingPosition
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "salesOrderNumber": "SO-001234"
}
```

### Use Case 2: Get Job Cards Ready for Approval

Query all job cards that are ready for approval:

```graphql
query GetJobCardsReadyForApproval {
  jobCards(
    first: 50
    where: {
      status: {
        eq: READY_FOR_APPROVAL
      }
    }
  ) {
    edges {
      node {
        jobCardNumber
        salesOrderNumber
        jobCardDate {
          dueDate
        }
      }
    }
  }
}
```

### Use Case 3: Get Job Card with Complete Details

Retrieve full job card information including assets and dates:

```graphql
query GetCompleteJobCardDetails($jobCardNumber: String!) {
  jobCardByJobCardNumber(jobCardNumber: $jobCardNumber) {
    id
    jobCardNumber
    salesOrderNumber
    status
    jobCardBrandingDetail {
      brandingCode
      brandingPosition
      brandingPlacement
      logo
      colors
      brandingSizeWidth
      brandingSizeHeight
      foilColor
      repeatOption
    }
    jobCardDate {
      dueDate
      internalDueDate
      actionDate
      leadTime
    }
    jobCardAssets {
      id
      fileName
      type
      downloadUrl
    }
  }
}
```

### Use Case 4: Monitor Job Cards by Status

Get counts and details of job cards grouped by status:

```graphql
query MonitorJobCardsByStatus {
  pending: jobCards(first: 50, where: { status: { eq: PENDING } }) {
    edges { node { jobCardNumber } }
  }
  inProgress: jobCards(first: 50, where: { status: { eq: IN_PROGRESS } }) {
    edges { node { jobCardNumber } }
  }
  readyForApproval: jobCards(first: 50, where: { status: { eq: READY_FOR_APPROVAL } }) {
    edges { node { jobCardNumber } }
  }
  completed: jobCards(first: 50, where: { status: { eq: COMPLETED } }) {
    edges { node { jobCardNumber } }
  }
}
```

## Best Practices

### 1. Use Specific Queries When Possible

Prefer `jobCardByJobCardNumber` when you know the job card number, as it's more efficient than filtering:

```graphql
# Preferred
query { jobCardByJobCardNumber(jobCardNumber: "JOB-001234") { ... } }

# Less efficient
query { jobCards(where: { jobCardNumber: { eq: "JOB-001234" } }) { ... } }
```

### 2. Limit Field Selection

Only request fields you actually need to reduce response size:

```graphql
# Good - only necessary fields
query {
  jobCardByJobCardNumber(jobCardNumber: "JOB-001234") {
    jobCardNumber
    status
    jobCardBrandingDetail { brandingCode }
  }
}

# Inefficient - all fields including unnecessary nested data
query {
  jobCardByJobCardNumber(jobCardNumber: "JOB-001234") {
    ... all possible fields ...
  }
}
```

### 3. Use Pagination for Large Result Sets

Don't retrieve all records at once; use pagination:

```graphql
# Good - paginated
query { jobCards(first: 50) { ... } }

# Not recommended - could return thousands of records
query { jobCards(first: 10000) { ... } }
```

### 4. Apply Filters Early

Let the API do the filtering rather than retrieving all data and filtering client-side:

```graphql
# Good - server-side filtering
query {
  jobCards(where: { status: { eq: IN_PROGRESS } }) { ... }
}

# Less efficient - retrieves all, filter client-side
query {
  jobCards(first: 1000) { ... } # then filter in code
}
```

### 5. Cache Results When Appropriate

Job card details don't change frequently, so consider caching results locally to reduce API calls.

### 6. Monitor Performance

When using combined filters, test performance to ensure query returns in acceptable time. Consider adding filters to narrow results more effectively.

### 7. Handle Pagination Correctly

Always check `pageInfo.hasNextPage` before assuming you have all results:

```graphql
query {
  jobCards(first: 50) {
    edges { node { ... } }
    pageInfo {
      hasNextPage # Check this before requesting more
      endCursor   # Use for next query
    }
  }
}
```

## Related Mutations

For operations that modify job card data, see:
- [Request Job Card Changes](./request-change-jobcard.md) - Request modifications to job cards
- Order Entry documentation for approve and update operations

## Support and Troubleshooting

### No Results Returned

If a query returns no results:
1. Verify the filter criteria are correct
2. Check that the job card number or ID actually exists
3. Ensure the job card hasn't been deleted
4. Try a broader filter to verify data exists

### Query Timeout

If a query times out:
1. Reduce the number of results (use smaller `first` value)
2. Add more specific filters to narrow results
3. Remove unnecessary fields from the selection
4. Consider using pagination to retrieve data in smaller batches

### No Permission to View

If you receive permission errors:
1. Verify you're authenticated with valid credentials
2. Check that you have access to the sales order
3. Ensure your user role has dashboard query permissions

For additional support, refer to [support documentation](../support.md).
