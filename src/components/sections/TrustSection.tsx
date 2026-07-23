export function TrustSection() {
  const items = [
    {
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      title: "Privacy-conscious intake",
    },
    {
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Relevant context captured",
    },
    {
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Intelligent service routing",
    },
    {
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Human specialist follow-up",
    },
  ];

  return (
    <section
      aria-label="Process advantages"
      style={{
        background: "var(--paper-100)",
        borderTop: "1px solid var(--border-light)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div
        className="credibility-band"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "grid",
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.title}
            className="credibility-item"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              padding: "1.25rem 1rem",
              borderRight: index < items.length - 1 ? "1px solid var(--border-light)" : "none",
            }}
          >
            <div style={{ color: "var(--brand-600)", display: "flex" }}>
              {item.icon}
            </div>
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        .credibility-band {
          grid-template-columns: repeat(2, 1fr);
        }
        .credibility-item:nth-child(even) {
          border-right: none !important;
        }
        .credibility-item:nth-child(1), .credibility-item:nth-child(2) {
          border-bottom: 1px solid var(--border-light);
        }
        
        @media (min-width: 1024px) {
          .credibility-band {
            grid-template-columns: repeat(4, 1fr);
          }
          .credibility-item:nth-child(even) {
            border-right: 1px solid var(--border-light) !important;
          }
          .credibility-item:nth-child(4) {
            border-right: none !important;
          }
          .credibility-item:nth-child(1), .credibility-item:nth-child(2) {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
