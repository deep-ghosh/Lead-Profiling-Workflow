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

Next.js 16, React 19, TypeScript, Tailwind CSS, Zod, Framer Motion, and n8n.
