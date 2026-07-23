/**
 * IntersectionObserver-based section tracking for single-page websites.
 * 
 * Tracks meaningful section exposure:
 * - Section must be ≥50% visible
 * - Must be visible for ≥2 seconds before recording
 * - Pauses duration tracking when tab is hidden
 * - Records to journey store on unmount or section exit
 */

"use client";

import { useEffect, useRef } from "react";
import { recordSectionVisit } from "./journey-store";

export interface TrackedSection {
  id: string;
  path: string;
  title: string;
}

/**
 * Hook that observes tracked sections on the page and records
 * meaningful visits to the journey store.
 */
export function useSectionObserver(sections: TrackedSection[]): void {
  const timersRef = useRef<Map<string, { start: number; accumulated: number }>>(
    new Map()
  );
  const sectionsRef = useRef(sections);

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const timers = timersRef.current;

    // Track tab visibility to pause duration counting
    let tabHidden = document.hidden;

    function onVisibilityChange() {
      tabHidden = document.hidden;
      if (tabHidden) {
        // Pause all active timers
        for (const [id, timer] of timers) {
          if (timer.start > 0) {
            timer.accumulated += (Date.now() - timer.start) / 1000;
            timer.start = 0;
          }
          void id;
        }
      } else {
        // Resume active (visible) timers
        for (const [, timer] of timers) {
          if (timer.start === 0 && timer.accumulated > 0) {
            timer.start = Date.now();
          }
        }
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    // Create IntersectionObserver at 50% threshold
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Section became meaningfully visible
            if (!timers.has(id)) {
              timers.set(id, { start: tabHidden ? 0 : Date.now(), accumulated: 0 });
            } else {
              const timer = timers.get(id)!;
              if (timer.start === 0) {
                timer.start = tabHidden ? 0 : Date.now();
              }
            }
          } else {
            // Section left viewport — flush duration
            const timer = timers.get(id);
            if (timer) {
              let total = timer.accumulated;
              if (timer.start > 0) {
                total += (Date.now() - timer.start) / 1000;
              }

              const section = sectionsRef.current.find((s) => s.id === id);
              if (section && total >= 2) {
                recordSectionVisit(section.path, section.title, total);
              }

              timers.delete(id);
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    // Observe all tracked sections
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    // Cleanup: flush remaining timers
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);

      for (const [id, timer] of timers) {
        let total = timer.accumulated;
        if (timer.start > 0) {
          total += (Date.now() - timer.start) / 1000;
        }

        const section = sectionsRef.current.find((s) => s.id === id);
        if (section && total >= 2) {
          recordSectionVisit(section.path, section.title, total);
        }
      }
      timers.clear();
    };
  }, [sections]);
}
