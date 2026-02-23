# Logo Library - Documentation Index

Welcome to the Logo Library functional area documentation. This folder contains guides and references for managing digital artworks, folders, tags, and sharing permissions through the Amrod Logo Library API.

## Quick Navigation

### 📚 Start Here
- **[Logo Library Overview](./logo-library.md)** - Complete functional area guide with core concepts and capabilities

### 🎨 Artwork Management
- **[Manage Artwork](./manage-artwork.md)** - Create, upload, commit, update, and delete artworks
  - 3-step artwork lifecycle (create → upload → commit)
  - File upload with blob storage
  - MIME type validation and file size limits
  - Tagging and organizing artworks
  
- **[Query Artwork](./query-artwork.md)** - Search and retrieve artwork details
  - Query individual artworks
  - Retrieve artwork metadata and assets
  - Access sharing and permission information

- **[Artwork Retention](./artwork-retention.md)** - Archive and retention policies
  - Archiving published artworks
  - Retention schedules and lifecycle management

### 📁 Organization & Folders
- **[Manage Artwork Folders](./manage-artwork-folders.md)** - Create, organize, and manage folder hierarchies
  - Nested folder structures
  - Folder creation, renaming, and movement
  - Folder deletion and cleanup

- **[Query Artwork Folders](./query-artwork-folders.md)** - Retrieve folder structures and contents
  - Query folder hierarchies
  - Access folder metadata and child relationships
  - View folder organization

### 🏷️ Tags & Categorization
- **[Manage Artwork Tags](./manage-artwork-tags.md)** - Create and assign tags to artworks
  - Tag creation with color coding
  - Tagging and untagging artworks
  - Tag deletion and management

- **[Query Artwork Tags](./query-artwork-tags.md)** - Search and retrieve tag information
  - Query available tags
  - Filter artworks by tags
  - Tag-based search and categorization

### 🔐 Sharing & Access Control
- **[Manage Sharing](./manage-sharing.md)** - Control access and permissions for artworks and folders
  - Global library sharing
  - Artwork-level sharing
  - Folder-level sharing
  - Permission management (read-only vs read/write)

## Key Features Highlight

### 📤 Artwork Upload Workflow
The Logo Library uses a **3-step process** for uploading artworks:
1. **Create Draft** (`createArtwork`) - Initialize and get upload URI
2. **Upload Blob** - PUT file to provided upload URI
3. **Commit** (`commitArtwork`) - Finalize and publish artwork

See [Manage Artwork](./manage-artwork.md) for detailed information.

### 🔓 Fine-Grained Sharing Control
The Logo Library provides **three levels of sharing**:
- **Global** – Organization-wide access to entire library
- **Folder** – Share folder and all contents
- **Artwork** – Share individual artworks

Each with **granular permissions**: READ_ONLY or READ_WRITE

See [Manage Sharing](./manage-sharing.md) for detailed information.

## Common Tasks

