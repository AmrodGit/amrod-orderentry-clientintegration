
# 🔐 Authentication & Authorization

## Overview

The Amrod Order Entry Client Integration API is protected by secure authentication mechanisms that ensure only authorized users can access or manage artwork. It supports:

- **OAuth 2.0** – For secure access token-based authentication
- **Impersonation** – For managing artwork on behalf of another account (typically used by integrators)

These mechanisms are essential for maintaining **brand integrity**, controlling **data privacy**, and enforcing **usage rights**.

---

## 🔑 OAuth 2.0 Authentication

### Overview

All API requests must be authenticated using **OAuth 2.0 Bearer tokens** via the **Client Credentials** grant type.

The token must be included in every API request:

```http
Authorization: Bearer <access_token>
```

This applies to both **Integrator** and **User** accounts.

### OAuth Configuration

The API uses the following OAuth 2.0 configuration:

- **Grant Type**: `client_credentials`
- **Client ID**: Provided by Amrod on onboarding
- **Client Secret**: Provided by Amrod on onboarding
- **Token Endpoint**: PProvided by Amrod on onboarding
- **Scope**: `amrod.integration amrod.gateway`

### Client Secret Format

The client secret must be encoded as **Base64(IDP_USERNAME:IDP_SECRET)**:

```
Raw credentials: username:password
Base64 encoded:  base64(username:password)
```

**Example:**
If your username is `user@example.com` and secret is `mysecretpass`:
- Raw: `user@example.com:mysecretpass`
- Encoded: `dXNlckBleGFtcGxlLmNvbTpteXNlY3JldHBhc3M=`

### Getting a Bearer Token

Using Bruno (API client example):

1. **Configure Environment Variables** in your Bruno environment (Local.bru, Dev.bru, etc.):
```
IDP_TOKEN_URL=<your-token-endpoint>
IDP_CLIENT_ID=<your-client-id>
IDP_USERNAME=<your-username>
IDP_SECRET=<your-secret>
IDP_SCOPES=amrod.integration amrod.gateway
```

2. **The pre-request script automatically encodes the client secret:**
```javascript
// Read environment variables
const idpUsername = bru.getEnvVar('IDP_USERNAME');
const idpSecret = bru.getEnvVar('IDP_SECRET');
const clientSecretString = `${idpUsername}:${idpSecret}`;
const encodedClientSecret = btoa(clientSecretString);

// Set as environment variable for OAuth2 client_secret
bru.setEnvVar('IDP_CLIENT_SECRET', encodedClientSecret);
```

3. **Token Request** (automatic with auto_fetch_token enabled):
```http
POST {IDP_TOKEN_URL}
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id={IDP_CLIENT_ID}
&client_secret={base64(IDP_USERNAME:IDP_SECRET)}
&scope=amrod.integration%20amrod.gateway
```

4. **Token Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "amrod.integration amrod.gateway"
}
```

The token is valid for the specified `expires_in` duration (typically 1 hour). When it expires, request a new token using the same credentials.

### Using the Bearer Token

Include the access token in all subsequent API requests:

```http
GET /graphql HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "query": "..."
}
```

---

## 👁️ Discovering Your Identity & Impersonation Scope

### The `viewer` Query

Once authenticated, you can query the `viewer` endpoint to retrieve information about your authenticated identity and the scope of customers/contacts you can impersonate.

### Query Example

```graphql
query {
  viewer {
    identity
    identityType
    customer {
      code
      name
    }
    customerContact {
      id
      emailAddress
    }
    impersonationScope {
      code
      name
      customerContacts {
        id
        code
        emailAddress
        firstName
        lastName
      }
    }
  }
}
```

### Response Structure

The viewer query returns:

```json
{
  "data": {
    "viewer": {
      "identity": "user@example.com",
      "identityType": "Integrator",
      "customer": {
        "code": "INTEG001",
        "name": "Integrator Company"
      },
      "customerContact": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "emailAddress": "user@example.com"
      },
      "impersonationScope": [
        {
          "code": "CUST001",
          "name": "Customer A",
          "customerContacts": [
            {
              "id": "660e8400-e29b-41d4-a716-446655440001",
              "code": "CONT001",
              "emailAddress": "contact@customera.com",
              "firstName": "John",
              "lastName": "Doe"
            },
            {
              "id": "660e8400-e29b-41d4-a716-446655440002",
              "code": "CONT002",
              "emailAddress": "admin@customera.com",
              "firstName": "Jane",
              "lastName": "Smith"
            }
          ]
        },
        {
          "code": "CUST002",
          "name": "Customer B",
          "customerContacts": [...]
        }
      ]
    }
  }
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `identity` | String | Your authenticated username or email address |
| `identityType` | Enum | Your account type: `Service`, `User`, or `Integrator` |
| `customer` | Object | Your primary customer account (may be null) |
| `customerContact` | Object | Your contact information (may be null) |
| `impersonationScope` | Array | List of customers you can impersonate (only for Integrator accounts) |

