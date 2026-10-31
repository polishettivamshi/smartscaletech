/**
 * Privacy-friendly event tracking utility for SmartScaleTech.
 * Works with Vercel Analytics, Plausible, or Google Analytics if configured,
 * and maintains a local summary in localStorage for the founder to inspect anytime.
 */

export type AnalyticsEventType =
  | 'cta_click'
  | 'form_submit'
  | 'whatsapp_click'
  | 'payment_click'
  | 'page_view';

interface EventPayload {
  name: AnalyticsEventType;
  data?: Record<string, string | number | boolean>;
  timestamp: string;
}

const ANALYTICS_STORAGE_KEY = 'smartscaletech_analytics_v1';

export function trackEvent(name: AnalyticsEventType, data?: Record<string, string | number | boolean>): void {
  const timestamp = new Date().toISOString();
  const payload: EventPayload = { name, data, timestamp };

  // 1. Dispatch to Vercel Analytics if active
  if (typeof window !== 'undefined' && (window as any).va) {
    try {
      (window as any).va('event', { name, data });
    } catch (e) {
      // Ignore
    }
  }

  // 2. Dispatch to Plausible if active
  if (typeof window !== 'undefined' && (window as any).plausible) {
    try {
      (window as any).plausible(name, { props: data });
    } catch (e) {
      // Ignore
    }
  }

  // 3. Dispatch to Google Analytics (gtag) if present
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', name, data);
    } catch (e) {
      // Ignore
    }
  }

  // 4. Record local counter in localStorage for zero-cost, zero-latency local tracking
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    const events: Record<string, number> = raw ? JSON.parse(raw) : {};
    events[name] = (events[name] || 0) + 1;
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events));
  } catch (err) {
    // Ignore storage quota errors
  }
}

export function getLocalAnalyticsCounts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

export const trackCtaClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', { cta: ctaName, location });
};

export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', { source });
};

export const trackFormSubmit = (service: string) => {
  trackEvent('form_submit', { service });
};

export const trackPaymentClick = (plan: string, amount: string) => {
  trackEvent('payment_click', { plan, amount });
};
