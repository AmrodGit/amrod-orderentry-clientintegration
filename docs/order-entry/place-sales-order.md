# Place Sales Order

## Overview

The Place Sales Order functionality allows you to create and submit sales orders through the GraphQL API. This includes the ability to validate orders before placing them, retrieve pricing and lead time information, or debug order configurations without actually committing the order to the system.

## Mutation: placeOrder

The `placeOrder` mutation is the primary method for creating and placing sales orders. This mutation supports a flexible validation workflow that enables multiple use cases beyond simply placing an order.

### Endpoint
- **Mutation**: `placeOrder`
- **Input Type**: `PlaceOrderInput`
- **Return Type**: `PlaceOrderPayload` (contains `errors` and `placeOrderPayloadType`)

## Key Features

### 1. Full Order Placement
Submit a complete sales order to the system with all necessary order details, customer information, and delivery specifications.

### 2. Validate Only Mode
The mutation supports a validate-only option that allows you to:

- **Validate Order Configuration**: Check if your order data is structurally valid and meets all business requirements without creating an order in the system
- **Debug Order Issues**: Identify validation errors and business rule violations before attempting to place the actual order
- **Retrieve Pricing & Lead Times**: Get calculated pricing and lead time information for the order without committing to placement

This is particularly useful for:
- Testing order configurations before final submission
- Building UIs that display real-time pricing and availability
- Validating customer data and order items before user submission
- Retrieving lead time estimates for customer communication

## Required Fields

When placing a sales order, ensure you provide the following required information:

### Order Identification
- **Order Number**: Unique identifier for your order request (used to match requests to responses).

**NOTE:** The order number must be unique across the account for all orders placed via the API, website, or any other channels.

### Collection Information
- **Collection Type**: How the order will be collected (COURIER, COLLECTION_HEAD_OFFICE, or BRANCH_DELIVERY_COLLECTION)
- **Branch Code** (optional): Branch code if using branch delivery or collection

### Contact Information
- **Order Contact**: Primary contact for the order with:
  - First Name
  - Last Name
  - Email
  - Contact Number (optional)
- **Branding Contact** (optional): Separate contact for branding-related communications with same details

### Order Details
- **Order Groups**: At least one order group with:
  - Group ID: Unique identifier to match request to response
  - Items: At least one item with:
    - SKU: Product identifier
    - Quantity: Number of units (must be > 0)
    - Price (optional): Unit price (used to generate pricing warnings if it differs from expected price)
  - Branding (optional): Branding details for the items

### Processing Options
- **Order Type**: Type of order being placed (STANDARD, DELIVERY, or LOGO24)
- **Validate Only**: Whether to validate without placing (true/false)
- **Apply Inclusive Branding** (optional): Whether to apply inclusive branding

## Understanding Order Groups

Order groups are a fundamental concept in the order placement system. They serve critical purposes in how orders are created, how branding is applied, and how multiple orders are generated from a single request.

### What are Order Groups?

An order group is a collection of product items with optional branding specifications. Each order group in your request has:
- **Group ID**: A unique identifier within your request (e.g., "group-1", "group-2")
- **Items**: Product variants with SKU and quantity
- **Branding** (optional): Branding specifications to be applied to items in the group

### Critical Concept: How Branding Affects Order Generation

The presence of branding in a group is the key factor that determines how orders are generated and split. Without branding, grouping has minimal effect.

#### Scenario 1: No Branding in Groups (Grouping Has No Effect)

When **no branding is specified**, grouping variants from different product styles in a single group **has no effect** on the number of orders generated.

```
Input Request: ORD-2026-NO-BRAND
├── Group: "items"
│   ├── BAS-3000-G-Y (Style: BASIC_BAG, 100 units)
│   ├── BAS-3000-G-BK (Style: BASIC_BAG, 100 units)
│   ├── PEN-701-BU (Style: PEN_CLASSIC, 200 units)
│   └── PEN-701-RD (Style: PEN_CLASSIC, 200 units)
│   └── Branding: NONE

Result: 1 Order Created
├── Order 1: SO-2026-001234 (BASIC_BAG style)
│   └── Items: BAS-3000-G-Y (100) + BAS-3000-G-BK (100) = 250 units
│   └── Items: PEN-701-BU (200) + PEN-701-RD (200) = 400 units
│   └── No branding

Note: Grouping in "items" has no effect. All items are combined into a single order regardless of style because no branding is specified.
```

**Key Point**: Without branding, the group ID is essentially meaningless for order creation.

#### Scenario 2: Branding Applied to Mixed Styles in Single Group (Group Splits by Style + Unbranded Order)

