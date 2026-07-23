/**
 * Session-based journey tracking store.
 * Uses sessionStorage for privacy-conscious first-party tracking.
 * 
 * Tracks meaningful section visits with duration, deduplicates paths,
 * and limits to 5 most relevant visits.
 */

import type { PageVisit } from "@/lib/lead/types";

const STORAGE_KEY = "eubrics_page_visits";
const MAX_VISITS = 5;
const MIN_DURATION_SECONDS = 2; // Ignore visits shorter than 2 seconds

// ---------------------------------------------------------------------------
// Read / Write
// ---------------------------------------------------------------------------

export function getPageVisits(): PageVisit[] {
  if (typeof window === "undefined") return [];
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function savePageVisits(visits: PageVisit[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
  } catch {
    // Silently fail if storage is full or unavailable
  }
}

// ---------------------------------------------------------------------------
// Record a Visit
// ---------------------------------------------------------------------------

/**
 * Record a meaningful section visit.
 * Merges duplicate paths and accumulates duration.
 * Ignores very short accidental exposures (< MIN_DURATION_SECONDS).
 */
export function recordSectionVisit(
  path: string,
  title: string,
  durationSeconds: number
): void {
  // Ignore accidental exposure
  if (durationSeconds < MIN_DURATION_SECONDS) return;

  const visits = getPageVisits();
  const existing = visits.find((v) => v.path === path);

  if (existing) {
    // Merge: accumulate duration, keep earliest visitedAt
    existing.durationSeconds += Math.round(durationSeconds);
  } else {
    visits.push({
      path,
      title,
      visitedAt: new Date().toISOString(),
      durationSeconds: Math.round(durationSeconds),
    });
  }

  // Cap at MAX_VISITS, keeping the most recent
  const capped = visits.slice(-MAX_VISITS);
  savePageVisits(capped);
}

// ---------------------------------------------------------------------------
// Clear (for testing)
// ---------------------------------------------------------------------------

export function clearJourneyStore(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}
