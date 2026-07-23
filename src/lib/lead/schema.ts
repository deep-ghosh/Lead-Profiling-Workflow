/**
 * Zod validation schema for lead form submissions.
 * Shared between client-side and server-side validation.
 */

import { z } from "zod";
import { COMPANY_SIZE_OPTIONS } from "./types";

// ---------------------------------------------------------------------------
// Field Schemas
// ---------------------------------------------------------------------------

export const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name must be 80 characters or fewer");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(254, "Email must be 254 characters or fewer")
  .email("Please enter a valid email address");

export const companySchema = z
  .string()
  .trim()
  .min(2, "Company name must be at least 2 characters")
  .max(120, "Company name must be 120 characters or fewer");

export const jobRoleSchema = z
  .string()
  .trim()
  .max(100, "Job role must be 100 characters or fewer")
  .optional()
  .or(z.literal(""));

export const phoneSchema = z
  .string()
  .trim()
  .max(30, "Phone number must be 30 characters or fewer")
  .refine(
    (val) => {
      if (!val || val.length === 0) return true;
      // Allow digits, spaces, hyphens, plus, parentheses, dots
      return /^[+\d\s\-().]{0,30}$/.test(val);
    },
    { message: "Please enter a valid phone number" }
  )
  .optional()
  .or(z.literal(""));

export const companySizeSchema = z
  .enum(COMPANY_SIZE_OPTIONS)
  .optional()
  .or(z.literal(""));

export const messageSchema = z
  .string()
  .trim()
  .min(20, "Please provide at least 20 characters describing your needs")
  .max(1500, "Message must be 1,500 characters or fewer");

export const consentSchema = z.literal(true, {
  error: "You must agree to be contacted",
});

export const honeypotSchema = z
  .string()
  .max(0, "Invalid submission")
  .optional()
  .or(z.literal(""));

// ---------------------------------------------------------------------------
// Combined Form Schema
// ---------------------------------------------------------------------------

export const leadFormSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  company: companySchema,
  jobRole: jobRoleSchema,
  phone: phoneSchema,
  companySize: companySizeSchema,
  message: messageSchema,
  consent: consentSchema,
  honeypot: honeypotSchema,
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

// ---------------------------------------------------------------------------
// Server-side Payload Schema (includes journey + attribution)
// ---------------------------------------------------------------------------

const pageVisitSchema = z.object({
  path: z.string(),
  title: z.string(),
  visitedAt: z.string(),
  durationSeconds: z.number().min(0),
});

export const leadPayloadSchema = z.object({
  schemaVersion: z.literal("1.0"),
  requestId: z.string().min(1),
  submittedAt: z.string(),
  source: z.literal("website-lead-form"),

  visitor: z.object({
    fullName: fullNameSchema,
    email: emailSchema,
    company: companySchema,
    jobRole: jobRoleSchema,
    phone: phoneSchema,
    companySize: companySizeSchema,
  }),

  inquiry: z.object({
    message: messageSchema,
  }),

  journey: z.object({
    sessionId: z.string().min(1),
    landingPage: z.string(),
    pageVisits: z.array(pageVisitSchema).max(5),
  }),

  attribution: z.object({
    referrer: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
  }),

  consent: z.object({
    contactAllowed: z.literal(true),
  }),
});
