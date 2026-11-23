import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Sparkles,
  MessageCircle,
  CreditCard,
  Briefcase,
  Code,
  TrendingUp,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { SEO, SITE_URL } from '../../lib/seo';
import { Button } from '../ui/Button';
import { PaymentModal } from '../home/PaymentModal';
import { trackEvent } from '../../lib/analytics';

type AudienceTrack = 'all' | 'job-seekers' | 'business';

interface CatalogService {
  id: string;
  name: string;
  track: 'job-seekers' | 'business';
  category: string;
  price: number;
  turnaround: string;
  desc: string;
}

const SERVICE_CATALOG: CatalogService[] = [
  // Job Seekers & Career Branding
  {
    id: 'ats-resume',
    name: 'ATS Resume Writing (Word + PDF)',
    track: 'job-seekers',
    category: 'Career Branding',
    price: 499,
    turnaround: '24–48 hrs',
    desc: 'Single-column ATS format targeting 95–98/100 compatibility.',
  },
  {
    id: 'linkedin-opt',
    name: 'LinkedIn Profile Optimization + Custom Banner',
    track: 'job-seekers',
    category: 'Career Branding',
    price: 499,
    turnaround: '24–48 hrs',
    desc: 'Keyword headline, About story rewrite, skills & custom tech banner.',
  },
  {
    id: 'naukri-indeed',
    name: 'Naukri & Indeed Profile Optimization',
    track: 'job-seekers',
    category: 'Career Branding',
    price: 499,
    turnaround: '24 hrs',
    desc: 'Profile strength push to 96–98% with recruiter keyword tuning.',
  },
  {
    id: 'github-audit',
    name: 'GitHub Profile README & Repo Audit',
    track: 'job-seekers',
    category: 'Career Branding',
    price: 399,
    turnaround: '24 hrs',
    desc: 'Custom developer README, stack badges & pinned project polish.',
  },
  {
    id: 'cover-letter',
    name: 'Role-Tailored Cover Letter Mastery',
    track: 'job-seekers',
    category: 'Career Branding',
    price: 299,
    turnaround: '24 hrs',
    desc: 'Persuasive editable cover letter aligned to your target role.',
  },
  {
    id: 'interview-coaching',
    name: '1-on-1 Mock Interview Coaching',
    track: 'job-seekers',
    category: 'Career Branding',
    price: 499,
    turnaround: 'Scheduled 45 min',
    desc: 'Technical/HR mock round with personalized feedback & Q&A notes.',
  },
  {
    id: 'salary-negotiation',
    name: 'Salary & Offer Negotiation Strategy',
    track: 'job-seekers',
    category: 'Career Branding',
    price: 499,
    turnaround: 'Scheduled 30 min',
    desc: 'Market CTC benchmarking and counter-offer scripts.',
  },
  {
    id: 'portfolio-site',
    name: 'Custom Personal Portfolio Website',
    track: 'job-seekers',
    category: 'Tech & Projects',
    price: 1999,
    turnaround: '3–4 days',
    desc: 'Modern responsive React portfolio deployed free on cloud hosting.',
  },
  {
    id: 'final-year-project',
    name: 'Final Year Project (Code + Report + Viva Prep)',
    track: 'job-seekers',
    category: 'Tech & Projects',
    price: 2999,
    turnaround: '4–7 days',
    desc: 'End-to-end B.Tech / M.Tech / MCA build in Python, Java, MERN or AI/ML.',
  },

  // Businesses, Startups & Custom Tech
  {
    id: 'web-development',
    name: 'Custom Business / SaaS Website',
    track: 'business',
    category: 'Web & Engineering',
    price: 4999,
    turnaround: '5–7 days',
    desc: 'High-speed responsive website with WhatsApp lead capture & hosting setup.',
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design & Wireframe System',
    track: 'business',
    category: 'Web & Engineering',
    price: 2499,
    turnaround: '3–5 days',
    desc: 'Conversion-focused UI screens, components & mobile/desktop layouts.',
  },
  {
    id: 'api-development',
    name: 'API Development & 3rd-Party Integration',
    track: 'business',
    category: 'Web & Engineering',
    price: 2499,
    turnaround: '3–5 days',
    desc: 'FastAPI / Node / Django REST APIs, payments, webhooks & database optimization.',
  },
  {
    id: 'cloud-devops',
    name: 'Cloud Deployment, Docker & CI/CD Setup',
    track: 'business',
    category: 'Web & Engineering',
    price: 1999,
    turnaround: '2–3 days',
    desc: 'Docker containers, GitHub Actions CI/CD, SSL domain routing & server monitoring.',
  },
  {
    id: 'ai-integration',
    name: 'AI Chatbot & Workflow Automation Integration',
    track: 'business',
    category: 'Web & Engineering',
    price: 2999,
    turnaround: '3–5 days',
    desc: 'Custom AI assistant or document workflow integrated into your website/CRM.',
  },
  {
    id: 'seo-growth',
    name: 'Technical SEO, Schema & Search Console Setup',
    track: 'business',
    category: 'Marketing & Brand',
    price: 1999,
    turnaround: '2–3 days',
    desc: 'Structured JSON-LD schema, sitemap indexing & meta optimization.',
  },
  {
    id: 'content-strategy',
    name: 'SEO Content Strategy & Landing Copy',
    track: 'business',
    category: 'Marketing & Brand',
    price: 1499,
    turnaround: '2–3 days',
    desc: 'High-converting website copy plus 30-day keyword-mapped content plan.',
  },
  {
    id: 'ad-campaigns',
    name: 'Google & Meta Ad Campaign Setup',
    track: 'business',
    category: 'Marketing & Brand',
    price: 1999,
    turnaround: '2–3 days',
    desc: 'Targeted lead-generation ad setup with conversion & pixel tracking.',
  },
  {
    id: 'brand-identity',
    name: 'Logo & Brand Identity Design Kit',
    track: 'business',
    category: 'Marketing & Brand',
    price: 1999,
    turnaround: '2–4 days',
    desc: 'Custom logo suite, color palette, typography & social media banners.',
  },
];

