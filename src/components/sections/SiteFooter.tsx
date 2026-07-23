"use client";

export function SiteFooter() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        background: "var(--ink-950)",
        borderTop: "1px solid var(--border-dark)",
        padding: "4rem var(--section-padding-x) 2rem",
      }}
    >
      <div className="section-container" style={{ padding: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand & Description */}
          <div style={{ maxWidth: "20rem" }}>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text-inverse)",
                letterSpacing: "-0.01em",
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                marginBottom: "1rem"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1.5" fill="var(--brand-500)" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" fill="var(--brand-500)" opacity="0.4" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" fill="var(--brand-500)" opacity="0.4" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" fill="var(--brand-500)" opacity="0.1" />
              </svg>
              Eubrics
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--text-inverse-secondary)",
              }}
            >
              Intelligent request routing for enterprise teams. We connect your business challenges with specialized expertise in organizational development and sales automation.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-inverse)",
                marginBottom: "1.25rem",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <a
                  href="#solutions"
                  onClick={(e) => handleNavClick(e, "#solutions")}
                  style={{ fontSize: "0.875rem", color: "var(--text-inverse-secondary)", textDecoration: "none", transition: "color var(--transition-fast)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-inverse)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-inverse-secondary)")}
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, "#how-it-works")}
                  style={{ fontSize: "0.875rem", color: "var(--text-inverse-secondary)", textDecoration: "none", transition: "color var(--transition-fast)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-inverse)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-inverse-secondary)")}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  style={{ fontSize: "0.875rem", color: "var(--text-inverse-secondary)", textDecoration: "none", transition: "color var(--transition-fast)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-inverse)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-inverse-secondary)")}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Privacy */}
          <div>
            <h4
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-inverse)",
                marginBottom: "1.25rem",
              }}
            >
              Legal
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ fontSize: "0.875rem", color: "var(--text-inverse-secondary)", textDecoration: "none", transition: "color var(--transition-fast)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-inverse)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-inverse-secondary)")}
                >
                  Privacy Statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-dark)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-inverse-secondary)",
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Eubrics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