When **branding is specified in a group containing items from different product styles**, the system:
1. Creates a **separate order for each unique product style** found in the group
2. Applies the branding to the last style-specific order
3. Creates an **additional unbranded order** containing items that could not receive the branding

This is a key concept: specifying branding on a mixed-style group causes the group to split, and an unbranded order is generated.

```
Input Request: ORD-2026-MIXED-BRAND
├── Group: "mixed-items"
│   ├── BAS-3000-G-Y (Style: BASIC_BAG, 100 units)
│   ├── BAS-3000-G-BK (Style: BASIC_BAG, 50 units)
│   ├── PEN-701-BU (Style: PEN_CLASSIC, 200 units)
│   └── Branding: DP-A with company logo

Result: 2 Orders Created (GROUP SPLITS BY STYLE + UNBRANDED)
├── Order 1: SO-2026-001234 (BASIC_BAG style - UNBRANDED order)
│   ├── Items: BAS-3000-G-Y (100) + BAS-3000-G-BK (50) = 150 units
│   ├── From Group: "mixed-items"
│   └── No Branding
├── Order 2: SO-2026-001235 (PEN_CLASSIC style - WITH branding)
│   ├── Items: PEN-701-BU (200) = 200 units
│   ├── From Group: "mixed-items"
│   └── Branding: DP-A with company logo ✓
```

**Why This Happens**: The system attempts to apply a single branding specification to multiple product styles. Since branding may be style-specific or have different setup requirements, it creates separate orders per style. The unbranded order is generated to ensure all items are accounted for and allows for proper handling of items that couldn't receive the intended branding.

#### Scenario 3: Multiple Groups with Mixed Branding (Organized by Group and Branding Status)

When **multiple groups are submitted where some have branding and others don't**, the system creates multiple orders organized by:
- **Groups with branding**: Each becomes a separate order(s), potentially splitting by style as described in Scenario 2
- **Groups without branding**: Combined by product style across all non-branding groups

```
Input Request: ORD-2026-COMPLEX
├── Group: "branded-bags"
│   ├── BAS-3000-G-Y (Style: BASIC_BAG, 100 units)
│   ├── BAS-3000-G-BK (Style: BASIC_BAG, 50 units)
│   └── Branding: DP-A (Digital Print)
├── Group: "branded-pens"
│   ├── PEN-701-BU (Style: PEN_CLASSIC, 200 units)
│   ├── PEN-701-RD (Style: PEN_CLASSIC, 100 units)
│   └── Branding: LA (Logo Application)
└── Group: "unbranded-misc"
    ├── BAG-612-BU (Style: TOTE_BAG, 75 units)
    └── Branding: NONE

Result: 2 Orders Created
├── Order 1: SO-2026-001234 (BASIC_BAG - Branded)
│   ├── Items: BAS-3000-G-Y (100) + BAS-3000-G-BK (50) = 150 units
│   ├── From Group: "branded-bags"
│   └── Branding: DP-A ✓
│   ├── Items: PEN-701-BU (200) + PEN-701-RD (100) = 300 units
│   ├── From Group: "branded-pens"
│   └── Branding: LA ✓
└── Order 2: SO-2026-001235 (TOTE_BAG - Unbranded)
    ├── Items: BAG-612-BU (75) = 75 units
    ├── From Group: "unbranded-misc"
    └── Branding: NONE

Key: Orders are organized by input groups and their branding status.
```

### Grouping Strategies

#### Strategy 1: Single Group, No Branding (Simplest)

Use a single group without branding when you want all items processed together.

```
├── Group: "all-items"
│   ├── Multiple SKUs from different styles
│   └── No branding
Result: Single Order
```

#### Strategy 2: Separate Groups by Branding Design

When different items need different branding, use separate groups with distinct branding specifications.

```
├── Group: "branded-bags"
│   ├── BASIC_BAG variants
│   └── Branding: Design A
├── Group: "branded-pens"
│   ├── PEN_CLASSIC variants
│   └── Branding: Design B
└── Group: "unbranded-items"
    ├── Other products
    └── No branding
Result: A Single order for all branding designs + a second order for unbranded items
```

#### Strategy 3: Mixed Styles with Shared Branding (Invalid and can cause unexpected order splitting)


```
├── Group: "company-branded"
│   ├── BASIC_BAG (Style A)
│   ├── PEN_CLASSIC (Style B)
│   └── TOTE_BAG (Style C)
│   └── Branding: Company logo standard
Result: 2 separate orders. One for BASIC_BAG and PEN_CLASSIC as an unbranded order. TOTE_BAG is included in the second branded order.
```

