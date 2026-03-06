# 🗂️ Artwork Retention & Lifecycle Policy

## Overview

To ensure efficient storage management and compliance with branding lifecycle practices, the Logo Library enforces **automatic retention rules** on all stored Artwork.

This policy is important for developers and administrators to understand when managing long-term branding assets.

---
## 📅 Retention Periods

| Artwork State    | Retention Window               | Trigger for Expiry                     |
|------------------|--------------------------------|----------------------------------------|
| **Published**     | 1 year since last used         | Automatically deleted after 1 year of inactivity |
| **Unpublished**   | 30 minutes after creation      | Deleted if not published within 30 minutes |

---

## ✅ What Counts as "Last Used"?

The **"last used" timestamp** is updated when either of the following happens:

- The artwork is **created** (i.e., first added to the system)
- The artwork is **attached to an order**

This means that each time an artwork is used in a real business context (order fulfillment, branded product), its retention clock is refreshed.

---

## 🚫 What Does *Not* Count as Usage?

The following actions **do not** extend the life of an artwork:

- Editing the artwork metadata (e.g. renaming, tagging)
- Moving the artwork to a different folder
- Sharing the artwork with other users
- Updating permissions or tags

These changes are considered administrative and do **not** reflect usage in production contexts.

---

## 🧼 Automatic Cleanup

Once an artwork exceeds its 1-year inactivity threshold, it becomes **eligible for deletion**.

The deletion process may occur in batch cleanup jobs and is not reversible once the file is permanently removed.

---

## ⏳ Unpublished Artwork

When artwork is created using the `createArtwork` mutation, but not yet published, it is considered **unpublished**.

### Retention Rule:
- The system allows **30 minutes** from the time of creation to complete the file upload and **publish** the artwork.
- If the artwork remains unpublished beyond that window, it will be **automatically deleted**.

This ensures temporary or abandoned uploads do not clutter the system or consume unnecessary storage.

---

## 🔁 Best Practices

- **Publish artwork promptly** after uploading to prevent early expiration.
- **Reuse published artwork** on orders to ensure continued retention.
- **Avoid using the library as long-term archival**; offload old assets if historical preservation is needed.

---