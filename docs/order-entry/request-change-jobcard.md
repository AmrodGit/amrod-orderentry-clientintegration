# Requesting Job Card Changes

## Overview

The job card change request functionality allows you to request modifications to existing job cards within the Order Entry system. This is useful when you need to adjust branding details, repeat options, or other job card specifications after the job card has already been created. Changes can be requested for reasons such as customer requests or when initial instructions were not properly followed.

## Prerequisites

Before requesting a job card change, you must first retrieve the current job card details from the dashboard. For detailed information on how to retrieve job card information, including queries, filters, and examples, refer to the [Dashboard - Job Cards](./dashboard-jobcards.md) documentation.

The dashboard documentation covers:
- Querying job cards by job card number
- Querying job cards with various filters
- Querying job cards by ID
- Pagination and combined filters
- Complete field reference
- Common use cases and best practices

## Requesting a Job Card Change

Once you have identified the job card and gathered its current details, you can request a change using the `requestChangeJobCard` mutation.

### Important Constraint

**Only job cards linked to the specified `salesOrderNumber` can be included in the same change request.** If you need to request changes to job cards from different sales orders, you must submit separate requests for each sales order. This ensures proper order tracking, auditing, and consistency across the system.

### Mutation Definition

```graphql
mutation RequestChangeJobCard($input: RequestChangeJobCardInput!) {
  requestChangeJobCard(input: $input) {
    errors {
      message
    }
    resultPayloadType {
      status
    }
  }
}
```

### Input Parameters

The `RequestChangeJobCardInput` object contains the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `changeRequestType` | `JobCardChangeRequestType` | Yes | The reason for the change request. Allowed values: `CUSTOMER_REQUEST`, `INSTRUCTION_NOT_FOLLOWED` |
| `salesOrderNumber` | `String` | Yes | The sales order number associated with the job card. This uniquely identifies the order containing the job card(s) being changed. |
| `jobCards` | `[JobCardBrandingDetailInput!]` | Yes | An array of job card change details. Each element specifies which job card is being modified and what branding changes are requested. |

#### JobCardBrandingDetailInput

For each job card being changed, you must provide:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `jobCardNumber` | `String` | Yes | The job card number that is being changed. This must match an existing job card number. |
| `brandingDetail` | `BrandingDetailInput` | Yes | The complete branding specification for the change request. |

#### BrandingDetailInput

The `BrandingDetailInput` object contains all the branding specifications for the job card:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `brandingCode` | `String` | Yes | The branding method code (e.g., "DP-A", "LA", "PA"). This identifies the specific branding technique to be applied. |
| `position` | `String` | Yes | The branding position code according to the branding specification (e.g., "A", "B", "C", "D", "E", "F", "G"). |
| `logoPosition` | `OrderBrandingLogoPositionType` | Yes | The placement of the logo on the product. Allowed values: `TOP_LEFT`, `TOP_RIGHT`, `TOP_CENTER`, `MIDDLE_LEFT`, `MIDDLE_CENTER`, `MIDDLE_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_CENTER`, `BOTTOM_RIGHT` |
| `logos` | `[ID!]` | No | Array of logo IDs from the Logo Library to be used in the branding. Obtain these IDs by querying the Logo Library. |
| `logoSize` | `Float` | Yes | The size of the logo in millimeters. |
| `logoSizeType` | `OrderBrandingLogoSizeType` | Yes | Indicates whether the `logoSize` value represents the logo width or height. Allowed values: `WIDTH`, `HEIGHT` |
| `colors` | `[BrandingColorDetailInput!]` | No | Array of colors to be used in the branding. The number of colors must match the branding specification requirements. |
| `reference` | `String` | Yes | The reference identifier for the branding job. This can be used to track or reference the specific branding instance. |
| `specialInstructions` | `String` | No | Special instructions for the branding operation, such as specific requirements or notes. |
| `packingInstructions` | `String` | No | Packing instructions for how items should be packed or handled after branding (internal use only). |
| `metadata` | `[BrandingMetadataInput!]` | No | Additional metadata or attributes related to the branding. Example: foil color for foiling branding. |
| `repeat` | `BrandingRepeatDetailInput` | No | Details for repeat branding, including how the branding should be repeated across items. |

#### BrandingColorDetailInput

