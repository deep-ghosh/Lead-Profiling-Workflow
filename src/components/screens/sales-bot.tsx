"use client";

import { motion } from "framer-motion";
import { usePageTracking } from "@/hooks/usePageTracking";

const features = [
  {
    title: "Lead Qualification",
    description: "AI-powered analysis to identify and qualify high-potential leads automatically.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Meeting Scheduling",
    description: "Intelligent calendar integration that finds optimal times and manages bookings.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Follow-up Automation",
    description: "Personalized follow-up sequences that nurture prospects through the funnel.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    ),
  },
  {
    title: "CRM Integration",
    description: "Seamless synchronization with your existing CRM and sales tools.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "Conversation Intelligence",
    description: "Real-time analysis of sales calls to improve performance and outcomes.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: "Pipeline Management",
    description: "AI insights to predict deal closure and optimize your sales pipeline.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function SalesBotsPage() {
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
            Sales <span className="gradient-text">Bots</span>
          </h1>
          <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto">
            Autonomous AI agents that transform your sales process. From initial outreach to closing deals,
            our intelligent bots handle the heavy lifting while your team focuses on relationships.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group p-6 bg-white/80 backdrop-blur-sm border border-[var(--border)] rounded-2xl shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
            >
              <div className="w-10 h-10 mb-4 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--foreground-secondary)]">
                {feature.description}
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
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Ready to transform your sales?</h2>
          <p className="mt-2 text-[var(--foreground-secondary)]">
            Get a custom demo tailored to your business needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center mt-6 px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            Request Demo
          </a>
        </motion.div>
      </div>
    </div>
  );
}
