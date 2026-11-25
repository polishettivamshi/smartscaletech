import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Phone,
  ZoomIn,
  X,
  AlertCircle,
} from 'lucide-react';
import { SEO, SITE_URL } from '../../lib/seo';
import {
  resolveServiceEntry,
  WHATSAPP_URL,
  StructuredServiceEntry,
} from '../../data/serviceCatalog';
import { SERVICE_CATALOG } from '../../data/bundleCatalog';
import { getServiceVisualBySlug } from '../../data/serviceTransformations';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { NotFound } from '../layout/NotFound';
import { OfferPrice } from '../ui/OfferPrice';

const PHONE = '+919000859695';

const buildJsonLd = (entry: StructuredServiceEntry) => {
  const url = `${SITE_URL}${entry.canonicalPath}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
        { '@type': 'ListItem', position: 3, name: entry.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${entry.name} — SmartScaleTech`,
      description: entry.shortDesc,
      url,
      serviceType: entry.name,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'Place', name: 'Hitech City' },
        { '@type': 'Country', name: 'India' },
      ],
      availableChannel: {
        '@type': 'ServiceChannel',
        servicePhone: { '@type': 'ContactPoint', telephone: PHONE },
        serviceUrl: WHATSAPP_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: entry.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ];
};

interface Props {
  slug: string;
}

