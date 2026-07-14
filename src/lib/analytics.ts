import { track } from "@vercel/analytics";

export function trackEvent(eventName: string, props?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Analytics] ${eventName}`, props);
    return;
  }

  track(eventName, props as Record<string, string>);
}
