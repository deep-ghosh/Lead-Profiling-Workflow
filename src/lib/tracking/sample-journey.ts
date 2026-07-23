/**
 * Sample journey fixture for development and testing.
 * 
 * NOT visible to production users.
 * NOT included in production bundles (only used in dev/test).
 */

import type { PageVisit } from "@/lib/lead/types";

/**
 * Generate a deterministic sample journey for testing purposes.
 * This simulates a visitor browsing the Sales Bots section
 * and then checking pricing before submitting a lead.
 */
export function generateSampleJourney(): PageVisit[] {
  return [
    {
      path: "/sales-bots",
      title: "AI Sales Bots",
      visitedAt: "2026-07-24T01:11:02.000Z",
      durationSeconds: 94,
    },
    {
      path: "/pricing",
      title: "Pricing",
      visitedAt: "2026-07-24T01:12:41.000Z",
      durationSeconds: 31,
    },
  ];
}

/**
 * Generate a sample journey for organizational development interest.
 */
export function generateOrgDevSampleJourney(): PageVisit[] {
  return [
    {
      path: "/organizational-development",
      title: "Organizational Development",
      visitedAt: "2026-07-24T01:08:15.000Z",
      durationSeconds: 67,
    },
    {
      path: "/how-it-works",
      title: "How It Works",
      visitedAt: "2026-07-24T01:09:30.000Z",
      durationSeconds: 22,
    },
    {
      path: "/contact",
      title: "Contact",
      visitedAt: "2026-07-24T01:10:05.000Z",
      durationSeconds: 145,
    },
  ];
}
