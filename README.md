# Lead Automation

A Next.js application for capturing business inquiries and routing qualified leads to the appropriate Eubrics specialist through n8n.

## Workflow

1. The application records relevant page and section activity in the visitor's session.
2. The visitor submits the two-step contact form.
3. The client normalizes the form data and adds journey and attribution context.
4. `POST /api/leads` validates the request and applies submission safeguards.
5. The validated lead is forwarded to the configured n8n webhook.
6. The visitor receives a confirmation with a reference ID.

[Watch the workflow demonstration](https://www.youtube.com/watch?v=O2aY8UsG_Do)

## Internal Flow

### 1. Session context

`SectionTracker` observes the main solution and contact sections. A section is
recorded only after at least 50% of it has been visible for two seconds. Time is
paused while the browser tab is hidden, repeated visits are merged, and only
five visits are retained in `sessionStorage`.

The first landing page, referrer, and available UTM parameters are also
captured as first-party session context. No tracking request is sent while the
visitor is browsing. Journey data is attached only when the form is submitted;
the current payload builder reads attribution from the active page URL at that
time.

### 2. Form and payload construction

The first form step collects the visitor's name, work email, and company. The
second collects the business challenge, optional role, company size and phone,
plus explicit contact consent. A draft is kept in `sessionStorage` for error
recovery, but the honeypot value and consent are never restored.

Before submission, the client:

- validates each step with the shared Zod rules;
- normalizes whitespace, email casing, and phone characters;
- removes empty optional fields;
- merges duplicate journey entries and limits the journey to five items;
- assigns a session ID and a request ID; and
- reuses the same request ID if the visitor retries a failed request.

The resulting request has this shape:

```json
{
  "schemaVersion": "1.0",
  "requestId": "lead_<uuid>",
  "submittedAt": "<ISO timestamp>",
  "source": "website-lead-form",
  "visitor": {
    "fullName": "Jane Smith",
    "email": "jane@company.com",
    "company": "Acme Corp",
    "jobRole": "Head of Sales",
    "phone": "+1 555 123 4567",
    "companySize": "51–200"
  },
  "inquiry": {
    "message": "We want to improve sales qualification and follow-up."
  },
  "journey": {
    "sessionId": "sess_<uuid>",
    "landingPage": "/",
    "pageVisits": [
      {
        "path": "/sales-bots",
        "title": "AI Sales Bots",
        "visitedAt": "<ISO timestamp>",
        "durationSeconds": 18
      }
    ]
  },
  "attribution": {
    "referrer": "https://example.com/",
    "utmSource": "linkedin",
    "utmMedium": "social",
    "utmCampaign": "spring"
  },
  "consent": {
    "contactAllowed": true
  }
}
```

Optional visitor and attribution fields may be absent.

### 3. API validation and safeguards

The browser sends the payload to `POST /api/leads` as JSON and stops waiting
after 15 seconds. The API accepts JSON only, rejects bodies larger than 50 KB,
parses the body safely, and validates the full payload again on the server.
The form also includes a honeypot and a short client-side submission cooldown.
Validation details are returned to the form, while unexpected internal errors
are logged on the server and replaced with a generic browser-safe message.

### 4. n8n delivery and response

The server-side delivery adapter sends the validated payload to
`N8N_LEAD_WEBHOOK_URL` with `N8N_WEBHOOK_SECRET` in the
`x-webhook-secret` header. The webhook request has a 10-second timeout. A
successful 2xx response produces a success result and reference ID; a timeout,
network error, or non-2xx response produces a retryable `503` response.

This repository owns capture, validation, and secure delivery. The configured
n8n workflow is expected to own downstream operations such as authenticating
the webhook, deduplicating by `requestId`, qualifying the inquiry, routing it to
the appropriate specialist, and triggering any CRM or notification actions.
The exact n8n node flow is not stored in this repository and should be
documented alongside the exported n8n workflow when one is added.

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
N8N_LEAD_WEBHOOK_URL=your_n8n_webhook_url
N8N_WEBHOOK_SECRET=your_webhook_secret
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

When webhook variables are omitted in development, submissions are logged locally and return a simulated success response. Both variables are required in production.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Technology

| Technology | Version | Purpose |
| --- | --- | --- |
| Next.js | 16.2.11 | Application framework, routing, and server-side API |
| React | 19.2.4 | Component-based user interface |
| TypeScript | 5 | Static typing and shared data contracts |
| Tailwind CSS | 4 | Styling and responsive presentation |
| Zod | 4.4.3 | Client-side and server-side validation |
| Framer Motion | 12.42.2 | Form transitions and interface animation |
| n8n | Externally managed | Lead qualification, routing, and downstream automation |

## Final Note

The application is ready for local development with simulated lead delivery.
Before deploying to production, configure both webhook environment variables
and verify the complete n8n workflow from capture through specialist routing.
