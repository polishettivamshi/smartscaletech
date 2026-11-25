import React, { useState } from 'react';
import {
  Linkedin,
  MessageCircle,
  Mail,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  Phone,
  Copy,
  Check,
} from 'lucide-react';
import { submitLinkedInServiceRequest, LinkedInServiceRequestPayload } from '../../lib/leads';
import { StatusBanner } from '../ui/StatusBanner';
import { Button } from '../ui/Button';
import { OfferPrice } from '../ui/OfferPrice';

const SERVICE_OPTIONS = [
  { id: 'Web Development', label: 'Custom Business / SaaS Website', price: 'From ₹7,999', standardPrice: 9999, offerPrice: 7999 },
  { id: 'UI/UX Design & Wireframe', label: 'UI/UX Design & Interface System', price: 'From ₹3,199', standardPrice: 3999, offerPrice: 3199 },
  { id: 'AI Workflow / Chatbot Integration', label: 'AI Automation & LLM Integration', price: 'From ₹6,399', standardPrice: 7999, offerPrice: 6399 },
  { id: 'ATS Resume Writing', label: 'ATS Resume Writing (Word + PDF)', price: '₹239', standardPrice: 299, offerPrice: 239 },
  { id: 'LinkedIn Profile Optimization', label: 'LinkedIn & Naukri Profile Makeover', price: 'From ₹319', standardPrice: 399, offerPrice: 319 },
  { id: 'Career Starter Bundle', label: 'Career Starter Bundle (Resume + LinkedIn + Portals)', price: '₹899', standardPrice: 1046, offerPrice: 899 },
  { id: 'Portfolio Website', label: 'Portfolio Launch Bundle (Portfolio + ATS Resume)', price: '₹1,999', standardPrice: 2246, offerPrice: 1999 },
  { id: 'Final Year Project', label: 'Final Year Project (Code + Report + Viva)', price: 'From ₹3,999', standardPrice: 4999, offerPrice: 3999 },
];

const EXPERIENCE_LEVELS = [
  'College Fresher / 0–1 yr',
  'Working Professional / 1–5 yrs',
  'Senior / Lead / 5+ yrs',
  'Founder / Business Owner',
];

const TIMELINE_OPTIONS = [
  'Urgent (Within 24–48 Hours)',
  'Standard (3–5 Days)',
  'Flexible (1–2 Weeks)',
];

const BUDGET_OPTIONS = [
  '₹0 (Free Scope Audit & Quote)',
  '₹159 – ₹3,999 (Single Career or Project Item)',
  '₹899 – ₹1,999 (Career or Portfolio Bundle)',
  '₹1,599 – ₹7,999 (Business & Marketing Services)',
  'Custom Scope / Software Project',
];

interface LinkedInServiceRequestFormProps {
  initialService?: string;
  sourcePage?: string;
  onSuccess?: () => void;
  isCompact?: boolean;
}

