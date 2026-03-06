## Querying Artwork Folders

This guide explains how to retrieve folder structures and their contents using GraphQL queries, and provides an expanded definition of the `ArtworkFolderDetails` type.

---

### 📁 artworkFolderById

Fetches a specific artwork folder by its unique identifier.

#### Example Query
```graphql
query {
  artworkFolderById(id: "folder-id-123") {
    
  }
}
```

**Returns:** A single `ArtworkFolderDetails` object or `null` if not found.

---

### 🗂️ artworkFolders

Lists all root-level artwork folders accessible by the current user or account.

#### Example Query
```graphql
query {
  artworkFolders {
    
  }
}
```

**Returns:** An array of `ArtworkFolderDetails` objects.

---

### 📦 artworkFolderContents

Lists of artworks inside the given folder.

#### Example Query
```graphql
query {
  artworkFolderContents(folderPath: "folder/folder", after: null, first: null) {
  
  }
}
```
### Input Filters

| Field       | Type              | Description                                                  |
|-------------|-------------------|--------------------------------------------------------------|
| `first`      | `Int`            | The number of records to be retrieved after the supplied page cursor.               |
| `after`  | `String`            | The page cursor to navigate from.                       |
| `folderPath`  | `String!`            | The folder path for listing contents.                       |

**Returns:** A **paginated list** of `ArtworkDetails`.

### 🔒 Important Requirements

- **Paging is mandatory**: You **must** provide pagination parameters (`first`, `last`), or the query will return an error.
- **Maximum page size**: The server enforces a **maximum of 50 items per page**. Exceeding this limit will result in an error.
- **Cursor-based pagination**: The Logo Library API Implements cursor-based pagination. This means you must use the `first` or `last` parameters to specify how many items to return, and you can navigate through pages using the `endCursor` field in the response. Paging to a specific page number is not supported.


---

## 🗂️ ArtworkFolderDetails

Represents a hierarchical folder used to organize artworks in the Logo Library. Supports nesting, user permissions, and sharing.

| **Field**      | **Type**                    | **Description**                                                                 |
|----------------|-----------------------------|---------------------------------------------------------------------------------|
| `canDelete`    | `Boolean!`                  | Whether the current user can delete the folder.                                |
| `canEdit`      | `Boolean!`                  | Whether the folder’s name or metadata can be modified.                         |
| `canMove`      | `Boolean!`                  | Whether the folder can be moved to another location in the hierarchy.          |
| `canShare`     | `Boolean!`                  | Whether the current user can view or modify sharing settings for the folder.   |
| `childFolders` | `[ArtworkFolderDetails!]!`  | List of immediate sub-folders nested under this folder.                         |
| `id`           | `ID!`                       | Globally unique identifier for the folder (Node-compliant).                    |
| `internalId`   | `Long!`                     | Internal system ID for backend operations or reference.                        |
| `name`         | `String!`                   | The display name of the folder.                                                |
| `owner`        | `Owner!`                    | The user, team, or organization that owns the folder.                          |
| `path`         | `String!`                   | Relative path of the folder from the root of the logo library.                 |
| `security`     | `SharingSecurity`           | Object defining the access and sharing settings for the folder.                |

---
