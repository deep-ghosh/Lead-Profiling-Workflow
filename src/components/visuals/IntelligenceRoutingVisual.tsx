"use client";

import { motion } from "framer-motion";

/**
 * Premium AI Routing Visual.
 * Minimal, intelligent background using SVG and Framer Motion.
 */
export function IntelligenceRoutingVisual() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Background gradients for depth */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "min(800px, 100vw)",
          height: "min(800px, 100vw)",
          background: "radial-gradient(circle, rgba(49, 87, 230, 0.04) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "min(600px, 80vw)",
          height: "min(600px, 80vw)",
          background: "radial-gradient(circle, rgba(34, 169, 189, 0.03) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Subtle Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border-light) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-light) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, white 20%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, white 20%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      {/* SVG Routing Network */}
      <svg
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          minWidth: "1200px",
          height: "auto",
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Core Node */}
        <circle cx="600" cy="400" r="3" fill="var(--brand-500)" opacity="0.8" />
        <circle cx="600" cy="400" r="16" stroke="var(--brand-500)" strokeWidth="1" opacity="0.15" />
        <circle cx="600" cy="400" r="32" stroke="var(--brand-500)" strokeWidth="1" opacity="0.05" />

        {/* Input Paths */}
        <path d="M 200 200 C 400 200, 450 400, 600 400" stroke="var(--brand-500)" strokeWidth="1" opacity="0.1" />
        <path d="M 150 500 C 350 500, 450 400, 600 400" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.08" />
        <path d="M 300 650 C 450 650, 500 400, 600 400" stroke="var(--brand-500)" strokeWidth="1" opacity="0.1" />

        {/* Output Paths */}
        <path d="M 600 400 C 750 400, 800 250, 1000 250" stroke="var(--brand-500)" strokeWidth="1" opacity="0.15" />
        <circle cx="1000" cy="250" r="3" fill="var(--brand-500)" opacity="0.6" />
        <circle cx="1000" cy="250" r="8" stroke="var(--brand-500)" strokeWidth="1" opacity="0.2" />

        <path d="M 600 400 C 750 400, 800 550, 1000 550" stroke="var(--signal-500)" strokeWidth="1" opacity="0.1" />
        <circle cx="1000" cy="550" r="3" fill="var(--signal-500)" opacity="0.4" />
        <circle cx="1000" cy="550" r="8" stroke="var(--signal-500)" strokeWidth="1" opacity="0.15" />

        {/* Animated Signals */}
        <motion.circle
          r="2.5"
          fill="var(--brand-500)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          style={{ offsetPath: 'path("M 200 200 C 400 200, 450 400, 600 400")' }}
          opacity="0.6"
        />
        <motion.circle
          r="2.5"
          fill="var(--text-secondary)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity, delay: 1 }}
          style={{ offsetPath: 'path("M 150 500 C 350 500, 450 400, 600 400")' }}
          opacity="0.4"
        />
        <motion.circle
          r="3"
          fill="var(--brand-500)"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 0.8, 0] }}
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
          style={{ offsetPath: 'path("M 600 400 C 750 400, 800 250, 1000 250")' }}
        />
      </svg>
    </div>
  );
}
