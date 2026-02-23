# Updating Job Card Branding Information

## Overview

The job card branding information update functionality allows you to modify branding specifications for job cards when they are in a specific status awaiting branding information. This is distinct from requesting changes to job cards at other stages in their lifecycle.

Understanding when to use **update** versus **request change** is critical for managing job card modifications effectively.

## Key Difference: Update vs. Request Change

The Order Entry system provides two different operations for modifying job card branding, each designed for specific job card statuses:

### Update Job Card Branding Info

**Used For**: Providing branding information when the job card is waiting for it  
**Job Card Status**: `AWAITING_INFO` only  
**Mutation**: `updateJobCardBrandingInfo`  
**Approach**: Direct update of branding specifications  
**Use Case**: Initial branding setup or providing missing branding data

### Request Job Card Change

**Used For**: Requesting modifications to existing job cards  
**Job Card Status**: `AWAITING_APPROVAL`, `AWAITING_LAYOUT`, `AWAITING_PAYMENT`  
**Mutation**: `requestChangeJobCard`  
**Approach**: Submit a change request with reason codes  
**Use Case**: Correcting errors, customer-requested changes, or modifications during approval workflow

### Status Flow Context

```
Order Creation
        ↓
Job Card Created → WAITING_INFO
                        ↓
                   USE updateJobCardBrandingInfo
                   (provide branding details)
                        ↓
                   Status → AWAITING_APPROVAL
                        ↓
                   USE requestChangeJobCard
                   (request changes if needed)
                        ↓
                   Status → AWAITING_LAYOUT → AWAITING_PAYMENT
                        ↓
                   USE requestChangeJobCard
                   (modifications before manufacturing)
```

## Prerequisites

Before updating job card branding information:

1. Have an existing job card that is in `AWAITING_INFO` status
2. Have prepared the complete branding specifications
3. Know the master job card number (the primary job card in the group)
4. Have identified all job cards in the group that need branding

For detailed information on job card structure and status transitions, refer to [Dashboard - Job Cards](./dashboard-jobcards.md).

## Key Concepts

### Master Job Card Number

The `masterJobCardNumber` is the primary identifier for the job card group being updated. This is the main job card number that represents the collection of related job cards. When you update a master job card's branding, the system applies the branding specifications to all related job cards in the group.

### Job Card Grouping

Multiple job cards can be related through a master job card. When updating branding:
- The `masterJobCardNumber` identifies the group
- The `jobCards` array contains individual job cards within that group
- Each job card in the array gets the specified branding applied

### AWAITING_INFO Status

This status indicates that the job card has been created but is waiting for branding information to be provided. Once branding information is successfully updated, the job card typically transitions to the next status in its workflow (e.g., `AWAITING_APPROVAL`).

## Updating Job Card Branding Information

### Mutation Definition

