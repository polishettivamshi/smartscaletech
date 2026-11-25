import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WORK_SHOWCASE } from '../../data/workShowcase';
import { SectionHeading } from '../ui/SectionHeading';

export const SelectedWorkSection = () => {
  const featured = WORK_SHOWCASE.slice(0, 4);

  return (
    <section id="selected-work" className="bg-[#F3EEE3] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected Work & Samples"
          title="Crafted architectures"
          highlight="& real deliverables."
          description="Inspect verified career deliverables alongside studio architecture demonstrations. Every sample is honestly labeled—zero inflated metrics or borrowed client logos."
          actionLabel="View All Work"
          actionTo="/work"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((item) => (
            <Link
              key={item.slug}
              to={`/work/${item.slug}`}
              className="group bg-white border border-[#D8D3C9] hover:border-[#111111] rounded-2xl overflow-hidden transition-colors flex flex-col justify-between"
            >
              <div className="aspect-video w-full overflow-hidden border-b border-[#D8D3C9] bg-[#F3EEE3]/40">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.12em]">
                    <span className="text-[#D9541E]">{item.category}</span>
                    <span className="text-[#57534E]">{item.kindLabel}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#111111] group-hover:text-[#D9541E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{item.shortDesc}</p>
                </div>

                <div className="pt-4 border-t border-[#D8D3C9]/70 flex items-center justify-between text-xs font-semibold text-[#111111]">
                  <span>{item.technologies.slice(0, 3).join(' · ')}</span>
                  <span className="inline-flex items-center gap-1 group-hover:text-[#D9541E]">
                    Inspect Case <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
