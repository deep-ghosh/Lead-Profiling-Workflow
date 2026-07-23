"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export function SalesBotDemoVisual() {
  const [stage, setStage] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (!isInView) return;

    // Sequence: 0..7
    // 0: start
    // 1: Prospect inquiry
    // 2: Bot typing
    // 3: Bot question
    // 4: Prospect response
    // 5: Bot typing
    // 6: Extraction panel updates
    // 7: Recommended action
    
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStage(1), 500));
    timers.push(setTimeout(() => setStage(2), 1500));
    timers.push(setTimeout(() => setStage(3), 3000));
    timers.push(setTimeout(() => setStage(4), 5000));
    timers.push(setTimeout(() => setStage(5), 6500));
    timers.push(setTimeout(() => setStage(6), 8000));
    timers.push(setTimeout(() => setStage(7), 9500));
    // No loop

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1rem",
        background: "var(--ink-900)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top: Chat UI */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", minHeight: "340px", borderBottom: "1px solid var(--border-dark)" }}>
        <div style={{ fontSize: "0.6875rem", color: "var(--text-inverse-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", marginBottom: "0.5rem" }}>
          Automated Qualification
        </div>

        {/* Prospect Message 1 */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: "flex-end", maxWidth: "85%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.6875rem", color: "var(--text-inverse-secondary)" }}>Prospect</span>
              <div style={{ background: "var(--surface)", color: "var(--text-primary)", padding: "0.625rem 0.875rem", borderRadius: "1rem 1rem 0 1rem", fontSize: "0.875rem", boxShadow: "var(--shadow-sm)" }}>
                We&apos;re planning to scale outbound sales next quarter.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bot Typing / Message 1 */}
        <AnimatePresence>
          {stage === 2 && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ alignSelf: "flex-start", maxWidth: "85%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
               <span style={{ fontSize: "0.6875rem", color: "var(--text-inverse-secondary)" }}>Sales Bot</span>
               <div style={{ background: "var(--brand-600)", color: "white", padding: "0.625rem 0.875rem", borderRadius: "1rem 1rem 1rem 0", fontSize: "0.875rem", display: "flex", gap: "4px" }}>
                 <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }}>•</motion.span>
                 <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }}>•</motion.span>
                 <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }}>•</motion.span>
               </div>
             </motion.div>
          )}
          {stage >= 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: "flex-start", maxWidth: "85%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.6875rem", color: "var(--text-inverse-secondary)" }}>Sales Bot</span>
              <div style={{ background: "var(--brand-600)", color: "white", padding: "0.625rem 0.875rem", borderRadius: "1rem 1rem 1rem 0", fontSize: "0.875rem", boxShadow: "var(--shadow-sm)" }}>
                What is the main constraint today: lead volume, qualification capacity, or follow-up consistency?
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prospect Message 2 */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: "flex-end", maxWidth: "85%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.6875rem", color: "var(--text-inverse-secondary)" }}>Prospect</span>
              <div style={{ background: "var(--surface)", color: "var(--text-primary)", padding: "0.625rem 0.875rem", borderRadius: "1rem 1rem 0 1rem", fontSize: "0.875rem", boxShadow: "var(--shadow-sm)" }}>
                Qualification and follow-up are taking too much time.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bot Typing / Message 2 (handoff) */}
        <AnimatePresence>
          {stage >= 5 && stage < 7 && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ alignSelf: "flex-start", maxWidth: "85%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
               <span style={{ fontSize: "0.6875rem", color: "var(--text-inverse-secondary)" }}>Sales Bot</span>
               <div style={{ background: "var(--brand-600)", color: "white", padding: "0.625rem 0.875rem", borderRadius: "1rem 1rem 1rem 0", fontSize: "0.875rem", display: "flex", gap: "4px" }}>
                 <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }}>•</motion.span>
                 <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }}>•</motion.span>
                 <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }}>•</motion.span>
               </div>
             </motion.div>
          )}
          {stage >= 7 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: "flex-start", maxWidth: "85%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.6875rem", color: "var(--text-inverse-secondary)" }}>Sales Bot</span>
              <div style={{ background: "var(--brand-600)", color: "white", padding: "0.625rem 0.875rem", borderRadius: "1rem 1rem 1rem 0", fontSize: "0.875rem", boxShadow: "var(--shadow-sm)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Preparing specialist handoff
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom: Intelligence Extraction Panel */}
      <div style={{ padding: "0 1.5rem 1.5rem" }}>
         <div style={{ fontSize: "0.6875rem", color: "var(--text-inverse-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
           System Extraction
         </div>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
               <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>Intent</span>
               <span style={{ fontSize: "0.8125rem", color: "var(--text-inverse)", fontWeight: 500, transition: "color 0.3s", opacity: stage >= 6 ? 1 : 0.3 }}>Sales automation</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
               <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>Need</span>
               <span style={{ fontSize: "0.8125rem", color: "var(--text-inverse)", fontWeight: 500, transition: "color 0.3s", opacity: stage >= 6 ? 1 : 0.3 }}>Qual. & follow-up</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
               <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>Timing</span>
               <span style={{ fontSize: "0.8125rem", color: "var(--text-inverse)", fontWeight: 500, transition: "color 0.3s", opacity: stage >= 6 ? 1 : 0.3 }}>Next quarter</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
               <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>Journey</span>
               <span style={{ fontSize: "0.8125rem", color: "var(--text-inverse)", fontWeight: 500, transition: "color 0.3s", opacity: stage >= 6 ? 1 : 0.3 }}>Sales Bots + Pricing</span>
            </div>
         </div>
         {stage >= 7 && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(34, 169, 189, 0.1)", border: "1px solid var(--signal-500)", borderRadius: "var(--radius-md)", color: "var(--signal-500)", fontSize: "0.8125rem", fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Action: Specialist consultation</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.div>
         )}
      </div>
    </div>
  );
}
