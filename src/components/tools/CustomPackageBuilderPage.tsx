import { useState, useMemo, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  MessageCircle,
  CreditCard,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Send,
  ArrowRight,
} from 'lucide-react';
import { SEO, SITE_URL } from '../../lib/seo';
import { Button } from '../ui/Button';
import { Breadcrumb } from '../ui/Breadcrumb';
import { StatusBanner } from '../ui/StatusBanner';
import { PaymentModal } from '../home/PaymentModal';
import { trackEvent } from '../../lib/analytics';
import { submitLead } from '../../lib/leads';
import {
  AudienceTrack,
  BUNDLE_ADDONS,
  SERVICE_CATALOG,
  calculateBundleTotals,
} from '../../data/bundleCatalog';

const QUICK_PRESETS: { name: string; ids: string[]; track: AudienceTrack }[] = [
  {
    name: 'Fresher Job Launchpad',
    ids: ['ats-resume', 'linkedin-opt', 'naukri-indeed', 'github-audit'],
    track: 'job-seekers',
  },
  {
    name: 'Developer Portfolio Bundle',
    ids: ['ats-resume', 'linkedin-opt', 'github-audit', 'portfolio-site'],
    track: 'job-seekers',
  },
  {
    name: 'Business Web + SEO Launch',
    ids: ['web-development', 'seo-growth', 'brand-identity'],
    track: 'business',
  },
];

const TIMELINES = [
  { id: 'Standard (3–5 Days / Scoped)', label: 'Standard Schedule', desc: 'Ideal for full builds and balanced feedback rounds.' },
  { id: 'Express (24–48h Priority)', label: 'Express Priority', desc: 'Fast-tracked career drafts and urgent launches.' },
];

const builderJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Custom Career & Tech Service Bundle Builder | SmartScaleTech',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/custom-package-builder`,
    provider: { '@id': `${SITE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${SITE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: 'Custom Bundle Builder', item: `${SITE_URL}/custom-package-builder` },
    ],
  },
];

export const CustomPackageBuilderPage = () => {
  const [audience, setAudience] = useState<AudienceTrack>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'ats-resume',
    'linkedin-opt',
    'naukri-indeed',
  ]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState(TIMELINES[0].id);

  // Step 6 contact fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchError, setDispatchError] = useState<string | null>(null);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const visibleServices = useMemo(() => {
    if (audience === 'all') return SERVICE_CATALOG;
    return SERVICE_CATALOG.filter((s) => s.track === audience);
  }, [audience]);

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const applyPreset = (preset: (typeof QUICK_PRESETS)[number]) => {
    setSelectedIds(preset.ids);
    setAudience(preset.track);
    trackEvent('cta_click', { cta: 'apply_bundle_preset', preset: preset.name });
  };

  const totals = useMemo(
    () => calculateBundleTotals(selectedIds, selectedAddonIds),
    [selectedIds, selectedAddonIds]
  );

  const selectedAddonsList = useMemo(
    () => BUNDLE_ADDONS.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  );

  const whatsappUrl = useMemo(() => {
    const lines = totals.selectedServices.map(
      (s, i) =>
        `${i + 1}. ${s.name} (₹${s.standardPrice.toLocaleString('en-IN')} → ₹${s.price.toLocaleString('en-IN')}, Save ₹${(s.standardPrice - s.price).toLocaleString('en-IN')})`
    );
    const addonLines = selectedAddonsList.map(
      (a) =>
        `+ Add-on: ${a.name} (₹${a.standardPrice.toLocaleString('en-IN')} → ₹${a.price.toLocaleString('en-IN')}, Save ₹${(a.standardPrice - a.price).toLocaleString('en-IN')})`
    );
    return `https://wa.me/919000859695?text=${encodeURIComponent(
      `Hello SmartScaleTech,\n\nI configured a custom bundle:\n\n${lines.join('\n')}${
        addonLines.length ? `\n\n${addonLines.join('\n')}` : ''
      }\n\nPreferred Timeline: ${timeline}\nSubtotal: ₹${totals.subtotal.toLocaleString(
        'en-IN'
      )}\nBundle Discount (${Math.round(totals.discountRate * 100)}%): -₹${totals.discountAmount.toLocaleString(
        'en-IN'
      )}\nAdd-Ons: ₹${totals.addonsTotal.toLocaleString('en-IN')}\nTotal Savings: ₹${totals.totalSavings.toLocaleString('en-IN')}\n*Final Bundle Total: ₹${totals.finalTotal.toLocaleString(
        'en-IN'
      )}*\n\nName: ${name || '-'}\nPhone: ${phone || '-'}\nEmail: ${email || '-'}`
    )}`;
  }, [totals, selectedAddonsList, timeline, name, phone, email]);

  const handleDispatchProposal = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (totals.selectedServices.length === 0) {
      setDispatchError('Please select at least one core service first.');
      return;
    }

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (!cleanName || cleanPhone.length < 7) {
      setDispatchError('Enter your name and WhatsApp/phone number to dispatch your bundle quote.');
      return;
    }

    setDispatchError(null);
    setDispatchSuccess(null);
    setIsSubmitting(true);

    try {
      await submitLead({
        name: cleanName,
        phone: cleanPhone,
        email: email.trim() || undefined,
        service: `Custom Bundle (${totals.selectedServices.length} items · ₹${totals.finalTotal})`,
        sourcePage: '/custom-package-builder',
        note: `Timeline: ${timeline} | Items: ${totals.selectedServices
          .map((s) => s.id)
          .join(', ')} | Addons: ${selectedAddonIds.join(', ') || 'None'}`,
      });
      setDispatchSuccess(whatsappUrl);
      trackEvent('cta_click', {
        cta: 'send_custom_bundle_whatsapp',
        total: totals.finalTotal,
      });
    } catch {
      setDispatchError('Could not save quote right now. You can still send via WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F3EEE3] text-[#111111] min-h-screen pb-28 lg:pb-20">
      <SEO
        title="6-Step Custom Service Bundle & Price Estimator | SmartScaleTech (SST)"
        description="Build your own ATS resume, LinkedIn optimization, portfolio website, or business web development bundle with Smart Scale Tech (SST) and save 10% to 20% automatically."
        path="/custom-package-builder"
        jsonLd={builderJsonLd}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Tools', to: '/tools' },
            { label: 'Custom Bundle Builder' },
          ]}
          className="mb-7"
        />

        <div className="max-w-3xl mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
            Interactive Quote Configurator · Save 10% – 20%
          </p>
          <h1 className="text-hero-display font-extrabold text-[#111111]">
            6-Step Custom Bundle Builder
          </h1>
          <p className="mt-3 text-base text-[#57534E] leading-relaxed">
            Configure only the services you need across Business Web or Career Solutions. Bundle
            savings calculate automatically: <strong>10% off</strong> 2 items,{' '}
            <strong>15% off</strong> 3–4 items, and <strong>20% off</strong> 5+ items.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Steps */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Track & Presets */}
            <section className="bg-white border border-[#D8D3C9] rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-[#111111]">
                  Step 1 · Choose Audience Track
                </h2>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                  Filter &amp; Presets
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all' as AudienceTrack, label: 'All Services (18)' },
                  { id: 'job-seekers' as AudienceTrack, label: 'Job Seekers & Students' },
                  { id: 'business' as AudienceTrack, label: 'Businesses & Startups' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAudience(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      audience === tab.id
                        ? 'bg-[#111111] border-[#111111] text-white'
                        : 'bg-[#F3EEE3]/50 border-[#D8D3C9] text-[#57534E] hover:text-[#111111]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EAE3D5] flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                  Quick Presets:
                </span>
                {QUICK_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="px-3 py-1.5 rounded-lg bg-[#F3EEE3] hover:bg-[#D9541E]/10 border border-[#D8D3C9] text-xs font-semibold text-[#111111] hover:text-[#D9541E] transition-colors cursor-pointer"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2: Select Core Services */}
            <section className="bg-white border border-[#D8D3C9] rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-extrabold text-[#111111]">
                  Exclusive Startup Launch Offer
                </h2>
                <span className="text-xs font-bold text-[#D9541E] tabular-nums">
                  {totals.selectedServices.length} selected
                </span>
              </div>
              <p className="text-sm font-semibold text-[#57534E]">
                Step 2 · Select Core Services
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {visibleServices.map((service) => {
                  const isSelected = selectedIds.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      aria-pressed={isSelected}
                      className={`text-left p-4 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#F3EEE3]/75 border-[#111111]'
                          : 'bg-white border-[#D8D3C9] hover:border-[#111111]/45'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E]">
                            {service.category}
                          </span>
                          <span
                            className={`h-5 w-5 rounded flex items-center justify-center border shrink-0 ${
                              isSelected
                                ? 'bg-[#D9541E] border-[#D9541E] text-white'
                                : 'bg-white border-[#D8D3C9] text-transparent'
                            }`}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-[#111111] leading-snug">
                          {service.name}
                        </h3>
                        <p className="text-xs text-[#57534E] leading-relaxed">{service.desc}</p>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-2 pt-2.5 border-t border-[#EAE3D5] tabular-nums">
                        <div className="space-y-1">
                          <span className="inline-flex rounded-full bg-[#D9541E]/10 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#D9541E]">
                            20% OFF
                          </span>
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="text-xs font-medium text-[#78716C] line-through">
                              ₹{service.standardPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-base font-extrabold text-[#D9541E]">
                              {service.category !== 'Career Branding' ? 'Starting from ' : ''}
                              ₹{service.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <span className="block text-[10px] font-semibold text-[#D9541E]">
                            Save ₹{(service.standardPrice - service.price).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-[#57534E]">
                          {service.turnaround}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 3: Optional Add-Ons */}
            <section className="bg-white border border-[#D8D3C9] rounded-2xl p-6 sm:p-7 space-y-4">
              <h2 className="text-base sm:text-lg font-extrabold text-[#111111]">
                Step 3 · Optional Add-Ons
              </h2>
              <div className="space-y-2.5">
                {BUNDLE_ADDONS.map((addon) => {
                  const checked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      aria-pressed={checked}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                        checked
                          ? 'bg-[#F3EEE3]/75 border-[#111111]'
                          : 'bg-white border-[#D8D3C9] hover:border-[#111111]/45'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-5 w-5 rounded flex items-center justify-center border shrink-0 ${
                            checked
                              ? 'bg-[#D9541E] border-[#D9541E] text-white'
                              : 'bg-white border-[#D8D3C9] text-transparent'
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#111111]">
                          {addon.name}
                        </span>
                      </div>
                      <span className="flex flex-col items-end gap-1 tabular-nums shrink-0">
                        <span className="rounded-full bg-[#D9541E]/10 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#D9541E]">
                          20% OFF
                        </span>
                        <span className="text-xs font-medium text-[#78716C] line-through">
                          ₹{addon.standardPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm font-extrabold text-[#D9541E]">
                          +₹{addon.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-semibold text-[#D9541E]">
                          Save ₹{(addon.standardPrice - addon.price).toLocaleString('en-IN')}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 4: Timeline */}
            <section className="bg-white border border-[#D8D3C9] rounded-2xl p-6 sm:p-7 space-y-4">
              <h2 className="text-base sm:text-lg font-extrabold text-[#111111]">
                Step 4 · Preferred Timeline
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {TIMELINES.map((item) => {
                  const active = timeline === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTimeline(item.id)}
                      aria-pressed={active}
                      className={`text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#F3EEE3]/75 border-[#111111]'
                          : 'bg-white border-[#D8D3C9] hover:border-[#111111]/45'
                      }`}
                    >
                      <p className="text-sm font-extrabold text-[#111111]">{item.label}</p>
                      <p className="text-xs text-[#57534E] mt-1">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 5 & Step 6: Review Breakdown + Contact Dispatch */}
            <section className="bg-white border border-[#D8D3C9] rounded-2xl p-6 sm:p-7 space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#111111]">
                  Step 5 &amp; 6 · Review &amp; Dispatch Proposal
                </h2>
                <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                  Review your calculated INR quote in the summary panel, then save your contact
                  details to confirm availability or proceed directly via UPI.
                </p>
              </div>

              <form onSubmit={handleDispatchProposal} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label
                      htmlFor="bundle-name"
                      className="block text-xs font-bold text-[#111111] mb-1"
                    >
                      Full Name <span className="text-[#D9541E]">*</span>
                    </label>
                    <input
                      id="bundle-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full h-10 px-3 rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bundle-phone"
                      className="block text-xs font-bold text-[#111111] mb-1"
                    >
                      WhatsApp / Phone <span className="text-[#D9541E]">*</span>
                    </label>
                    <input
                      id="bundle-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9000859695"
                      className="w-full h-10 px-3 rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bundle-email"
                      className="block text-xs font-bold text-[#111111] mb-1"
                    >
                      Email (Optional)
                    </label>
                    <input
                      id="bundle-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full h-10 px-3 rounded-xl border border-[#D8D3C9] bg-[#F3EEE3]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                    />
                  </div>
                </div>

                {dispatchError && <StatusBanner tone="error">{dispatchError}</StatusBanner>}

                {dispatchSuccess && (
                  <StatusBanner tone="success" title="Custom Quote Registered">
                    <div className="space-y-2">
                      <p>
                        Your ₹{totals.finalTotal.toLocaleString('en-IN')} custom bundle has been
                        logged. Open WhatsApp below to share any target JD or references.
                      </p>
                      <a
                        href={dispatchSuccess}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-[#111111] underline underline-offset-4"
                      >
                        <MessageCircle size={14} /> Open Pre-Filled WhatsApp Quote →
                      </a>
                    </div>
                  </StatusBanner>
                )}

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button type="submit" disabled={isSubmitting} variant="primary" size="lg">
                    <Send size={15} />
                    {isSubmitting ? 'Saving Quote...' : 'Save & Confirm Bundle'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    disabled={totals.selectedServices.length === 0}
                    onClick={() => setIsPaymentOpen(true)}
                  >
                    <CreditCard size={15} /> Pay via UPI (₹{totals.finalTotal.toLocaleString('en-IN')})
                  </Button>
                </div>
              </form>
            </section>
          </div>

          {/* Sticky Desktop Quote Summary Panel */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[#161616] text-white rounded-2xl p-6 sm:p-7 border border-[#111111] space-y-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E87A4E] block">
                    Live Estimate Breakdown
                  </span>
                  <h3 className="text-xl font-extrabold mt-0.5 tabular-nums">
                    {totals.selectedServices.length} Service
                    {totals.selectedServices.length === 1 ? '' : 's'}
                  </h3>
                </div>
                {(totals.selectedServices.length > 0 || selectedAddonIds.length > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIds([]);
                      setSelectedAddonIds([]);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white cursor-pointer"
                  >
                    <RotateCcw size={12} /> Clear
                  </button>
                )}
              </div>

              {totals.selectedServices.length > 0 ? (
                <>
                  <ul className="space-y-2.5 max-h-56 overflow-y-auto pr-1 text-xs">
                    {totals.selectedServices.map((item) => (
                      <li key={item.id} className="flex items-start justify-between gap-2 text-white/85">
                        <span className="leading-snug">{item.name}</span>
                        <span className="flex flex-col items-end font-bold text-white tabular-nums shrink-0">
                          <span className="text-white/50 line-through">
                            ₹{item.standardPrice.toLocaleString('en-IN')}
                          </span>
                          <span>₹{item.price.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-[#F06B37]">
                            Save ₹{(item.standardPrice - item.price).toLocaleString('en-IN')}
                          </span>
                        </span>
                      </li>
                    ))}
                    {selectedAddonsList.map((addon) => (
                      <li key={addon.id} className="flex items-start justify-between gap-2 text-[#E87A4E]">
                        <span className="leading-snug">+ {addon.name}</span>
                        <span className="flex flex-col items-end font-bold tabular-nums shrink-0">
                          <span className="text-white/50 line-through">
                            ₹{addon.standardPrice.toLocaleString('en-IN')}
                          </span>
                          <span>₹{addon.price.toLocaleString('en-IN')}</span>
                          <span className="text-[10px]">
                            Save ₹{(addon.standardPrice - addon.price).toLocaleString('en-IN')}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/15 space-y-2 text-xs tabular-nums">
                    <div className="flex justify-between text-white/65">
                      <span>Services Subtotal</span>
                      <span>₹{totals.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-[#34D399] font-bold">
                      <span>Bundle Savings ({Math.round(totals.discountRate * 100)}%)</span>
                      <span>
                        {totals.discountAmount > 0
                          ? `-₹${totals.discountAmount.toLocaleString('en-IN')}`
                          : 'Pick 2+ to save'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#F06B37] font-bold">
                      <span>Total Savings</span>
                      <span>Save ₹{totals.totalSavings.toLocaleString('en-IN')}</span>
                    </div>
                    {totals.addonsTotal > 0 && (
                      <div className="flex justify-between text-white/65">
                        <span>Optional Add-Ons</span>
                        <span>+₹{totals.addonsTotal.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline pt-3 border-t border-white/15">
                      <span className="text-sm font-bold text-white/85">Estimated Total</span>
                      <span className="text-right">
                        <span className="block text-xs text-white/50 line-through">
                          ₹{(totals.finalTotal + totals.totalSavings).toLocaleString('en-IN')}
                        </span>
                        <span className="block text-3xl font-extrabold text-white">
                          ₹{totals.finalTotal.toLocaleString('en-IN')}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D9541E] hover:bg-[#B94414] text-white font-semibold text-xs transition-colors"
                    >
                      <MessageCircle size={15} /> Send Quote to WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsPaymentOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/25 hover:bg-white/10 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      <CreditCard size={14} /> Checkout via UPI (₹
                      {totals.finalTotal.toLocaleString('en-IN')})
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center text-xs text-white/70 space-y-2">
                  <p>Select at least one service in Step 2 to calculate your bundle estimate.</p>
                </div>
              )}

              <div className="pt-3 border-t border-white/15 text-center">
                <Link
                  to="/#pricing"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/70 hover:text-white"
                >
                  Compare Standard Fixed Plans <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Responsive Mobile Collapsible Bottom Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161616] text-white border-t border-white/15 px-4 py-3">
        {mobileDrawerOpen && totals.selectedServices.length > 0 && (
          <div className="mb-3 pb-3 border-b border-white/15 max-h-48 overflow-y-auto space-y-1.5 text-xs">
            {totals.selectedServices.map((s) => (
              <div key={s.id} className="flex justify-between gap-2 text-white/85">
                <span className="truncate">{s.name}</span>
                <span className="tabular-nums text-right">
                  <span className="block text-white/50 line-through">
                    ₹{s.standardPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="block">₹{s.price.toLocaleString('en-IN')}</span>
                  <span className="block text-[10px] text-[#F06B37]">
                    Save ₹{(s.standardPrice - s.price).toLocaleString('en-IN')}
                  </span>
                </span>
              </div>
            ))}
            {selectedAddonsList.map((addon) => (
              <div key={addon.id} className="flex justify-between gap-2 text-white/85">
                <span className="truncate">+ {addon.name}</span>
                <span className="tabular-nums text-right">
                  <span className="block text-white/50 line-through">
                    ₹{addon.standardPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="block">₹{addon.price.toLocaleString('en-IN')}</span>
                  <span className="block text-[10px] text-[#F06B37]">
                    Save ₹{(addon.standardPrice - addon.price).toLocaleString('en-IN')}
                  </span>
                </span>
              </div>
            ))}
            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-[#34D399] font-bold">
                <span>Bundle Savings ({Math.round(totals.discountRate * 100)}%)</span>
                <span>-₹{totals.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            {totals.totalSavings > 0 && (
              <div className="flex justify-between text-[#F06B37] font-bold">
                <span>Total Savings</span>
                <span>Save ₹{totals.totalSavings.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen((v) => !v)}
            className="text-left flex items-center gap-2 cursor-pointer"
          >
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/60 block">
                {totals.selectedServices.length} items · {Math.round(totals.discountRate * 100)}% off
              </span>
              <span className="text-lg font-extrabold tabular-nums">
                <span className="block text-xs text-white/50 line-through">
                  ₹{(totals.finalTotal + totals.totalSavings).toLocaleString('en-IN')}
                </span>
                ₹{totals.finalTotal.toLocaleString('en-IN')}
                <span className="block text-[10px] text-[#F06B37]">
                  Save ₹{totals.totalSavings.toLocaleString('en-IN')}
                </span>
              </span>
            </div>
            {mobileDrawerOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-[#D9541E] text-white text-xs font-bold"
            >
              WhatsApp Quote
            </a>
            <button
              type="button"
              disabled={totals.selectedServices.length === 0}
              onClick={() => setIsPaymentOpen(true)}
              className="px-3.5 py-2.5 rounded-xl border border-white/25 text-white text-xs font-bold disabled:opacity-40"
            >
              Pay UPI
            </button>
          </div>
        </div>
      </div>

      {isPaymentOpen && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          planName={`Custom Bundle (${totals.selectedServices.length} Services)`}
          amount={totals.finalTotal.toString()}
          standardAmount={(totals.finalTotal + totals.totalSavings).toString()}
        />
      )}
    </main>
  );
};