### Matching Input Groups to Output Orders

The group ID and item details are used to correlate input requests to generated orders:

1. **Review the group ID** in the input to understand what items were included
2. **Check the item SKUs** in the response to see which items were processed
3. **Correlate by style** to match branded vs. unbranded orders
4. **Track multiple sales order numbers** if a single input group resulted in multiple output orders

**Important**: When a single input group generates multiple orders (mixing styles with branding), multiple sales order numbers will be returned. Use the item SKUs in each order to correlate back to your input group.

### Best Practices for Order Groups

#### ✅ Do:
- Design groups based on how items should be branded
- Use separate groups when items need different branding
- Test complex multi-group scenarios in validate-only mode first
- Understand that branding presence determines order splitting
- Track the correlation between input groups and output sales orders
- Use descriptive group IDs for your internal tracking

#### ❌ Don't:
- Expect grouping to prevent style-based order splitting without understanding branding impact
- Mix items from different styles in a single group unless you intend for them to split
- Assume a single group = single order (it depends on the branding and styles present)
- Ignore that specifying branding on mixed styles will create multiple orders plus an unbranded order
- Forget to test multi-order scenarios in validate-only mode before placing
- Miss the correlation between returned sales order numbers and your input groups

## Branding Metadata

For comprehensive information about branding metadata including foiling, debossing, silicone, and vinyl options, color selections, and DYE charge codes, refer to the [Branding Metadata](./branding-metadata.md) documentation.

## Usage Examples

### Example 1: Validate Order Without Placement

Validate an order configuration to check pricing and retrieve lead times:

```graphql
mutation {
  placeOrder(input: {
    orderNumber: "ORD-2026-VAL-0001"
    options: {
      validateOnly: true
      orderType: STANDARD
    }
    collection: {
      collectionType: COLLECTION_HEAD_OFFICE
    }
    contact: {
      notifications: {
        order: {
          firstName: "John"
          lastName: "Doe"
          email: "john.doe@example.com"
          contactNumber: "+27-21-987-6543"
        }
      }
    }
    details: [
      {
        id: "group-1"
        items: [
          {
            sku: "BAS-3000-G-Y"
            quantity: 200
            price: 35.50
          }
        ]
      }
    ]
  }) {
    errors {
      ... on InputValidationException {
        message
        fields {
          fieldName
          message
        }
      }
      ... on BadRequestException {
        message
      }
    }
    placeOrderPayloadType {
      orders {
        orderNumber
        salesOrderNumber
        totalExcl
        leadTimeInDays
        details {
          sku
          quantity
          unitPrice
        }
      }
      warnings {
        code
        message
        warningType
      }
    }
  }
}
```

**Use Case**: Before showing the customer final pricing, validate the order and display calculated costs and delivery dates.

### Example 2: Validate and Debug

Check for validation errors and business rule violations:

```graphql
mutation {
  placeOrder(input: {
    orderNumber: "ORD-2026-DEBUG-0001"
    options: {
      validateOnly: true
      orderType: STANDARD
    }
    collection: {
      collectionType: COLLECTION_HEAD_OFFICE
    }
    contact: {
      notifications: {
        order: {
          firstName: "John"
          lastName: "Doe"
          email: "john.doe@example.com"
        }
      }
    }
    details: [
      {
        id: "group-1"
        items: [
          {
            sku: "INVALID-SKU"
            quantity: 0
          }
        ]
      }
    ]
  }) {
    errors {
      ... on InputValidationException {
        message
        fields {
          fieldName
          message
        }
      }
      ... on BadRequestException {
        message
        statusCode
      }
    }
  }
}
```

**Use Case**: Identify configuration issues and business rule violations during development and testing. Response will include detailed error information for each validation failure.

### Example 3: Place Actual Order with Branding

Submit a complete order to the system with branding details:

```graphql
mutation {
  placeOrder(input: {
    orderNumber: "ORD-2026-BRAND-0123"
    options: {
      validateOnly: false
      orderType: STANDARD
      applyInclusiveBranding: true
    }
    collection: {
      collectionType: COLLECTION_HEAD_OFFICE
    }
    contact: {
      notifications: {
        order: {
          firstName: "John"
          lastName: "Doe"
          email: "john.doe@example.com"
          contactNumber: "+27-21-987-6543"
        }
        branding: {
          firstName: "John"
          lastName: "Doe"
          email: "john.doe@example.com"
        }
      }
    }
    details: [
      {
        id: "group-1"
        items: [
          {
            sku: "PEN-701-BU"
            quantity: 250
            price: 12.75
          }
        ]
        branding: [
          {
            brandingCode: "LA"
            reference: "JOB-2026-0001"
            position: "A"
            logoPosition: TOP_CENTER
            logos: ["logo-id-1"]
            logoSize: 20.0
            logoSizeType: WIDTH
            colors: [
              {
                colorType: FOIL
                colorCode: "#FFD700"
              }
            ]
          }
        ]
      }
    ]
  }) {
    errors {
      ... on InputValidationException {
        message
      }
      ... on ConflictException {
        message
      }
    }
    placeOrderPayloadType {
      orders {
        orderNumber
        salesOrderNumber
        orderDate
        totalExcl
        leadTimeInDays
        details {
          sku
          quantity
          unitPrice
        }
      }
      warnings {
        code
        message
        warningType
      }
    }
  }
}
```

