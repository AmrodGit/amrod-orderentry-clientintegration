
# 🔐 Authentication & Authorization

## Overview

The Logo Library API is protected by secure authentication mechanisms that ensure only authorized users can access or manage artwork. It supports:

- **OAuth 2.0** – For secure access token-based authentication
- **Impersonation** – For managing artwork on behalf of another account (typically used by integrators)

These mechanisms are essential for maintaining **brand integrity**, controlling **data privacy**, and enforcing **usage rights**.

---

## 🔑 OAuth 2.0

All API requests must be authenticated using **OAuth 2.0 Bearer tokens**.

You must acquire an access token via the API provider’s token endpoint and include it in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

This applies to both **Integrator** and **User** accounts.

---

## 🧭 Impersonation (Advanced Access Control)

Certain integrators operate on behalf of multiple clients. For this use case, the API supports **impersonation**, allowing a trusted integrator to securely manage another user's artwork.

### 🔁 How It Works

Impersonation is controlled via the custom HTTP header:

```http
x-gateway-impersonate: <Base64Encoded(ContactCode;CustomerCode)>
```

- `ContactCode` – The unique identifier for the contact (user)
- `CustomerCode` – The unique identifier for the customer account

The two values are joined by a semicolon (`;`) and then **Base64 encoded**.

### 📦 Example

If the contact code is `U123456` and the customer code is `C789012`, the raw string would be:

```
U123456;C789012
```

The Base64-encoded header becomes:

```
x-gateway-impersonate: VTEyMzQ1NjtDNzg5MDEy
```

> ⚠️ This header should **only be used by approved Integrator accounts** with authorization to act on behalf of the specified user.

---

## 👥 Account Types

Each account in the Logo Library ecosystem is classified as one of the following:

### 🧩 Integrator Account

- Can manage artwork **for multiple User accounts**
- Uses **impersonation** to act on behalf of other accounts
- Typically used by:
  - Order integrators
  - Branding service providers
  - Multi-brand portals

### 👤 User Account

- Can manage artwork **only for their own account**
- Cannot impersonate or access other accounts
- Typically used by:
  - End customers
  - Internal brand teams
  - Self-service users

This distinction enforces **role-based access control** while enabling scalable delegation where appropriate.

---

## 🔐 Best Practices

- Always protect your OAuth access tokens; treat them like passwords
- Only use impersonation if explicitly permitted by the API service
- Never share your `ContactCode` or `CustomerCode` externally
- Use short-lived access tokens where possible to minimize risk
- Keep audit logs of which artwork is accessed by which account

---