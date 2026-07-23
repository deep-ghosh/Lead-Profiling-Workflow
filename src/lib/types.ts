import type { PageVisit } from "@/hooks/usePageTracking";

export interface LeadFormData {
  name: string;
  email: string;
  company: string;
  query: string;
}

export interface LeadSubmissionPayload {
  formData: LeadFormData;
  honeypot: string;
  visitHistory: PageVisit[];
  submittedAt: string;
}

export interface FormSubmissionState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}
