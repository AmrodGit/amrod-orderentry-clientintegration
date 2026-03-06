# Amrod Order Entry & Logo Library Documentation

Welcome to the comprehensive documentation for the Amrod Order Entry Client Integration API. This documentation covers all functional areas including order intake management, logo library administration, and dashboard operations.

## 📋 Overview

This project provides a complete GraphQL API for managing:
- **Order Intake**: Creating and managing sales orders, job cards, and associated workflows
- **Logo Library**: Managing digital assets, artworks, and organizational folders
- **Dashboard**: Monitoring and tracking orders, job cards, and credit notes

## 🚀 Quick Start

### Choose Your Functional Area

#### 1. 🛒 [Order Entry](./order-entry/)
Complete system for managing sales orders and production job cards.
- **[Order Entry Overview](./order-entry/order-entry-overview.md)** - Full functional area guide
- **[Place Sales Order](./order-entry/place-sales-order.md)** - Create and validate orders with pricing & lead times
- **[Update Job Card Branding](./order-entry/update-jobcard-branding.md)** - Provide branding information to job cards
- **[Approve Job Card](./order-entry/approve-jobcard.md)** - Approve job cards for manufacturing
- **[Request Job Card Change](./order-entry/request-change-jobcard.md)** - Request changes on Job Cards before production
- **Dashboard Guides**:
  - [Sales Orders Dashboard](./order-entry/dashboard-sales-orders.md)
  - [Job Cards Dashboard](./order-entry/dashboard-jobcards.md)
  - [Credit Notes Dashboard](./order-entry/dashboard-credit-notes.md)

**Key Features**:
- Validate orders without placing them (test mode)
- Real-time pricing calculation
- Lead time retrieval for delivery scheduling
- Complete order tracking and status management

#### 2. 🎨 [Logo Library](./logo-library/)
Complete system for managing digital artworks and design assets.
- **[Logo Library Overview](./logo-library/logo-library.md)** - Full functional area guide
- **[Logo Library Index](./logo-library/README.md)** - Quick navigation and common tasks
- **Artwork Management**:
  - [Manage Artwork](./logo-library/manage-artwork.md) - Create, update, and delete artworks
  - [Query Artwork](./logo-library/query-artwork.md) - Search and retrieve artwork details
  - [Artwork Retention](./logo-library/artwork-retention.md) - Archive and retention policies
- **Organization**:
  - [Manage Artwork Folders](./logo-library/manage-artwork-folders.md) - Organize artworks
  - [Query Artwork Folders](./logo-library/query-artwork-folders.md) - Retrieve folder structures
- **Tags & Sharing**:
  - [Manage Artwork Tags](./logo-library/manage-artwork-tags.md) - Categorize artworks
  - [Query Artwork Tags](./logo-library/query-artwork-tags.md) - Search by tags
  - [Manage Sharing](./logo-library/manage-sharing.md) - Control access and permissions

**Key Features**:
- Upload and version control for design files
- Folder-based organization
- Tag-based categorization
- Sharing and access control

#### 3. 🎨 [Assets API](./assets/assets.md)
REST API for retrieving media assets, proofs, approvals, and artwork files.
- **[Assets REST API](./assets/assets.md)** - Complete asset retrieval and streaming guide

**Key Features**:
- Retrieve proofs for customer approval
- Access artwork and logo files
- Download approval documents
- Stream large assets efficiently
- Multi-variant proof options

**Connection to GraphQL**: GraphQL queries return asset IDs and paths; REST API retrieves the actual files.

#### 4. 📊 Dashboard (Part of Order Entry)
Real-time monitoring and reporting dashboards.
- Sales Orders overview and detail views
- Job Cards production tracking
- Credit Notes financial reporting
- Pagination and filtering capabilities

## 🔗 Common Workflows

### Order Management Workflow
```
1. Validate Order Configuration → placeOrder (validateOnly: true)
2. Review Pricing & Lead Times → Modify if needed
3. Place Final Order → placeOrder (validateOnly: false)
4. Track Status → Dashboard - Sales Orders
5. Provide Branding (if needed) → updateJobCardBrandingInfo (when status: WAITING_INFO)
6. Approve Job Cards → approveJobCard (select proof layout)
7. Request Changes (if needed) → requestChangeJobCard (during approval workflow)
8. Monitor Production → Dashboard - Job Cards
9. Handle Credits → Dashboard - Credit Notes
```

