import posthog from "posthog-js";

export function initPostHog() {
  if (typeof window === "undefined") return;
  if (posthog.__loaded) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!key) return;

  posthog.init(key, {
    api_host: host || "https://eu.i.posthog.com",
    capture_pageview: true,
    capture_pageleave: true,
    persistence: "localStorage+cookie",
    autocapture: true,
    // Respect DNT
    respect_dnt: true,
    // Disable session recording for now (saves quota)
    disable_session_recording: true,
  });
}

export { posthog };
