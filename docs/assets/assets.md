# Assets REST API

## Overview

The Assets REST API provides direct access to media assets (images, documents, proofs, approvals, etc.) across all functional areas of the Amrod Order Entry system. While GraphQL queries return asset data and metadata, the Assets REST API is used to retrieve the actual asset files using asset IDs and resource paths.

## Key Concept: Asset IDs and Paths

GraphQL queries return two important pieces of information for accessing assets:

1. **Absolute Path**: A direct URL path to access the asset through the REST API
2. **Asset ID**: A unique identifier that can be used with REST endpoints to retrieve the asset

### Example GraphQL Response

When you query artwork or job card details, the response includes asset information:

```graphql
query {
  jobCardByJobCardNumber(jobCardNumber: "JC-2026-001234") {
    jobCardProofs {
      assetId: "asset-12345"
      assetPath: "/assets/jobcards/JC-2026-001234/proofs/asset-12345"
      proofType: "MULTI_VARIANT"
    }
  }
}
```

Both the `assetId` and `assetPath` can be used to retrieve the asset:
- **Using assetPath**: Direct GET request to the path provided by GraphQL
- **Using assetId**: Construct the appropriate REST endpoint based on asset type

## Asset Types and Endpoints

### 1. Sales Order Assets

For assets associated with sales orders, such as order confirmations or attachments.

**Endpoint**: `GET /assets/salesorders/{assetId}`

**Parameters**:
- `assetId` (path, required): The unique asset ID returned by GraphQL queries
- `x-gateway-impersonate` (header, mandatory)

**Response**: 
- **Success (200)**: The asset file (binary content)
- **Not Found (404)**: The asset was not found

**Example**:
```bash
GET /assets/salesorders/so-asset-001
```

**Use Cases**:
- Retrieving order confirmation PDFs
- Downloading order-related attachments
- Accessing order documentation

### 2. Artwork Assets (Logo Library)

For artwork and logo assets stored in the Logo Library.

**Endpoint**: `GET /assets/logo-library/artwork/{assetId}`

**Parameters**:
- `assetId` (path, required): The unique artwork asset ID returned by Logo Library queries

**Response**:
- **Success (200)**: The artwork asset file (image, SVG, or other format)
- **Not Found (404)**: The artwork asset was not found

**Example**:
```bash
GET /assets/logo-library/artwork/logo-abc-123
```

**Use Cases**:
- Retrieving logo designs
- Downloading artwork files for preview
- Accessing brand asset files

**Related Queries**:
Artwork assets are returned by Logo Library queries. See [Logo Library documentation](../logo-library/README.md) for complete artwork query examples.

### 3. Job Card Approval Assets

For approval-related assets such as approval documents or authorization files.

**Endpoint**: `GET /assets/jobcards/approvals/{assetId}`

**Parameters**:
- `assetId` (path, required): The unique approval asset ID returned by job card queries
- `x-gateway-impersonate` (header, mandatory)

**Response**:
- **Success (200)**: The approval asset (binary content)
- **Not Found (404)**: The approval asset was not found

**Example**:
```bash
GET /assets/jobcards/approvals/approval-doc-456
```

**Use Cases**:
- Retrieving job card approval documents
- Accessing authorization records
- Downloading approval confirmations

### 4. Job Card Proof Assets

For proof assets associated with job cards, including single and multi-variant proofs.

**Endpoint**: `GET /assets/jobcards/{jobCardNumber}/proofs/{assetId}`

**Parameters**:
- `jobCardNumber` (path, required): The job card number (e.g., "JC-2026-001234")
- `assetId` (path, required): The unique proof asset ID returned by job card proof queries
- `x-gateway-impersonate` (header, mandatory)

**Response**:
- **Success (200)**: The proof asset file (typically PDF or image)
- **Not Found (404)**: The proof asset was not found

**Example**:
```bash
GET /assets/jobcards/JC-2026-001234/proofs/proof-xyz-789
```

**Use Cases**:
- Retrieving proof images for customer approval
- Downloading proofs for printing or review
- Accessing variant-specific proof files
- Archiving proof documentation

**Proof Types**:
- **Single Proof**: One design proof for a single product configuration
- **Multi-Variant Proof**: Multiple proof options showing different design variations