**Use Case**: After validation, submit the final order with `validateOnly: false` to create the order in the system. The response includes the order ID and confirmation details.

### Example 4: Place Order with Branch Delivery Collection

Submit an order using branch delivery collection with a specific branch code:

```graphql
mutation {
  placeOrder(input: {
    orderNumber: "ORD-2026-BRANCH-0456"
    options: {
      validateOnly: false
      orderType: STANDARD
    }
    collection: {
      collectionType: BRANCH_DELIVERY_COLLECTION
      branchCode: "CPT"
    }
    contact: {
      notifications: {
        order: {
          firstName: "John"
          lastName: "Doe"
          email: "john.doe@example.com"
          contactNumber: "+27-21-987-6543"
        }
      }
    }
    details: [
      {
        id: "group-1"
        items: [
          {
            sku: "BAG-612-BU"
            quantity: 150
            price: 45.25
          },
          {
            sku: "GF-AM-1000-BU-0"
            quantity: 100
            price: 28.50
          }
        ]
        branding: [
          {
            brandingCode: "PA"
            reference: "JOB-2026-0456"
            position: "B"
            logoPosition: MIDDLE_CENTER
            logos: ["logo-id-2"]
            logoSize: 30.0
            logoSizeType: HEIGHT
            metadata: [
              {
                key: "finish_type"
                value: "matte"
              }
            ]
          }
        ]
      }
    ]
  }) {
    errors {
      ... on InputValidationException {
        message
      }
    }
    placeOrderPayloadType {
      orders {
        orderNumber
        salesOrderNumber
        orderDate
        totalExcl
        leadTimeInDays
        details {
          sku
          quantity
          unitPrice
          name
        }
      }
      warnings {
        code
        message
        warningType
      }
    }
  }
}
```

**Use Case**: When using branch delivery collection, the order is collected from the specified branch office (JHB, DBN, CPT, PLA, or BFN) rather than via courier delivery. This is useful for local orders where customers prefer to collect from a nearby branch.

## Response Structure

### Success Response

When an order is successfully validated or placed, the response includes:

```json
{
  "placeOrderPayloadType": {
    "orders": [
      {
        "orderNumber": "ORD-2026-001234",
        "salesOrderNumber": "SO-2026-005678",
        "orderDate": "2026-02-18",
        "totalExcl": 5000.00,
        "leadTimeInDays": 7,
        "details": [
          {
            "sku": "PROD-789",
            "quantity": 100,
            "unitPrice": 50.00,
            "name": "Product Name"
          }
        ]
      }
    ],
    "warnings": [
      {
        "code": "PRICING_DISCREPANCY",
        "message": "Supplied price differs from calculated price",
        "warningType": "PRICE_VARIANCE"
      }
    ]
  }
}
```

### Error Response

When validation fails or errors occur:

```json
{
  "errors": [
    {
      "message": "Validation failed",
      "fields": [
        {
          "fieldName": "details[0].items[0].sku",
          "message": "SKU not found in system"
        },
        {
          "fieldName": "contact.notifications.order.email",
          "message": "Email format is invalid"
        }
      ]
    }
  ]
}
```

## Best Practices

### 1. Always Validate Before Final Submission
```
Validation Workflow:
1. Collect order data from customer/user
2. Call placeOrder with validateOnly: true
3. Check response.success and review response.errors
4. Display pricing and lead times to customer
5. If customer confirms, call placeOrder with validateOnly: false
```

### 2. Use Validate-Only for Real-Time Pricing
When building interactive order forms, use validate-only requests to:
- Update pricing as users modify quantities
- Show lead time changes based on delivery preferences
- Validate customer data in real-time

### 3. Handle Validation Errors Gracefully
Always check the `success` field and `errors` array to:
- Identify which fields have issues
- Display user-friendly error messages
- Provide suggestions for correction

