"use client";

import { motion } from "framer-motion";
import { IntelligenceRoutingVisual } from "@/components/visuals/IntelligenceRoutingVisual";
import { InteractiveRoutingVisual } from "@/components/visuals/InteractiveRoutingVisual";

export function HeroSection() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-contact"));
  };

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#organizational-development");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "6rem", // account for fixed header
        paddingBottom: "4rem"
      }}
    >
      {/* Background Visual */}
      <IntelligenceRoutingVisual />

      <div className="section-container" style={{ width: "100%", position: "relative", zIndex: 10 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {/* Left Content (Spans 6 cols on desktop) */}
          <div style={{ gridColumn: "1 / -1" }} className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            >
              {/* Headline */}
              <h1
                className="text-balance"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                }}
              >
                One request. <br />
                <span style={{ color: "var(--brand-600)" }}>The right business solution.</span>
              </h1>

              {/* Supporting Copy */}
              <p
                className="text-pretty"
                style={{
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  maxWidth: "34rem",
                  marginBottom: "2.5rem",
                }}
              >
                Describe what your organization needs. Our intelligent intake experience gathers the relevant context and connects your request with the right specialist.
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <a href="#contact" onClick={handleCTAClick} className="btn-primary">
                  Discuss Your Needs
                </a>
                <a href="#organizational-development" onClick={handleExploreClick} className="btn-secondary">
                  Explore Solutions
                </a>
              </div>

              {/* Trust Reassurance */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure intake. No manual category selection required.
              </div>
            </motion.div>
          </div>

          {/* Right Content (Interactive Demo - spans 6 cols on desktop) */}
          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }} className="hidden lg:flex lg:col-span-6">
             <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0, 0, 1] }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
             >
                <InteractiveRoutingVisual />
             </motion.div>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (min-width: 1024px) {
          .lg\\:col-span-6 { grid-column: span 6 / span 6; }
          .lg\\:flex { display: flex !important; }
        }
        .hidden { display: none; }
      `}</style>
    </section>
  );
}
