
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

## 🔑 Jira Onboarding Process

Before you can submit support tickets, you'll need to set up your Jira account.

### Step 1: Access the Jira Portal

1. Navigate to `<The supplied Jira portal URL>`
2. Enter your email address
3. Click **"Continue"**
4. You will receive an access code via email
5. Enter the verification code when prompted
6. Click **"Verify"**

### Step 2: Complete Your Profile

1. Enter your full name in the **"Full name"** field
2. Create a strong password in the **"Password"** field
3. Click **"Continue"**
4. You will be presented with the Help Centre login screen (you can log in or close the tab)

### Access Confirmation

Once completed, your Jira account is active and ready to use. You can now log support tickets through the Amrod Application Support portal.

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

## � Logging Support Tickets

Follow these steps to submit a support ticket in Jira:

### Accessing the Support Portal

1. Navigate to `<The supplied Jira support portal URL>`
2. Enter your email address
3. Click **"Next"**
4. Click **"Continue with Atlassian account"**
5. Select **"Application Support"** from the list
6. Select **"Amrod Application Support"**

### Required Fields

When creating a ticket, complete all of the following fields:

#### Summary (Required)
A brief, descriptive title of the issue. Example: "Order Entry API Returns 400 Error"

#### Description (Required)
Provide a detailed description of your issue. Include:

**For Technical Issues:**
- Full HTTP request and response context
- The **x-gateway-trace ID** attached to the response (from the HTTP headers)
- The **environment** where the issue occurred (e.g. UAT, Production)
- Any relevant error messages or response codes

**For User Acceptance Testing Issues:**
- Email address of the user experiencing the issue
- The affected product code/s
- Step-by-step description of actions taken that resulted in the issue
- Expected vs. actual behavior

#### Attachment (Recommended)
Include screenshots or videos documenting the issue:
- Always include **full screen screenshots**
- Include video recordings if the issue is difficult to reproduce
- You can attach multiple files

#### Department (Required)
**Always select:** `JHNet`

#### System (Required)
**Always select:** `Order Intake – Brandability`

#### Issue Component (Required)
**Always select:** `Order Entry`

#### Origination (Required)
**Always select:** `Business`

#### Pass or Fail
**Do not select anything** (leave blank)

### Submitting Your Ticket

1. Complete all required fields (Summary, Description, Department, System, Issue Component, Origination)
2. Add any attachments (screenshots or videos)
3. Click **"Send"**
4. A confirmation page will display with your ticket summary
5. Your ticket number will be shown at the top of the page with the prefix **"SUP-"** (example: SUP-12345)

### Tracking Your Ticket

- Use your ticket number (SUP-xxxxx) to reference the issue in follow-up communications
- Amrod IT Technical Staff will respond within 1 business day during business hours
- Monitor the ticket status for updates and responses

---

## �🔁 Common Support Scenarios

`TODO`: We currently do not have a list of common support scenarios, but we will update this section in the future.

---

## 📝 Best Practices

- Always capture and log the `x-gateway-trace` value for each API call
- Bundle request/response samples with error reports
- Be specific about the time and context of the issue
- Avoid sharing sensitive data unless requested via secure channels

---