### How to Use This Information

1. **Check Your Identity**: Ensure `identity` and `identityType` are correct
2. **Discover Customers**: Use `impersonationScope[].code` for future impersonation requests
3. **List Available Contacts**: Use `impersonationScope[].customerContacts[].id` and `code` for contact-level impersonation
4. **Plan Your Integration**: Store the customer codes and contact IDs for use in impersonation headers

---

## 🧭 Impersonation (Advanced Access Control)

Certain integrators operate on behalf of multiple clients. For this use case, the API supports **impersonation**, allowing a trusted integrator to securely manage another user's artwork.

### 🔁 How It Works

Impersonation is controlled via the custom HTTP header:

```http
x-gateway-impersonate: <Base64Encoded(ContactCode;CustomerCode)>
```

The header format is: **`Base64(ContactId;CustomerCode)`**

- **ContactId** – The unique identifier (UUID) for the contact, obtained from `viewer.impersonationScope[].customerContacts[].id`
- **CustomerCode** – The customer code, obtained from `viewer.impersonationScope[].code`

The two values are joined by a semicolon (`;`) and then **Base64 encoded**.

### 📦 Example

If the contact ID is `550e8400-e29b-41d4-a716-446655440001` and the customer code is `CUST001`, the raw string would be:

```
550e8400-e29b-41d4-a716-446655440001;CUST001
```

The Base64-encoded header becomes:

```
x-gateway-impersonate: NTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAxO0NVNVQWMDE=
```

### 💡 Obtaining Contact IDs and Customer Codes

1. **Authenticate** with your OAuth 2.0 credentials
2. **Query the viewer** to get your impersonation scope
3. **Extract** the customer codes and contact IDs from the response
4. **Format** as `Base64(ContactId;CustomerCode)` for the header

**Example in Bruno (pre-request script):**
```javascript
// Get impersonation details from environment or previous query results
const contactId = bru.getEnvVar('CONTACT_ID');
const customerCode = bru.getEnvVar('CUSTOMER_CODE');

// Concatenate with semicolon
const impersonationString = `${contactId};${customerCode}`;

// Encode in Base64
const encoded = btoa(impersonationString);

// Set the custom header for all subsequent requests
req.setHeader('x-gateway-impersonate', encoded);
```

### ⚠️ Security Notes

> ⚠️ This header should **only be used by approved Integrator accounts** with authorization to act on behalf of the specified user.
> 
> The impersonation scope returned by the `viewer` query defines exactly which customers and contacts you're authorized to impersonate. Attempting to impersonate customers outside your scope will result in an `AUTH_IMPERSONATION_DENIED` error.

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

### Token Management
- Always protect your OAuth access tokens; treat them like passwords
- Use short-lived access tokens where possible to minimize risk
- Never hardcode credentials in your codebase; use environment variables
- Rotate credentials regularly and revoke old tokens

### Impersonation Usage
- Only use impersonation if explicitly permitted by the API service
- Query the `viewer` endpoint on startup to discover your impersonation scope
- Cache the impersonation scope locally to avoid repeated API calls
- Validate customer codes and contact IDs before using them in requests
- Respect the impersonation scope—only impersonate users listed in your scope
- Log impersonation actions with trace IDs for audit trails

### Security & Privacy
- Never share your `IDP_CLIENT_ID`, `IDP_USERNAME`, or `IDP_SECRET` externally
- Never include credentials in logs or error messages
- Use HTTPS for all API requests
- Keep audit logs of which customer/contact is accessed by which integrator account
- Regularly review your impersonation scope and remove unnecessary permissions