### 4. Cache Pricing Information
For high-traffic applications, consider caching:
- Pricing results for the same order configuration
- Lead time estimates based on product and delivery location
- Validation rules to reduce API calls

### 5. Implement Retry Logic
For validate-only requests during debugging:
- Back off exponentially on repeated validation failures
- Log validation errors for analysis
- Alert support teams to persistent validation issues

## Validation Rules

The `placeOrder` mutation enforces the following validation rules:

| Rule | Requirement | Error Type |
|------|-------------|-----------|
| Order Number | Must be provided and unique | `InputValidationException` |
| Collection Type | Must be valid enum value | `InputValidationException` |
| Order Type | Must be STANDARD, DELIVERY, or LOGO24 | `InputValidationException` |
| Contact Email | Valid email format required | `InputValidationException` |
| Contact Names | First and last name required | `InputValidationException` |
| Item SKU | Must be valid and active product | `BadRequestException` |
| Quantity | Must be greater than 0 | `InputValidationException` |
| Order Group Items | At least one item per group required | `InputValidationException` |
| Order Groups | At least one group required | `InputValidationException` |
| Branding Code | If branding provided, code required | `InputValidationException` |
| Logo Position | Must be valid enum value | `InputValidationException` |
| Duplicate Order | Order number must be unique | `ConflictException` |
| System Error | Any unrecoverable system error | `ServerError` |

## Common Use Cases

### Use Case 1: Interactive Order Form
As a user fills out an order form, validate field by field and display real-time pricing:
1. User selects product and quantity
2. API validates and returns pricing
3. User changes delivery date
4. API recalculates lead time
5. User submits order with final confirmation

### Use Case 2: Order Summary Before Payment
Before processing payment:
1. Validate complete order configuration
2. Display final pricing and delivery information
3. Allow customer to review for 30 seconds
4. Place order upon confirmation

### Use Case 3: Integration Testing
When building integrations:
1. Use validate-only mode to test order structures
2. Verify pricing calculations are correct
3. Confirm lead time calculations match business rules
4. No test orders created in production

### Use Case 4: API Debugging
When troubleshooting order submission issues:
1. Enable detailed error reporting with validate-only
2. Test individual field configurations
3. Identify which validation rules are failing
4. Refine order data based on error responses

## Error Handling

For detailed information on error codes and handling strategies, refer to [error-handling.md](../error-handling.md).

The `placeOrder` mutation can return the following error types:

### InputValidationException
Occurs when input data fails validation rules:
- **Field Validation**: Individual fields have validation errors
- **Format Validation**: Data format doesn't match expected pattern
- **Required Fields**: Required fields are missing
- **Enum Validation**: Invalid enum value provided

Handle by checking the `fields` array for specific field errors and displaying appropriate error messages to users.

### BadRequestException
Occurs when the request contains invalid data or references:
- **Invalid SKU**: Referenced product/SKU doesn't exist or is inactive
- **Invalid Branding Code**: Branding code not found or invalid
- **Business Rule Violation**: Order violates a business rule
- **Configuration Error**: Order configuration is invalid

Handle by reviewing the order configuration and ensuring all referenced entities exist and are active.

### ConflictException
Occurs when there's a conflict preventing the operation:
- **Duplicate Order Number**: An order with this number already exists
- **Concurrent Modification**: Order was modified by another request
- **State Conflict**: Order is in invalid state for requested operation

Handle by retrying with a new order number or checking system state.

### ServerError
Occurs when an unrecoverable system error happens:
- **Database Error**: Database operation failed
- **System Error**: Internal system error
- **External Service Error**: Integration with external service failed

Handle by logging the error details and retrying after a delay.

## Authentication

All `placeOrder` mutations require valid authentication. For details on authentication and security, refer to [authentication.md](../authentication.md).

## Related Documentation

- [Order Entry Overview](./order-entry-overview.md) - High-level order entry concepts
- [Request Job Card Change](./request-change-jobcard.md) - Modify existing orders
- [Dashboard - Sales Orders](./dashboard-sales-orders.md) - Retrieve order status
- [Error Handling](../error-handling.md) - Error codes and debugging
- [Authentication](../authentication.md) - Security and API access

## API Schema Reference

For the complete GraphQL schema definition, refer to:
- **Schema File**: `{ENV_BASE_URI}/graphql/schema.graphql`

## Examples and Testing

Bruno collection examples for testing the `placeOrder` mutation:
- Location: `/samples/bruno/Order Entry/Sales Orders/`
- Environments available: `UAT`, `PROD`

For testing guidance and sample payloads, refer to the Bruno collection documentation.