export const LinkedInServiceRequestForm: React.FC<LinkedInServiceRequestFormProps> = ({
  initialService,
  sourcePage = '/request-service',
  onSuccess,
  isCompact = false,
}) => {
  const [formData, setFormData] = useState<LinkedInServiceRequestPayload>({
    name: '',
    phone: '',
    email: '',
    service: initialService || SERVICE_OPTIONS[0].id,
    linkedInUrl: '',
    currentRole: '',
    companyOrCollege: '',
    experienceLevel: EXPERIENCE_LEVELS[1],
    targetRole: '',
    timeline: TIMELINE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    projectBrief: '',
    resumeLink: '',
    sourcePage,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedUrls, setGeneratedUrls] = useState<{
    whatsapp: string;
    mailto: string;
    summary: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (errorMessage) setErrorMessage(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
  };

  const handleSubmit = async (preferredChannel: 'whatsapp' | 'email') => {
    if (isSubmitting) return;

    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();
    const cleanEmail = formData.email.trim();

    if (!cleanName || !cleanPhone || !cleanEmail) {
      setErrorMessage('Please enter your Name, Phone Number, and Email Address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const { whatsappUrl, mailtoUrl, summaryText } = await submitLinkedInServiceRequest({
        ...formData,
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        sourcePage,
      });

      setGeneratedUrls({
        whatsapp: whatsappUrl,
        mailto: mailtoUrl,
        summary: summaryText,
      });

      setIsSuccess(true);
      if (onSuccess) onSuccess();

      if (preferredChannel === 'whatsapp') {
        try {
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        } catch {
          // Graceful fallback: direct WhatsApp link rendered on confirmation card
        }
      }
    } catch {
      setErrorMessage(
        'We could not email your request right now. Please message +91 90008 59695 directly on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copySummaryToClipboard = () => {
    if (!generatedUrls) return;
    navigator.clipboard.writeText(generatedUrls.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSuccess && generatedUrls) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#D8D3C9] text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-[#16845B]/15 text-[#16845B] mx-auto flex items-center justify-center">
          <CheckCircle2 size={30} />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-2xl font-extrabold text-[#111111]">
            Service Request Sent
          </h3>
          <p className="text-[#57534E] text-sm leading-relaxed">
            Thank you, <strong className="text-[#111111]">{formData.name}</strong>. Your inquiry for{' '}
            <strong className="text-[#D9541E]">{formData.service}</strong> has been emailed to our studio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <a
            href={generatedUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#D9541E] hover:bg-[#B94414] text-white font-semibold text-sm transition-colors"
          >
            <MessageCircle size={17} /> Send via WhatsApp
          </a>

          <a
            href={generatedUrls.mailto}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#111111] hover:bg-[#2A2927] text-white font-semibold text-sm transition-colors"
          >
            <Mail size={17} /> Open Email App
          </a>
        </div>

        <div>
          <button
            type="button"
            onClick={copySummaryToClipboard}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#D9541E] cursor-pointer"
          >
            {copied ? <Check size={14} className="text-[#16845B]" /> : <Copy size={14} />}
            {copied ? 'Copied brief summary' : 'Copy brief summary'}
          </button>
        </div>

        <div className="border-t border-[#EAE3D5] pt-5 text-left max-w-lg mx-auto bg-[#F3EEE3]/50 rounded-xl p-4 text-xs space-y-1.5 text-[#57534E]">
          <p className="font-bold text-[#111111] pb-1 border-b border-[#D8D3C9]">
            Direct Studio Contacts
          </p>
          <p>WhatsApp: +91 90008 59695</p>
          <p>Email: smartscaletechforyou@gmail.com</p>
          <p>Studio: Hitech City, Hyderabad, Telangana</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setGeneratedUrls(null);
          }}
          className="text-xs text-[#57534E] hover:text-[#111111] font-semibold underline underline-offset-4 cursor-pointer"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-[#D8D3C9] overflow-hidden ${
        isCompact ? 'p-6' : 'p-6 sm:p-10'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D5] mb-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D9541E] mb-1">
            Free Scope Consultation · Packages from{' '}
            <OfferPrice standardPrice={199} offerPrice={159} startingFrom compact />
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
            Project &amp; Career Brief
          </h2>
        </div>

        <div className="text-xs text-[#57534E] sm:text-right">
          <p className="font-bold text-[#16845B]">Fast WhatsApp &amp; Email Dispatch</p>
          <p>Mon–Sat · Hitech City, IST</p>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#111111]">
            1. Select Service Track <span className="text-[#D9541E]">*</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SERVICE_OPTIONS.map((srv) => {
              const isSelected = formData.service === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => handleSelectService(srv.id)}
                  className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-[#111111] bg-[#F3EEE3]/70 text-[#111111]'
                      : 'border-[#D8D3C9] hover:border-[#111111]/40 bg-white text-[#57534E]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-[#111111] leading-snug">{srv.label}</div>
                    <div className="mt-1">
                      {srv.standardPrice && srv.offerPrice ? (
                        <OfferPrice
                          standardPrice={srv.standardPrice}
                          offerPrice={srv.offerPrice}
                          startingFrom={srv.price.startsWith('From ')}
                          compact
                        />
                      ) : (
                        <span className="text-xs text-[#57534E] tabular-nums">{srv.price}</span>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#D9541E] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#EAE3D5]">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#111111]">
            2. Contact Information <span className="text-[#D9541E]">*</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="req-name" className="block text-xs font-bold text-[#111111] mb-1.5">
                Full Name <span className="text-[#D9541E]">*</span>
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6862]"
                />
                <input
                  id="req-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
                />
              </div>
            </div>

            <div>
              <label htmlFor="req-phone" className="block text-xs font-bold text-[#111111] mb-1.5">
                WhatsApp / Phone <span className="text-[#D9541E]">*</span>
              </label>
              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6862]"
                />
                <input
                  id="req-phone"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9000859695"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
                />
              </div>
            </div>

            <div>
              <label htmlFor="req-email" className="block text-xs font-bold text-[#111111] mb-1.5">
                Email Address <span className="text-[#D9541E]">*</span>
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6862]"
                />
                <input
                  id="req-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
                />
              </div>
            </div>

            <div>
              <label htmlFor="req-linkedin" className="block text-xs font-bold text-[#111111] mb-1.5">
                LinkedIn or Website URL <span className="text-[#6B6862] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Linkedin
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6862]"
                />
                <input
                  id="req-linkedin"
                  type="url"
                  name="linkedInUrl"
                  value={formData.linkedInUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#EAE3D5]">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#111111]">
            3. Context, Timeline &amp; Budget
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="req-level" className="block text-xs font-bold text-[#111111] mb-1.5">
                Profile / Track
              </label>
              <select
                id="req-level"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="req-timeline" className="block text-xs font-bold text-[#111111] mb-1.5">
                Timeline
              </label>
              <select
                id="req-timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
              >
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="req-budget" className="block text-xs font-bold text-[#111111] mb-1.5">
                Budget Range
              </label>
              <select
                id="req-budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
              >
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="req-role" className="block text-xs font-bold text-[#111111] mb-1.5">
                Current Role or Business Type
              </label>
              <input
                id="req-role"
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="e.g. Python Dev / B.Tech Student / D2C Brand"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
              />
            </div>

            <div>
              <label htmlFor="req-target" className="block text-xs font-bold text-[#111111] mb-1.5">
                Target Goal / Role
              </label>
              <input
                id="req-target"
                type="text"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Backend SDE-1 / Company Website Relaunch"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#EAE3D5]">
          <label htmlFor="req-brief" className="block text-xs font-extrabold uppercase tracking-wider text-[#111111]">
            4. Project Brief <span className="text-[#6B6862] font-normal">(Optional)</span>
          </label>
          <textarea
            id="req-brief"
            name="projectBrief"
            rows={3}
            value={formData.projectBrief}
            onChange={handleChange}
            placeholder="Describe your goal, deadlines, or paste a relevant job/project link..."
            className="w-full px-4 py-3 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35 resize-y"
          />
          <div>
            <label htmlFor="req-link" className="block text-xs font-bold text-[#111111] mb-1.5">
              Resume / Brief Reference Link (Google Drive / Dropbox)
            </label>
            <input
              id="req-link"
              type="url"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#D8D3C9] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E] bg-[#F3EEE3]/35"
            />
          </div>
        </div>

        {errorMessage && <StatusBanner tone="error">{errorMessage}</StatusBanner>}

        <div className="pt-4 border-t border-[#EAE3D5] flex flex-col sm:flex-row items-center gap-3.5">
          <Button
            type="button"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            onClick={() => handleSubmit('whatsapp')}
            className="w-full sm:flex-1"
          >
            <MessageCircle size={17} />
            {isSubmitting ? 'Saving...' : 'Send Brief via WhatsApp'}
          </Button>

          <Button
            type="button"
            variant="dark"
            size="lg"
            disabled={isSubmitting}
            onClick={() => handleSubmit('email')}
            className="w-full sm:flex-1"
          >
            <Mail size={17} />
            {isSubmitting ? 'Saving...' : 'Send Brief via Email'}
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-1 text-xs text-[#57534E]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#16845B]" /> Confidential handling
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-[#D9541E]" /> Direct founder review
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[#111111]" /> No upfront payment needed
          </span>
        </div>
      </form>
    </div>
  );
};
