import { Link } from 'react-router-dom';
import {
  FileSearch,
  Gauge,
  ShieldCheck,
  ArrowRight,
  Linkedin,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

interface VerifiedBenchmarksSectionProps {
  onOpenSamples?: () => void;
}

export const VerifiedBenchmarksSection = ({
  onOpenSamples,
}: VerifiedBenchmarksSectionProps) => {
  const benchmarks = [
    {
      icon: FileSearch,
      title: 'Verify ATS Score Yourself',
      metric: '97 / 100',
      metricLabel: 'Target Resume Standard',
      desc: 'Instead of asking you to trust generic quotes, we let you test your own resume against real Workday, Taleo & Naukri parsing rules using our free tool—or inspect our 97/100 sample.',
      ctaLabel: 'Run Free ATS Checker',
      to: '/free-ats-resume-checker',
      secondaryAction: onOpenSamples
        ? { label: 'Preview 97/100 Sample', onClick: onOpenSamples }
        : null,
    },
    {
      icon: Gauge,
      title: 'Hand-Coded Speed & Clean SEO',
      metric: '< 1.5s',
      metricLabel: 'Sub-2s Target Load',
      desc: 'Every portfolio and business website is written in clean React + TypeScript with semantic HTML, OpenGraph metadata, JSON-LD Schema, and ₹0/month edge cloud deployment.',
      ctaLabel: 'Explore Web Bundles',
      href: '#pricing',
      secondaryAction: null,
    },
    {
      icon: ShieldCheck,
      title: '1-on-1 Founder Accountability',
      metric: '100%',
      metricLabel: 'Code & Word/PDF Ownership',
      desc: 'No outsourced writers or locked WordPress templates. You review every draft directly with Founder Vamshi Polishetti, with unlimited revisions until you approve final handover.',
      ctaLabel: 'Request Free Proposal',
      to: '/request-service',
      secondaryAction: null,
    },
  ];

  return (
    <section id="verification" className="py-24 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Transparent Proof Standards
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            No Fake Testimonials. Verify Our Standards Firsthand.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We never invent client reviews or inflated placement claims. Test our ATS analyzer directly, inspect real resume transformations, and review exact deliverables before booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benchmarks.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-slate-50/70 border border-slate-200/80 p-7 flex flex-col justify-between gap-6 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-2xs">
                    <item.icon size={22} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 tabular-nums leading-none">
                      {item.metric}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-500 mt-1">
                      {item.metricLabel}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center gap-3">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:underline whitespace-nowrap"
                  >
                    {item.ctaLabel} <ArrowRight size={14} />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:underline whitespace-nowrap"
                  >
                    {item.ctaLabel} <ArrowRight size={14} />
                  </a>
                )}

                {item.secondaryAction && (
                  <button
                    type="button"
                    onClick={item.secondaryAction.onClick}
                    className="text-xs font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer whitespace-nowrap"
                  >
                    {item.secondaryAction.label}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Honest Client Review Strip */}
        <div className="mt-10 rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 size={15} />
              <span>100% Authentic Client Policy</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              Already worked with SmartScaleTech?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              We only publish real client feedback with your explicit permission and LinkedIn verification. Share your outcome anytime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.linkedin.com/in/polishettivamshi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              <Linkedin size={15} /> Recommend on LinkedIn
            </a>
            <a
              href="https://wa.me/919000859695?text=Hi%20Vamshi%2C%20here%20is%20my%20feedback%20on%20my%20SmartScaleTech%20project%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              <MessageCircle size={15} /> Share Feedback
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
