## Artwork Folder Management

This section describes how to manage `ArtworkFolder` objects, which are used to organize artworks hierarchically within the Logo Library.


### ⚠️ Important Notes

- Artwork folders are unique by their name and parent folder combination.

---

### Create Artwork Folder (`createArtworkFolder`)

Creates a new folder for organizing artworks. You can optionally assign a `parentId` to nest the folder under another.

#### Example Mutation
```graphql
mutation {
  createArtworkFolder(
    input: { name: "Marketing Assets", parentId: "root-folder-id" }
  ) {
    artworkFolderDetails {
      canDelete
      canEdit
      canMove
      canShare
      id
      internalId
      name
      path
      owner {
        contact {
          code
          emailAddress
        }
        customer {
          code
          name
        }
      }
      security {
        access
        contact {
          code
          emailAddress
        }
        customer {
          code
          name
        }
      }
    }
  }
}
```

**Returns:** ArtworkFolderDetails

### 📁 ArtworkFolderDetails Fields

| **Field**      | **Type**                    | **Description**                                                                                       |
|----------------|-----------------------------|-------------------------------------------------------------------------------------------------------|
| `canDelete`    | `Boolean!`                  | Indicates whether the current user has permission to permanently delete this folder from the library. |
| `canEdit`      | `Boolean!`                  | Indicates whether the current user can rename or modify metadata associated with this folder.         |
| `canMove`      | `Boolean!`                  | Specifies whether the folder can be moved to a different parent folder by the current user.           |
| `canShare`     | `Boolean!`                  | Determines whether the user can configure or change the folder’s sharing settings.                    |
| `childFolders` | `[ArtworkFolderDetails!]!`  | A list of subfolders that are nested directly under this folder.                                      |
| `id`           | `ID!`                       | A globally unique identifier for the folder (used in queries or mutations that require a Node ID).    |
| `internalId`   | `Long!`                     | An internal system-assigned ID, primarily used for backend operations or debugging.                   |
| `name`         | `String!`                   | The display name of the folder, which is visible to users.                                            |
| `owner`        | `Owner!`                    | Represents the user, team, or entity that owns this folder and has full control over its contents.    |
| `path`         | `String!`                   | A string representation of the folder's path from the root folder, useful for breadcrumb navigation.  |
| `security`     | `SharingSecurity`           | Defines the sharing rules, permissions, and access control settings associated with this folder.      |

---

### Update Artwork Folder (`renameArtworkFolder`)

Modifies the name of an existing folder.

#### Example Mutation
```graphql
mutation {
  renameArtworkFolder(input: { id: "folder-id", name: "new folder name" }) {
    resultPayloadType {
      result
    }
  }
}
```

**Returns:**
- `result`: OK

---

### Move Artwork Folder (`moveArtworkFolder`)

Moves an existing folder to a new parent in the folder hierarchy.

#### Example Mutation
```graphql
mutation {
  moveArtworkFolder(
    input: { id: "folder-id-123", parentId: "new-parent-id-456" }
  ) {
    resultPayloadType {
      result
    }
  }
}
```

**Returns:**
- `result`: OK

---

### Move Artwork Folder (`deleteArtworkFolder`)

Deletes an existing folder. A Folder can only be deleted if it is empty (contains no artworks or sub-folders).

#### Example Mutation
```graphql
mutation {
  deleteArtworkFolder(input: { id: "folder-id" }) {
    resultPayloadType {
      result
    }
  }
}
```

**Returns:**
- `result`: OK

---

## 🧨 Exception Handling

It is important to handle exceptions when working with Artwork mutations. Please see [Error Handling](./error-handling.md) for details on error handling in the Logo Library API.

---

### Summary

| Mutation             | Description                                   |
|----------------------|-----------------------------------------------|
| `createArtworkFolder`| Creates a new artwork folder, optionally nested |
| `renameArtworkFolder`| Updates the name of an existing folder        |
| `oveArtworkFolder`  | Re-parents an existing folder                 |
| `deleteArtworkFolder`| Deletes an existing folder                    |
