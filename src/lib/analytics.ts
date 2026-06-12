// Dummy analytics wrapper. In production, this would use Vercel Analytics or similar.

export function trackEvent(eventName: string, props?: Record<string, any>) {
  if (process.env.NODE_ENV !== "production") {
    // No-op in dev to avoid noise, or log it
    console.log(`[Analytics] ${eventName}`, props);
    return;
  }

  // Assuming window.va from @vercel/analytics/react exists
  if (typeof window !== "undefined" && (window as any).va) {
    (window as any).va("event", eventName, props);
  }
}
