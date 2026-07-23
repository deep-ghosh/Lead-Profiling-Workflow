"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { recordSectionVisit } from "@/lib/tracking/journey-store";

const leftLinks = [
  { href: "/", label: "Home", path: "/" },
  { href: "#how-it-works", label: "How It Works", path: "/how-it-works" },
];

const solutionLinks = [
  { href: "#organizational-development", label: "Organizational Development", path: "/organizational-development" },
  { href: "#sales-bots", label: "AI Sales Bots", path: "/sales-bots" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Track visit start times
  const visitStartRef = useRef<number>(0);
  const currentPathRef = useRef<string>("/");

  useEffect(() => {
    visitStartRef.current = Date.now();
  }, []);

  const commitVisit = useCallback((newPath: string, newLabel: string) => {
    const now = Date.now();
    const duration = (now - visitStartRef.current) / 1000;
    if (currentPathRef.current !== "/") {
      recordSectionVisit(currentPathRef.current, "Previous Section", duration);
    }
    
    recordSectionVisit(newPath, newLabel, 3);

    visitStartRef.current = now;
    currentPathRef.current = newPath;
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown accessibility: Escape and outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, path: string, label: string) => {
      // If logo clicked, let the browser reload to "/" natively.
      if (href === "/") return;
      
      e.preventDefault();
      setDropdownOpen(false);
      
      commitVisit(path, label);

      if (href === "#contact") {
        window.dispatchEvent(new CustomEvent("open-contact"));
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [commitVisit]
  );

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background-color var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)",
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <nav
        aria-label="Main navigation"
        className="px-4 py-3 md:px-8"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Logo / Brand */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "/", "/", "Home")}
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            flexShrink: 0
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1.5" fill="var(--brand-600)" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" fill="var(--brand-600)" opacity="0.4" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" fill="var(--brand-600)" opacity="0.4" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" fill="var(--brand-600)" opacity="0.1" />
          </svg>
          <span className="hidden sm:inline">Eubrics</span>
        </a>

        {/* Right Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end"
          }}
          className="gap-2 sm:gap-4 lg:gap-8"
        >
          {/* Left Links */}
          {leftLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.path, link.label)}
              className="btn-link"
              style={{ fontSize: "0.8125rem", padding: "0.25rem" }}
            >
              {link.label}
            </a>
          ))}

          {/* Solutions Dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn-link"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              style={{ fontSize: "0.8125rem", padding: "0.25rem" }}
            >
              Solutions
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0.5rem)",
                    right: "0",
                    background: "var(--surface)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-md)",
                    padding: "0.5rem",
                    minWidth: "14rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {solutionLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.path, link.label)}
                      style={{
                        padding: "0.5rem 0.75rem",
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        borderRadius: "var(--radius-sm)",
                        transition: "background-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--paper-100)";
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact", "/contact", "Discuss Your Needs")}
            className="btn-primary"
            style={{ padding: "0.4rem 1rem", fontSize: "0.8125rem", whiteSpace: "nowrap" }}
          >
            Discuss Your Needs
          </a>
        </div>
      </nav>
    </header>
  );
}
