/**
 * UTM and referrer attribution capture.
 * Captured once per session and stored in sessionStorage.
 */

interface Attribution {
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

const STORAGE_KEY = "eubrics_attribution";

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  // Only capture once per session
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    referrer: document.referrer || "",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Silently fail
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { referrer: "", utmSource: "", utmMedium: "", utmCampaign: "" };
  }

  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {
    // Fallback
  }

  return { referrer: "", utmSource: "", utmMedium: "", utmCampaign: "" };
}
