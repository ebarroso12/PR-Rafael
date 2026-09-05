"use client";

export function track(type: "pageview" | "whatsapp_click" | "cta_click", target?: string) {
    try {
          const payload = JSON.stringify({ type, target, path: window.location.pathname });
          if (navigator.sendBeacon) {
                  const blob = new Blob([payload], { type: "application/json" });
                  navigator.sendBeacon("/api/track", blob);
          } else {
                  fetch("/api/track", { method: "POST", body: payload, keepalive: true });
          }
    } catch {
          // analytics must never break the page
    }
}
