"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ScenarioType = "sales" | "leadership";

const SCENARIOS = {
  sales: {
    request: "Scale outbound sales",
    context: ["Browsing: Sales Bots", "Viewed: Integration"],
    signals: ["Intent: Automation", "Urgency: High"],
    dest_sales: true,
    dest_label: "AI Sales Bots",
  },
  leadership: {
    request: "Improve leadership alignment",
    context: ["Browsing: Org Dev", "Viewed: Case Study"],
    signals: ["Need: Structure", "Focus: Executive"],
    dest_sales: false,
    dest_label: "Org Development",
  },
};

export function InteractiveRoutingVisual() {
  const [scenario, setScenario] = useState<ScenarioType>("sales");
  const [stage, setStage] = useState(0);

  // Play animation sequence
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStage(0);
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStage(1), 500)); // Incoming request
    timers.push(setTimeout(() => setStage(2), 1500)); // Context detected
    timers.push(setTimeout(() => setStage(3), 2500)); // Signals extracted
    timers.push(setTimeout(() => setStage(4), 3500)); // Paths evaluated
    timers.push(setTimeout(() => setStage(5), 4500)); // Destination active
    timers.push(setTimeout(() => setStage(6), 5500)); // Handoff confirmed

    return () => timers.forEach(clearTimeout);
  }, [scenario]);

  const activeData = SCENARIOS[scenario];

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-xl)",
        padding: "1.5rem",
        boxShadow: "var(--shadow-lg)",
        maxWidth: "26rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Scenario Toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)", paddingBottom: "1rem" }}>
        <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Routing Demonstration
        </div>
        <div style={{ display: "flex", gap: "0.5rem", background: "var(--paper-100)", padding: "0.25rem", borderRadius: "var(--radius-md)" }}>
          <button
            type="button"
            onClick={() => setScenario("sales")}
            style={{
              padding: "0.25rem 0.5rem",
              fontSize: "0.6875rem",
              fontWeight: 500,
              borderRadius: "4px",
              background: scenario === "sales" ? "var(--surface)" : "transparent",
              color: scenario === "sales" ? "var(--text-primary)" : "var(--text-secondary)",
              boxShadow: scenario === "sales" ? "var(--shadow-sm)" : "none",
              border: "none",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
          >
            Sales
          </button>
          <button
            type="button"
            onClick={() => setScenario("leadership")}
            style={{
              padding: "0.25rem 0.5rem",
              fontSize: "0.6875rem",
              fontWeight: 500,
              borderRadius: "4px",
              background: scenario === "leadership" ? "var(--surface)" : "transparent",
              color: scenario === "leadership" ? "var(--text-primary)" : "var(--text-secondary)",
              boxShadow: scenario === "leadership" ? "var(--shadow-sm)" : "none",
              border: "none",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
          >
            Leadership
          </button>
        </div>
      </div>

      <div style={{ minHeight: "220px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Stage 1: Request */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", gap: "0.75rem" }}
            >
              <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: "var(--brand-50)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-600)", flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>Incoming Request</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 600 }}>&quot;{activeData.request}&quot;</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2 & 3: Context and Signals */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{ paddingLeft: "1rem", borderLeft: "2px solid var(--border-light)", marginLeft: "0.6875rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              <div>
                <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Browsing Context</div>
                <div style={{ display: "flex", gap: "0.375rem" }}>
                  {activeData.context.map((ctx) => (
                    <span key={ctx} style={{ padding: "0.125rem 0.375rem", background: "var(--paper-100)", color: "var(--text-secondary)", fontSize: "0.6875rem", borderRadius: "4px" }}>
                      {ctx}
                    </span>
                  ))}
                </div>
              </div>

              {stage >= 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Extracted Signals</div>
                  <div style={{ display: "flex", gap: "0.375rem" }}>
                    {activeData.signals.map((sig) => (
                      <span key={sig} style={{ padding: "0.125rem 0.375rem", background: "var(--brand-50)", color: "var(--brand-600)", fontSize: "0.6875rem", borderRadius: "4px", fontWeight: 500 }}>
                        {sig}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 4, 5 & 6: Evaluation and Handoff */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}
            >
              {/* Path A */}
              <div style={{ flex: 1, padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid", borderColor: stage >= 5 && activeData.dest_sales ? "var(--brand-500)" : "var(--border-light)", background: stage >= 5 && activeData.dest_sales ? "var(--brand-50)" : "transparent", opacity: stage >= 5 && !activeData.dest_sales ? 0.4 : 1, transition: "all 0.3s" }}>
                <div style={{ fontSize: "0.6875rem", color: stage >= 5 && activeData.dest_sales ? "var(--brand-600)" : "var(--text-secondary)", fontWeight: 600, marginBottom: "0.25rem" }}>AI Sales Bots</div>
                <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{stage >= 5 && activeData.dest_sales ? (stage >= 6 ? "Specialist assigned" : "Routing...") : "Evaluating..."}</div>
              </div>
              
              {/* Path B */}
              <div style={{ flex: 1, padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid", borderColor: stage >= 5 && !activeData.dest_sales ? "var(--signal-500)" : "var(--border-light)", background: stage >= 5 && !activeData.dest_sales ? "var(--signal-50)" : "transparent", opacity: stage >= 5 && activeData.dest_sales ? 0.4 : 1, transition: "all 0.3s" }}>
                <div style={{ fontSize: "0.6875rem", color: stage >= 5 && !activeData.dest_sales ? "var(--signal-500)" : "var(--text-secondary)", fontWeight: 600, marginBottom: "0.25rem" }}>Org Development</div>
                <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{stage >= 5 && !activeData.dest_sales ? (stage >= 6 ? "Specialist assigned" : "Routing...") : "Evaluating..."}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