### Artwork Upload Workflow
```
1. Create Artwork Session → createArtwork (Get uploadUri)
2. Upload File Blob → Use returned uploadUri
3. Commit Artwork → commitArtwork (Finalize)
4. Tag & Organize → tagArtwork, moveArtworkToFolder
5. Share if needed → enableGlobalSharing, shareArtwork
```

## 📚 How to Use This Documentation

1. **Choose Your Functional Area** - Select Order Entry or Logo Library based on your needs
2. **Review the Overview** - Start with the functional area overview for complete context
3. **Follow Step-by-Step Guides** - Each feature has detailed documentation with examples
4. **Check Bruno Samples** - `/samples/bruno/` contains ready-to-use API request examples
5. **Handle Errors** - See [Error Handling](./error-handling.md) for troubleshooting
6. **Authentication** - Review [Authentication](./authentication.md) for API access

## 💻 API Testing with Bruno

The `/samples/bruno/` folder contains organized request collections for all API operations:

### Available Bruno Collections
- **Order Entry**:
  - Place Orders examples
  - Dashboard queries (Sales Orders, Job Cards, Credit Notes)
  
- **Logo Library**:
  - Artwork creation and upload workflow
  - Folder and tag management
  - Sharing configuration

### Using Bruno Samples
1. Import the collection: `/samples/bruno/`
2. Select your environment (`UAT`, `Production`)
3. Set environment variables as needed
4. Execute requests to test API functionality

## 📖 Reference & Resources

### APIs
- **GraphQL API**: GraphQL schema available at `{ENV_URL}/graphql/schema.graphql`
- **Assets REST API**: Retrieve media assets (proofs, approvals, artwork) - See [Assets API Documentation](./assets.md)


## ✅ Best Practices

### Order Entry
- Always validate orders before final submission
- Use validate-only mode to test configurations
- Check pricing and lead times before customer communication
- Implement proper error handling for validation failures

### Logo Library
- Organize artworks into logical folder structures
- Use consistent tagging conventions
- Test sharing settings in non-production environments
- Implement proper retention policies for archived artworks

### General
- Review error handling documentation for common scenarios
- Use appropriate environment for your use case
- Test workflows in QA before using in production
- Cache static data appropriately to reduce API calls

## 🆘 Getting Help

- **Error Codes & Troubleshooting**: See [Error Handling](./error-handling.md)
- **API Access Issues**: Review [Authentication](./authentication.md)
- **General Support**: Check [Support](./support.md) for contact information
- **API Examples**: Explore `/samples/bruno/` for ready-to-use requests
- **GraphQL Schema**: Check the live schema at your environment's GraphQL endpoint

## 📁 Documentation Structure

```
docs/
├── README.md (this file)
├── .agents/
│   └── documentation-guide.md
├── authentication.md
├── error-handling.md
├── support.md
├── assets/
│   ├── assets.md
├── order-entry/
│   ├── README.md
│   ├── order-entry-overview.md
│   ├── place-sales-order.md
│   ├── update-jobcard-branding.md
│   ├── approve-jobcard.md
│   ├── request-change-jobcard.md
│   ├── branding-metadata.md
│   ├── dashboard-sales-orders.md
│   ├── dashboard-jobcards.md
│   └── dashboard-credit-notes.md
└── logo-library/
    ├── README.md
    ├── logo-library.md
    ├── manage-artwork.md
    ├── manage-artwork-folders.md
    ├── manage-artwork-tags.md
    ├── manage-sharing.md
    ├── query-artwork.md
    ├── query-artwork-folders.md
    ├── query-artwork-tags.md
    └── artwork-retention.md
```

## 🔄 Recent Updates

- Added comprehensive dashboard sample collection for Sales Orders, Job Cards, and Credit Notes
- Implemented parent-child relationship examples in API samples
- Added Bruno samples with automatic environment variable extraction
- Updated artwork upload workflow with session ID and upload URI management

### 🌎 Available Environments
| Environment | ENV_BASE_URI | Use Case |
|-------------|-----|----------|
| UAT | Shared during onboarding phase | User Acceptance Testing |
| PROD | Shared once user acceptance testing is complete | Production Use |

---

**Version**: 1.0  
**Last Updated**: February 2026  
