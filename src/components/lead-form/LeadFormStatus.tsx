"use client";

import { motion } from "framer-motion";
import { getRequestId } from "@/lib/lead/payload-builder";
import { useEffect, useState } from "react";

interface LeadFormSuccessProps {
  onReset: () => void;
}

export function LeadFormSuccess({ onReset }: LeadFormSuccessProps) {
  const [refId, setRefId] = useState("");

  useEffect(() => {
    // Grab the existing request ID before it's cleared by the form logic,
    // or generate a display-only one if it's already cleared.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRefId(getRequestId());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "1rem",
        gap: "1.25rem",
      }}
    >
      <div
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          background: "var(--brand-500)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 4px rgba(69, 111, 240, 0.2)",
          marginBottom: "0.5rem",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-inverse)", margin: 0 }}>
        Request Received
      </h3>

      <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-inverse-secondary)", margin: 0 }}>
        Thank you for sharing your context. Our intelligent routing system is reviewing your request to identify the appropriate specialist.
      </p>

      {refId && (
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-dark)", fontSize: "0.75rem", color: "var(--text-inverse-secondary)", fontFamily: "monospace", letterSpacing: "0.05em", marginTop: "0.25rem" }}>
          REF: {refId.split("-")[1]?.toUpperCase() || refId.substring(0, 8).toUpperCase()}
        </div>
      )}

      <button
        type="button"
        onClick={onReset}
        className="btn-secondary btn-secondary-dark"
        style={{ marginTop: "1rem", padding: "0.625rem 1.25rem" }}
      >
        Submit another request
      </button>
    </motion.div>
  );
}

interface LeadFormErrorProps {
  message: string;
}

export function LeadFormError({ message }: LeadFormErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      style={{
        background: "#fff1f2",
        border: "1px solid #fecdd3",
        color: "#be123c",
        padding: "0.75rem 1rem",
        borderRadius: "var(--radius-md)",
        fontSize: "0.875rem",
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-start",
      }}
      role="alert"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: "2px", flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div>{message}</div>
    </motion.div>
  );
}
