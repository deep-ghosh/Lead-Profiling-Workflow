"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { leadFormSchema } from "@/lib/lead/schema";
import { buildLeadPayload, getRequestId, clearRequestId } from "@/lib/lead/payload-builder";
import { getPageVisits } from "@/lib/tracking/journey-store";
import { COMPANY_SIZE_OPTIONS } from "@/lib/lead/types";
import type { LeadFormData, FormSubmissionState, LeadApiResponse } from "@/lib/lead/types";
import { CharacterCounter } from "./CharacterCounter";
import { LeadFormSuccess, LeadFormError } from "./LeadFormStatus";

// Cooldown between submissions (milliseconds)
const SUBMISSION_COOLDOWN_MS = 3000;

const INITIAL_FORM_DATA: LeadFormData = {
  fullName: "",
  email: "",
  company: "",
  jobRole: "",
  phone: "",
  companySize: "",
  message: "",
  consent: false,
  honeypot: "",
};

export function LeadForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<LeadFormData>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>({
    status: "idle",
    errorMessage: null,
  });
  
  const lastSubmitTimeRef = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Persist values from sessionStorage on mount (error recovery)
  useEffect(() => {
    const saved = sessionStorage.getItem("eubrics_form_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch {
        // Ignore
      }
    }
  }, []);

  // Save draft on change
  useEffect(() => {
    if (submissionState.status === "success") {
      sessionStorage.removeItem("eubrics_form_draft");
    } else {
      sessionStorage.setItem("eubrics_form_draft", JSON.stringify({
        ...formData,
        honeypot: "", // never save honeypot
        consent: false // force re-consent
      }));
    }
  }, [formData, submissionState.status]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear field error on change
      if (fieldErrors[name]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [fieldErrors]
  );

  const validateStep1 = useCallback((): boolean => {
    const step1Schema = leadFormSchema.pick({ fullName: true, email: true, company: true });
    const result = step1Schema.safeParse(formData);
    
    if (result.success) {
      setFieldErrors({});
      return true;
    }

    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    }
    setFieldErrors(errors);

    // Focus first invalid field
    const firstErrorField = result.error.issues[0]?.path[0] as string;
    if (firstErrorField && formRef.current) {
      const el = formRef.current.querySelector<HTMLElement>(`[name="${firstErrorField}"]`);
      el?.focus();
    }

    return false;
  }, [formData]);

  const validateStep2 = useCallback((): boolean => {
    const step2Schema = leadFormSchema.pick({ message: true, companySize: true, jobRole: true, phone: true, consent: true });
    const result = step2Schema.safeParse(formData);
    
    if (result.success) {
      setFieldErrors({});
      return true;
    }

    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    }
    setFieldErrors(errors);

    // Focus first invalid field
    const firstErrorField = result.error.issues[0]?.path[0] as string;
    if (firstErrorField && formRef.current) {
      const el = formRef.current.querySelector<HTMLElement>(`[name="${firstErrorField}"]`);
      el?.focus();
    }

    return false;
  }, [formData]);

  const handleNext = useCallback(() => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  }, [validateStep1]);

  const handleBack = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (currentStep === 1) {
        handleNext();
        return;
      }

      // Honeypot check — silently appear to succeed
      if (formData.honeypot) {
        setSubmissionState({ status: "success", errorMessage: null });
        return;
      }

      // Cooldown check
      const now = Date.now();
      if (now - lastSubmitTimeRef.current < SUBMISSION_COOLDOWN_MS) {
        return;
      }

      // Validate Step 2
      if (!validateStep2()) return;

      // Set submitting
      setSubmissionState({ status: "submitting", errorMessage: null });
      lastSubmitTimeRef.current = now;

      try {
        // Build payload
        const pageVisits = getPageVisits();
        const payload = buildLeadPayload(formData, pageVisits);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15_000);

        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data: LeadApiResponse = await response.json();

        if (response.ok && data.success) {
          clearRequestId();
          setSubmissionState({ status: "success", errorMessage: null });
          // Note: we don't clear formData here so the success view can show context if needed
        } else {
          setSubmissionState({
            status: "error",
            errorMessage: data.error || "We couldn't submit your request. Please check your connection and try again.",
          });
        }
      } catch (error) {
        void getRequestId(); // ensure it exists for retry
        const message = error instanceof Error && error.name === "AbortError"
            ? "Request timed out. Please try again."
            : "We couldn't submit your request. Please check your connection and try again.";

        setSubmissionState({ status: "error", errorMessage: message });
      }
    },
    [currentStep, formData, handleNext, validateStep2]
  );

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setFieldErrors({});
    clearRequestId();
    setCurrentStep(1);
    setSubmissionState({ status: "idle", errorMessage: null });
    sessionStorage.removeItem("eubrics_form_draft");
  }, []);

  if (submissionState.status === "success") {
    return <LeadFormSuccess onReset={handleReset} />;
  }

  const isSubmitting = submissionState.status === "submitting";

  const formAnimation = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: "easeInOut" as const }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      {/* Progress Indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <div style={{ flex: 1, height: "4px", borderRadius: "2px", background: "var(--brand-500)", transition: "background 0.3s" }} />
        <div style={{ flex: 1, height: "4px", borderRadius: "2px", background: currentStep === 2 ? "var(--brand-500)" : "var(--border-dark)", transition: "background 0.3s" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-inverse)", margin: 0 }}>
          {currentStep === 1 ? "About You" : "Your Challenge"}
        </h3>
        <span style={{ fontSize: "0.8125rem", color: "var(--text-inverse-secondary)", fontWeight: 500 }}>
          Step {currentStep} of 2
        </span>
      </div>

      {submissionState.status === "error" && submissionState.errorMessage && (
        <LeadFormError message={submissionState.errorMessage} />
      )}

      {/* Form Steps */}
      <div style={{ position: "relative", minHeight: "320px" }}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div key="step1" {...formAnimation} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Full Name */}
              <div>
                <label htmlFor="lead-fullName" className="form-label">
                  Full name <span aria-hidden="true" style={{ color: "var(--brand-400)" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lead-fullName"
                  name="fullName"
                  required
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.fullName}
                  aria-describedby={fieldErrors.fullName ? "err-fullName" : undefined}
                  className="form-input"
                  placeholder="Jane Smith"
                  disabled={isSubmitting}
                />
                {fieldErrors.fullName && <p id="err-fullName" className="form-error">{fieldErrors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="lead-email" className="form-label">
                  Work email <span aria-hidden="true" style={{ color: "var(--brand-400)" }}>*</span>
                </label>
                <input
                  type="email"
                  id="lead-email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "err-email" : undefined}
                  className="form-input"
                  placeholder="jane@company.com"
                  disabled={isSubmitting}
                />
                {fieldErrors.email && <p id="err-email" className="form-error">{fieldErrors.email}</p>}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="lead-company" className="form-label">
                  Company <span aria-hidden="true" style={{ color: "var(--brand-400)" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lead-company"
                  name="company"
                  required
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.company}
                  aria-describedby={fieldErrors.company ? "err-company" : undefined}
                  className="form-input"
                  placeholder="Acme Corp"
                  disabled={isSubmitting}
                />
                {fieldErrors.company && <p id="err-company" className="form-error">{fieldErrors.company}</p>}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" {...formAnimation} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Message */}
              <div>
                <label htmlFor="lead-message" className="form-label">
                  What would you like to improve? <span aria-hidden="true" style={{ color: "var(--brand-400)" }}>*</span>
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={[fieldErrors.message ? "err-message" : "", "message-hint"].filter(Boolean).join(" ") || undefined}
                  className="form-input"
                  placeholder="Briefly describe your challenge or expected outcome."
                  style={{ resize: "vertical", minHeight: "5rem" }}
                  disabled={isSubmitting}
                />
                <div id="message-hint" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  {fieldErrors.message ? (
                    <p id="err-message" className="form-error" style={{ flex: 1, marginTop: "0.25rem" }}>{fieldErrors.message}</p>
                  ) : <span />}
                  <CharacterCounter current={formData.message.length} min={20} max={1500} />
                </div>
              </div>

              {/* 2 Column Details */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div>
                  <label htmlFor="lead-jobRole" className="form-label">
                    Job role <span className="form-label-optional">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="lead-jobRole"
                    name="jobRole"
                    autoComplete="organization-title"
                    value={formData.jobRole}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors.jobRole}
                    className="form-input"
                    placeholder="Head of Sales"
                    disabled={isSubmitting}
                  />
                  {fieldErrors.jobRole && <p className="form-error">{fieldErrors.jobRole}</p>}
                </div>
                <div>
                  <label htmlFor="lead-companySize" className="form-label">
                    Company size <span className="form-label-optional">(optional)</span>
                  </label>
                  <select
                    id="lead-companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors.companySize}
                    className="form-input form-select"
                    disabled={isSubmitting}
                  >
                    <option value="">Select size</option>
                    {COMPANY_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {fieldErrors.companySize && <p className="form-error">{fieldErrors.companySize}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="lead-phone" className="form-label">
                  Phone <span className="form-label-optional">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="lead-phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.phone}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                  disabled={isSubmitting}
                />
                {fieldErrors.phone && <p className="form-error">{fieldErrors.phone}</p>}
              </div>

              {/* Consent */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginTop: "0.5rem" }}>
                <input
                  type="checkbox"
                  id="lead-consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.consent}
                  disabled={isSubmitting}
                  style={{
                    marginTop: "0.25rem",
                    width: "1.125rem",
                    height: "1.125rem",
                    accentColor: "var(--brand-500)",
                    flexShrink: 0,
                    cursor: "pointer"
                  }}
                />
                <div>
                  <label
                    htmlFor="lead-consent"
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-inverse)",
                      lineHeight: 1.5,
                      cursor: "pointer",
                    }}
                  >
                    I agree to be contacted about my request. Your information will only
                    be used to review your request and contact you about relevant services.
                  </label>
                  {fieldErrors.consent && <p className="form-error" style={{ marginTop: "0.25rem" }}>{fieldErrors.consent}</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Honeypot */}
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input type="text" id="lead-website" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        {currentStep === 2 && (
          <button
            type="button"
            onClick={handleBack}
            disabled={isSubmitting}
            className="btn-secondary"
            style={{ padding: "0.75rem 1.25rem", color: "var(--text-inverse)", borderColor: "var(--border-dark)" }}
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{ flex: 1, padding: "0.75rem" }}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Submitting...
            </>
          ) : currentStep === 1 ? (
            "Continue"
          ) : (
            "Submit Request"
          )}
        </button>
      </div>
    </form>
  );
}
