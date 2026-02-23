## Artwork & Folder Sharing Management

This guide describes how to manage sharing and permissions for artworks and folders within the Logo Library. Sharing enables collaboration by granting access to artworks and folders to other contacts and customers within your organization.

---

### ⚠️ Important Notes

- Sharing is **organization-scoped** - you can only share with contacts and customers within the same organization
- Three levels of sharing are available:
  - **Artwork-level** – Share individual artworks
  - **Folder-level** – Share entire folders and their contents
  - **Global-level** – Share your entire library organization-wide
- Permissions can be **read-only** (view/download) or **read/write** (edit/modify)
- All shared artifacts are **permission-aware** - users only see items they have access to

---

## Global Library Sharing

Global sharing allows you to share all artwork in your library with your entire organization, or selectively disable it.

### Enable Global Sharing (`enableGlobalSharing`)

Enables read or read/write access to all artwork in your library organization-wide.

#### Example Mutation
```graphql
mutation {
  enableGlobalSharing(
    input: {
      securityType: READ_WRITE
      forceEnable: null
    }
  ) {
    resultPayloadType {
      result
    }
  }
}
```

**Parameters**:
- `securityType` (required) - Access level (READ_ONLY or READ_WRITE)
- `forceEnable` (optional) - Force enable global sharing, defaults to false. Enabling global sharing will override all existing granular sharing settings. Setting `forceEnable` to true will enable global sharing even if there are existing artwork or folder shares and will revoke all of those granular shares in favor of the global setting, effectively resetting all sharing to the new global level.

**Returns:**
- `result`: OK

---

### Disable Global Sharing (`disableGlobalSharing`)

Disables global organization-wide sharing and reverts to granular sharing controls.

#### Example Mutation
```graphql
mutation {
  disableGlobalSharing {
    resultPayloadType {
      result
    }
  }
}
```

**Returns:**
- `result`: OK

---

## Artwork-Level Sharing

Sharing individual artworks with specific contacts or customers, with granular permission control.

### Share Artwork (`shareArtwork`)

Grants read or read/write access to a specific artwork for designated contacts and/or customers.

#### Example Mutation
```graphql
mutation {
  shareArtwork(
    input: {
      artworkId: "artwork-id-123"
      contactIdsShare: ["00000000-0000-0000-0000-000000000001"]
      contactIdsRevoke: []
      customerCodesShare: ["CUSTOMER-ABC"]
      customerCodesRevoke: []
      sharedAccess: READ_WRITE
    }
  ) {
    resultPayloadType {
      result
    }
  }
}
```

**Parameters**:
- `artworkId` - The ID of the artwork to share
- `contactIdsShare` - Array of contact UUIDs to grant access
- `contactIdsRevoke` - Array of contact UUIDs to revoke access from
- `customerCodesShare` - Array of customer codes to grant access
- `customerCodesRevoke` - Array of customer codes to revoke access from
- `sharedAccess` - Access level (READ_ONLY or READ_WRITE)

**Returns:**
- `result`: OK

**Use Cases**:
- Share a specific logo with a particular contact for review
- Grant editing permissions to a teammate
- Share branded assets with external customers (read-only)
- Distribute artwork versions across your organization

---

### Revoke Artwork Share (`revokeSharedArtwork`)

Removes all sharing access to a specific artwork

#### Example Mutation
```graphql
mutation {
  revokeSharedArtwork(
    input: {
      artworkId: "artwork-id-123"
    }
  ) {
    resultPayloadType {
      result
    }
  }
}
```

**Parameters**:
- `artworkId` - The ID of the artwork to revoke sharing for

**Returns:**
- `result`: OK

---

## Folder-Level Sharing

Sharing entire folders with other contacts and customers, granting access to all artworks within that folder.

### Share Folder (`shareFolder`)

Grants read or read/write access to a folder and all its contents for designated contacts and/or customers.

#### Example Mutation
```graphql
mutation {
  shareFolder(
    input: {
      folderId: "folder-id-456"
      contactIdsShare: ["00000000-0000-0000-0000-000000000001"]
      contactIdsRevoke: []
      customerCodesShare: ["CUSTOMER-XYZ"]
      customerCodesRevoke: []
      sharedAccess: READ_WRITE
    }
  ) {
    resultPayloadType {
      result
    }
  }
}
```

**Parameters**:
- `folderId` - The ID of the folder to share
- `contactIdsShare` - Array of contact UUIDs to grant access
- `contactIdsRevoke` - Array of contact UUIDs to revoke access from
- `customerCodesShare` - Array of customer codes to grant access
- `customerCodesRevoke` - Array of customer codes to revoke access from
- `sharedAccess` - Access level (READ_ONLY or READ_WRITE)

