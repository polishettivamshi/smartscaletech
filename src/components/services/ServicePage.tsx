import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ChevronRight,
  Phone,
  Clock,
  ListChecks,
  Route,
  ShieldCheck,
} from 'lucide-react';
import { SEO, SITE_URL } from '../../lib/seo';
import { servicePages, WHATSAPP_URL } from '../../data/servicePages';

const PHONE = '+919000859695';

const buildJsonLd = (slug: string) => {
  const page = servicePages[slug];
  const url = `${SITE_URL}/${slug}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
        { '@type': 'ListItem', position: 3, name: page.h1, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${page.h1} in Hyderabad`,
      description: page.metaDescription,
      url,
      serviceType: page.h1,
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
      mainEntity: page.faqs.map((faq) => ({
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
  const page = servicePages[slug];

  if (!page) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-24">
        <div className="mx-auto max-w-3xl text-center px-4">
          <h1 className="text-4xl font-black text-slate-900">Page not found</h1>
          <Link to="/" className="mt-6 inline-block text-primary font-semibold">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-page text-page">
      <SEO
        title={page.title}
        description={page.metaDescription}
        path={`/${slug}`}
        jsonLd={buildJsonLd(slug)}
      />

      {/* Hero */}
      <section className="bg-white pt-28 pb-16 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} />
              </li>
              <li>
                <a href="/#services" className="hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} />
              </li>
              <li className="text-slate-700">{page.h1}</li>
            </ol>
          </nav>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className="inline-flex items-center rounded-full bg-primary/8 border border-primary/15 px-4 py-2 text-[11px] font-bold text-primary uppercase tracking-wider">
              {page.badge}
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
              {page.h1} <span className="text-primary">{page.h1Highlight}</span>
            </h1>

            <div className="mt-8 space-y-5">
              {page.intro.map((para, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-slate-600 ${i === 0 ? 'text-lg sm:text-xl text-slate-700 font-medium' : 'text-base'}`}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex h-13 items-center gap-2 rounded-2xl bg-green-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-green-500/20 transition-all hover:-translate-y-0.5 hover:bg-green-600">
                  <MessageCircle size={17} /> Chat on WhatsApp
                </span>
              </a>
              <a href={`tel:${PHONE}`}>
                <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-7 py-4 text-sm font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-slate-50">
                  <Phone size={16} /> Call {PHONE}
                </span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-green-500" /> Mon-Sat, 9AM-9PM IST
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-primary" /> Reply within 30 minutes
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-12 sm:text-4xl">{page.includedTitle}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.included.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-[28px] border border-slate-100 bg-slate-50/50 p-8"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <ListChecks size={19} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-black text-slate-900 sm:text-4xl">{page.processTitle}</h2>
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {page.process.map((step, idx) => (
              <li key={step.title} className="relative rounded-[28px] bg-white p-8 shadow-xl shadow-slate-200/40 border border-slate-100">
                <div className="absolute right-6 top-6 text-5xl font-black text-slate-100 select-none">
                  {idx + 1}
                </div>
                <Route size={20} className="mb-5 text-primary" />
                <h3 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-black text-slate-900 sm:text-4xl">{page.whyTitle}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {page.why.map((item) => (
              <div key={item.title} className="border-l-2 border-primary pl-6">
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50/50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-100 bg-white p-8 sm:p-12 shadow-xl shadow-slate-200/40">
            <h2 className="mb-4 text-3xl font-black text-slate-900">{page.pricingTitle}</h2>
            <p className="leading-relaxed text-slate-600">{page.pricing}</p>
            <Link
              to="/#pricing"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
            >
              See all plans <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs — always visible so crawlers and users both read the full text */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-black text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="divide-y divide-slate-100 border-y border-slate-100">
            {page.faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <dt className="text-base font-bold text-slate-900">{faq.q}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-slate-50/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-2xl font-black text-slate-900">Related services</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {page.related.map((relSlug) => {
              const rel = servicePages[relSlug];
              if (!rel) return null;
              return (
                <Link
                  key={relSlug}
                  to={`/${relSlug}`}
                  className="group rounded-[24px] border border-slate-100 bg-white p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-900">{rel.h1}</h3>
                    <ArrowRight
                      size={17}
                      className="mt-1 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-400">{rel.h1Highlight}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl rounded-[40px] bg-primary p-8 text-center shadow-2xl shadow-primary/20 sm:p-14">
          <h2 className="mx-auto max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl">
            Ready to get started with {page.h1}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-semibold text-white/85">
            Message us on WhatsApp. We reply within 30 minutes during working hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-9 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-green-500/30 transition-all hover:-translate-y-0.5 hover:bg-green-600">
                <MessageCircle size={16} /> Chat Now
              </span>
            </a>
            <Link to="/#pricing">
              <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-9 py-4 text-sm font-black uppercase tracking-widest text-primary transition-all hover:-translate-y-0.5">
                View Plans <ArrowRight size={16} />
              </span>
            </Link>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-white/70">
            <CheckCircle2 size={14} /> Hitech City, Hyderabad · Serving clients across India
          </p>
        </div>
      </section>
    </main>
  );
};
