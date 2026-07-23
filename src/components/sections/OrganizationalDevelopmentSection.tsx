"use client";

import { OrgTransformationVisual } from "@/components/visuals/OrgTransformationVisual";

const capabilities = [
  {
    title: "Leadership Development",
    description: "Personalized coaching programs informed by behavioral analysis and team dynamics.",
  },
  {
    title: "Structural Alignment",
    description: "Optimize organizational structure to support strategic goals and remove bottlenecks.",
  },
  {
    title: "Team Effectiveness",
    description: "Deep insights into collaboration patterns to build stronger, more effective teams.",
  },
  {
    title: "Change Readiness",
    description: "Strategic guidance for navigating transitions while maintaining productivity and morale.",
  },
];

export function OrganizationalDevelopmentSection() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="organizational-development"
      style={{ padding: "var(--section-padding-y) 0", background: "var(--color-bg)" }}
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
          {/* Left Content */}
          <div style={{ gridColumn: "1 / -1" }} className="lg:col-span-6">
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--brand-600)",
                marginBottom: "0.75rem",
              }}
            >
              Solution 01
            </p>
            <h2
              className="text-balance"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                marginBottom: "1.25rem",
              }}
            >
              Organizational Development
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                marginBottom: "2.5rem",
                maxWidth: "32rem",
              }}
            >
              Build resilient teams, develop leaders, and align your structure to
              strategic goals. We help organizations improve from the inside out.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {capabilities.map((item) => (
                <div key={item.title} style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ marginTop: "0.25rem", color: "var(--brand-500)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" onClick={handleCTAClick} className="btn-secondary">
              Request OD Assessment
            </a>
          </div>

          {/* Right Visual */}
          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center" }} className="lg:col-span-6">
            <OrgTransformationVisual />
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .lg\\:col-span-6 { grid-column: span 6 / span 6; }
        }
      `}</style>
    </section>
  );
}
