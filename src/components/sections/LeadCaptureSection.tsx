"use client";

export function LeadCaptureSection() {
  const handleOpenContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-contact"));
  };

  const handleReviewSolutions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#organizational-development");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="section-dark"
      style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}
    >
      {/* Restrained background detail */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(34, 169, 189, 0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      
      <div className="section-container" style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            maxWidth: "36rem",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <h2
            className="text-balance"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--text-inverse)",
            }}
          >
            Ready to discuss what your business needs?
          </h2>

          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.6,
              color: "var(--text-inverse-secondary)",
            }}
          >
            Share a few details and we’ll make sure your request reaches the right specialist.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button
              onClick={handleOpenContact}
              className="btn-primary"
            >
              Start a Conversation
            </button>
            <a
              href="#organizational-development"
              onClick={handleReviewSolutions}
              className="btn-secondary"
              style={{ color: "var(--text-inverse)", borderColor: "var(--border-dark)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Review Our Solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
