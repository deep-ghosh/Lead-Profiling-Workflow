/**
 * POST /api/leads
 * 
 * Server-side endpoint for lead form submissions.
 * - Accepts JSON only
 * - Validates against shared schema
 * - Checks honeypot
 * - Rejects oversized requests
 * - Normalizes inputs
 * - Forwards to delivery adapter (n8n in Phase 2)
 * - Returns stable response format
 * - Never exposes internal errors to browser
 */

import { NextRequest } from "next/server";
import { leadPayloadSchema } from "@/lib/lead/schema";
import { createLeadDeliveryAdapter } from "@/lib/lead/delivery-adapter";
import type { LeadApiResponse } from "@/lib/lead/types";

// Maximum request body size (50KB — generous for a lead form)
const MAX_BODY_SIZE = 50 * 1024;

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // 1. Check content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return Response.json(
        { success: false, error: "Content-Type must be application/json" } satisfies LeadApiResponse,
        { status: 415 }
      );
    }

    // 2. Check request size
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return Response.json(
        { success: false, error: "Request too large" } satisfies LeadApiResponse,
        { status: 413 }
      );
    }

    // 3. Parse JSON body
    let body: unknown;
    try {
      const text = await request.text();
      if (text.length > MAX_BODY_SIZE) {
        return Response.json(
          { success: false, error: "Request too large" } satisfies LeadApiResponse,
          { status: 413 }
        );
      }
      body = JSON.parse(text);
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON" } satisfies LeadApiResponse,
        { status: 400 }
      );
    }

    // 4. Validate against schema
    const result = leadPayloadSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return Response.json(
        {
          success: false,
          error: firstError
            ? `Validation error: ${firstError.message}`
            : "Validation failed",
        } satisfies LeadApiResponse,
        { status: 422 }
      );
    }

    const payload = result.data;

    // 5. Deliver via adapter
    const adapter = createLeadDeliveryAdapter();
    const deliveryResult = await adapter.deliver({
      ...payload,
      // Ensure consent is typed correctly
      consent: { contactAllowed: true },
      // Ensure visitor optional fields
      visitor: {
        fullName: payload.visitor.fullName,
        email: payload.visitor.email,
        company: payload.visitor.company,
        ...(payload.visitor.jobRole ? { jobRole: payload.visitor.jobRole } : {}),
        ...(payload.visitor.phone ? { phone: payload.visitor.phone } : {}),
        ...(payload.visitor.companySize ? { companySize: payload.visitor.companySize } : {}),
      },
    });

    if (!deliveryResult.accepted) {
      return Response.json(
        {
          success: false,
          error: "We couldn't process your request right now. Please try again later.",
        } satisfies LeadApiResponse,
        { status: 503 }
      );
    }

    // 6. Return success
    return Response.json(
      {
        success: true,
        referenceId: deliveryResult.referenceId,
      } satisfies LeadApiResponse,
      { status: 200 }
    );
  } catch (error) {
    // Never expose internal errors
    console.error("[API /api/leads] Unexpected error:", error);
    return Response.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      } satisfies LeadApiResponse,
      { status: 500 }
    );
  }
}
