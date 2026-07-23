"use client";

import { useMemo } from "react";
import { useSectionObserver, type TrackedSection } from "@/lib/tracking/section-observer";
import { captureAttribution } from "@/lib/tracking/attribution";
import { useEffect } from "react";

const TRACKED_SECTIONS: TrackedSection[] = [
  { id: "solutions", path: "/home", title: "Solutions" },
  { id: "sales-bots", path: "/sales-bots", title: "AI Sales Bots" },
  { id: "organizational-development", path: "/organizational-development", title: "Organizational Development" },
  { id: "contact", path: "/contact", title: "Contact" },
];

export function SectionTracker() {
  const sections = useMemo(() => TRACKED_SECTIONS, []);

  useSectionObserver(sections);

  useEffect(() => {
    captureAttribution();

    if (typeof window !== "undefined") {
      const key = "eubrics_landing_page";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, window.location.pathname);
      }
    }
  }, []);

  return null;
}
