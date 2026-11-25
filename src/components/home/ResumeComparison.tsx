import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MessageCircle, ZoomIn } from 'lucide-react';
import { SERVICE_TRANSFORMATIONS } from '../../data/serviceTransformations';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Dialog } from '../ui/Dialog';

export const ResumeComparison = () => {
  const [activeId, setActiveId] = useState<string>(SERVICE_TRANSFORMATIONS[0].id);
  const [isZoomed, setIsZoomed] = useState(false);

  const active =
    SERVICE_TRANSFORMATIONS.find((t) => t.id === activeId) || SERVICE_TRANSFORMATIONS[0];

  const whatsappText = encodeURIComponent(
    `Hello SmartScaleTech, I inspected your ${active.serviceTitle} Before & After transformation and would like to upgrade mine.`
  );

  return (
    <section id="transformations" className="bg-white border-y border-[#D8D3C9] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Before & After Showcase"
          title="See the exact"
          highlight="structural upgrade."
          description="Select any discipline below to compare unoptimized baselines against clean ATS-ready, search-indexed, and UI-structured outputs."
        />

        {/* Accessible Discipline Tabs */}
        <div
          role="tablist"
          aria-label="Before and after categories"
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          {SERVICE_TRANSFORMATIONS.map((item) => {
            const isActive = item.id === active.id;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border whitespace-nowrap ${
                  isActive
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-[#F3EEE3]/60 text-[#57534E] border-[#D8D3C9] hover:text-[#111111] hover:border-[#111111]'
                }`}
              >
                {item.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Comparison Showcase Panel */}
        <div className="mt-8 rounded-2xl bg-[#F3EEE3]/50 border border-[#D8D3C9] p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="group relative w-full rounded-xl overflow-hidden border border-[#D8D3C9] bg-white cursor-zoom-in block text-left"
                aria-label={`Zoom ${active.serviceTitle} before and after comparison`}
              >
                <img
                  src={active.image}
                  alt={active.imageAlt}
                  loading="lazy"
                  className="w-full h-auto object-contain block"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111]/85 text-white text-xs font-medium">
                  <ZoomIn size={13} /> Zoom View
                </span>
              </button>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D9541E]">
                  {active.category}
                </p>
                <h3 className="text-2xl font-extrabold text-[#111111]">{active.serviceTitle}</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">{active.summary}</p>
              </div>

              {/* Clean Benchmark Comparison */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white border border-[#D8D3C9]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C43D3D] block">
                    Before
                  </span>
                  <span className="text-2xl font-extrabold text-[#111111] tabular-nums mt-0.5 block">
                    {active.beforeScore}
                  </span>
                  <span className="text-[11px] text-[#57534E]">{active.metricLabel}</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#16845B]/40">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#16845B] block">
                    Target Benchmark
                  </span>
                  <span className="text-2xl font-extrabold text-[#16845B] tabular-nums mt-0.5 block">
                    {active.afterScore}
                  </span>
                  <span className="text-[11px] text-[#57534E]">{active.metricLabel}</span>
                </div>
              </div>

              {/* Key Structural Changes */}
              <div className="space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E]">
                  Structural Improvements
                </p>
                {active.improvements.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-2 text-xs sm:text-sm text-[#111111] leading-relaxed"
                  >
                    <CheckCircle2 size={15} className="text-[#16845B] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href={`https://wa.me/919000859695?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="primary" className="w-full">
                    <MessageCircle size={15} /> Book This Upgrade
                  </Button>
                </a>
                <Link to={active.serviceSlug || '/request-service'} className="block">
                  <Button variant="secondary" className="w-full">
                    Service Details <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
        title={active.serviceTitle}
        subtitle={`Before (${active.beforeScore}) vs Benchmark (${active.afterScore})`}
        maxWidthClass="max-w-5xl"
      >
        <div className="p-4 sm:p-6 bg-[#F3EEE3]/40">
          <img
            src={active.image}
            alt={active.imageAlt}
            className="w-full h-auto max-h-[75vh] object-contain rounded-xl bg-white border border-[#D8D3C9]"
          />
        </div>
      </Dialog>
    </section>
  );
};
