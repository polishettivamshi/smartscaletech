import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { SEO } from '../../lib/seo';
import { getWorkBySlug, WORK_SHOWCASE } from '../../data/workShowcase';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Button } from '../ui/Button';
import { NotFound } from '../layout/NotFound';

export const CaseStudyPage = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const study = getWorkBySlug(slug);

  if (!study) {
    return <NotFound />;
  }

  return (
    <main className="bg-[#F3EEE3] min-h-screen">
      <SEO
        title={`${study.title} | Case Study · SmartScaleTech`}
        description={study.shortDesc}
        path={`/work/${study.slug}`}
      />

      <section className="pt-12 pb-14 sm:pt-16 border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Selected Work', to: '/work' },
              { label: study.title },
            ]}
            className="mb-7"
          />

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] mb-3">
            <span className="text-[#D9541E]">{study.category}</span>
            <span className="text-[#9E988C]">·</span>
            <span className="text-[#57534E]">{study.kindLabel}</span>
            <span className="text-[#9E988C]">·</span>
            <span className="text-[#57534E]">{study.timeline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.1]">
            {study.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed max-w-3xl">
            {study.shortDesc}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="rounded-2xl border border-[#D8D3C9] bg-[#F3EEE3] p-3 overflow-hidden">
            <img
              src={study.image}
              alt={study.imageAlt}
              className="w-full max-h-[540px] object-contain mx-auto rounded-xl bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[#F3EEE3]/50 border border-[#D8D3C9]">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D9541E] mb-2">
                01 · Context &amp; Challenge
              </p>
              <h2 className="text-xl font-extrabold text-[#111111] mb-3">What needed solving</h2>
              <p className="text-sm text-[#57534E] leading-relaxed">{study.challenge}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3EEE3]/50 border border-[#D8D3C9]">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#16845B] mb-2">
                02 · Architectural Approach
              </p>
              <h2 className="text-xl font-extrabold text-[#111111] mb-3">How we engineered it</h2>
              <p className="text-sm text-[#57534E] leading-relaxed">{study.solution}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-extrabold text-[#111111] mb-4">Deliverables Produced</h3>
              <ul className="space-y-3">
                {study.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#57534E]">
                    <CheckCircle2 size={16} className="text-[#16845B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[#111111] mb-4">Verified Properties</h3>
              <ul className="space-y-3 mb-6">
                {study.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#57534E]">
                    <CheckCircle2 size={16} className="text-[#D9541E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-[#F3EEE3] border border-[#D8D3C9] text-xs font-semibold text-[#111111]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#161616] text-white p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E87A4E] mb-1">
                Interested in similar quality?
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold">
                Explore the matching service or request a custom scope.
              </h3>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to={study.serviceLink}>
                <Button variant="primary" size="md">
                  View Matching Service <ArrowRight size={15} />
                </Button>
              </Link>
              <Link to="/request-service">
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/25 text-white hover:bg-white/10"
                >
                  <MessageCircle size={15} /> Request Proposal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#F3EEE3]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-[#111111]">More Studio Work</h2>
            <Link to="/work" className="text-xs font-bold text-[#D9541E] hover:underline">
              All work →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WORK_SHOWCASE.filter((w) => w.slug !== study.slug)
              .slice(0, 2)
              .map((other) => (
                <Link
                  key={other.slug}
                  to={`/work/${other.slug}`}
                  className="bg-white border border-[#D8D3C9] rounded-2xl p-5 hover:border-[#111111]/45 transition-colors"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#D9541E]">
                    {other.category}
                  </p>
                  <h3 className="text-base font-extrabold text-[#111111] mt-1">{other.title}</h3>
                  <p className="text-xs text-[#57534E] mt-1.5 line-clamp-2">{other.shortDesc}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
};
