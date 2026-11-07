import React, { useState } from 'react';
import { 
  Linkedin, 
  Send, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Phone, 
  Briefcase, 
  Building2, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink,
  HelpCircle,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { submitLinkedInServiceRequest, LinkedInServiceRequestPayload, FOUNDER_WHATSAPP, FOUNDER_EMAIL } from '../../lib/leads';

const SERVICE_OPTIONS = [
  { id: 'ATS Resume Writing', label: 'ATS Resume Re-engineering', badge: 'Popular', price: 'From ₹199' },
  { id: 'Campus Placement Resume', label: 'College / Placement Drive Resume', badge: 'Fresher Special', price: '₹199' },
  { id: 'LinkedIn Profile Optimization', label: 'LinkedIn Profile Makeover', badge: 'High CTR', price: '₹299' },
  { id: 'Working Pro ATS Resume', label: 'Working Professional ATS Resume (1–5 yrs)', badge: 'Workday Ready', price: '₹399' },
  { id: 'Career Launch Combo', label: 'Career Launch Combo (Resume + LinkedIn + Cover)', badge: 'Best Value', price: '₹699' },
  { id: 'Executive Resume', label: 'Senior Lead / Executive Resume (5+ yrs)', badge: 'Leadership', price: '₹699' },
  { id: 'Portfolio Website', label: 'Developer / Professional Portfolio', badge: 'Fast Launch', price: 'From ₹999' },
  { id: 'Web Development', label: 'Full-Stack Web Development', badge: 'Custom', price: 'From ₹1,499' },
];

const EXPERIENCE_LEVELS = [
  'College Fresher / 0–1 yr',
  'Working Professional / 1–5 yrs',
  'Senior / Lead / 5+ yrs',
  'Founder / Business Owner',
];

const TIMELINE_OPTIONS = [
  '⚡ Urgent (Within 24–48 Hours)',
  '📅 Standard (3–5 Days)',
  '🤝 Flexible / Within 2 Weeks',
];

const BUDGET_OPTIONS = [
  '₹0 (Free Resume Audit & Quote Only)',
  '₹199 – ₹349 (Student & Fresher Special)',
  '₹350 – ₹699 (Professional / Makeover)',
  '₹700 – ₹1,299 (Career Launch Combo)',
  '₹1,300 – ₹2,999 (Portfolio & Web Projects)',
  'Custom / Discuss on WhatsApp',
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
    budget: BUDGET_OPTIONS[1],
    projectBrief: '',
    resumeLink: '',
    sourcePage,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedUrls, setGeneratedUrls] = useState<{ whatsapp: string; mailto: string; summary: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
  };

  const handleSubmit = async (preferredChannel: 'whatsapp' | 'email') => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert('Please fill in your Name, Phone Number, and Email Address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { whatsappUrl, mailtoUrl, summaryText } = await submitLinkedInServiceRequest({
        ...formData,
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
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = mailtoUrl;
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to submit request. Please reach out to us directly on WhatsApp: +91 90008 59695');
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
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-100 shadow-inner">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Service Request Ready &amp; Saved!
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your request for <strong className="text-primary">{formData.service}</strong> has been logged in our system.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Founder Vamshi Polishetti replies directly within <strong className="text-emerald-700">5 minutes</strong> during working hours (9 AM – 9 PM IST).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
          <a
            href={generatedUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
          >
            <MessageCircle size={18} fill="currentColor" />
            Send via WhatsApp
          </a>

          <a
            href={generatedUrls.mailto}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            <Mail size={18} />
            Send via Email
          </a>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={copySummaryToClipboard}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Copied to clipboard!' : 'Copy formatted request details'}
          </button>
        </div>

        <div className="border-t border-slate-100 pt-6 text-left max-w-lg mx-auto bg-slate-50 rounded-2xl p-4 text-xs space-y-1.5 text-slate-600">
          <div className="font-bold text-slate-800 flex items-center justify-between pb-1 border-b border-slate-200">
            <span>Direct Founder Contacts:</span>
            <span className="text-emerald-600 font-semibold">● Active Now</span>
          </div>
          <div>📞 WhatsApp: <strong>+91 90008 59695</strong></div>
          <div>📧 Email: <strong>smartscaletechforyou@gmail.com</strong></div>
          <div>🏢 Office: <strong>Hitech City, Hyderabad, Telangana, India</strong></div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setGeneratedUrls(null);
          }}
          className="text-xs text-slate-400 hover:text-slate-600 font-medium underline cursor-pointer"
        >
          Submit another service request
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden ${isCompact ? 'p-6' : 'p-6 sm:p-10'}`}>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-200">
            <Linkedin size={14} className="text-[#0A66C2]" /> 100% Free Consultation · Packages from ₹199
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Request a Free Service Proposal
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Requesting a quote and resume score audit is 100% Free (₹0 upfront). Affordable packages start from just ₹199!
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-500 shrink-0">
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Replies in ~5 minutes
          </span>
          <span>WhatsApp &amp; Gmail Direct Dispatch</span>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* Step 1: Select Service */}
        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
            1. Select Requested Service <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SERVICE_OPTIONS.map((srv) => {
              const isSelected = formData.service === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => handleSelectService(srv.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-slate-900 shadow-sm ring-2 ring-primary/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm leading-snug">{srv.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{srv.price}</div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Contact Information */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
            2. Your Contact &amp; Profile Details <span className="text-rose-500">*</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                WhatsApp / Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9000859695"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                LinkedIn Profile URL <span className="text-slate-400 font-normal">(Recommended)</span>
              </label>
              <div className="relative">
                <Linkedin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0A66C2]" />
                <input
                  type="url"
                  name="linkedInUrl"
                  value={formData.linkedInUrl}
                  onChange={handleChange}
                  placeholder="e.g. linkedin.com/in/rahul-sharma"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Current Context & Experience */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
            3. Professional Background &amp; Target Role
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Current Role / Study
              </label>
              <input
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="e.g. Java Dev / B.Tech 4th Year"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Role / Domain
              </label>
              <input
                type="text"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Full-Stack / Cloud / SDE-1"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Timeline & Budget */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
            4. Timeline &amp; Budget Expectations
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Delivery Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              >
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
              >
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 5: Brief & Link */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
            5. Project Brief or Specific Request <span className="text-slate-400 font-normal">(Optional)</span>
          </label>

          <textarea
            name="projectBrief"
            rows={3}
            value={formData.projectBrief}
            onChange={handleChange}
            placeholder="Tell us what you need help with (e.g. 'I am not getting callbacks from Workday jobs', 'Need a developer portfolio built with React', or 'Want a full LinkedIn makeover')..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50 resize-y"
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Current Resume or Project Link (Google Drive / Dropbox)
            </label>
            <input
              type="url"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              placeholder="e.g. https://drive.google.com/file/d/..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              You can also send your PDF directly over WhatsApp once you submit.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit('whatsapp')}
            className="w-full sm:flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xl shadow-emerald-600/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <MessageCircle size={20} fill="currentColor" />
            <span>Send Request via WhatsApp</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit('email')}
            className="w-full sm:flex-1 h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <Mail size={20} />
            <span>Send Request via Email</span>
          </button>
        </div>

        {/* Security and SLA assurance */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-primary" /> 100% Confidential
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={16} className="text-emerald-600" /> ~5 min reply on WhatsApp
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-slate-600" /> No upfront payment required
          </span>
        </div>
      </form>
    </div>
  );
};
