import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { SEO } from '../../lib/seo';
import { WORK_SHOWCASE, WorkCategory } from '../../data/workShowcase';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Button } from '../ui/Button';

const CATEGORIES: WorkCategory[] = [
  'All',
  'Websites & UI',
  'Resume & Career',
  'Dashboards & Tools',
  'Brand & Identity',
];

export const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All');

  const items =
    activeCategory === 'All'
      ? WORK_SHOWCASE
      : WORK_SHOWCASE.filter((item) => item.category === activeCategory);

  return (
    <main className="bg-[#F3EEE3] min-h-screen">
      <SEO
        title="Selected Work & Case Studies | SmartScaleTech (SST)"
        description="Explore verified ATS resume samples, LinkedIn transformations, custom website architectures, and client-side diagnostic tools by SmartScaleTech."
        path="/work"
      />

      <section className="pt-12 pb-14 sm:pt-16 border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Selected Work' }]} className="mb-7" />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-3">
                Work Archive &amp; Demonstrations
              </p>
              <h1 className="text-hero-display font-extrabold text-[#111111]">
                Real deliverables and studio prototypes.
              </h1>
              <p className="mt-4 text-base text-[#57534E] leading-relaxed">
                Every entry below is clearly labeled as a verified career sample, an internal live
                utility, or a studio architectural demonstration—never disguised as third-party
                client bragging.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="inline-flex flex-wrap gap-1.5 p-1.5 bg-white border border-[#D8D3C9] rounded-xl self-start lg:self-auto"
            >
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      active ? 'bg-[#111111] text-white' : 'text-[#57534E] hover:text-[#111111]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="bg-white border border-[#D8D3C9] rounded-2xl p-12 text-center max-w-lg mx-auto">
              <Layers size={28} className="mx-auto text-[#57534E] mb-3" />
              <h2 className="text-lg font-extrabold text-[#111111]">
                No items in this category yet
              </h2>
              <p className="mt-2 text-sm text-[#57534E]">
                Switch filters to inspect our web systems, ATS resumes, and interactive tools.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-5"
                onClick={() => setActiveCategory('All')}
              >
                Show All Work
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  to={`/work/${item.slug}`}
                  className="group rounded-2xl bg-white border border-[#D8D3C9] hover:border-[#111111]/45 transition-colors overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] w-full bg-[#EAE3D5] overflow-hidden border-b border-[#D8D3C9]">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider mb-2.5">
                        <span className="text-[#D9541E]">{item.category}</span>
                        <span className="text-[#57534E]">{item.kindLabel}</span>
                      </div>
                      <h2 className="text-lg font-extrabold text-[#111111] group-hover:text-[#D9541E] transition-colors leading-snug">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-3">
                        {item.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-[#EAE3D5] flex items-center justify-between text-xs font-bold text-[#111111]">
                    <span className="text-[#57534E] font-medium">{item.timeline}</span>
                    <span className="inline-flex items-center gap-1 group-hover:text-[#D9541E]">
                      Read Case Study <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
