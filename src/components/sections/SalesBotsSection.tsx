"use client";

import { SalesBotDemoVisual } from "@/components/visuals/SalesBotDemoVisual";

const features = [
  {
    title: "Conversational Qualification",
    description: "Automatically identify and score high-potential leads based on conversational context.",
  },
  {
    title: "Intent Capture",
    description: "Detect buying signals instantly to prioritize your team's follow-up efforts.",
  },
  {
    title: "Meeting Scheduling",
    description: "Intelligent calendar integration that finds optimal times and confirms bookings.",
  },
  {
    title: "Sales Team Support",
    description: "Provide your team with real-time insights and deal intelligence before they step into a meeting.",
  },
];

export function SalesBotsSection() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="sales-bots"
      className="section-dark"
      style={{ padding: "var(--section-padding-y) 0" }}
    >
      <div className="section-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left Visual */}
          <div style={{ gridColumn: "1 / -1", order: 2, display: "flex", justifyContent: "center" }} className="lg:col-span-6 lg:order-1">
            <SalesBotDemoVisual />
          </div>

          {/* Right Content */}
          <div style={{ gridColumn: "1 / -1", order: 1 }} className="lg:col-span-6 lg:order-2">
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--signal-500)",
                marginBottom: "0.75rem",
              }}
            >
              Solution 02
            </p>
            <h2
              className="text-balance"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              AI Sales Bots
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.6,
                marginBottom: "2.5rem",
                maxWidth: "32rem",
              }}
            >
              Intelligent sales automation that qualifies leads, captures intent, and supports your team — so they can focus on building relationships that close deals.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {features.map((item) => (
                <div key={item.title} style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ marginTop: "0.25rem", color: "var(--signal-500)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-inverse)", marginBottom: "0.25rem" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.9375rem", color: "var(--text-inverse-secondary)", margin: 0, lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" onClick={handleCTAClick} className="btn-primary" style={{ background: "var(--surface)", color: "var(--text-primary)" }}>
              Explore Sales Automation
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .lg\\:col-span-6 { grid-column: span 6 / span 6; }
          .lg\\:order-1 { order: 1; }
          .lg\\:order-2 { order: 2; }
        }
      `}</style>
    </section>
  );
}
