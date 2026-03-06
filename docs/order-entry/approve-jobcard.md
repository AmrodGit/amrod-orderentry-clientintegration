# Approving Job Cards

## Overview

The job card approval functionality allows you to approve job cards for production printing. When you approve a job card, you're essentially confirming that the branding specifications and proof are correct and ready for the manufacturing process. This is a critical step in the order-to-production workflow where the job card transitions from being in draft or review status to approved status ready for manufacturing.

Approving a job card involves selecting a specific proof layout and proof option, which will be used for the actual printing and manufacturing process.

## Prerequisites

Before approving a job card, you must:

1. Have an existing job card that requires approval
2. Have reviewed the job card proofs and branding specifications
3. Have identified which proof layout you want to use for printing

For detailed information on how to retrieve job card information, including proofs and layouts, refer to the [Dashboard - Job Cards](./dashboard-jobcards.md) documentation.

The dashboard documentation covers:
- Querying job cards by job card number
- Querying job cards with complete proof and layout details
- Accessing proof options and specifications
- Common use cases and best practices

## Key Concepts

### Job Card Proofs and Layouts

A job card proof represents a version of the branding design that has been reviewed. Each proof includes:
- **Proof ID**: The unique identifier for the proof layout (required for approval)
- **Version**: The version number of the proof
- **Proof Options**: Different variations or options within a proof (e.g., different color versions)
- **Option Number**: A specific option within a proof (optional, used when a proof has multiple options)

You must select which proof layout to use before approving the job card. This proof will be used for all manufacturing and printing operations for this job card.

### Status Transition

When you approve a job card:
- The job card status transitions from `IN_QUEUE`, `PENDING_PROOF_APPROVAL`, or similar statuses to `APPROVED`
- The selected proof becomes the official specification for manufacturing
- The job card becomes eligible for production scheduling and manufacturing

## Approving a Job Card

### Mutation Definition

```graphql
mutation ApproveJobCard($input: ApproveJobCardInput!) {
  approveJobCard(input: $input) {
    errors {
      __typename
      ... on ConflictException {
        code
        message
        errorDetail
      }
    }
    resultPayloadType {
      result
      status
    }
  }
}
```

### Input Parameters

The `ApproveJobCardInput` object contains the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `jobCardNumber` | `String` | Yes | The unique job card number to be approved (e.g., "JC-2026-001234"). This must match an existing job card that requires approval. |
| `proofId` | `ID` | Yes | The unique identifier (ID) of the job card proof layout to be used for printing. This must correspond to an existing proof that has been generated and reviewed. |
| `optionNumber` | `Int` | No | An optional option number within the selected proof. Use this when a proof has multiple options/variations and you want to specify which one to use for printing. |

### Output

The mutation returns an `ApproveJobCardPayload` object containing:

| Field | Type | Description |
|-------|------|-------------|
| `errors` | `[ApproveJobCardError!]` | Array of errors. Currently only `ConflictException` can be returned. Will be empty if the approval succeeds. |
| `resultPayloadType` | `ResultPayloadType` | Contains the result status: `SUCCESS` (true) indicates successful approval, `FAILED` (false) indicates the approval failed. |

## Use Cases

### Use Case 1: Approve a Job Card After Proof Review

**Scenario**: You have reviewed the job card proof, confirmed the branding looks correct, and want to approve it for manufacturing.

**Steps**:
1. Query the job card to get its details and proof information (using [Dashboard - Job Cards](./dashboard-jobcards.md) queries)
2. Identify the correct proof ID and any specific option number if applicable
3. Submit the approval request with the job card number and proof ID

**Example**:
```graphql
mutation {
  approveJobCard(input: {
    jobCardNumber: "JC-2026-001234"
    proofId: "ProofLayout-789"
    optionNumber: 1
  }) {
    errors {
      __typename
      ... on ConflictException {
        message
      }
    }
    resultPayloadType {
      result
      status
    }
  }
}
```

### Use Case 2: Approve Multiple Job Cards from Same Order

**Scenario**: You have multiple job cards from the same sales order that are ready for approval and need to be scheduled for manufacturing.

**Steps**:
1. Query all job cards for the sales order (see [Dashboard - Job Cards](./dashboard-jobcards.md))
2. For each job card requiring approval, identify the appropriate proof
3. Submit separate approval requests for each job card (each job card requires its own approval mutation call)
4. Track the approval status of each job card

