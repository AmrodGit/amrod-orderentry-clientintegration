## Querying Artwork Tags

This guide documents how to retrieve tag information using GraphQL queries and describes the structure of the `ArtworkTagDetails` type returned in responses.

---

### 🏷️ artworkTagById

Retrieves a single artwork tag by its unique ID. Useful for editing workflows or detailed tag views.

#### Example Query
```graphql
query {
  artworkTagById(id: "tag-id-123") {
    
  }
}
```

**Returns:** One `ArtworkTagDetails` object or `null` if not found.

---

### 🏷️ artworkTags

Retrieves a list of all tags associated with the current user or account. Commonly used for listing available tags in tagging workflows.

#### Example Query
```graphql
query {
  artworkTags {
    
  }
}
```

**Returns:** An array of `ArtworkTagDetails` objects.

---

## 🧾 ArtworkTagDetails Type

Represents a tag that can be assigned to artworks for filtering and organization. Each tag is owned and may have edit restrictions.

| **Field**   | **Type**     | **Description**                                                                 |
|-------------|--------------|---------------------------------------------------------------------------------|
| `canEdit`   | `Boolean!`   | Indicates whether the current user has permission to rename or modify the tag. |
| `color`     | `String!`    | Hex code or color name used to visually represent the tag in the UI.           |
| `id`        | `ID!`        | Globally unique identifier for the tag (Node-compliant).                        |
| `name`      | `String!`    | The human-readable name of the tag, which must be unique across all tags.      |
| `owner`     | `Owner!`     | Represents the owner (user/team) that created and manages this tag.            |

---