export const ServicePage = ({ slug }: Props) => {
  const entry = resolveServiceEntry(slug);
  const visual = getServiceVisualBySlug(slug);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!entry) {
    return <NotFound />;
  }

  const previewImg = visual?.image || entry.previewImage;
  const previewAlt = visual?.imageAlt || entry.previewAlt;
  const offer = SERVICE_CATALOG.find((item) => item.id === entry.offerServiceId);
  const displayOffer = offer
    ? { standardPrice: offer.standardPrice, offerPrice: offer.price }
    : entry.priceOffer;

  return (
    <main className="bg-[#F3EEE3] text-[#111111]">
      <SEO
        title={`${entry.name} | SmartScaleTech (SST)`}
        description={entry.shortDesc}
        path={entry.canonicalPath}
        jsonLd={buildJsonLd(entry)}
      />

      {/* 1 & 2. Breadcrumb + Hero */}
      <section className="bg-[#F3EEE3] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: entry.vertical === 'business' ? 'Business Solutions' : 'Career Solutions', to: '/#services' },
              { label: entry.name },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-3">
                {entry.badge} · {entry.categoryLabel}
              </p>
              <h1 className="text-hero-display font-extrabold text-[#111111]">
                {entry.h1}{' '}
                <span className="text-[#D9541E] block sm:inline">{entry.h1Highlight}</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl">
                {entry.intro[0]}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link to="/request-service">
                  <Button variant="primary" size="lg">
                    Request Proposal <ArrowRight size={16} />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg">
                    <MessageCircle size={16} /> WhatsApp Direct
                  </Button>
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#57534E] hover:text-[#111111] px-2 py-2"
                >
                  <Phone size={14} /> {PHONE}
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-[#D8D3C9] rounded-2xl p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E]">
                Starting Rate / Scope
              </p>
              {displayOffer ? (
                <div className="mt-2">
                  <OfferPrice
                    standardPrice={displayOffer.standardPrice}
                    offerPrice={displayOffer.offerPrice}
                    startingFrom={entry.categoryLabel !== 'Career Branding'}
                  />
                </div>
              ) : (
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#111111] tabular-nums">
                  {entry.priceTag}
                </p>
              )}
              <p className="mt-2 text-xs text-[#57534E] leading-relaxed">
                {displayOffer ? 'Exclusive Startup Launch Offer · 20% OFF' : entry.pricingSummary}
              </p>
              <div className="mt-4 pt-4 border-t border-[#EAE3D5] flex items-center justify-between text-xs font-semibold text-[#111111]">
                <span>Hitech City &amp; Remote</span>
                <Link
                  to="/custom-package-builder"
                  className="text-[#D9541E] hover:underline underline-offset-4"
                >
                  Bundle &amp; Save →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 & 4. Overview & Problems Solved */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#57534E]">
              Studio Overview
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Why standard shortcuts hold results back
            </h2>
            {entry.intro.map((para, i) => (
              <p key={i} className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="lg:col-span-6 bg-[#F3EEE3]/65 border border-[#D8D3C9] rounded-2xl p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-4">
              Common Bottlenecks We Solve
            </p>
            <ul className="space-y-4">
              {entry.problemsSolved.map((problem) => (
                <li key={problem} className="flex items-start gap-3 text-sm text-[#111111]">
                  <AlertCircle size={17} className="text-[#D9541E] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Key Benefits */}
      <section className="py-16 sm:py-20 bg-[#F3EEE3] border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#57534E] mb-2">
            Outcomes &amp; Standards
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-10">
            What improves when we ship it right
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {entry.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white border border-[#D8D3C9] rounded-2xl p-6 sm:p-7"
              >
                <h3 className="text-lg font-extrabold text-[#111111] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Concrete Deliverables */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
            Scope &amp; Deliverables
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-10">
            Exactly what is included
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {entry.deliverables.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#F3EEE3]/45 border border-[#D8D3C9] flex items-start gap-3.5"
              >
                <CheckCircle2 size={19} className="text-[#16845B] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-extrabold text-[#111111]">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-[#57534E] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Process Steps */}
      <section className="py-16 sm:py-20 bg-[#F3EEE3] border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#57534E] mb-2">
            Execution Cadence
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-10">
            How we deliver {entry.name}
          </h2>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {entry.process.map((step, idx) => (
              <li
                key={step.title}
                className="bg-white border border-[#D8D3C9] rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-extrabold text-[#D9541E] tabular-nums block mb-3">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-extrabold text-[#111111] mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Visual Example & Transformation Preview */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
                {visual?.kind === 'transformation'
                  ? `Studio Sample · ${visual.metricLabel}`
                  : 'Visual Sample & Architecture'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                {visual?.kind === 'transformation'
                  ? 'Before vs. After Structure'
                  : `${entry.name} Example`}
              </h2>
              {visual?.summary && (
                <p className="mt-2 text-sm text-[#57534E] max-w-2xl">{visual.summary}</p>
              )}
            </div>

            <Link
              to="/work"
              className="text-xs font-bold text-[#111111] hover:text-[#D9541E] underline underline-offset-4 shrink-0"
            >
              View full work archive →
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            className="group relative block w-full rounded-2xl overflow-hidden border border-[#D8D3C9] bg-[#F3EEE3] p-2 cursor-zoom-in text-left"
          >
            <img
              src={previewImg}
              alt={previewAlt}
              className="w-full max-h-[520px] object-contain mx-auto rounded-xl bg-white"
              loading="lazy"
            />
            <span className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#111111] text-white text-xs font-bold">
              <ZoomIn size={14} /> Tap to Zoom
            </span>
          </button>

          {visual?.improvements && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {visual.improvements.map((point) => (
                <div
                  key={point}
                  className="p-4 rounded-xl bg-[#F3EEE3]/50 border border-[#D8D3C9] flex items-start gap-2.5 text-xs font-medium text-[#111111]"
                >
                  <CheckCircle2 size={15} className="text-[#16845B] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 9 & 10. Technologies / Methodologies & Pricing */}
      <section className="py-16 sm:py-20 bg-[#F3EEE3] border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-[#D8D3C9] rounded-2xl p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#57534E] mb-2">
              Stack &amp; Standards
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-4">
              Technologies &amp; methodologies applied
            </h2>
            <div className="flex flex-wrap gap-2">
              {entry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-[#F3EEE3] border border-[#D8D3C9] text-xs font-semibold text-[#111111]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-[#D8D3C9] rounded-2xl p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
              Investment &amp; Bundles
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-3">
              Transparent scope, zero lock-in
            </h2>
            {displayOffer ? (
              <div className="mb-6 space-y-2">
                <OfferPrice
                  standardPrice={displayOffer.standardPrice}
                  offerPrice={displayOffer.offerPrice}
                  startingFrom={entry.categoryLabel !== 'Career Branding'}
                />
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Exclusive Startup Launch Offer · 20% OFF
                </p>
              </div>
            ) : (
              <p className="text-sm text-[#57534E] leading-relaxed mb-6">{entry.pricingSummary}</p>
            )}
            <div className="flex flex-wrap gap-3">
              <Link to="/custom-package-builder">
                <Button variant="primary" size="md">
                  Build Custom Bundle <ArrowRight size={15} />
                </Button>
              </Link>
              <Link to="/#pricing">
                <Button variant="secondary" size="md">
                  Compare Round-Figure Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Service FAQ */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#57534E] mb-2">
            Service Questions
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-8">
            Frequently asked about {entry.name}
          </h2>
          <Accordion
            items={entry.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))}
            defaultOpenIndex={0}
          />
        </div>
      </section>

      {/* 12. Related Services */}
      <section className="py-16 bg-[#F3EEE3] border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#111111] mb-8">Related studio services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {entry.relatedSlugs.map((relKey) => {
              const rel = resolveServiceEntry(relKey);
              if (!rel) return null;
              return (
                <Link
                  key={relKey}
                  to={rel.canonicalPath}
                  className="group rounded-2xl border border-[#D8D3C9] bg-white p-6 hover:border-[#111111]/45 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-extrabold text-[#111111] group-hover:text-[#D9541E] transition-colors">
                      {rel.name}
                    </h3>
                    <ArrowRight
                      size={16}
                      className="mt-0.5 shrink-0 text-[#57534E] group-hover:text-[#D9541E] group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-xs text-[#57534E] leading-relaxed">{rel.shortDesc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. Final CTA */}
      <section className="bg-[#161616] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E87A4E] mb-3">
              Ready to Begin
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Start your {entry.name} project with SmartScaleTech.
            </h2>
            <p className="mt-3 text-sm text-white/75">
              Hitech City, Hyderabad · Serving startups, businesses, and professionals across India.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/request-service">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Request Proposal <ArrowRight size={16} />
              </Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/25 text-white hover:bg-white/10"
              >
                <MessageCircle size={16} /> Chat Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previewAlt}
          className="fixed inset-0 z-[140] bg-[#111111]/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            className="fixed top-4 right-4 z-10 p-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white cursor-pointer"
            aria-label="Close zoomed preview"
          >
            <X size={20} />
          </button>
          <img
            src={previewImg}
            alt={previewAlt}
            className="max-w-6xl w-full max-h-[88vh] object-contain rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};
