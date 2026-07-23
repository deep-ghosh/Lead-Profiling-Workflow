/**
 * Server-side delivery adapter for lead submissions.
 * 
 * Phase 1: Development adapter logs the payload and returns simulated success.
 * Phase 2: Production adapter forwards the validated payload to n8n webhook.
 * 
 * The n8n webhook URL is read from the server-only environment variable
 * N8N_LEAD_WEBHOOK_URL — never exposed to the browser.
 */

import type { LeadSubmissionPayload, LeadDeliveryAdapter, LeadDeliveryResult } from "./types";

// ---------------------------------------------------------------------------
// Development Adapter (no webhook configured)
// ---------------------------------------------------------------------------

class DevLeadDeliveryAdapter implements LeadDeliveryAdapter {
  async deliver(payload: LeadSubmissionPayload): Promise<LeadDeliveryResult> {
    console.log(
      "\n[DEV] Lead submission received (N8N_LEAD_WEBHOOK_URL not configured):"
    );
    console.log(JSON.stringify(payload, null, 2));
    console.log("[DEV] Simulating successful delivery.\n");

    return {
      accepted: true,
      referenceId: payload.requestId,
    };
  }
}

// ---------------------------------------------------------------------------
// Production Adapter (forwards to n8n webhook)
// ---------------------------------------------------------------------------

class WebhookLeadDeliveryAdapter implements LeadDeliveryAdapter {
  constructor(private readonly webhookUrl: string) {}

  async deliver(payload: LeadSubmissionPayload): Promise<LeadDeliveryResult> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.error(
          `[WEBHOOK] n8n returned ${response.status}: ${response.statusText}`
        );
        return { accepted: false, referenceId: payload.requestId };
      }

      return { accepted: true, referenceId: payload.requestId };
    } catch (error) {
      console.error("[WEBHOOK] Failed to deliver lead to n8n:", error);
      return { accepted: false, referenceId: payload.requestId };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createLeadDeliveryAdapter(): LeadDeliveryAdapter {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    return new WebhookLeadDeliveryAdapter(webhookUrl);
  }

  // In production without a webhook configured, we should not silently succeed.
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    // Return an adapter that rejects — production must have webhook configured
    return {
      async deliver(payload: LeadSubmissionPayload): Promise<LeadDeliveryResult> {
        console.error(
          "[PRODUCTION] N8N_LEAD_WEBHOOK_URL is not configured. Cannot deliver lead."
        );
        return { accepted: false, referenceId: payload.requestId };
      },
    };
  }

  return new DevLeadDeliveryAdapter();
}
