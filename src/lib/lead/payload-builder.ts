/**
 * Builds the token-efficient LeadSubmissionPayload from form data,
 * journey tracking, and attribution data.
 */

import type { LeadSubmissionPayload, LeadFormData, PageVisit } from "./types";
import { normalizeEmail, normalizePhone, normalizeText } from "./normalize";

// ---------------------------------------------------------------------------
// ID Generation
// ---------------------------------------------------------------------------

function generateRequestId(): string {
  return `lead_${crypto.randomUUID()}`;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const key = "eubrics_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `sess_${crypto.randomUUID()}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

// ---------------------------------------------------------------------------
// Journey Compression
// ---------------------------------------------------------------------------

/**
 * Compress page visits: merge duplicates, cap at 5, sort by visitedAt.
 */
function compressJourney(visits: PageVisit[]): PageVisit[] {
  const merged = new Map<string, PageVisit>();

  for (const visit of visits) {
    const existing = merged.get(visit.path);
    if (existing) {
      // Merge: keep earliest visitedAt, accumulate duration
      existing.durationSeconds += visit.durationSeconds;
      if (visit.visitedAt < existing.visitedAt) {
        existing.visitedAt = visit.visitedAt;
      }
    } else {
      merged.set(visit.path, { ...visit });
    }
  }

  return Array.from(merged.values())
    .sort((a, b) => a.visitedAt.localeCompare(b.visitedAt))
    .slice(0, 5);
}

// ---------------------------------------------------------------------------
// Landing Page
// ---------------------------------------------------------------------------

function getLandingPage(): string {
  if (typeof window === "undefined") return "/";
  const key = "eubrics_landing_page";
  let page = sessionStorage.getItem(key);
  if (!page) {
    page = window.location.pathname;
    sessionStorage.setItem(key, page);
  }
  return page;
}

// ---------------------------------------------------------------------------
// Attribution
// ---------------------------------------------------------------------------

function getAttribution(): LeadSubmissionPayload["attribution"] {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    referrer: document.referrer || undefined,
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
}

// ---------------------------------------------------------------------------
// Payload Builder
// ---------------------------------------------------------------------------

let cachedRequestId: string | null = null;

/** Get or create a request ID. Reuse during retries. */
export function getRequestId(): string {
  if (!cachedRequestId) {
    cachedRequestId = generateRequestId();
  }
  return cachedRequestId;
}

/** Clear the request ID after a successful submission. */
export function clearRequestId(): void {
  cachedRequestId = null;
}

export function buildLeadPayload(
  formData: LeadFormData,
  pageVisits: PageVisit[]
): LeadSubmissionPayload {
  const visitor: LeadSubmissionPayload["visitor"] = {
    fullName: normalizeText(formData.fullName),
    email: normalizeEmail(formData.email),
    company: normalizeText(formData.company),
  };

  if (formData.jobRole?.trim()) {
    visitor.jobRole = normalizeText(formData.jobRole);
  }
  if (formData.phone?.trim()) {
    visitor.phone = normalizePhone(formData.phone);
  }
  if (formData.companySize) {
    visitor.companySize = formData.companySize;
  }

  return {
    schemaVersion: "1.0",
    requestId: getRequestId(),
    submittedAt: new Date().toISOString(),
    source: "website-lead-form",

    visitor,

    inquiry: {
      message: normalizeText(formData.message),
    },

    journey: {
      sessionId: getSessionId(),
      landingPage: getLandingPage(),
      pageVisits: compressJourney(pageVisits),
    },

    attribution: getAttribution(),

    consent: {
      contactAllowed: true,
    },
  };
}