For each color in the branding specification:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `String` | Yes | The color code. Can be a hex code (#FFFFFF), Pantone code (e.g., "PMS 123"), Marathon code, or other format depending on the branding type. |
| `type` | `OrderBrandingColorType` | Yes | The type of color code provided. Allowed values: `NONE`, `HEX`, `PANTONE`, `MARATHON` |

#### BrandingMetadataInput

For additional metadata such as foil colors and other branding-specific configurations, refer to the [Branding Metadata](./branding-metadata.md) documentation for complete color options, DYE charge codes, and best practices.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | `String` | Yes | The identifier for the metadata entry (e.g., "foilColor", "siliconeColor"). |
| `value` | `String` | No | The value associated with the metadata key (e.g., a color code or specification). |

#### BrandingRepeatDetailInput

For repeat branding specifications:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `JobCardRepeatType` | Yes | The type of repeat branding. Allowed values: `NONE` (no repeat), `LOGO` (repeat logo only), `EXACT` (repeat exact branding) |
| `reference` | `String` | Yes | The reference identifier for the repeat branding, typically corresponding to a previous job instance. |

## Step-by-Step Guide

### Step 1: Retrieve Current Job Card Details

First, query the dashboard to get the current job card information. Refer to the [Dashboard - Job Cards](./dashboard-jobcards.md) documentation for detailed query examples and filtering options.

Example query:

```graphql
query GetCurrentJobCard {
  jobCardByJobCardNumber(jobCardNumber: "JOB-005678") {
    id
    jobCardNumber
    salesOrderNumber
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
  }
}
```

**Note:** Record the `salesOrderNumber` returned by this query - all job cards in your change request must belong to this same sales order.

### Step 2: Prepare the Change Request

Based on the current details, prepare the change request with the updated branding information. If the customer requested a change to the logo position and size, you would update those values:

```json
{
  "changeRequestType": "CUSTOMER_REQUEST",
  "salesOrderNumber": "SO-001234",
  "jobCards": [
    {
      "jobCardNumber": "JOB-005678",
      "brandingDetail": {
        "brandingCode": "DP-A",
        "position": "A",
        "logoPosition": "TOP_RIGHT",
        "logoSize": 25.5,
        "logoSizeType": "WIDTH",
        "logos": ["logo-id-12345"],
        "reference": "CHANGE-REF-001",
        "colors": [
          {
            "code": "#FF0000",
            "type": "HEX"
          }
        ],
        "specialInstructions": "Customer requested logo moved to top right corner"
      }
    }
  ]
}
```

### Step 3: Submit the Change Request

Execute the `requestChangeJobCard` mutation with your prepared input:

```graphql
mutation RequestJobCardChange($input: RequestChangeJobCardInput!) {
  requestChangeJobCard(input: $input) {
    errors {
      message
    }
    resultPayloadType {
      status
    }
  }
}
```

## Complete Examples

### Example 1: Simple Logo Position Change (Customer Request)

This example shows a customer requesting a change to the logo position from the current placement to top-right:

```graphql
mutation RequestLogoPositionChange {
  requestChangeJobCard(input: {
    changeRequestType: CUSTOMER_REQUEST
    salesOrderNumber: "SO-001234"
    jobCards: [
      {
        jobCardNumber: "JOB-005678"
        brandingDetail: {
          brandingCode: "DP-A"
          position: "A"
          logoPosition: TOP_RIGHT
          logoSize: 25.5
          logoSizeType: WIDTH
          logos: ["artwork-id-789"]
          reference: "CHG-20260219-001"
          colors: [
            {
              code: "#FF0000"
              type: HEX
            }
          ]
        }
      }
    ]
  }) {
    errors {
      message
    }
    resultPayloadType {
      status
    }
  }
}
```

### Example 2: Multiple Job Cards with Instruction Non-Compliance

When initial instructions were not followed, you can request changes for multiple job cards in a single operation:

```graphql
mutation RequestMultipleJobCardChanges {
  requestChangeJobCard(input: {
    changeRequestType: INSTRUCTION_NOT_FOLLOWED
    salesOrderNumber: "SO-005432"
    jobCards: [
      {
        jobCardNumber: "JOB-010001"
        brandingDetail: {
          brandingCode: "LA"
          position: "B"
          logoPosition: MIDDLE_CENTER
          logoSize: 30
          logoSizeType: HEIGHT
          logos: ["artwork-id-456"]
          reference: "CORRECT-001"
          colors: [
            {
              code: "#0000FF"
              type: HEX
            },
            {
              code: "PMS 286"
              type: PANTONE
            }
          ]
          specialInstructions: "Correct logo position per original specification"
        }
      },
      {
        jobCardNumber: "JOB-010002"
        brandingDetail: {
          brandingCode: "LA"
          position: "B"
          logoPosition: MIDDLE_CENTER
          logoSize: 30
          logoSizeType: HEIGHT
          logos: ["artwork-id-456"]
          reference: "CORRECT-001"
          colors: [
            {
              code: "#0000FF"
              type: HEX
            },
            {
              code: "PMS 286"
              type: PANTONE
            }
          ]
          specialInstructions: "Correct logo position per original specification"
        }
      }
    ]
  }) {
    errors {
      message
    }
    resultPayloadType {
      status
    }
  }
}
```

### Example 3: Change with Foil Color Metadata

For branding methods that support foiling (like embossing or foil stamping), you can include metadata:

```graphql
mutation RequestChangeWithFoilColor {
  requestChangeJobCard(input: {
    changeRequestType: CUSTOMER_REQUEST
    salesOrderNumber: "SO-009876"
    jobCards: [
      {
        jobCardNumber: "JOB-015555"
        brandingDetail: {
          brandingCode: "DP-B"
          position: "C"
          logoPosition: TOP_CENTER
          logoSize: 20
          logoSizeType: WIDTH
          logos: ["artwork-id-321"]
          reference: "FOIL-20260219"
          colors: [
            {
              code: "#FFFFFF"
              type: HEX
            }
          ]
          metadata: [
            {
              key: "foilColor"
              value: "GOLD"
            }
          ]
          specialInstructions: "Apply gold foil to logo area"
        }
      }
    ]
  }) {
    errors {
      message
    }
    resultPayloadType {
      status
    }
  }
}
```

### Example 4: Repeat Branding Request

When you need to repeat a previous branding specification:

```graphql
mutation RequestRepeatBranding {
  requestChangeJobCard(input: {
    changeRequestType: CUSTOMER_REQUEST
    salesOrderNumber: "SO-011111"
    jobCards: [
      {
        jobCardNumber: "JOB-020000"
        brandingDetail: {
          brandingCode: "PA"
          position: "E"
          logoPosition: BOTTOM_RIGHT
          logoSize: 15
          logoSizeType: HEIGHT
          logos: ["artwork-id-111"]
          reference: "REPEAT-PREV-JOB"
          repeat: {
            type: EXACT
            reference: "JOB-019999"
          }
          specialInstructions: "Repeat exact branding from previous job card"
        }
      }
    ]
  }) {
    errors {
      message
    }
    resultPayloadType {
      status
    }
  }
}
```

## Error Handling

The `requestChangeJobCard` mutation can return errors in the following scenarios:

### Conflict Exception

A conflict error occurs when:
- The job card number does not exist in the system
- The job card is in a status that does not allow changes
- The sales order number is invalid or does not match the job card

**Error Response:**
```json
{
  "data": {
    "requestChangeJobCard": {
      "errors": [
        {
          "message": "The job card 'JOB-999999' does not exist or is not eligible for changes."
        }
      ],
      "resultPayloadType": null
    }
  }
}
```

### Validation Errors

Errors may also occur due to invalid input data:
- Missing required fields (brandingCode, position, logoSize, logoSizeType, logoPosition)
- Invalid enum values (e.g., invalid branding code or logo position)
- Color array size not matching branding specification

**Error Response:**
```json
{
  "data": {
    "requestChangeJobCard": {
      "errors": [
        {
          "message": "Invalid branding code 'INVALID-CODE'. Please use a valid code from the branding specification."
        }
      ],
      "resultPayloadType": null
    }
  }
}
```

## When to Use: Update vs. Request Change

Use this decision tree to determine which operation to use:

```
Is the job card in AWAITING_INFO status?
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
- **AWAITING_INFO**: Use `updateJobCardBrandingInfo`
- **AWAITING_APPROVAL, AWAITING_LAYOUT, AWAITING_PAYMENT**: Use `requestChangeJobCard`
- **Other statuses**: Modifications may not be allowed

## Best Practices

### 1. Always Verify Current Details First

Before submitting a change request, query the current job card details to understand what is being changed and why. This helps prevent unnecessary change requests and ensures accuracy.

```graphql
query VerifyJobCard($jobCardNumber: String!) {
  jobCardByJobCardNumber(jobCardNumber: $jobCardNumber) {
    jobCardNumber
    salesOrderNumber
    jobCardBrandingDetail {
      brandingCode
      brandingPosition
      logoPosition
      logoSize
      logoSizeType
    }
  }
}
```

### 2. Include Clear Reference IDs

Use meaningful reference identifiers in the `reference` field to track change requests. This helps with auditing and troubleshooting:

```
"reference": "CHG-20260219-LOGO-MOVE"  // Instead of just a generic ID
```

### 3. Provide Special Instructions

When the reason for the change is not self-evident, add special instructions to explain the context:

```json
{
  "specialInstructions": "Customer requested logo repositioned to top-right per revised brand guidelines. Original placement was top-left."
}
```

### 4. Use Correct Branding Codes

Ensure you're using valid branding codes from your system's specification. Common codes include:

- **Decoration Methods**: DP-A, DP-B, LA, LB, LC, LG, PA, PB, PC, SA, SB, SC, SP
- **Special Methods**: SUB-A through SUB-E, CMT-BNM

### 5. Match Logo Position to Specification

Ensure the selected `logoPosition` is valid for the chosen `brandingCode`. Some branding methods may have restrictions on where logos can be placed.

### 6. Document Color Specifications

When including colors, be specific about the color format:

```json
{
  "code": "#FF0000",
  "type": "HEX"
},
{
  "code": "PMS 286",
  "type": "PANTONE"
}
```

### 7. Handle Multiple Job Cards Efficiently

When requesting changes for multiple job cards in the same sales order, batch them in a single request rather than making multiple API calls. This improves performance and maintains consistency.

### 8. Monitor Job Card Status

Job cards in certain statuses may not accept change requests. Common statuses that may prevent changes:
- COMPLETED
- CANCELLED
- ON_HOLD (depending on business rules)

Always check the current status before attempting to request a change.

### 9. Use Appropriate Change Request Type

Select the correct `changeRequestType` to provide context:

- **CUSTOMER_REQUEST**: Changes requested directly by the customer based on their needs
- **INSTRUCTION_NOT_FOLLOWED**: Changes needed to correct a mistake or non-compliance with original instructions

This helps with tracking and auditing change requests.

### 10. Test in Development Environment

Before deploying change request logic to production, thoroughly test in the Dev or QA environment:

```
Dev: https://moyo-dgw.dev.amrod.co.za/graphql
QA: https://moyo-dgw.qa.amrod.co.za/graphql
UAT: https://moyo-dgw.uat.amrod.co.za/graphql
Production: [Your production endpoint]
```

## Common Use Cases

### Use Case 1: Customer Requests Logo Repositioning

A customer wants the logo moved from the original position to a different location on the product.

**Workflow:**
1. Query the current job card to see the existing logo position
2. Identify the new desired position from the customer
3. Submit a change request with `CUSTOMER_REQUEST` type
4. Include special instructions noting the customer's request

### Use Case 2: Correct Logo Size Error

During initial order entry, an incorrect logo size was used. You need to correct this.

**Workflow:**
1. Retrieve the job card details including current logo size
2. Calculate the correct size based on product specifications
3. Submit a change request with `INSTRUCTION_NOT_FOLLOWED` type
4. Include special instructions explaining the correction

### Use Case 3: Update Foil Color for Embossed Logo

The foil color for an embossed branding method needs to be changed.

**Workflow:**
1. Query the current job card
2. Prepare the metadata with the new foil color
3. Submit a change request with the updated color metadata
4. Include special instructions about the foil color change

### Use Case 4: Batch Update Multiple Job Cards

Multiple job cards in the same order need the same branding adjustment.

**Workflow:**
1. Query all job cards
 in the sales order
2. Filter those that need changes
3. Prepare all changes in a single request array
4. Submit one change request with all affected job cards

## Related Queries and Mutations

### Dashboard Job Card Queries

For comprehensive documentation on retrieving and querying job card data, refer to [Dashboard - Job Cards](./dashboard-jobcards.md), which includes:
- Query job cards by job card number
- Query job cards with various filters (status, sales order, branding code, etc.)
- Query job cards by ID
- Pagination and combined filters
- Complete field reference
- Common use cases and best practices

### Related Mutations

Other mutations available for job card management:
- `updateJobCardBrandingInfo` - Update job card branding information (alternative approach)
- `approveJobCard` - Approve a job card after changes have been made
- `requestChangeJobCard` - Request changes (this mutation)

## Support and Troubleshooting

If you encounter issues when requesting job card changes:

1. **Verify the job card exists**: Use the `jobCardByJobCardNumber` query to confirm the job card is in the system
2. **Check job card status**: Ensure the job card is in a status that allows modifications
3. **Validate branding codes**: Confirm the branding code exists in your system's specification
4. **Review error messages**: Read the error message returned by the API for specific guidance
5. **Contact support**: If issues persist, refer to the [support documentation](../support.md)

For more information about managing job cards, see the [Order Entry Overview](./order-entry-overview.md) and [Dashboard Sales Orders](./dashboard-sales-orders.md) documentation.
