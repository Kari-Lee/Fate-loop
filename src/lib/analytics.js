import posthog from "posthog-js";

let initialized = false;

export function initAnalytics() {
  if (initialized) return;
  if (typeof window === "undefined") return;
  try {
    posthog.init("phc_vkSndvoMHewrxiSAiQ6ttdwFt9ZNQzcazzEArRpP8QWc", {
      api_host: "https://us.i.posthog.com",
      person_profiles: "always",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
    });
    initialized = true;
  } catch (e) {
    // fail silently — analytics must never break the app
  }
}

export function track(event, props = {}) {
  try {
    if (typeof window !== "undefined" && posthog) {
      posthog.capture(event, props);
    }
  } catch (e) {
    // silent
  }
}

export function identify(id, props = {}) {
  try {
    if (typeof window !== "undefined" && posthog) {
      posthog.identify(id, props);
    }
  } catch (e) {
    // silent
  }
}