| Task | Document |
|------|----------|
| Upload a new logo | [Manage Artwork](./manage-artwork.md) |
| Search for existing artwork | [Query Artwork](./query-artwork.md) |
| Organize artworks into folders | [Manage Artwork Folders](./manage-artwork-folders.md) |
| Tag artworks for categorization | [Manage Artwork Tags](./manage-artwork-tags.md) |
| Share artwork with team members | [Manage Sharing](./manage-sharing.md) |
| Share an entire folder | [Manage Sharing](./manage-sharing.md#folder-level-sharing) |
| Archive old artworks | [Artwork Retention](./artwork-retention.md) |
| Find artworks by tags | [Query Artwork Tags](./query-artwork-tags.md) |
| Check folder structure | [Query Artwork Folders](./query-artwork-folders.md) |
| Revoke shared access | [Manage Sharing](./manage-sharing.md#revoking-access) |

## API Reference

### GraphQL Schema
- **Main Schema**: `{ENV_BASE_URI}/graphql/schema.graphql`

### Available Environments
| Environment | ENV_BASE_URI | Use Case |
|-------------|-----|----------|
| Local | http://localhost:5000/ | Local development |
| Dev | https://moyo-dgw.dev.amrod.co.za/ | Development testing |
| QA | https://moyo-dgw.qa.amrod.co.za/ | Quality assurance |
| UAT | https://moyo-dgw.uat.amrod.co.za/ | User acceptance testing |

## Testing & Examples

### Bruno Collection
The `/samples/bruno/Logo Library/` folder contains example requests for all Logo Library operations, organized by function:

**Available Bruno Samples**:
- **Artwork** - Examples for:
  - Creating artwork sessions
  - Uploading artwork blobs
  - Committing artworks
  - Updating artwork details
  - Tagging artworks
  - Querying artworks
  - Deleting artworks

- **Folders** - Examples for:
  - Creating and managing folder hierarchies
  - Querying folder contents
  - Moving and renaming folders
  - Deleting folders

- **Tags** - Examples for:
  - Creating tags
  - Querying tags
  - Updating tags
  - Deleting tags

- **Sharing** - Examples for:
  - Enabling/disabling global sharing
  - Sharing artworks
  - Sharing folders
  - Revoking shares

**To use Bruno examples**:
1. Import the collection from `/samples/bruno/Logo Library/`
2. Select your environment (Local, Dev, QA, UAT)
3. Set environment variables as needed
4. Navigate to the appropriate folder to explore examples
5. Run requests to test API functionality

## Supported File Types

| MIME Type | Extensions | Format |
|-----------|-----------|--------|
| image/png | .png | Portable Network Graphics |
| image/jpeg | .jpg, .jpeg | JPEG Image |
| image/svg+xml | .svg | Scalable Vector Graphics |
| image/tiff | .tiff | Tagged Image File Format |
| application/pdf | .pdf | Portable Document Format |
| application/postscript | .eps | Encapsulated PostScript |
| application/x-coreldraw | .cdr | CorelDRAW |
| application/x-illustrator | .ai | Adobe Illustrator |
| application/x-photoshop | .psd | Adobe Photoshop |
| application/x-freehand | .fh | FreeHand |

**Maximum File Size**: 50 MB per artwork

## Related Documentation

- **[Order Entry](../order-entry/)** - Use artworks when placing orders
- **[Assets API](../assets.md)** - Retrieve artwork files and media
- **[Error Handling](../error-handling.md)** - Error codes and troubleshooting
- **[Authentication](../authentication.md)** - API authentication and security
- **[Support](../support.md)** - Getting help and support resources

## Global Concepts

### Artwork Lifecycle
```
Create Draft → Upload Blob → Commit → Tag & Organize → Share (Optional) → Use in Orders
```

### Sharing Workflow
```
Define Recipients → Grant Permissions → Share → Monitor Access → Revoke if Needed
```

## Tips & Best Practices

✅ **Do**:
- Organize artworks into logical folder structures before sharing
- Use consistent naming conventions for folders and artworks
- Apply tags to enable better search and categorization
- Use READ_ONLY permission for external recipients
- Regularly audit sharing permissions
- Test artwork uploads in non-production environments first
- Verify MIME types match file extensions during upload

❌ **Don't**:
- Skip the 30-minute commit window after creating artwork sessions
- Use mismatched MIME types between creation and upload
- Share production assets without proper approval
- Grant READ_WRITE access to external customers
- Upload files larger than 50 MB
- Leave abandoned draft artworks (they expire and auto-delete)
- Forget to organize artworks before sharing widely

## Workflow Examples

### Complete Artwork Lifecycle
```
1. Create Artwork Session → Get uploadUri
2. Upload File Blob → PUT to uploadUri with correct MIME type
3. Commit Artwork → Finalize and publish
4. Tag Artwork → Categorize with tags
5. Move to Folder → Organize in hierarchy
6. Share if Needed → Grant access to team/customers
7. Use in Orders → Reference when placing sales orders
```

### Folder-Based Organization
```
1. Create Root Folders → By brand, campaign, or client
2. Create Subfolders → By product line, year, or category
3. Organize Artworks → Move artworks to appropriate folders
4. Apply Tags → Cross-cutting categorization
5. Share Folders → Grant folder-level access to teams
6. Maintain Structure → Delete empty folders, archive old items
```

## Need Help?

- Check [Error Handling](../error-handling.md) for common error codes
- Review [Authentication](../authentication.md) for API access issues
- Consult the [Support](../support.md) page for contact information
- Examine Bruno collection examples in `/samples/bruno/Logo Library/`
- Review MIME type requirements in [Manage Artwork](./manage-artwork.md)
