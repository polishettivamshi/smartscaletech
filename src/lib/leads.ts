/**
 * Lead capture utility for SmartScaleTech.
 * Stores leads locally in localStorage and sends to a webhook (e.g. Google Sheet / Formspree) if configured.
 * Also formats the WhatsApp notification so the founder receives lead data instantly.
 */

import { trackEvent } from './analytics';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  service: string;
  sourcePage: string;
  timestamp: string;
  note?: string;
}

const STORAGE_KEY = 'smartscaletech_leads_v1';

export function getStoredLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read leads from storage:', e);
    return [];
  }
}

export function saveLeadLocally(lead: Lead): void {
  try {
    const current = getStoredLeads();
    const updated = [lead, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save lead locally:', e);
  }
}

export async function submitLead(leadData: Omit<Lead, 'id' | 'timestamp'>): Promise<{ lead: Lead; whatsappUrl: string }> {
  const lead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
  };

  // 1. Always save locally so no lead is lost
  saveLeadLocally(lead);
  trackEvent('form_submit', { service: lead.service, sourcePage: lead.sourcePage });

  // 2. Dispatch to custom webhook if configured (Google Sheet Webhook, Formspree, etc.)
  const webhookUrl = (import.meta as any).env?.VITE_LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        mode: 'no-cors', // supports Google Apps Script webhooks
      });
    } catch (err) {
      console.warn('Webhook post failed, lead saved locally:', err);
    }
  }

  // 3. Format WhatsApp direct message for immediate notification
  const text = `*New Lead from SmartScaleTech Website*
━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${lead.name}
📱 *WhatsApp/Phone:* ${lead.phone}
🎯 *Service:* ${lead.service}
📄 *Source Page:* ${lead.sourcePage}
⏰ *Time:* ${new Date(lead.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
${lead.note ? `💬 *Note:* ${lead.note}` : ''}
━━━━━━━━━━━━━━━━━━━━━
_Please confirm availability and package pricing._`;

  const encoded = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/919000859695?text=${encoded}`;

  return { lead, whatsappUrl };
}