const QUICK_PRESETS: { name: string; tag: string; ids: string[]; track: AudienceTrack }[] = [
  {
    name: 'Fresher Job Launchpad',
    tag: 'Most Popular for Grads',
    ids: ['ats-resume', 'linkedin-opt', 'naukri-indeed', 'github-audit'],
    track: 'job-seekers',
  },
  {
    name: 'Full-Stack Developer Bundle',
    tag: 'Resume + Profiles + Portfolio',
    ids: ['ats-resume', 'linkedin-opt', 'github-audit', 'portfolio-site'],
    track: 'job-seekers',
  },
  {
    name: 'Startup Website + SEO Launch',
    tag: 'For Founders & Businesses',
    ids: ['web-development', 'seo-growth', 'brand-identity'],
    track: 'business',
  },
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
      { '@type': 'ListItem', position: 2, name: 'Custom Package Builder', item: `${SITE_URL}/custom-package-builder` },
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
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const visibleServices = useMemo(() => {
    if (audience === 'all') return SERVICE_CATALOG;
    return SERVICE_CATALOG.filter((s) => s.track === audience);
  }, [audience]);

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const applyPreset = (preset: (typeof QUICK_PRESETS)[number]) => {
    setSelectedIds(preset.ids);
    setAudience(preset.track);
    trackEvent('cta_click', { cta: 'apply_bundle_preset', preset: preset.name });
  };

  const { selectedServices, subtotal, discountRate, discountAmount, finalTotal } = useMemo(() => {
    const items = SERVICE_CATALOG.filter((s) => selectedIds.includes(s.id));
    const sub = items.reduce((sum, s) => sum + s.price, 0);
    let rate = 0;
    if (items.length >= 5) rate = 0.2;
    else if (items.length >= 3) rate = 0.15;
    else if (items.length === 2) rate = 0.1;

    const savings = Math.round(sub * rate);
    return {
      selectedServices: items,
      subtotal: sub,
      discountRate: rate,
      discountAmount: savings,
      finalTotal: sub - savings,
    };
  }, [selectedIds]);

  const whatsappText = useMemo(() => {
    const lines = selectedServices.map(
      (s, i) => `${i + 1}. ${s.name} (₹${s.price.toLocaleString('en-IN')})`
    );
    return encodeURIComponent(
      `Hello Vamshi,\n\nI built a custom package on SmartScaleTech:\n\n${lines.join(
        '\n'
      )}\n\nOriginal Subtotal: ₹${subtotal.toLocaleString(
        'en-IN'
      )}\nBundle Discount (${Math.round(discountRate * 100)}%): -₹${discountAmount.toLocaleString(
        'en-IN'
      )}\n*Final Bundle Price: ₹${finalTotal.toLocaleString(
        'en-IN'
      )}*\n\nPlease confirm availability and next steps.`
    );
  }, [selectedServices, subtotal, discountRate, discountAmount, finalTotal]);

  return (
    <main className="bg-page text-page min-h-screen pt-24 pb-20">
      <SEO
        title="Custom Service Bundle & Price Estimator | Smart Scale Tech (SST)"
        description="Build your own ATS resume, LinkedIn optimization, portfolio website, or business web development bundle with Smart Scale Tech (SST) and save up to 20% automatically."
        keywords="custom resume website bundle india, ats resume writing price hyderabad, portfolio website cost hyderabad, business website packages ₹6000, sst bundle builder, smart scale tech pricing"
        path="/custom-package-builder"
        jsonLd={builderJsonLd}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Instant Price Estimator • Up to 20% Bundle Savings
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Build Your <span className="text-primary">Custom Package</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Pick only the services you need—unlock <strong>10% off</strong> on 2 services, <strong>15% off</strong> on 3+, and <strong>20% off</strong> on 5+ services automatically.
          </p>
        </div>

        {/* Quick Presets & Audience Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
          {/* Audience Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all' as AudienceTrack, label: 'All Services', icon: TrendingUp },
              { id: 'job-seekers' as AudienceTrack, label: 'For Job Seekers', icon: Briefcase },
              { id: 'business' as AudienceTrack, label: 'For Businesses & Tech', icon: Code },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAudience(tab.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  audience === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Preset Quick Loads */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Presets:
            </span>
            {QUICK_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 rounded-xl bg-primary/8 hover:bg-primary/15 border border-primary/20 text-primary text-[11px] font-bold transition-colors cursor-pointer"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Service Checklist Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleServices.map((service) => {
              const isSelected = selectedIds.includes(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`text-left p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'bg-primary/5 border-primary shadow-md shadow-primary/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {service.category}
                      </span>
                      <div
                        className={`h-6 w-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-primary border-primary text-white'
                            : 'bg-white border-slate-300 text-transparent'
                        }`}
                      >
                        <Check size={14} strokeWidth={3} />
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 leading-snug">
                      {service.name}
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/70">
                    <span className="text-lg font-black text-slate-900">
                      ₹{service.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {service.turnaround}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Quote Summary Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 block">
                    Live Custom Quote
                  </span>
                  <h3 className="text-xl font-black">
                    {selectedServices.length} Service{selectedServices.length === 1 ? '' : 's'}{' '}
                    Selected
                  </h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedIds([])}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                  >
                    <RotateCcw size={12} /> Clear
                  </button>
                )}
              </div>

              {selectedServices.length > 0 ? (
                <>
                  <ul className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
                    {selectedServices.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-2 text-slate-200"
                      >
                        <span className="leading-snug">{item.name}</span>
                        <span className="font-bold text-white shrink-0">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>
                        Bundle Discount ({Math.round(discountRate * 100)}%)
                      </span>
                      <span>
                        {discountAmount > 0
                          ? `-₹${discountAmount.toLocaleString('en-IN')}`
                          : 'Add 1 more for 10% off'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-slate-800">
                      <span className="text-sm font-bold text-slate-200">Total Payable</span>
                      <span className="text-3xl font-black text-white">
                        ₹{finalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <a
                      href={`https://wa.me/919000859695?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent('cta_click', {
                          cta: 'send_custom_bundle_whatsapp',
                          total: finalTotal,
                        })
                      }
                      className="block"
                    >
                      <Button className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-lg shadow-green-500/25">
                        <MessageCircle size={16} className="mr-1.5" /> Send Quote to WhatsApp
                      </Button>
                    </a>

                    <Button
                      onClick={() => setIsPaymentOpen(true)}
                      variant="outline"
                      className="w-full h-11 rounded-xl border-white/20 text-white hover:bg-white/10 font-bold text-xs"
                    >
                      <CreditCard size={15} className="mr-1.5" /> Pay Now via UPI (₹
                      {finalTotal.toLocaleString('en-IN')})
                    </Button>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 space-y-2">
                  <p>Select any service card on the left to build your custom bundle quote.</p>
                  <p className="text-emerald-400 font-bold">
                    Save 10% (2 items), 15% (3–4 items), or 20% (5+ items).
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 text-center">
                <Link
                  to="/#pricing"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-white"
                >
                  View Standard Fixed Plans Instead <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPaymentOpen && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          planName={`Custom Bundle (${selectedServices.length} Services)`}
          amount={finalTotal.toString()}
        />
      )}
    </main>
  );
};
