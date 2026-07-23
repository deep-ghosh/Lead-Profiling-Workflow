"use client";

import { motion } from "framer-motion";

const stages = [
  {
    number: "01",
    title: "Share your challenge",
    description: "Tell us about your business needs, goals, and current situation.",
    example: "Example: \"We need to scale our outbound efforts.\"",
  },
  {
    number: "02",
    title: "Context is organized",
    description: "Our system reviews your request to identify the core requirements.",
    example: "Extracted: [Intent: Scale] [Solution: Automation]",
  },
  {
    number: "03",
    title: "Specialist follows up",
    description: "An expert who already understands your specific challenge contacts you.",
    example: "Action: Sales Bot Specialist assigned.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{ padding: "var(--section-padding-y) 0", background: "var(--paper-50)", overflow: "hidden" }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "36rem",
            margin: "0 auto 5rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            How it works
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
            }}
          >
            A straightforward, privacy-conscious process designed to connect you with the right expertise, fast.
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ position: "relative", maxWidth: "64rem", margin: "0 auto", padding: "1rem 0" }}>
          
          {/* Animated Connection Path (Background) */}
          <div className="timeline-path-bg" style={{ position: "absolute", background: "var(--border-light)", zIndex: 1 }} />
          
          {/* Animated Connection Path (Active) */}
          <motion.div 
             className="timeline-path-active" 
             style={{ position: "absolute", background: "var(--brand-500)", zIndex: 2, originX: 0, originY: 0 }}
             initial={{ scaleX: 0, scaleY: 0 }}
             whileInView={{ scaleX: 1, scaleY: 1 }}
             viewport={{ once: true, margin: "-20%" }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div
            className="timeline-grid"
            style={{
              display: "grid",
              gap: "3rem",
              position: "relative",
              zIndex: 3,
            }}
          >
            {stages.map((stage, index) => (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5, delay: index * 0.4 }}
                className="timeline-item"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                {/* Node marker */}
                <div 
                   className="timeline-node" 
                   style={{ 
                     width: "1rem", 
                     height: "1rem", 
                     borderRadius: "50%", 
                     background: "var(--surface)", 
                     border: "3px solid var(--brand-500)", 
                     flexShrink: 0, 
                     marginTop: "0.25rem",
                     boxShadow: "0 0 0 4px var(--paper-50)"
                   }} 
                />

                {/* Content */}
                <div className="timeline-content" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.05em" }}>STAGE {stage.number}</div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
                    {stage.title}
                  </h3>
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                    {stage.description}
                  </p>
                  
                  {/* Concrete Example */}
                  <div style={{ marginTop: "0.75rem", padding: "0.75rem", background: "var(--surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "0.8125rem", color: "var(--brand-600)", fontWeight: 500, boxShadow: "var(--shadow-sm)" }}>
                    {stage.example}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Responsive Layout for Timeline */}
      <style>{`
        /* Mobile: Vertical */
        .timeline-grid { grid-template-columns: 1fr; }
        .timeline-path-bg { left: 0.4375rem; top: 0; bottom: 0; width: 2px; }
        .timeline-path-active { left: 0.4375rem; top: 0; bottom: 0; width: 2px; transform-origin: top; }
        .timeline-item { flex-direction: row; gap: 2rem; }
        .timeline-content { text-align: left; }

        /* Desktop: Horizontal */
        @media (min-width: 768px) {
          .timeline-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
          .timeline-path-bg { top: 1.875rem; left: 0; right: 0; height: 2px; width: 100%; bottom: auto; }
          .timeline-path-active { top: 1.875rem; left: 0; right: 0; height: 2px; width: 100%; bottom: auto; transform-origin: left; }
          /* Reset mobile scaleY to 1 so horizontal scale works, actually Framer handles inline styles so we need CSS overriding or use motion component properly. Since Framer inline styles set both scaleX and scaleY, we use CSS to override the unused dimension if possible. But Framer uses transform matrix. 
             Instead of overriding, we'll let Framer animate both X and Y. Since the element is only 2px thick in the non-scaling direction, scaling it down to 0 makes it invisible until animated. It looks like a growing dot. 
             Wait, if width is 100% and height is 2px, scaling Y from 0 to 1 makes the line grow in thickness, while scaling X makes it grow in length. That's perfectly fine! */
          .timeline-item { flex-direction: column; gap: 1.5rem; align-items: flex-start; }
          .timeline-node { margin-top: 0; }
        }
      `}</style>
    </section>
  );
}
