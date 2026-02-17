## Artwork Management

This guide describes how to manage Artworks using the Logo Library GraphQL API. The artwork lifecycle includes creation, file upload, publishing, updating, and deletion. 

### Artwork Lifecycle Overview

Managing an Artwork in the Logo Library involves a **3-step process**:

1. **Create Draft Artwork (`createArtwork`)**
2. **Upload the Artwork File (Blob)**
3. **Commit/Publish the Artwork (`commitArtwork`)**

---

### Supported Artwork Mime Types

The Logo Library supports the following MIME types for Artwork files:

| Type                     | Description                          | File Extensions |
|--------------------------|--------------------------------------|------------------|
| `image/png`              | Portable Network Graphics            | .png            |
| `image/svg+xml`          | Scalable Vector Graphics              | .svg            |
| `image/jpeg`             | JPEG Image                           | .jpeg |
| `image/jpg`              | JPEG Image                           | .jpg |
| `image/tiff`             | Tagged Image File Format             | .tiff, |
| `application/pdf`        | Portable Document Format             | .pdf          |
| `application/postscriptimage/x-eps` | Encapsulated PostScript | .eps |
| `application/x-coreldraw`| CorelDRAW File                       | .cdr |
| `application/pdf` | Adobe Illustrator File        | .ai |
| `application/x-photoshop` | Adobe Photoshop File                | .psd |
| `application/x-freehand` | FreeHand File                       | .fh |

### Limitations

Artwork files must not exceed **50 MB** in size. Larger files will result in an error during upload.

### 1. Create Draft Artwork (`createArtwork`)

Initializes a new Artwork object in draft mode. The mutation returns an upload URL and a unique `artworkId`. The artwork is **not yet visible** in the system until it is committed.

#### Notes:
- You must upload the file using the provided blob URL before committing.
- Tagging is **optional** during creation. Tags can be added or modified later.

### ⚠️ Important

- The Artwork name is not treated as unique within the Library.
- The Artwork is not available for use until it is committed.
- The Artwork must be committed within **30** minutes of creation, or it will expire and be deleted.

#### Example Mutation
```graphql
mutation {
  createArtwork(
    input: {
      folder: "folder-id-123"
      mimeType: "image/png"
      description: null
      extension: "png"
      name: "artwork name"
      type: LOGO
    }
  ) {
    artworkSession {
      id
      uploadUri
      headers {
        key
        value
      }
    }
  }
}
```

**Returns:**
- `id`: Artwork identifier
- `uploadUri`: Temporary URL to which the binary file should be uploaded
- `headers`: A list of headers to include in the upload request (if required by the implemented storage service)

---

### 2. Upload the Blob

After receiving the `uploadUri`, upload the binary file (e.g., PNG or SVG) to this URL using an HTTP PUT request.

#### Example (cURL):
```bash
curl -X PUT -T ./logo.png "https://upload-url-from-createArtwork"
```

**Important:** You must complete this step before committing the artwork.

---

### 3. Commit Artwork (`commitArtwork`)

This mutation finalizes and publishes the Artwork to the system. After committing, the Artwork is available for use.
Validation checks are performed to ensure the file was uploaded correctly, falls within size limits, and has the correct MIME type. Artwork that fails validation will not be committed and will be deleted after 30 minutes.

#### Example Mutation
```graphql
mutation {
  commitArtwork(input: { id: "artwork-id-123", tagIds: ["tag1", "tag2"] }) {
    resultPayloadType {
      result
    }
  }
}

```

**Returns:**
- `result`: OK

---

### Update Artwork (`updateArtwork`)

Allows changing the name or description of an existing Artwork. It does **not** allow changing the file blob. 

#### Notes: 

The Artwork Library does not support modifying the file after it has been committed and requires a new upload for any file changes.

#### Example Mutation
```graphql
mutation {
  updateArtwork(
    input: {
      id: "artwork-id-123"
      name: "Logo Final"
      description: "artwork description"
    }
  ) {
    resultPayloadType {
      result
    }
  }
}
```

---

### Delete Artwork (`deleteArtwork`)

Removes the Artwork. This action is soft-deletion, meaning the Artwork is marked as deleted but not permanently removed from the system. Restoring the Artwork is not supported via the API and requires manual intervention by support.

#### Example Mutation
```graphql
mutation {
  deleteArtwork(input: { id: "artwork-id-123" }) {
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

| Mutation        | Description                                      |
|-----------------|--------------------------------------------------|
| `createArtwork` | Creates a draft artwork and returns upload URL   |
| `commitArtwork` | Publishes the artwork after file upload          |
| `updateArtwork` | Edits metadata (name, tags, folder)              |
| `deleteArtwork` | Permanently deletes an artwork                   |
