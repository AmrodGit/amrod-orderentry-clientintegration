
# ❗ Error Handling in the Logo Library API

## Overview

All responses from the Logo Library GraphQL API — including those with errors — return an HTTP status code of **200 OK**. This includes cases of validation failure, authentication problems, and permission issues.

Errors are returned inside the GraphQL response body, in the standard `errors` field.

---

## 📦 GraphQL Error Envelope

All GraphQL error responses follow this structure:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Description of the error",
      "extensions": {
        "code": "ERROR_CODE"
      }
    }
  ]
}
```

---

## 🔐 Authentication Errors

Authentication and authorization failures **do not** result in HTTP 401 or 403 responses. Instead:

- The API responds with HTTP **200 OK**
- The error details appear in the `errors` field
- The `extensions.code` field will contain the specific failure reason

### Example

```json
{
  "errors": [
    {
      "message": "Access token is invalid or expired.",
      "extensions": {
        "code": "AUTH_TOKEN_INVALID"
      }
    }
  ]
}
```

---

## 🧭 Impersonation Errors

Impersonation-related errors are also surfaced in the GraphQL `errors` field.

### Error Codes

| Code                        | Message                                                                 |
|-----------------------------|-------------------------------------------------------------------------|
| `AUTH_IMPERSONATION_REQUIRED` | "Impersonation is required to perform this action. Required Header 'x-gateway-impersonate' missing or invalid." |
| `AUTH_IMPERSONATION_DENIED`   | "Impersonation denied. You do not have permission to impersonate this user." |

These do **not** return a 403 Forbidden. The HTTP response remains `200 OK`.

---

## 🧨 Common Mutation Exceptions

All mutations may return one of the following domain-specific exception types:

### BadRequestException (400)

Occurs when the request is malformed or missing required information.

```graphql
type BadRequestException implements Error {
  additionalData: [KeyValuePairOfStringAndString!]
  code: Long!
  errorDetail: String
  message: String!
}
```

**Fields:**

- **additionalData** (`[KeyValuePairOfStringAndString!]`): Gets or sets additional data associated with the object as key-value pairs.
- **code** (`Long!`): Gets the error code associated with the exception.
- **errorDetail** (`String`): Gets the detailed error message associated with the current operation.
- **message** (`String!`): Gets the error message associated with the exception.

### ConflictException (409)

Occurs when a request would result in a resource conflict, such as a duplicate unique key or a concurrency violation.

```graphql
type ConflictException implements Error {
  additionalData: [KeyValuePairOfStringAndString!]
  code: Long!
  errorDetail: String
  message: String!
}
```

**Fields:**

- **additionalData** (`[KeyValuePairOfStringAndString!]`): Gets or sets additional data associated with the object as key-value pairs.
- **code** (`Long!`): Gets the error code associated with the exception.
- **errorDetail** (`String`): Gets the detailed error message associated with the current operation.
- **message** (`String!`): Gets the error message associated with the exception.

### InputValidationException (400)

Occurs when an input parameter fails validation rules.

```graphql
type InputValidationException implements Error {
  additionalData: [KeyValuePairOfStringAndString!]
  code: Long!
  errorDetail: String
  message: String!
  parameterName: String!
}
```

**Fields:**

- **additionalData** (`[KeyValuePairOfStringAndString!]`): Gets or sets additional data associated with the object as key-value pairs.
- **code** (`Long!`): Gets the error code associated with the exception.
- **errorDetail** (`String`): Gets the detailed error message associated with the current operation.
- **message** (`String!`): Gets the error message associated with the exception.
- **parameterName** (`String!`): Gets the name of the parameter that failed validation.

### NotFoundException (404)

Occurs when a requested resource cannot be found.

```graphql
type NotFoundException implements Error {
  additionalData: [KeyValuePairOfStringAndString!]
  code: Long!
  errorDetail: String
  message: String!
}
```

**Fields:**

- **additionalData** (`[KeyValuePairOfStringAndString!]`): Gets or sets additional data associated with the object as key-value pairs.
- **code** (`Long!`): Gets the error code associated with the exception.
- **errorDetail** (`String`): Gets the detailed error message associated with the current operation.
- **message** (`String!`): Gets the error message associated with the exception.


## 🔎 Best Practices for Error Handling

- Always inspect the `errors` array in the GraphQL response.
- Log the `extensions.code` value and error `message`.
- Do not rely on HTTP status codes for control flow.
- Include the `x-gateway-trace` value from the response header in support queries.

---

## Implementation Notes

Most Mutations in the Logo Library API will return errors using all / some of the above exception types. Check the Schema on Possible errors that can be returned.

All Errors implement these common fields:

- `errorDetail`: A detailed description of the error.
- `code`: A numeric error code. This mimics HTTP status codes but is specific to the API.
- `__typename`: The type of error, which can be used to differentiate between different error types in the client code. This is a standard GraphQL field that helps identify the error type.

A typical mutation implementation handling common errors can look something like below:

```graphql
 errors {
      __typename
      ... on ConflictException {
        errorDetail
        code
      }
      ... on ImpersonationRequiredException {
        errorDetail
        code
      }
      ... on InputValidationException {
        errorDetail
        code
      }
      ... on NotFoundException {
        code
        errorDetail
      }
    }
```