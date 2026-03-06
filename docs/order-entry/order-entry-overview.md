# Order Entry - Functional Area Overview

## Introduction

The Order Entry functional area provides a comprehensive set of GraphQL mutation and query operations for managing sales orders and job cards. This includes placing new orders, requesting modifications to existing job cards, updating branding information, and accessing dashboard data for orders and job cards.

## Key Capabilities

### 📋 Place Sales Orders
Create and manage sales orders with flexible validation options. Validate order configurations before placement, retrieve pricing information, and obtain lead time estimates.

**Related Documentation**: [Place Sales Order](./place-sales-order.md)

**Key Features**:
- Full order placement workflow
- Validate-only mode for testing and debugging
- Real-time pricing calculation
- Lead time estimation
- Comprehensive validation rules

### 🔄 Request Job Card Changes
Request modifications to existing job cards, including changes to specifications and associated assets.

**Related Documentation**: [Request Job Card Change](./request-change-jobcard.md)

**Key Features**:
- Request job card modifications
- Update specifications
- Manage job card assets
- Track change requests

### 🎨 Update Job Card Branding Information
Modify branding details associated with job cards, including logos and brand specifications.

**Related Documentation**: [Update Job Card Branding](./update-jobcard-branding.md)

**Key Features**:
- Update brand logos
- Modify brand specifications
- Manage color profiles and guidelines
- Update design requirements

### 📊 Dashboard
Retrieve comprehensive information about sales orders, job cards, credit notes, and customer contacts.

**Related Documentation**:
- [Dashboard - Sales Orders](./dashboard-sales-orders.md)
- [Dashboard - Job Cards](./dashboard-jobcards.md)
- [Dashboard - Credit Notes](./dashboard-credit-notes.md)

**Key Features**:
- Query sales order status
- Review job card details
- Access credit note information
- Retrieve customer contact data

## Common Workflows

### 1. New Order Placement
```
1. Collect customer and order item information
2. Validate order with placeOrder (validateOnly: true)
3. Review pricing and lead times
4. Place order with placeOrder (validateOnly: false)
5. Retrieve order reference and confirmation
6. Query dashboard for order status
```

### 2. Order Modification
```
1. Retrieve order details from dashboard
2. Identify items requiring changes
3. Request job card changes via requestChangeJobCard
4. Track change request status
5. Update job card branding if needed
```

### 3. Order Tracking
```
1. Query salesOrders to list all orders
2. Use salesOrder query for specific order details
3. Query jobCards to see production details
4. Monitor job card status updates
5. Retrieve customer contacts for communication
```

## Getting Started

### Step 1: Authentication
Ensure you have valid API credentials and authentication tokens. See [Authentication Guide](../authentication.md) for details.

### Step 2: Choose Your Use Case
- **Placing an Order**: Start with [Place Sales Order](./place-sales-order.md)
- **Modifying an Order**: See [Request Job Card Change](./request-change-jobcard.md)
- **Tracking Orders**: Review [Dashboard - Sales Orders](./dashboard-sales-orders.md)

### Step 3: Use the API Schema
Reference the complete GraphQL schema:
- **Main Schema**: `{ENV_BASE_URI}/graphql/schema.graphql`

### Step 4: Test with Bruno
Use the provided Bruno collection for testing:
- **Location**: `/samples/bruno/Order Entry/Sales Orders/`
- **Available Environments**: Local, Dev, QA, UAT

## Key Concepts

### Job Cards
Each sales order is broken down into one or more job cards representing manufacturing tasks. Job cards track:
- Production status
- Associated assets and branding
- Timeline and deadlines
- Quality control notes

### Pricing and Lead Times
- **Pricing**: Calculated based on products, quantities, and customer agreements
- **Lead Times**: Estimated days from order placement to delivery
- **Validation-Only Mode**: Retrieve pricing and lead times without placing the order

### Order Types
- **Blank Orders**: Regular sales orders with typical processing times
- **Branded Orders**: Orders requiring custom branding and artwork, which may have longer lead times
- **Logo24 Orders**: 24-hour turnaround orders for urgent needs, subject to specific conditions and availability

### Collection Types
- **Branch Delivery**: Standard delivery to a specified branch
- **Collection from Head Office**: Customer collects from head office (Woodmead facility)
- **Courier Delivery**: Delivery via third-party courier service (NOTE: Not currently supported in MVP)

## Requesting Changes & Approvals
- **Requesting Changes**: Use `requestChangeJobCard` mutation to request modifications to job cards. This can include changes to specifications, assets, or branding information.
- **Approvals**: Use `approveJobCard` mutation to approve job cards and proceed with production.

## Best Practices

1. **Always Validate Before Placing**: Use validate-only mode to identify issues early
2. **Handle Errors Gracefully**: Implement proper error handling for validation failures
3. **Cache When Appropriate**: Cache pricing for the same configurations
4. **Monitor Lead Times**: Communicate realistic delivery dates based on lead time estimates
5. **Track Changes**: Use change request functionality for order modifications
6. **Regular Status Checks**: Query dashboard regularly to stay informed of order status

## Troubleshooting & Support

### Common Issues
- **Order Validation Failures**: See [Error Handling](../error-handling.md) for troubleshooting guides
- **Authentication Errors**: Review [Authentication Guide](../authentication.md)
- **Unexpected Pricing**: Verify all required fields are present and correctly formatted

### Getting Help
For support and additional resources, refer to [Support](../support.md).

## Mutation Summary

| Mutation | Purpose |
|----------|---------|
| `placeOrder` | Create and validate sales orders |
| `requestChangeJobCard` | Request modifications to job cards |
| `updateJobCardBrandingInfo` | Update branding details |
| `approveJobCard` | Approve a jobcard to proceed with production |

## Query Summary

| Query | Purpose |
|-------|---------|
| `salesOrders` | List all sales orders with filtering |
| `salesOrder` | Retrieve details for a specific order |
| `jobCards` | List all job cards with filtering |
| `jobCard` | Retrieve details for a specific job card |
| `jobCardAssets` | Get assets associated with a job card |
| `creditNotes` | List credit notes |
| `creditNote` | Retrieve specific credit note |


## Related Functional Areas

- [Logo Library](../logo-library/logo-library.md) - Manage artworks and designs for orders

