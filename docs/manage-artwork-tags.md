## Artwork Tag Management

This guide documents how to manage artwork tags in the Logo Library, including creating, tagging artworks, updating, and deleting tags.

---

### ⚠️ Important Notes

- **Tag Name Uniqueness**: Each tag must have a unique `name`. Creating a tag with a duplicate name will result in a conflict error.
- **Deleting Tags in Use**: Tags that are currently in use (i.e., attached to artworks) can be deleted **only** by explicitly setting the `force` option to `true`.

---

### Create Artwork Tag (`createArtworkTag`)

Creates a new reusable tag that can be assigned to artworks.

#### Example Mutation
```graphql
mutation {
  createArtworkTag(input: { color: "FFFFFF", name: "Tag1" }) {
    artworkTag {
      color
      id
      name
    }
  }
}
```

**Returns:**
- `id`: Unique tag identifier
- `name`: Tag name
- `color`: Hex color code for the tag, used for UI representation

---

### Tag an Artwork (`tagArtwork`)

Applies one or more existing tags to an artwork. This mutation does not create new tags, nor appends to existing tags; it assigns only the supplied tags and removes any tags not supplied. Specifying an empty array for `tagIds` will remove all tags from the artwork.

#### Example Mutation
```graphql
mutation {
  tagArtwork(input: { artworkId: "artwork-id", tagIds: ["tag1","tag2"] }) {
    resultPayloadType {
      result
    }
  }
}
```

**Returns:**
- `result` : OK

---

### Update Artwork Tag (`updateArtworkTag`)

Renames or updates an existing tag. The new name must also be unique.

#### Example Mutation
```graphql
mutation {
  updateArtworkTag(input: { color: "new color", id: "artwork-id", name: "new name" }) {
    resultPayloadType {
      result
    }
  }
}
```

**Returns:**
- `result` : OK

---

### Delete Artwork Tag (`deleteArtworkTag`)

Deletes a tag by ID. If the tag is still assigned to any artworks, a `ConflictException` will be return. To continue deletion, you **must** pass `force: true` to override.

#### Example Mutation
```graphql
mutation {
  deleteArtworkTag(input: { force: false, id: "artwork-id" }) {
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

| Mutation            | Description                                                           |
|---------------------|-----------------------------------------------------------------------|
| `createArtworkTag`  | Creates a new, uniquely named tag                                     |
| `tagArtwork`        | Assigns one or more existing tags to a specified artwork              |
| `updateArtworkTag`  | Renames an existing tag (new name must also be unique)                |
| `deleteArtworkTag`  | Deletes a tag (requires `force: true` if the tag is currently in use) |
