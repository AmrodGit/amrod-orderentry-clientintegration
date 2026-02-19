# Order Entry - Documentation Index

Welcome to the Order Entry functional area documentation. This folder contains guides and references for managing sales orders, job cards, and related operations through the Amrod Order Entry API.

## Quick Navigation

### 📚 Start Here
- **[Order Entry Overview](./order-entry-overview.md)** - Complete functional area guide with all capabilities and workflows

### 🛒 Placing Orders
- **[Place Sales Order](./place-sales-order.md)** - Comprehensive guide to creating, validating, and placing sales orders
  - Full order placement workflow
  - **Validate-only mode** for testing pricing and lead times
  - Debugging order configurations
  - Pricing and lead time retrieval
  - Real-world examples and best practices

### 🔄 Order Management
- **[Request Job Card Change](./request-job-card-change.md)** - Modify existing orders and job cards
- **[Update Job Card Branding](./update-job-card-branding.md)** - Update branding information

### 📊 Dashboard & Reporting
- **[Dashboard - Sales Orders](./dashboard-sales-orders.md)** - Query and track sales orders
- **[Dashboard - Job Cards](./dashboard-job-cards.md)** - View job card status and details
- **[Dashboard - Credit Notes](./dashboard-credit-notes.md)** - Access credit note information
- **[Dashboard - Contacts](./dashboard-contacts.md)** - Manage customer contacts

## Key Features Highlight

### ✨ Validate-Only Option
The `placeOrder` mutation includes a powerful validate-only feature that allows you to:
- **Validate** order configurations without placing them
- **Debug** validation errors and business rules
- **Retrieve pricing** information for display to customers
- **Retrieve lead times** for delivery scheduling

See [Place Sales Order - Validate Only Mode](./place-sales-order.md#2-validate-only-mode) for detailed information.

## Common Tasks

| Task | Document |
|------|----------|
| Create a new sales order | [Place Sales Order](./place-sales-order.md) |
| Validate an order before placing | [Place Sales Order - Validate Only](./place-sales-order.md#example-1-validate-order-without-placement) |
| Get pricing for an order | [Place Sales Order - Pricing Retrieval](./place-sales-order.md#use-case-2-order-summary-before-payment) |
| Get lead times for delivery | [Place Sales Order - Lead Time](./place-sales-order.md#key-features) |
| Debug validation errors | [Place Sales Order - Error Handling](./place-sales-order.md#error-handling) |
| Track order status | [Dashboard - Sales Orders](./dashboard-sales-orders.md) |
| Request order changes | [Request Job Card Change](./request-job-card-change.md) |
| Update branding info | [Update Job Card Branding](./update-job-card-branding.md) |

## API Reference

### GraphQL Schema
- **Main Schema**: `{ENV_BASE_URI}/graphql/schema.graphql`

### Available Environments
| Environment | ENV_BASE_URI | Use Case |
|-------------|-----|----------|
| UAT | TBC | User Acceptance Testing |
| PROD | TBC | Production Use |

## Testing & Examples

### Bruno Collection
The `/samples/bruno/Order Entry/Sales Orders/` folder contains example requests for all Order Entry operations.

**To use Bruno examples**:
1. Import the collection from `/samples/bruno/`
2. Select your environment (Local, Dev, QA, UAT)
3. Run requests to test API functionality

## Related Documentation

- **[Logo Library](../logo-library/)** - Manage artworks and designs for orders
- **[Error Handling](../error-handling.md)** - Error codes and troubleshooting
- **[Authentication](../authentication.md)** - API authentication and security
- **[Support](../support.md)** - Getting help and support resources

## Global Concepts

### Validation Workflow
```
Order Configuration → Validate (validate-only) → Review Errors/Pricing → Place (validateOnly: false)
```

## Tips & Best Practices

✅ **Do**:
- Always validate orders before final submission
- Use validate-only mode to test configurations
- Check pricing and lead times before customer communication
- Implement proper error handling
- Cache validation results when appropriate

❌ **Don't**:
- Skip validation to save API calls
- Ignore error responses
- Hardcode pricing or lead times
- Assume all orders will validate without errors

## Need Help?

- Check [Error Handling](../error-handling.md) for common error codes
- Review [Authentication](../authentication.md) for API access issues
- Consult the [Support](../support.md) page for contact information
- Examine Bruno collection examples in `/samples/bruno/Order Entry/`

