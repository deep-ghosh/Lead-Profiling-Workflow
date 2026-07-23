"use client";

import { useState, FormEvent, useCallback } from "react";
import { motion } from "framer-motion";
import { usePageTracking, getVisitHistory } from "@/hooks/usePageTracking";
import type { LeadFormData, LeadSubmissionPayload, FormSubmissionState } from "@/lib/types";

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function ContactPage() {
  usePageTracking();

  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    company: "",
    query: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (honeypot) {
        setSubmissionState({
          isLoading: false,
          isSuccess: true,
          error: null,
        });
        return;
      }

      setSubmissionState({
        isLoading: true,
        isSuccess: false,
        error: null,
      });

      const payload: LeadSubmissionPayload = {
        formData,
        honeypot,
        visitHistory: getVisitHistory(),
        submittedAt: new Date().toISOString(),
      };

      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

      if (!webhookUrl) {
        setSubmissionState({
          isLoading: false,
          isSuccess: false,
          error: "Configuration error. Please try again later.",
        });
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        setSubmissionState({
          isLoading: false,
          isSuccess: true,
          error: null,
        });

        setFormData({
          name: "",
          email: "",
          company: "",
          query: "",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.name === "AbortError"
              ? "Request timed out. Please try again."
              : "Failed to submit form. Please try again."
            : "An unexpected error occurred.";

        setSubmissionState({
          isLoading: false,
          isSuccess: false,
          error: errorMessage,
        });
      }
    },
    [formData, honeypot]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name === "website") {
        setHoneypot(value);
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  if (submissionState.isSuccess) {
    return (
      <div className="min-h-screen tech-grid circuit-pattern pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Thank you for reaching out
          </h1>
          <p className="mt-2 text-[var(--foreground-secondary)]">
            We'll be in touch shortly.
          </p>
          <a
            href="/home"
            className="inline-block mt-6 px-6 py-2.5 text-sm font-medium text-[var(--foreground)] bg-white border border-[var(--border)] rounded-full hover:border-[var(--border-hover)] transition-colors"
          >
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen tech-grid circuit-pattern pt-24 pb-16">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-[var(--foreground)]">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--foreground-secondary)]">
            Have a question or want to discuss your project? We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--foreground)]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-white border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-purple-100 transition-all rounded-xl text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--foreground)]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-white border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-purple-100 transition-all rounded-xl text-sm"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-[var(--foreground)]"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-white border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-purple-100 transition-all rounded-xl text-sm"
                placeholder="Your company"
              />
            </div>

            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-[var(--foreground)]"
              >
                Query
              </label>
              <textarea
                id="query"
                name="query"
                required
                rows={4}
                value={formData.query}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-white border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-purple-100 transition-all rounded-xl text-sm resize-none"
                placeholder="Tell us about your project or question..."
              />
            </div>

            {/* Honeypot field */}
            <input
              type="text"
              id="website"
              name="website"
              value={honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />

            {submissionState.error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{submissionState.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submissionState.isLoading}
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submissionState.isLoading ? (
                <>
                  <Spinner />
                  <span className="ml-2">Sending...</span>
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
