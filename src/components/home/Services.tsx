import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, MessageCircle, CheckCircle2 } from 'lucide-react';
import {
  ALL_STRUCTURED_SERVICES,
  BUSINESS_SERVICES_LIST,
  CAREER_SERVICES_LIST,
  StructuredServiceEntry,
} from '../../data/serviceCatalog';
import { SERVICE_CATALOG } from '../../data/bundleCatalog';
import { SectionHeading } from '../ui/SectionHeading';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { OfferPrice } from '../ui/OfferPrice';

type TrackTab = 'all' | 'career' | 'business';

const ALL_SERVICES_ORDERED = [...CAREER_SERVICES_LIST, ...BUSINESS_SERVICES_LIST];

export const Services = () => {
  const [activeTrack, setActiveTrack] = useState<TrackTab>('all');
  const [previewService, setPreviewService] = useState<StructuredServiceEntry | null>(null);

  const items =
    activeTrack === 'all'
      ? ALL_SERVICES_ORDERED
      : activeTrack === 'business'
        ? BUSINESS_SERVICES_LIST
        : CAREER_SERVICES_LIST;

  return (
    <section id="services" className="bg-white border-y border-[#D8D3C9] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="Services Overview"
            title="Full-spectrum career branding"
            highlight="& digital engineering."
            description={`Browse all ${Object.keys(ALL_STRUCTURED_SERVICES).length} studio services across Career Solutions and Business Solutions—with zero duplicates and transparent deliverables.`}
          />

          {/* Track Switcher */}
          <div
            role="tablist"
            aria-label="Service tracks"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#F3EEE3] border border-[#D8D3C9] self-start lg:self-auto shrink-0"
          >
            {[
              { id: 'all' as const, label: `All Services (${ALL_SERVICES_ORDERED.length})` },
              { id: 'career' as const, label: `Career (${CAREER_SERVICES_LIST.length})` },
              { id: 'business' as const, label: `Business (${BUSINESS_SERVICES_LIST.length})` },
            ].map((tab) => {
              const selected = activeTrack === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={selected}
                  type="button"
                  onClick={() => setActiveTrack(tab.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selected
                      ? 'bg-[#111111] text-white'
                      : 'text-[#57534E] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service) => (
            (() => {
              const offer = SERVICE_CATALOG.find((item) => item.id === service.offerServiceId);
              return (
            <article
              key={service.slug}
              className="rounded-2xl bg-[#F3EEE3]/45 border border-[#D8D3C9] hover:border-[#111111] transition-colors flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Consistent 16:9 Preview Visual */}
                <button
                  type="button"
                  onClick={() => setPreviewService(service)}
                  className="w-full relative overflow-hidden bg-white border-b border-[#D8D3C9] group cursor-pointer block text-left"
                  aria-label={`Preview ${service.name} details`}
                >
                  <img
                    src={service.previewImage}
                    alt={service.previewAlt}
                    loading="lazy"
                    className="w-full aspect-video object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111111]/85 text-white text-[11px] font-medium">
                    <Eye size={12} /> Preview
                  </span>
                </button>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#57534E]">
                      {service.categoryLabel}
                    </span>
                    {offer ? (
                      <OfferPrice
                        standardPrice={offer.standardPrice}
                        offerPrice={offer.price}
                        startingFrom={service.categoryLabel !== 'Career Branding'}
                        compact
                      />
                    ) : (
                      <span className="text-xs font-bold text-[#111111] tabular-nums shrink-0">
                        {service.priceTag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-extrabold text-[#111111] leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#D8D3C9]/70 flex items-center justify-between gap-2">
                <Link
                  to={service.canonicalPath}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#D9541E] transition-colors"
                >
                  <span>Service details</span>
                  <ArrowRight size={13} />
                </Link>
                <button
                  type="button"
                  onClick={() => setPreviewService(service)}
                  className="text-xs font-medium text-[#57534E] hover:text-[#111111] cursor-pointer"
                >
                  Quick view
                </button>
              </div>
            </article>
              );
            })()
          ))}
        </div>

        {/* Bottom Custom Builder Strip */}
        <div className="mt-10 p-6 rounded-2xl bg-[#F3EEE3] border border-[#D8D3C9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-[#111111]">
            <strong className="font-bold">Need multiple services?</strong>{' '}
            <span className="text-[#57534E]">
              Combine 2 or more services in our custom bundle calculator to save 10%–20% automatically.
            </span>
          </p>
          <Link
            to="/custom-package-builder"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D9541E] hover:underline shrink-0"
          >
            Open Bundle Builder <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog
        isOpen={Boolean(previewService)}
        onClose={() => setPreviewService(null)}
        title={previewService?.name}
        subtitle={previewService?.badge}
        maxWidthClass="max-w-3xl"
      >
        {previewService && (
          <div className="p-6 space-y-6">
            <div className="rounded-xl overflow-hidden border border-[#D8D3C9] bg-[#F3EEE3]">
              <img
                src={previewService.previewImage}
                alt={previewService.previewAlt}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E]">
                  Core Deliverables
                </p>
                {previewService.deliverables.slice(0, 4).map((d) => (
                  <div key={d.title} className="flex items-start gap-2 text-xs sm:text-sm text-[#111111]">
                    <CheckCircle2 size={15} className="text-[#16845B] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold">{d.title}:</strong>{' '}
                      <span className="text-[#57534E]">{d.desc}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-[#F3EEE3]/60 border border-[#D8D3C9] flex flex-col justify-between gap-4">
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E]">
                    Pricing &amp; Next Step
                  </p>
                  {(() => {
                    const offer = SERVICE_CATALOG.find(
                      (item) => item.id === previewService.offerServiceId
                    );
                    return offer ? (
                      <div className="space-y-2">
                        <OfferPrice
                          standardPrice={offer.standardPrice}
                          offerPrice={offer.price}
                          startingFrom={previewService.categoryLabel !== 'Career Branding'}
                        />
                        <p className="text-sm text-[#57534E] leading-relaxed">
                          Exclusive launch offer · 20% OFF
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-[#111111] leading-relaxed">
                        {previewService.pricingSummary}
                      </p>
                    );
                  })()}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Link
                    to={previewService.canonicalPath}
                    onClick={() => setPreviewService(null)}
                    className="flex-1"
                  >
                    <Button variant="dark" className="w-full">
                      Full Details <ArrowRight size={14} />
                    </Button>
                  </Link>
                  <a
                    href={`https://wa.me/919000859695?text=${encodeURIComponent(
                      `Hello SmartScaleTech, I would like to discuss ${previewService.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="primary" className="w-full">
                      <MessageCircle size={14} /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
};