**Returns:**
- `result`: OK

**Use Cases**:
- Share a campaign folder with all stakeholders
- Grant team members access to a brand folder
- Share customer-specific assets with their team
- Organize and distribute assets by department or project

---

### Revoke Folder Share (`revokeSharedFolder`)

Removes all sharing access to a folder.

#### Example Mutation
```graphql
mutation {
  revokeSharedFolder(
    input: {
      folderId: "folder-id-456"
    }
  ) {
    resultPayloadType {
      result
    }
  }
}
```

**Parameters**:
- `folderId` - The ID of the folder to revoke sharing for

**Returns:**
- `result`: OK

---

## Bulk Sharing Management

### Revoke All Shares (`revokeAllShares`)

Removes all sharing permissions (both artwork and folder shares) across your entire library.

#### Example Mutation
```graphql
mutation {
  revokeAllShares {
    resultPayloadType {
      result
    }
  }
}
```

**Returns:**
- `result`: OK

**Use Cases**:
- Revoke all sharing permissions organization-wide
- Reset sharing configuration to private

---

## Permission Model

### Access Levels

| Permission | View | Download | Edit | Delete | Move |
|-----------|------|----------|------|--------|------|
| READ_ONLY | ✅   | ✅       | ❌   | ❌     | ❌   |
| READ_WRITE| ✅   | ✅       | ✅   | ✅     | ✅   |

### Sharing Scope

| Level            | Scope                                    |
|------------------|------------------------------------------|
| **Global**       | All artworks in your library             |
| **Folder**       | Folder and all contained artworks       |
| **Artwork**      | Single artwork only                      |

---

## Best Practices

✅ **Do**:
- Use **READ_ONLY** for external recipients who only need to view/download
- Use **READ_WRITE** sparingly for trusted team members who need to edit
- Organize artworks into logical folders before sharing folder access
- Use share operations to add and revoke access simultaneously
- Use global sharing only when your entire library should be accessible to all organization members
- Use UUIDs for contact IDs (obtained from your system)
- Use customer codes for customer shares

❌ **Don't**:
- Grant READ_WRITE access to external customers (use READ_ONLY)
- Share sensitive branding assets widely - limit to authorized recipients
- Forget to revoke access when contacts leave or projects end
- Mix global sharing with granular sharing - choose one strategy
- Share production assets without proper approval workflows
- Use revokeAllShares casually - it removes all sharing across your entire library

---

## Checking Sharing Status

To view current sharing settings for an artwork or folder, query the `security` field in artwork or folder detail queries:

```graphql
query {
  artworkByArtworkId(id: "artwork-id-123") {
    name
    security {
      access              # Access level (PRIVATE, SHARED, PUBLIC)
      contact {           # Contacts with access
        code
        emailAddress
      }
      customer {          # Customers with access
        code
        name
      }
    }
  }
}
```

---

## Exception Handling

It is important to handle exceptions when working with Sharing mutations. Please see [Error Handling](../error-handling.md) for details on error handling in the Logo Library API.

Common sharing errors include:
- Invalid contact or customer codes
- Attempting to share with contacts outside your organization
- Insufficient permissions to modify sharing settings
- Attempting to revoke access for non-existent shares

---

## Summary

| Mutation                 | Description                                           |
|-------------------------|-------------------------------------------------------|
| `enableGlobalSharing`    | Enable organization-wide library access              |
| `disableGlobalSharing`   | Disable global sharing, revert to granular controls  |
| `shareArtwork`           | Grant/revoke access to specific artwork              |
| `revokeSharedArtwork`    | Remove all sharing for specific artwork              |
| `shareFolder`            | Grant/revoke access to folder and contents           |
| `revokeSharedFolder`     | Remove all sharing for specific folder               |
| `revokeAllShares`        | Remove all shares across entire library              |

---

## Bruno Samples

Example requests for all sharing operations are available in `/samples/bruno/Logo Library/Sharing/`:
- `enable-global-sharing.bru` - Enable organization-wide sharing
- `disable-global-sharing.bru` - Disable global sharing
- `share-artwork.bru` - Share individual artwork
- `share-folder.bru` - Share folder and contents
- `revoke-artwork-share.bru` - Revoke artwork access
- `revoke-folder-share.bru` - Revoke folder access
- `revoke-all-shares.bru` - Bulk revoke permissions
