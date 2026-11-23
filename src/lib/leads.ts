/**
 * Lead capture utility for SmartScaleTech.
 * Sends service requests to backend/webhook if configured and formats WhatsApp/Email dispatch links.
 */

import { trackEvent } from './analytics';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  service: string;
  sourcePage: string;
  timestamp: string;
  email?: string;
  linkedInUrl?: string;
  currentRole?: string;
  companyOrCollege?: string;
  experienceLevel?: string;
  targetRole?: string;
  timeline?: string;
  budget?: string;
  projectBrief?: string;
  resumeLink?: string;
  note?: string;
}

const LEGACY_STORAGE_KEY = 'smartscaletech_leads_v1';
export const FOUNDER_WHATSAPP = '919000859695';
export const FOUNDER_EMAIL = 'smartscaletechforyou@gmail.com';

function clearLegacyLeadStorage(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage.getItem(LEGACY_STORAGE_KEY)) {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch {
    // Ignore storage access errors
  }
}

function isSafeWebhookUrl(rawUrl: unknown): rawUrl is string {
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) return false;
  try {
    const parsed = new URL(rawUrl.trim());
    return (
      parsed.protocol === 'https:' ||
      (parsed.protocol === 'http:' &&
        (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'))
    );
  } catch {
    return false;
  }
}

export interface LinkedInServiceRequestPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  linkedInUrl?: string;
  currentRole?: string;
  companyOrCollege?: string;
  experienceLevel?: string;
  targetRole?: string;
  timeline?: string;
  budget?: string;
  projectBrief?: string;
  resumeLink?: string;
  sourcePage?: string;
}

export function formatServiceRequestText(data: LinkedInServiceRequestPayload, timestamp?: string): string {
  const timeStr = timestamp 
    ? new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `💼 *NEW LINKEDIN SERVICE REQUEST* — SmartScaleTech
━━━━━━━━━━━━━━━━━━━━━
📋 *Requested Service:* ${data.service}
👤 *Client Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *WhatsApp/Phone:* ${data.phone}
${data.linkedInUrl ? `🔗 *LinkedIn Profile:* ${data.linkedInUrl}` : ''}
${data.currentRole ? `💼 *Current Role:* ${data.currentRole}` : ''}
${data.companyOrCollege ? `🏢 *Company / College:* ${data.companyOrCollege}` : ''}
${data.experienceLevel ? `📊 *Experience Level:* ${data.experienceLevel}` : ''}
${data.targetRole ? `🎯 *Target Role/Domain:* ${data.targetRole}` : ''}
${data.timeline ? `⏱️ *Required Timeline:* ${data.timeline}` : ''}
${data.budget ? `💰 *Budget Range:* ${data.budget}` : ''}
${data.resumeLink ? `📎 *Resume / Brief Link:* ${data.resumeLink}` : ''}
${data.projectBrief ? `\n📝 *Project / Service Brief:*\n"${data.projectBrief}"` : ''}
━━━━━━━━━━━━━━━━━━━━━
⏰ *Submitted At:* ${timeStr}
🌐 *Source:* ${data.sourcePage || 'LinkedIn Service Form'}
_Please reply back directly via WhatsApp or Email._`;
}

export async function submitLinkedInServiceRequest(data: LinkedInServiceRequestPayload): Promise<{
  lead: Lead;
  whatsappUrl: string;
  mailtoUrl: string;
  summaryText: string;
}> {
  clearLegacyLeadStorage();

  const lead: Lead = {
    ...data,
    id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    sourcePage: data.sourcePage || '/request-service',
    note: [
      data.linkedInUrl ? `LinkedIn: ${data.linkedInUrl}` : null,
      data.timeline ? `Timeline: ${data.timeline}` : null,
      data.budget ? `Budget: ${data.budget}` : null,
      data.projectBrief ? `Brief: ${data.projectBrief}` : null,
    ].filter(Boolean).join(' | '),
  };

  trackEvent('form_submit', { service: lead.service, sourcePage: lead.sourcePage, type: 'linkedin_service_request' });

  // 1. Dispatch to backend API
  try {
    await fetch('/api/service-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.warn('Backend service request post error, continuing with client dispatch:', err);
  }

  // 2. Format WhatsApp link
  const summaryText = formatServiceRequestText(data, lead.timestamp);
  const whatsappUrl = `https://wa.me/${FOUNDER_WHATSAPP}?text=${encodeURIComponent(summaryText)}`;

  // 3. Format direct mailto link to smartscaletechforyou@gmail.com
  const emailSubject = `[LinkedIn Service Request] ${data.service} - ${data.name}`;
  const emailBody = `Hello SmartScaleTech Team,\n\nI would like to submit a service request:\n\n` +
    `Service: ${data.service}\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone/WhatsApp: ${data.phone}\n` +
    (data.linkedInUrl ? `LinkedIn Profile: ${data.linkedInUrl}\n` : '') +
    (data.currentRole ? `Current Role: ${data.currentRole}\n` : '') +
    (data.companyOrCollege ? `Company/College: ${data.companyOrCollege}\n` : '') +
    (data.experienceLevel ? `Experience Level: ${data.experienceLevel}\n` : '') +
    (data.targetRole ? `Target Role: ${data.targetRole}\n` : '') +
    (data.timeline ? `Timeline: ${data.timeline}\n` : '') +
    (data.budget ? `Budget: ${data.budget}\n` : '') +
    (data.resumeLink ? `Resume / File Link: ${data.resumeLink}\n` : '') +
    (data.projectBrief ? `\nProject Details:\n${data.projectBrief}\n` : '') +
    `\nLooking forward to your response.\n\nRegards,\n${data.name}`;

  const mailtoUrl = `mailto:${FOUNDER_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return { lead, whatsappUrl, mailtoUrl, summaryText };
}

export async function submitLead(leadData: Omit<Lead, 'id' | 'timestamp'>): Promise<{ lead: Lead; whatsappUrl: string }> {
  clearLegacyLeadStorage();

  const lead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
  };

  trackEvent('form_submit', { service: lead.service, sourcePage: lead.sourcePage });

  // 1. Dispatch to custom webhook if configured with a safe HTTPS endpoint
  const webhookUrl = (import.meta as any).env?.VITE_LEAD_WEBHOOK_URL;
  if (isSafeWebhookUrl(webhookUrl)) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        mode: 'no-cors',
      });
    } catch (err) {
      console.warn('Webhook post failed, continuing with WhatsApp dispatch:', err);
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
  const whatsappUrl = `https://wa.me/${FOUNDER_WHATSAPP}?text=${encoded}`;

  return { lead, whatsappUrl };
}
