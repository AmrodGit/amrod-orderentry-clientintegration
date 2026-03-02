
# 🛠️ Support & Issue Reporting

## 📧 Client Support Channel

Once onboarding is completed, Amrod provides each client with access to **Jira**. Tickets are monitored by:

- **Amrod IT Technical Staff** – for technical troubleshooting and error analysis

---

## ⏱️ Support SLA

Amrod commits to the following **Service Level Agreement (SLA)** for support requests:

- **Response Time**: Within **1 business day** of receiving a support request  
- **Availability**: Business hours only (excluding public holidays and weekends)

---

## 🧪 Technical Issue Reporting

For **technical issues**, such as unexpected API responses, errors, or faults:

1. **Include full request and response context**
2. **Attach the `x-gateway-trace` ID** (see below)
3. **Specify the environment** (e.g., production, staging)

These should be logged for the **Amrod IT Technical Staff** via Jira.

---

## 🧵 Trace ID (`x-gateway-trace`)

All API responses include a unique trace identifier in the HTTP response headers, under:

```http
x-gateway-trace: <trace-id>
```

### What Is It?

- A **unique identifier** attached to every API request
- Used internally by Amrod's systems for **log tracing**, **performance monitoring**, and **error investigation**

### Why Include It?

When you submit a support request:
- Including the trace ID helps the Amrod team **locate your specific request** in the logs
- This significantly improves **troubleshooting speed and accuracy**

### Where to Find It?

In your HTTP client or middleware, inspect the response headers:

```http
HTTP/1.1 400 Bad Request
x-gateway-trace: 4f3a18e1-cb92-4c34-9db9-7a92dfae8e3e
Content-Type: application/json
...
```

> 📌 Always include this trace ID when reporting faults or unexpected behavior.

---

## 🔁 Common Support Scenarios

`TODO`: We currently do not have a list of common support scenarios, but we will update this section in the future.

---

## 📝 Best Practices

- Always capture and log the `x-gateway-trace` value for each API call
- Bundle request/response samples with error reports
- Be specific about the time and context of the issue
- Avoid sharing sensitive data unless requested via secure channels

---