### 5. Job Card Proof Option Assets

For specific proof option variants within a multi-variant proof set.

**Endpoint**: `GET /assets/jobcards/{jobCardNumber}/proofs/options/{optionNumber}`

**Parameters**:
- `jobCardNumber` (path, required): The job card number (e.g., "JC-2026-001234")
- `optionNumber` (path, required): The proof option number (integer, e.g., 1, 2, 3)
- `x-gateway-impersonate` (header, mandatory)

**Response**:
- **Success (200)**: The specific proof option asset file
- **Not Found (404)**: The proof option was not found

**Example**:
```bash
GET /assets/jobcards/JC-2026-001234/proofs/options/1
GET /assets/jobcards/JC-2026-001234/proofs/options/2
GET /assets/jobcards/JC-2026-001234/proofs/options/3
```

**Use Cases**:
- Retrieving individual proof options from a multi-variant set
- Allowing customers to preview and select from design variations
- Iterating through proof options in sequence
- Building a proof gallery interface

## Workflow Examples

### Workflow 1: Retrieve Job Card Proof

**Step 1**: Query job card details including proof information

```graphql
query {
  jobCardByJobCardNumber(jobCardNumber: "JC-2026-001234") {
    jobCardNumber
    jobCardProofs {
      assetId
      assetPath
      proofType
    }
  }
}
```

**Step 2**: Extract the `assetId` from the response

```json
{
  "data": {
    "jobCardByJobCardNumber": {
      "jobCardNumber": "JC-2026-001234",
      "jobCardProofs": [
        {
          "assetId": "proof-abc-123",
          "assetPath": "/assets/jobcards/JC-2026-001234/proofs/proof-abc-123",
          "proofType": "MULTI_VARIANT"
        }
      ]
    }
  }
}
```

**Step 3**: Use the asset ID with the REST API to retrieve the proof

```bash
GET /assets/jobcards/JC-2026-001234/proofs/proof-abc-123
```

Or use the asset path directly:

```bash
GET /assets/jobcards/JC-2026-001234/proofs/proof-abc-123
```

### Workflow 2: Retrieve All Proof Options

**Step 1**: Query job card to identify it has a multi-variant proof

```graphql
query {
  jobCardByJobCardNumber(jobCardNumber: "JC-2026-001234") {
    jobCardProofs {
      proofType
      numberOfOptions  # Number of proof variants
    }
  }
}
```

**Step 2**: Iterate through proof options using the option number endpoint

```bash
# Retrieve proof option 1
GET /assets/jobcards/JC-2026-001234/proofs/options/1

# Retrieve proof option 2
GET /assets/jobcards/JC-2026-001234/proofs/options/2

# Retrieve proof option 3
GET /assets/jobcards/JC-2026-001234/proofs/options/3
```

### Workflow 3: Retrieve Artwork from Logo Library

**Step 1**: Query artwork from Logo Library

```graphql
query {
  artworkByArtworkNumber(artworkNumber: "ART-2026-001") {
    artworkId
    artworkFiles {
      assetId
      fileFormat
      fileName
    }
  }
}
```

**Step 2**: Retrieve artwork asset using the asset ID

```bash
GET /assets/logo-library/artwork/logo-file-xyz-789
```

The endpoint returns the artwork file in its original format (PNG, SVG, PDF, etc.)

## Best Practices

### 1. Cache Asset Information from GraphQL

When you query GraphQL, capture both the asset ID and asset path for later use:

```graphql
query {
  jobCardByJobCardNumber(jobCardNumber: "JC-2026-001234") {
    assetId
    assetPath      # Cache this for direct access
    assetMetadata {
      fileSize
      mimeType
      uploadedDate
    }
  }
}
```

### 2. Use Asset Paths When Available

When GraphQL returns both assetPath and assetId, prefer using the assetPath for direct access:

```bash
# Direct path (preferred if returned by GraphQL)
GET /assets/jobcards/JC-2026-001234/proofs/proof-abc-123

# Constructed from ID (fallback)
GET /assets/jobcards/{jobCardNumber}/proofs/{assetId}
```

### 3. Handle Asset Not Found Gracefully

