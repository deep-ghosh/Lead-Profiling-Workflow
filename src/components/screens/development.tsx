"use client";

import { motion } from "framer-motion";
import { usePageTracking } from "@/hooks/usePageTracking";

const capabilities = [
  {
    title: "Team Analytics",
    description: "Deep insights into team dynamics, collaboration patterns, and performance metrics.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Skill Gap Analysis",
    description: "AI-driven identification of skill gaps and personalized learning pathways.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Culture Assessment",
    description: "Data-driven analysis of organizational culture and improvement recommendations.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Performance Optimization",
    description: "Intelligent systems to identify bottlenecks and optimize team workflows.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Leadership Development",
    description: "Personalized coaching programs powered by AI insights and behavioral analysis.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Change Management",
    description: "Strategic guidance for navigating organizational transitions smoothly.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

export default function OrganizationalDevelopmentPage() {
  usePageTracking();

  return (
    <div className="min-h-screen tech-grid circuit-pattern pt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-4">
            Organizational <span className="gradient-text">Development</span>
          </h1>
          <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto">
            Transform your organization with AI-powered insights. We help you build stronger teams,
            optimize performance, and create a culture that drives results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group p-6 bg-white/80 backdrop-blur-sm border border-[var(--border)] rounded-2xl shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
            >
              <div className="w-10 h-10 mb-4 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--foreground-secondary)]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 bg-white/80 backdrop-blur-sm border border-[var(--border)] rounded-2xl text-center"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Build a stronger organization</h2>
          <p className="mt-2 text-[var(--foreground-secondary)]">
            Let's discuss how AI can transform your organizational development strategy.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center mt-6 px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Conversation
          </a>
        </motion.div>
      </div>
    </div>
  );
}
