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

1. **Session tracking:** Meaningful section visits, the landing page, and
   attribution data are stored in `sessionStorage`. Section visits require at
   least 50% visibility for two seconds and are limited to five entries.
2. **Form processing:** The two-step form collects visitor and inquiry details.
   The client validates and normalizes the data, excludes empty optional fields,
   and adds journey and request metadata. Draft consent is never restored.
3. **API validation:** `POST /api/leads` accepts JSON requests up to 50 KB and
   validates the complete payload on the server. A honeypot, submission
   cooldown, safe error responses, and request timeouts provide additional
   safeguards.
4. **n8n delivery:** Validated leads are sent to the configured webhook using
   the secret header. Successful delivery returns a reference ID; failed or
   timed-out delivery returns `503`. Qualification, specialist routing, and
   downstream CRM or notification actions remain the responsibility of the
   n8n workflow.

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
