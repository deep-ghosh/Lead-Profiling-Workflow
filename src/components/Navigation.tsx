"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/sales-bots", label: "Sales Bots" },
  { href: "/organizational-development", label: "Org Development" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-white/80 backdrop-blur-md border border-[var(--border)] rounded-full shadow-lg">
        <Link
          href="/home"
          className="px-4 py-2 text-sm font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
        >
          <span className="font-semibold">Eubrics</span>
        </Link>
        <div className="w-px h-4 bg-[var(--border)]" />
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--foreground)]"
                  : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
              }`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-[var(--background-secondary)] rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        <div className="w-px h-4 bg-[var(--border)]" />
        <Link
          href="/contact"
          className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full hover:opacity-90 transition-opacity shadow-md"
        >
          Get a Demo →
        </Link>
      </div>
    </nav>
  );
}
