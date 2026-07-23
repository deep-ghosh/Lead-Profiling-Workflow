"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export interface PageVisit {
  path: string;
  timestamp: string;
}

const STORAGE_KEY = "eubrics_page_visits";

export function getVisitHistory(): PageVisit[] {
  if (typeof window === "undefined") return [];
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function clearVisitHistory(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

export function usePageTracking() {
  const pathname = usePathname();

  const trackVisit = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const visits = getVisitHistory();
      const newVisit: PageVisit = {
        path: pathname,
        timestamp: new Date().toISOString(),
      };
      visits.push(newVisit);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
    } catch {
      // Silently fail if storage is unavailable
    }
  }, [pathname]);

  useEffect(() => {
    trackVisit();
  }, [trackVisit]);

  return { getVisitHistory };
}