### Implementation Patterns
- Implement token refresh logic to handle expired tokens gracefully
- Use exponential backoff for retry logic on token endpoint failures
- Cache the `viewer` query result and refresh periodically (e.g., every hour)
- Structure your authentication layer to support multiple environments (Local, Dev, QA, UAT)

---

## 🔧 Troubleshooting Common Authentication Issues

### Problem: Valid Token Received, But API Still Returns Authentication Errors

**Symptoms:**
- OAuth token endpoint returns a successful 200 response with an access token
- Token can be decoded and appears valid
- GraphQL API requests still return authentication/authorization errors
- Examples: `UnauthorizedException`, `AUTH_IMPERSONATION_DENIED`, or "Insufficient permissions" errors

**Most Common Cause: Incorrect OAuth Scopes**

The scopes in your OAuth token request must match the required scopes for API access. Without the correct scopes, your token will not include the necessary role claims that authorize you to access the API.

**Solution:**

1. **Verify Your Scopes in Token Request:**
   - Ensure your token request includes: `scope=amrod.integration%20amrod.gateway`
   - Both scopes must be present (space-separated)
   - Check your Bruno environment configuration:
   ```
   IDP_SCOPES=amrod.integration amrod.gateway
   ```

2. **Verify the Token Contains Required Roles:**
   - Decode your JWT token at [jwt.io](https://jwt.io)
   - Check the `scope` or `roles` claim in the token payload
   - It should include both `amrod.integration` and `amrod.gateway`
   
   **Example token payload:**
   ```json
   {
     "iss": "https://your-idp.com",
     "sub": "your-client-id",
     "scope": "amrod.integration amrod.gateway",
     "iat": 1704067200,
     "exp": 1704070800
   }
   ```

3. **Check the API Error Response:**
   - Review the GraphQL error messages for role information
   - Look for error codes like `AUTH_INSUFFICIENT_PERMISSIONS` or mentions of required roles
   - The error message may indicate which roles are needed (e.g., "DG-Order-Entry", "DG-Dashboard")

**Example Error Response:**
```json
{
  "errors": [
    {
      "message": "Access denied. The current user does not have the required permissions.",
      "extensions": {
        "code": "AUTH_INSUFFICIENT_PERMISSIONS",
        "roles": ["DG-Order-Entry", "DG-Dashboard"]
      }
    }
  ]
}
```

### Secondary Cause: Insufficient User Access (Less Common)

In rare cases, your credentials may be valid and scopes may be correct, but the authenticated user account has not been granted access to the API.

**Symptoms:**
- Token is generated successfully with correct scopes
- `viewer` query returns your identity
- All subsequent API queries fail with authorization errors
- All team members experience the same issue

**Solution:**

1. **Verify with Support:**
   - Contact Amrod support with your client ID and trace ID (from API response headers)
   - Confirm that your service account has been provisioned with appropriate roles
   - Request an access grant if your account is new or hasn't been fully provisioned

2. **Check Account Status:**
   - Verify the account is active in the identity provider
   - Ensure the account hasn't been disabled or revoked
   - Check if the account is assigned to the correct customer group

### Debugging Checklist

When troubleshooting authentication issues, verify the following in order:

- [ ] **Credentials Valid?** Can you authenticate successfully at the IDP token endpoint?
- [ ] **Token Generated?** Does the OAuth token endpoint return a 200 response with `access_token`?
- [ ] **Scopes Correct?** Does the token include `amrod.integration` and `amrod.gateway` scopes?
- [ ] **Token Not Expired?** Check `exp` claim in JWT; use `expires_in` from response to track expiration
- [ ] **Bearer Header Correct?** Is the Authorization header formatted as `Bearer {access_token}` (with space)?
- [ ] **Viewer Query Works?** Can you successfully execute the `viewer` query?
- [ ] **Impersonation Header Correct?** Is the `x-gateway-impersonate` header properly Base64 encoded?
- [ ] **Account Provisioned?** Has your service account been granted access by an administrator?

### Getting Help

If you continue to experience authentication issues after working through the above checklist:

1. **Gather Information:**
   - The exact error message from the API
   - The HTTP trace ID from response headers (for support correlation)
   - Your decoded JWT token payload (be careful not to share the token itself)
   - The exact scopes you requested

2. **Contact Support:**
   - Reference the [Support](./support.md) guide for escalation procedures
   - Include the trace ID in your support request for faster investigation
   - Provide a minimal reproducible example (e.g., a Bruno request that fails)

---