Always handle 404 responses when retrieving assets:

```javascript
async function getAsset(assetPath) {
  try {
    const response = await fetch(assetPath);
    if (!response.ok) {
      if (response.status === 404) {
        console.log("Asset not found - may have been deleted or moved");
        return null;
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.blob();
  } catch (error) {
    console.error("Error retrieving asset:", error);
    throw error;
  }
}
```

### 4. Stream Large Assets

For large asset files, use streaming rather than loading entire file into memory:

```javascript
async function downloadAsset(assetPath, outputPath) {
  const response = await fetch(assetPath);
  const fileStream = fs.createWriteStream(outputPath);
  response.body.pipe(fileStream);
  
  return new Promise((resolve, reject) => {
    fileStream.on('finish', resolve);
    fileStream.on('error', reject);
  });
}
```

### 5. Implement Caching Strategy

Cache frequently accessed assets to reduce API calls:

```javascript
const assetCache = new Map();

async function getCachedAsset(assetPath, cacheTimeMs = 3600000) {
  const now = Date.now();
  const cached = assetCache.get(assetPath);
  
  if (cached && now - cached.timestamp < cacheTimeMs) {
    return cached.data;
  }
  
  const data = await fetchAsset(assetPath);
  assetCache.set(assetPath, { data, timestamp: now });
  return data;
}
```

### 6. Validate Asset IDs Before Use

Always validate that GraphQL returned valid asset IDs before constructing REST requests:

```javascript
function constructAssetUrl(assetId, assetType) {
  if (!assetId || typeof assetId !== 'string') {
    throw new Error("Invalid asset ID");
  }
  
  switch (assetType) {
    case 'ARTWORK':
      return `/assets/logo-library/artwork/${assetId}`;
    case 'PROOF':
      return `/assets/jobcards/proofs/${assetId}`;
    default:
      throw new Error(`Unknown asset type: ${assetType}`);
  }
}
```

## Error Handling

### 404 Not Found

The asset with the provided ID does not exist or has been deleted.

**Possible Causes**:
- Asset ID is incorrect or malformed
- Asset was deleted from the system
- Asset ID belongs to a different asset type than the endpoint
- Job card number doesn't match the asset's parent

**Recovery**:
- Verify the asset ID from the GraphQL response
- Query the parent resource again to get current asset information
- Check asset availability status in GraphQL queries

### 500 Server Error

An unexpected error occurred while retrieving the asset.

**Recovery**:
- Implement exponential backoff retry logic
- Log the error for support investigation
- Notify the user and suggest contacting support

### 401 Unauthorized (if authentication required)

The request lacks proper authentication.

**Recovery**:
- Ensure authentication headers are included in the request
- Refresh authentication tokens if expired
- Verify permission level allows asset access

## Related Documentation

- [Order Entry Overview](../order-entry/) - For job card asset workflows
- [Logo Library Documentation](../logo-library/) - For artwork asset information
- [Dashboard Job Cards](../order-entry/dashboard-jobcards.md) - For proof query examples
- [Approval Workflows](../order-entry/approve-jobcard.md) - For approval asset usage

## API Reference Summary

| Endpoint | Method | Purpose | Authentication |
|----------|--------|---------|-----------------|
| `/assets/salesorders/{assetId}` | GET | Retrieve sales order asset | Required |
| `/assets/logo-library/artwork/{assetId}` | GET | Retrieve artwork asset | Optional |
| `/assets/jobcards/approvals/{assetId}` | GET | Retrieve approval asset | Required |
| `/assets/jobcards/{jobCardNumber}/proofs/{assetId}` | GET | Retrieve job card proof | Required |
| `/assets/jobcards/{jobCardNumber}/proofs/options/{optionNumber}` | GET | Retrieve proof variant | Required |

## Support

If you encounter issues retrieving assets:

1. **Verify Asset ID**: Confirm the asset ID is correct from GraphQL response
2. **Check Response Path**: Ensure you're using the correct endpoint for the asset type
3. **Validate Job Card Number**: For job card assets, verify the job card number is correct
4. **Review Permissions**: Ensure your account has access to the asset
5. **Contact Support**: If issues persist, refer to [support documentation](../support.md)