**Note**: Each job card must be approved individually. There is no batch approval endpoint; you must call the `approveJobCard` mutation once per job card.

**Example Pattern**:
```graphql
# First job card approval
mutation ApproveJobCard1 {
  approveJobCard(input: {
    jobCardNumber: "JC-2026-001234"
    proofId: "ProofLayout-789"
  }) {
    resultPayloadType {
      status
    }
  }
}

# Second job card approval
mutation ApproveJobCard2 {
  approveJobCard(input: {
    jobCardNumber: "JC-2026-001235"
    proofId: "ProofLayout-790"
  }) {
    resultPayloadType {
      status
    }
  }
}
```

## Error Handling

### ConflictException

**When it occurs**: The job card cannot be approved due to a conflict, typically because:
- The job card has already been approved
- The job card is in a status that doesn't allow approval
- The proof ID is invalid or has been deleted
- The proof option number (if specified) doesn't exist

**Error Details**:
- `code`: The specific error code identifying the conflict type
- `message`: A user-friendly error message
- `errorDetail`: Additional details about the conflict

**Example Error Response**:
```json
{
  "data": {
    "approveJobCard": {
      "errors": [
        {
          "__typename": "ConflictException",
          "code": "JOB_CARD_ALREADY_APPROVED",
          "message": "Job card JC-2026-001234 has already been approved.",
          "errorDetail": "Cannot approve a job card that is already in APPROVED status."
        }
      ],
      "resultPayloadType": null
    }
  }
}
```

### Handling Approval Failures

If the approval fails:

1. **Check the error code** - Understand why the approval failed
2. **Verify job card status** - Query the job card to confirm its current status
3. **Validate proof ID** - Ensure the proof ID still exists and is valid
4. **Review approval requirements** - Check if the job card meets all requirements for approval
5. **Contact support** if the error persists or seems inconsistent

## Best Practices

### Before Approving

✅ **Do**:
- Review the proof and all branding specifications before approval
- Verify colors, positioning, dimensions, and all branding details
- Confirm the correct proof layout is selected
- Check that all required branding information is present
- Verify the job card status allows for approval
- For complex jobs, have multiple stakeholders review the proof

❌ **Don't**:
- Approve without reviewing the proof
- Approve a job card with incorrect or incomplete branding details
- Approve if you're unsure about the branding requirements
- Approve if the job card status shows issues or warnings
- Assume the previous version/option is correct; always verify the specific option being used

### Approval Workflow

1. **Query Job Card** - Retrieve the job card with all proof and layout details
2. **Review Proofs** - Examine all available proofs and options
3. **Select Best Proof** - Choose the proof layout that matches the branding requirements
4. **Approve** - Submit the approval with the correct proof ID
5. **Verify** - Confirm the approval was successful by querying the job card status

### Handling Multiple Job Cards

When approving multiple job cards from the same order:
- Use consistent proof selection criteria across related job cards
- Track approval status to identify any failures
- Consider implementing approval batches with verification between each approval
- Log approvals with timestamps for audit trail

## Related Operations

- **[Request Job Card Change](./request-change-jobcard.md)** - Request modifications to job card branding before approval if needed
- **[Dashboard - Job Cards](./dashboard-jobcards.md)** - Query job cards and view proof details
- **[Dashboard - Sales Orders](./dashboard-sales-orders.md)** - View parent sales order context

## Common Scenarios

### Scenario 1: Proof Not Yet Generated

**Problem**: You want to approve a job card but no proof has been generated yet.

**Solution**:
- The system may require proof generation before approval is possible
- Check the job card status and available proofs
- Request proof generation if available
- Wait for proofs to be generated before attempting approval

### Scenario 2: Multiple Proof Options

**Problem**: The proof has multiple options and you're unsure which one to select.

**Solution**:
- Query the proof details to see all available options
- Review each option (different colors, sizes, or variations)
- Confirm with the customer or internal team which option matches the order requirements
- Specify the correct `optionNumber` in the approval request

### Scenario 3: Approval Fails Unexpectedly

**Problem**: Approval fails with a ConflictException even though the job card appears to be in the correct status.

**Solution**:
1. Refresh the job card query to verify current status
2. Check if another user or process approved the job card simultaneously
3. Verify the proof ID is still valid (wasn't archived or deleted)
4. If using optionNumber, confirm that option still exists
5. Create a support ticket with the job card number and error details