```graphql
mutation UpdateJobCardBrandingInfo($input: UpdateJobCardBrandingInfoInput!) {
  updateJobCardBrandingInfo(input: $input) {
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

The `UpdateJobCardBrandingInfoInput` object contains the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `masterJobCardNumber` | `String` | Yes | The master job card number for which branding information is being updated. This identifies the job card group in the `WAITING_INFO` status. |
| `jobCards` | `[JobCardBrandingDetailInput!]` | Yes | An array of job cards to update with branding details. Each element specifies a job card number and its branding specifications. |

#### JobCardBrandingDetailInput

For each job card being updated:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `jobCardNumber` | `String` | Yes | The job card number to update. Must be part of the master job card group. |
| `brandingDetail` | `BrandingDetailInput` | Yes | The complete branding specification for this job card. Contains all branding method, colors, logos, and metadata. |

#### BrandingDetailInput

The complete branding specification includes:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `brandingCode` | `String` | Yes | The branding method code (e.g., "DP-A", "LA", "PA"). |
| `position` | `String` | Yes | The branding position code (e.g., "A", "B", "C"). |
| `logoPosition` | `OrderBrandingLogoPositionType` | Yes | Logo placement (TOP_LEFT, TOP_CENTER, etc.). |
| `logos` | `[ID!]` | No | Array of logo IDs from the Logo Library. |
| `logoSize` | `Float` | Yes | Logo size in millimeters. |
| `logoSizeType` | `OrderBrandingLogoSizeType` | Yes | Whether logoSize is WIDTH or HEIGHT. |
| `colors` | `[BrandingColorDetailInput!]` | No | Array of branding colors. |
| `reference` | `String` | Yes | Reference identifier for the branding job. |
| `specialInstructions` | `String` | No | Special branding instructions. |
| `packingInstructions` | `String` | No | Internal packing instructions. |
| `metadata` | `[BrandingMetadataInput!]` | No | Metadata for extended specifications (foil color, DYE, etc.). |
| `repeat` | `BrandingRepeatDetailInput` | No | Repeat branding details if applicable. |

For detailed information on branding metadata including foiling, debossing, silicone, and vinyl options, color selections, and DYE charge codes, refer to the [Branding Metadata](./branding-metadata.md) documentation.

### Output

The mutation returns an `UpdateJobCardBrandingInfoPayload` object containing:

| Field | Type | Description |
|-------|------|-------------|
| `errors` | `[UpdateJobCardBrandingInfoError!]` | Array of errors. Currently only `ConflictException` can be returned. Empty if successful. |
| `resultPayloadType` | `ResultPayloadType` | Contains the result status: `SUCCESS` (true) or `FAILED` (false). |

## Use Cases

### Use Case 1: Provide Branding for New Job Card

**Scenario**: A job card has been created but is waiting for branding information to be provided before it can proceed to approval.

**Steps**:
1. Query the job card to confirm it's in `WAITING_INFO` status
2. Prepare the branding specifications
3. Submit the update with the master job card number and branding details

**Example**:
```graphql
mutation {
  updateJobCardBrandingInfo(input: {
    masterJobCardNumber: "JC-2026-001234"
    jobCards: [
      {
        jobCardNumber: "JC-2026-001234"
        brandingDetail: {
          brandingCode: "DP-A"
          position: "A"
          logoPosition: TOP_CENTER
          logos: ["logo-id-1"]
          logoSize: 20.0
          logoSizeType: WIDTH
          reference: "BR-2026-0001"
          metadata: [
            {
              key: "DYEName"
              value: "DIE-1"
            }
          ]
        }
      }
    ]
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

### Use Case 2: Update Multiple Job Cards in Group

**Scenario**: Multiple related job cards need different branding specifications but are all in the `WAITING_INFO` status.

**Steps**:
1. Query the master job card to identify related job cards
2. Prepare distinct branding specifications for each job card
3. Submit a single update request with all job cards and their branding

**Example**:
```graphql
mutation {
  updateJobCardBrandingInfo(input: {
    masterJobCardNumber: "JC-2026-001234"
    jobCards: [
      {
        jobCardNumber: "JC-2026-001234"
        brandingDetail: {
          brandingCode: "DP-A"
          position: "A"
          logoPosition: TOP_CENTER
          logos: ["logo-id-1"]
          logoSize: 20.0
          logoSizeType: WIDTH
          reference: "BR-2026-0001"
        }
      },
      {
        jobCardNumber: "JC-2026-001235"
        brandingDetail: {
          brandingCode: "LA"
          position: "B"
          logoPosition: MIDDLE_CENTER
          logos: ["logo-id-2"]
          logoSize: 25.0
          logoSizeType: HEIGHT
          reference: "BR-2026-0002"
        }
      }
    ]
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

### Use Case 3: Update with Special Branding Methods

**Scenario**: Job cards require special branding methods like foiling or silicone that need metadata configuration.

**Steps**:
1. Determine the branding method and required metadata
2. Prepare metadata entries (foil color, DYE charge, etc.)
3. Submit update with complete metadata specifications

**Example** - Foiling:
```graphql
mutation {
  updateJobCardBrandingInfo(input: {
    masterJobCardNumber: "JC-2026-002000"
    jobCards: [
      {
        jobCardNumber: "JC-2026-002000"
        brandingDetail: {
          brandingCode: "FO"
          position: "A"
          logoPosition: TOP_CENTER
          logos: ["logo-id-3"]
          logoSize: 15.0
          logoSizeType: WIDTH
          reference: "BR-2026-0003"
          metadata: [
            {
              key: "FoilColor"
              value: "Shiny Gold"
            },
            {
              key: "DYEName"
              value: "DIE-2"
            }
          ]
        }
      }
    ]
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

## Error Handling

### ConflictException

**When it occurs**: The branding information cannot be updated, typically because:
- The job card is not in `AWAITING_INFO` status
- The job card number doesn't exist or is invalid
- The master job card number is incorrect
- The job card has already been processed beyond the `AWAITING_INFO` status

**Error Details**:
- `code`: The specific error code identifying the conflict
- `message`: User-friendly error message
- `errorDetail`: Additional context about the conflict

**Example Error Response**:
```json
{
  "data": {
    "updateJobCardBrandingInfo": {
      "errors": [
        {
          "__typename": "ConflictException",
          "code": "JOB_CARD_NOT_WAITING_INFO",
          "message": "Job card JC-2026-001234 is not in WAITING_INFO status.",
          "errorDetail": "The job card must be in WAITING_INFO status to update branding information. Current status: AWAITING_APPROVAL"
        }
      ],
      "resultPayloadType": null
    }
  }
}
```

### Handling Update Failures

If the update fails:

1. **Verify job card status** - Query the job card to confirm current status
2. **Check master job card number** - Ensure you're using the correct master identifier
3. **Validate job card numbers** - Confirm all job card numbers exist and belong to the master group
4. **Review branding details** - Check for missing required fields in branding specification
5. **Contact support** if the error persists

## When to Use: Update vs. Request Change

Use this decision tree to determine which operation to use:

```
Is the job card in WAITING_INFO status?
├─ YES → Use updateJobCardBrandingInfo
│        (provide initial branding information)
│
└─ NO → Is the job card in AWAITING_APPROVAL, AWAITING_LAYOUT, or AWAITING_PAYMENT?
        ├─ YES → Use requestChangeJobCard
        │        (request changes with a change reason)
        │
        └─ NO → Job card may not allow modifications
                Check job card status and documentation
```

**Quick Reference**:
- **WAITING_INFO**: Use `updateJobCardBrandingInfo`
- **AWAITING_APPROVAL, AWAITING_LAYOUT, AWAITING_PAYMENT**: Use `requestChangeJobCard`
- **Other statuses**: Modifications may not be allowed

## Best Practices

### Before Updating

✅ **Do**:
- Verify the job card is in `WAITING_INFO` status
- Prepare complete branding specifications including all required metadata
- Gather all necessary information (logos, colors, DYE charges, etc.)
- Test in validate-only mode first if available
- Double-check master job card number and all related job card numbers

❌ **Don't**:
- Update after the job card has moved beyond `WAITING_INFO` status
- Provide incomplete branding specifications
- Forget required metadata for special branding methods
- Assume all related job cards have the same branding needs
- Skip verification of job card status

### Update Workflow

1. **Query Job Card** - Verify status is `WAITING_INFO`
2. **Prepare Branding** - Gather all specifications and metadata
3. **Validate Details** - Ensure logos exist, colors are correct, metadata is complete
4. **Submit Update** - Call the mutation with complete details
5. **Verify Success** - Confirm the update succeeded and job card progressed

### Managing Job Card Groups

When dealing with multiple related job cards:
- Always use the master job card number as the primary identifier
- Include all related job cards that need branding in a single update request
- Provide distinct branding for each job card if they require different treatments
- Track the status of each job card after update

## Related Operations

- **[Request Job Card Change](./request-change-jobcard.md)** - Request modifications to job cards in approval workflow
- **[Approve Job Card](./approve-jobcard.md)** - Approve job cards for manufacturing
- **[Dashboard - Job Cards](./dashboard-jobcards.md)** - Query job cards and check status
- **[Place Sales Order](./place-sales-order.md#branding-metadata)** - Reference for branding details and metadata

## Common Scenarios

### Scenario 1: Job Card Status is No Longer WAITING_INFO

**Problem**: You want to update branding but the job card is in a different status.

**Solution**:
- If status is `AWAITING_APPROVAL`, `AWAITING_LAYOUT`, or `AWAITING_PAYMENT`: Use `requestChangeJobCard` instead
- If status is beyond `AWAITING_PAYMENT`: Modifications may not be permitted; contact support
- Always check job card status before attempting updates

### Scenario 2: Multiple Job Cards, Different Branding

**Problem**: Related job cards need different branding designs.

**Solution**:
- Include all job cards in the `jobCards` array
- Provide distinct `BrandingDetailInput` for each job card
- Use the same `masterJobCardNumber` to keep them grouped
- Submit all in a single update request

### Scenario 3: Master Job Card Number Unknown

**Problem**: You have a job card number but aren't sure if it's the master.

**Solution**:
- Query the job card details using Dashboard - Job Cards
- Check the parent/group information to identify the master
- Use the master job card number in the update request
- If uncertain, use the job card number provided in your order confirmation

### Scenario 4: Update Fails with Status Error

**Problem**: ConflictException because job card isn't in correct status.

**Solution**:
1. Verify the current job card status via dashboard query
2. If status is not `WAITING_INFO`, follow the status-appropriate operation
3. If status is `WAITING_INFO` but error persists, check that:
   - Master job card number is correct
   - Job card numbers in array match actual job cards
   - No concurrent updates are occurring
4. Retry or contact support with job card number and current status
