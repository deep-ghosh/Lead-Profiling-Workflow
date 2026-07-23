"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function OrgTransformationVisual() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 0: Current State, 1: Gaps Identified, 2: Recommended, 3: Improved
    const sequence = [
      { delay: 2000, next: 1 },
      { delay: 3000, next: 2 },
      { delay: 3000, next: 3 },
      { delay: 4000, next: 0 },
    ];
    
    let timeout: NodeJS.Timeout;
    const runSequence = () => {
      timeout = setTimeout(() => {
        setPhase(sequence[phase].next);
      }, sequence[phase].delay);
    };
    
    runSequence();
    return () => clearTimeout(timeout);
  }, [phase]);

  const insights = [
    { title: "Current State", text: "Fragmented communication across units.", status: "Fragmented" },
    { title: "Gaps Identified", text: "Leadership disconnected from team structure.", status: "Misaligned" },
    { title: "Recommended Focus", text: "Structural alignment & change readiness.", status: "Intervening" },
    { title: "Improved State", text: "Cohesive network with aligned strategic goals.", status: "Optimized" },
  ];

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4 / 3",
        background: "var(--paper-100)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-light)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Network Canvas */}
      <div style={{ flex: 1, position: "relative", padding: "1.5rem" }}>
        <svg viewBox="0 0 400 250" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Base lines (weak) */}
          <path d="M 200 50 L 100 150 L 200 220 L 300 150 Z" fill="none" stroke="var(--border-dark)" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 200 50 L 200 220" fill="none" stroke="var(--border-dark)" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Active Lines */}
          <motion.path 
            d="M 200 50 L 100 150" 
            fill="none" 
            stroke="var(--brand-500)" 
            strokeWidth={phase >= 2 ? 3 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: phase >= 1 ? (phase === 1 ? 0.3 : 1) : 0.1 }}
            transition={{ duration: 1 }}
          />
          <motion.path 
            d="M 200 50 L 300 150" 
            fill="none" 
            stroke="var(--brand-500)" 
            strokeWidth={phase >= 2 ? 3 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: phase >= 2 ? 1 : 0.1 }}
            transition={{ duration: 1 }}
          />
          <motion.path 
            d="M 100 150 L 200 220 L 300 150" 
            fill="none" 
            stroke="var(--signal-500)" 
            strokeWidth={phase >= 3 ? 3 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: phase >= 3 ? 1 : 0.1 }}
            transition={{ duration: 1 }}
          />
          <motion.path 
            d="M 200 50 L 200 220" 
            fill="none" 
            stroke="var(--brand-400)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          />

          {/* Nodes */}
          {/* Leadership Node */}
          <g transform="translate(200, 50)">
            <motion.circle r={phase >= 3 ? 24 : 16} fill="var(--surface)" stroke="var(--brand-600)" strokeWidth="4" animate={{ scale: phase >= 3 ? 1.1 : 1 }} transition={{ duration: 0.5 }} />
            <text x="0" y="-32" fontSize="12" fill="var(--text-secondary)" fontWeight="600" textAnchor="middle">Leadership</text>
            {phase === 1 && <motion.circle r="22" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 4" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />}
          </g>
          
          {/* Team A */}
          <g transform="translate(100, 150)">
            <circle r="14" fill="var(--surface)" stroke="var(--text-muted)" strokeWidth="3" />
            <motion.circle r="14" fill="var(--brand-500)" initial={{ scale: 0 }} animate={{ scale: phase >= 2 ? 1 : 0 }} transition={{ duration: 0.4 }} />
            <text x="-24" y="4" fontSize="12" fill="var(--text-secondary)" fontWeight="600" textAnchor="end">Teams</text>
          </g>

          {/* Team B */}
          <g transform="translate(300, 150)">
            <circle r="14" fill="var(--surface)" stroke="var(--text-muted)" strokeWidth="3" />
            <motion.circle r="14" fill="var(--brand-500)" initial={{ scale: 0 }} animate={{ scale: phase >= 2 ? 1 : 0 }} transition={{ duration: 0.4 }} />
            <text x="24" y="4" fontSize="12" fill="var(--text-secondary)" fontWeight="600" textAnchor="start">Structure</text>
          </g>

          {/* Strategic Goals */}
          <g transform="translate(200, 220)">
            <circle r="18" fill="var(--surface)" stroke="var(--text-muted)" strokeWidth="3" />
            <motion.circle r="18" fill="var(--signal-500)" initial={{ scale: 0 }} animate={{ scale: phase >= 3 ? 1 : 0 }} transition={{ duration: 0.5 }} />
            <text x="0" y="34" fontSize="12" fill="var(--text-secondary)" fontWeight="600" textAnchor="middle">Strategic Goals</text>
            {phase === 3 && (
               <motion.circle r="26" fill="none" stroke="var(--signal-500)" strokeWidth="2" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.5, opacity: [0, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            )}
          </g>
        </svg>

        {/* Floating tags */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff1f2", color: "#be123c", fontSize: "0.6875rem", padding: "0.25rem 0.5rem", borderRadius: "4px", fontWeight: 600, border: "1px solid #fecdd3" }}>
              Alignment Gap
            </motion.div>
          )}
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "var(--signal-50)", color: "var(--signal-500)", fontSize: "0.6875rem", padding: "0.25rem 0.5rem", borderRadius: "4px", fontWeight: 600, border: "1px solid var(--signal-500)", opacity: 0.2 }}>
              Communication Flow
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Intelligence Panel (Bottom) */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border-light)", padding: "1.25rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div>
              <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                {insights[phase].title}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}>
                {insights[phase].text}
              </div>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.5rem", borderRadius: "4px", background: phase === 3 ? "var(--brand-50)" : phase === 1 ? "#fff1f2" : "var(--paper-100)", color: phase === 3 ? "var(--brand-600)" : phase === 1 ? "#be123c" : "var(--text-secondary)" }}>
              {insights[phase].status}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
