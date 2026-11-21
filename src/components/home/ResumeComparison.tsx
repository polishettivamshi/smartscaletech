import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  ZoomIn,
  X,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { SERVICE_TRANSFORMATIONS } from '../../data/serviceTransformations';

export const ResumeComparison = () => {
  const [activeId, setActiveId] = useState<string>(SERVICE_TRANSFORMATIONS[0].id);
  const [isZoomed, setIsZoomed] = useState(false);

  const active =
    SERVICE_TRANSFORMATIONS.find((t) => t.id === activeId) || SERVICE_TRANSFORMATIONS[0];

  const whatsappText = encodeURIComponent(
    `Hello SmartScaleTech, I saw your ${active.serviceTitle} Before & After transformation (${active.beforeScore} → ${active.afterScore}) and want to upgrade mine.`
  );

  return (
    <section id="transformations" className="py-24 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Real Service Transformations
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Before vs. After: See the Exact Upgrade You Get
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Don&apos;t just take our word for it—select any service below to inspect real before-and-after transformations from 35–45% up to 95–98% readiness.
          </p>
        </div>

        {/* Service Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SERVICE_TRANSFORMATIONS.map((item) => {
            const isActive = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/15'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{item.tabLabel}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {item.afterScore}
                </span>
              </button>
            );
          })}
        </div>

        {/* Showcase Panel */}
        <div className="rounded-[32px] bg-slate-50/70 border border-slate-200/80 p-5 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/40 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Showcase */}
            <div className="lg:col-span-8">
              <div
                onClick={() => setIsZoomed(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setIsZoomed(true);
                }}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg cursor-zoom-in"
              >
                <img
                  src={active.image}
                  alt={active.imageAlt}
                  className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold shadow-md">
                  <ZoomIn size={13} /> Tap to Zoom
                </div>
              </div>
            </div>

            {/* Details & Score Jump */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                  {active.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {active.serviceTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {active.summary}
                </p>
              </div>

              {/* Score Comparison Bar */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
                    Before
                  </span>
                  <span className="text-2xl font-black text-rose-700 mt-0.5 block">
                    {active.beforeScore}
                  </span>
                  <span className="text-[11px] text-rose-600/80 font-semibold">
                    {active.metricLabel}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                    After <TrendingUp size={12} />
                  </span>
                  <span className="text-2xl font-black text-emerald-700 mt-0.5 block">
                    {active.afterScore}
                  </span>
                  <span className="text-[11px] text-emerald-700/80 font-semibold">
                    {active.metricLabel}
                  </span>
                </div>
              </div>

              {/* Key Improvements */}
              <div className="space-y-2.5">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                  What We Upgrade
                </p>
                {active.improvements.map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-relaxed">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={`https://wa.me/919000859695?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-lg shadow-green-600/20">
                    <MessageCircle size={16} className="mr-2" /> Get This Upgrade on WhatsApp
                  </Button>
                </a>

                {active.serviceSlug ? (
                  <Link to={active.serviceSlug} className="block">
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-xl border-slate-300 text-slate-700 hover:bg-white font-bold text-xs"
                    >
                      View {active.tabLabel} Service Details <ArrowRight size={14} className="ml-1.5" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/request-service" className="block">
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-xl border-slate-300 text-slate-700 hover:bg-white font-bold text-xs"
                    >
                      Submit Service Request <ArrowRight size={14} className="ml-1.5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-white">Want a quick audit of your current profile or site?</h4>
            <p className="text-slate-300 text-sm font-medium">
              Send your resume, LinkedIn URL, or website link on WhatsApp for a free 5-minute review.
            </p>
          </div>
          <a
            href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20would%20like%20a%20free%20quick%20audit%20of%20my%20profile%20or%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button className="h-13 px-8 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-500/25">
              <MessageCircle size={18} className="mr-2" /> Send on WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[130] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            className="fixed top-4 right-4 z-10 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Close zoomed preview"
          >
            <X size={22} />
          </button>
          <div
            className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={active.imageAlt}
              className="w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl bg-white"
            />
            <p className="text-xs sm:text-sm font-bold text-white/90 text-center">
              {active.serviceTitle}: {active.beforeScore} → {active.afterScore} ({active.metricLabel})
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
