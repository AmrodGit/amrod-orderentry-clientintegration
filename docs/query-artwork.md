## 🎨 Querying Artwork

This guide explains how to query artworks and tags in the Logo Library using the available GraphQL query entry points.

---

### 📄 artworkQuery

Retrieves a **paginated list** of artworks based on optional filters. This is the primary way to search or browse artworks in the Logo Library.

---

### 🔒 Important Requirements

- **Paging is mandatory**: You **must** provide pagination parameters (`first`, `last`), or the query will return an error.
- **Maximum page size**: The server enforces a **maximum of 50 items per page**. Exceeding this limit will result in an error.
- **Cursor-based pagination**: The Logo Library API Implements cursor-based pagination. This means you must use the `first` or `last` parameters to specify how many items to return, and you can navigate through pages using the `endCursor` field in the response. Paging to a specific page number is not supported.

---

### Example Query

```graphql
query {
  artworkQuery(
    first: null
    after: null
    ids: null
    tags: null
    description: null
    extensions: null
    name: null
    statuses: null
    storagePath: null
  ) {
    nodes {
      
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

---

### Input Filters

| Field       | Type              | Description                                                  |
|-------------|-------------------|--------------------------------------------------------------|
| `first`      | `Int`            | The number of records to be retrieved after the supplied page cursor.               |
| `after`  | `String`            | The page cursor to navigate from.                       |
| `ids`  | `[ID!]`              | Optionally filters artworks from supplied ids.        |
| `tags`    | `[ID!]`           | Optionally filters artworks based on supplied tags. Matches any artwork to any of the supplied tags. |
| `description`| `String`          | Optional filters artworks on a wildcard input string on the description field.        |
| `name`| `String`          | Optional filters artworks on a wildcard input string on the name field.        |
| `extension`| `[String!]`          | Optional filters artworks based on their extensions. Matches any artwork to any of the supplied extensions.        |
| `statuses`| `[ArtworkQueryStatus!]`          | Optional filters artworks based on their status. Matches any artwork in any of the statuses supplied. **DEFAULT**: Active        |
| `storagePath`| `String`          | Optional filters artworks based on placement within the folder structure.        |

---

### Response 🎨 [ArtworkDetails!]

---

### 🏷️ artworkById

Fetches a single artwork by its unique identifier.

#### Example Query

```graphql
query {
  artworkById(id: "artwork-id-123") {
    
  }
}
```

**Returns:** 🎨 ArtworkDetails

---

### 🏷️ ArtworkDetails


| **Field**        | **Type**             | **Description**                                                                 |
|------------------|----------------------|---------------------------------------------------------------------------------|
| `canDelete`      | `Boolean!`           | Whether the current user is allowed to delete the artwork.                     |
| `canEdit`        | `Boolean!`           | Whether the artwork's metadata (e.g., name, tags) can be edited.               |
| `canMove`        | `Boolean!`           | Whether the artwork can be moved between folders by the user.                  |
| `canShare`       | `Boolean!`           | Whether the user is allowed to modify or apply sharing permissions.            |
| `checksum`       | `String!`            | A hash of the file used for detecting changes or validating file integrity.    |
| `created`        | `DateTime!`          | Timestamp indicating when the artwork was originally created.                  |
| `description`    | `String`             | Optional text describing the artwork, its purpose, or context.                 |
| `extension`      | `String!`            | File extension (e.g., "png", "svg") of the artwork.                            |
| `id`             | `ID!`                | Globally unique identifier for the artwork (Node interface).                   |
| `mimeType`       | `String!`            | Full MIME type of the file (e.g., "image/png", "image/svg+xml").               |
| `name`           | `String!`            | Human-readable name of the artwork.                                            |
| `owner`          | `Owner!`             | The owner (user or entity) associated with the artwork.                        |
| `path`           | `String!`            | Internal file storage path for system use.                                     |
| `security`       | `SharingSecurity`    | Sharing and permission configuration for the artwork.                          |
| `size`           | `Long!`              | Size of the artwork file in bytes.                                             |
| `sizeFormatted`  | `String!`            | User-friendly version of the file size (e.g., "1.2 MB").                        |
| `status`         | `ArtworkStatus!`     | Current status of the artwork (e.g., "DRAFT", "COMMITTED").                    |
| `tags`           | `[ArtworkTag!]!`     | List of tags that are assigned to the artwork.                                 |
| `thumbnailUrl`   | `URL`                | Optional URL for a small preview/thumbnail image of the artwork.               |
| `type`           | `ArtworkType!`       | Category/type of artwork (e.g., "LOGO", "ICON").                               |
| `url`            | `URL!`               | Public or secure URL for accessing or downloading the artwork file.            |

### Summary

| Query             | Description                                                            |
|-------------------|------------------------------------------------------------------------|
| `artworkQuery`    | Returns a paginated, filterable list of artworks (paging required)     |
| `artworkById`  | Retrieves a single artwork by its unique identifier                |
