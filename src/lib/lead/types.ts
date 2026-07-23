/**
 * Core types for the lead-capture system.
 * These contracts define the data shapes for journey tracking,
 * form submission, and the token-efficient payload sent to the server.
 */

// ---------------------------------------------------------------------------
// Journey Tracking
// ---------------------------------------------------------------------------

export type PageVisit = {
  path: string;
  title: string;
  visitedAt: string;
  durationSeconds: number;
};

// ---------------------------------------------------------------------------
// Form Data (raw user input before normalization)
// ---------------------------------------------------------------------------

export interface LeadFormData {
  fullName: string;
  email: string;
  company: string;
  jobRole: string;
  phone: string;
  companySize: string;
  message: string;
  consent: boolean;
  honeypot: string;
}

// ---------------------------------------------------------------------------
// Submission Payload (sent to /api/leads)
// ---------------------------------------------------------------------------

export type LeadSubmissionPayload = {
  schemaVersion: "1.0";
  requestId: string;
  submittedAt: string;
  source: "website-lead-form";

  visitor: {
    fullName: string;
    email: string;
    company: string;
    jobRole?: string;
    phone?: string;
    companySize?: string;
  };

  inquiry: {
    message: string;
  };

  journey: {
    sessionId: string;
    landingPage: string;
    pageVisits: PageVisit[];
  };

  attribution: {
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };

  consent: {
    contactAllowed: true;
  };
};

// ---------------------------------------------------------------------------
// Form UI State
// ---------------------------------------------------------------------------

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface FormSubmissionState {
  status: FormStatus;
  errorMessage: string | null;
}

// ---------------------------------------------------------------------------
// Delivery Adapter (server-side, Phase 2 integration point)
// ---------------------------------------------------------------------------

export interface LeadDeliveryResult {
  accepted: boolean;
  referenceId: string;
}

export interface LeadDeliveryAdapter {
  deliver(payload: LeadSubmissionPayload): Promise<LeadDeliveryResult>;
}

// ---------------------------------------------------------------------------
// API Response
// ---------------------------------------------------------------------------

export interface LeadApiResponse {
  success: boolean;
  referenceId?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Company Size Options
// ---------------------------------------------------------------------------

export const COMPANY_SIZE_OPTIONS = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "501–1,000",
  "1,000+",
] as const;

export type CompanySize = (typeof COMPANY_SIZE_OPTIONS)[number];
