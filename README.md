# 🎨 Logo Library API – Overview

## Table of Contents

- [Artwork Retention](docs/artwork-retention.md)
- [Error Handling](docs/error-handling.md)
- [Authentication](docs/authentication.md)
- [Support](docs/support.md)
- [Manage Artwork](docs/manage-artwork.md)
- [Query Artwork](docs/query-artwork.md)
- [Manage Artwork Folders](docs/manage-artwork-folders.md)
- [Query Artwork Folders](docs/query-artwork-folders.md)
- [Manage Artwork Tags](docs/manage-artwork-tags.md)
- [Query Artwork Tags](docs/query-artwork-tags.md)

## Purpose

The **Logo Library API** enables applications to manage a central repository of branding assets (e.g. logos) that can be used when placing product orders. These assets are referred to as **Artwork** and are intended for scenarios where products must be customized or branded with customer-specific visuals.

This API allows developers to:

- Upload and manage artwork files (logos, brand images)
- Organize artwork into folders
- Tag artwork for better classification
- Share artwork securely across contacts and accounts
- Control the lifecycle of artwork (draft → published)

The Logo Library ensures that artwork can be centrally stored, re-used, and audited across different teams and systems.

---

## Core Concepts

### 🎨 Artwork
An **Artwork** represents an individual branding asset, typically an image (e.g. PNG, JPEG, SVG). Each artwork record holds metadata such as its name, description, tags, status, and associated file URLs.

Artworks are central to the Logo Library and can be:
- Created and uploaded
- Moved between folders
- Tagged and filtered
- Marked as published or deleted

### 📂 ArtworkFolder
**ArtworkFolders** are used to group artwork logically, like directories on a file system. This helps users organize logos by client, campaign, year, or product line.

Folders can be nested and are identified by their unique IDs.

### 🏷️ ArtworkTag
**ArtworkTags** provide a flexible way to categorize artwork. Unlike folders, multiple tags can be assigned to a single artwork. Tags are useful for searching, filtering, and segmenting branding assets based on themes or metadata.


## 🔐 Sharing & Permissions

The Logo Library supports a powerful **sharing system**, enabling collaboration across contacts and linked accounts **within the same organization**.

### Levels of Sharing

Sharing can be configured at three levels:

- **Artwork level** – Share a specific logo or asset
- **Folder level** – Share all artwork within a folder
- **Library level (Global Sharing)** – Share all artwork in your library organization-wide

### Types of Access

For each shared entity, permissions can be granted as:

- **Read-only** – View/download only
- **Read/Write** – Edit, tag, move, or delete the artwork

This enables fine-grained control over how and with whom branding assets are distributed.

> 💡 All shared objects are permission-aware. Users will only see or interact with assets they have access to.

---

## 🔄 Common Operations

Here are the typical actions developers can perform with the Logo Library API:

- List, view, or search existing artwork
- Upload new branding assets
- Organize artwork into nested folders
- Assign or remove tags
- Move or delete artwork
- Publish artwork for use with orders

---
