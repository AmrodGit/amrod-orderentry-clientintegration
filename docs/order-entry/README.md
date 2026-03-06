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
- **[Approve Job Card](./approve-jobcard.md)** - Approve job cards and select proof layouts for manufacturing
- **[Update Job Card Branding](./update-jobcard-branding.md)** - Provide branding information when job card is waiting (AWAITING_INFO status)
- **[Request Job Card Change](./request-change-jobcard.md)** - Modify existing orders and job cards during approval workflow
- **[Changing Job Card Branding Positions](./jobcard-branding-position-changes.md)** - Understand rules and nuances for changing branding positions between locations

### 📊 Dashboard & Reporting
- **[Dashboard - Sales Orders](./dashboard-sales-orders.md)** - Query and track sales orders
- **[Dashboard - Job Cards](./dashboard-jobcards.md)** - View job card status and details
- **[Dashboard - Credit Notes](./dashboard-credit-notes.md)** - Access credit note information

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
| Provide job card branding | [Update Job Card Branding](./update-jobcard-branding.md) |
| Change branding position on a job card | [Changing Job Card Branding Positions](./jobcard-branding-position-changes.md) |
| Approve job cards for manufacturing | [Approve Job Card](./approve-jobcard.md) |
| Request order changes | [Request Job Card Change](./request-change-jobcard.md) |

## API Reference

### GraphQL Schema
- **Main Schema**: `{ENV_BASE_URI}/graphql/schema.graphql`

## Testing & Examples

### Bruno Collection
The `/samples/bruno/Order Entry/` folder contains example requests for all Order Entry operations, organized by function:

**Available Bruno Samples**:
- **Place Orders** - Examples for creating and placing orders
- **Dashboard** - Query examples for:
  - Sales Orders (get by ID, by number, paginated list, with nested job cards and credit notes)
  - Job Cards (get by ID, by number, paginated list, with assets and proofs)
  - Credit Notes (get by ID, by number, paginated list, date range filtering, for specific orders)

**To use Bruno examples**:
1. Import the collection from `/samples/bruno/`
2. Select your environment (Local, Dev, QA, UAT)
3. Navigate to the Dashboard folder to explore query examples
4. Run requests to test API functionality and understand parent-child relationships

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

