import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Briefcase, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const AUDIENCES = [
  {
    icon: Building2,
    tag: 'Businesses & Startups',
    title: 'Websites, Apps & Practical AI',
    desc: 'Custom React websites, conversion UI/UX systems, REST APIs, technical SEO, and server-side AI workflows tailored for growing companies.',
    highlights: ['Business Websites & SaaS MVPs', 'UI/UX Systems & Brand Identity', 'API, Cloud DevOps & AI Chatbots'],
    ctaLabel: 'Explore Business Solutions',
    to: '/services/web-development',
  },
  {
    icon: Briefcase,
    tag: 'Professionals & Job Seekers',
    title: 'ATS Resumes & Recruiter Presence',
    desc: 'Single-column ATS resumes, LinkedIn & Naukri search tuning, personal portfolio sites, mock interviews, and salary negotiation coaching.',
    highlights: ['ATS-Safe Word + PDF Resumes', 'LinkedIn & Naukri Profile Rewrites', 'Custom Developer Portfolios'],
    ctaLabel: 'Explore Career Solutions',
    to: '/services/resume-writing',
  },
  {
    icon: GraduationCap,
    tag: 'Students & Graduates',
    title: 'Campus Placements & Final Year Projects',
    desc: 'Working B.Tech, M.Tech & MCA projects in AI/ML, MERN & Cloud alongside placement-ready fresher resumes you can defend cleanly.',
    highlights: ['Source Code + IEEE Report + PPT', '1-on-1 Viva & Code Walkthrough', 'Campus Placement 1-Page Resumes'],
    ctaLabel: 'View Final Year Projects',
    to: '/final-year-projects',
  },
];

export const WhoWeHelpSection = () => {
  return (
    <section className="bg-[#F3EEE3] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who We Help"
          title="Three clear tracks."
          highlight="Built without bloat."
          description="Whether you are shipping a company web product, preparing for tech interviews, or defending a university capstone, each engagement stays focused on tangible deliverables."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {AUDIENCES.map((card) => (
            <div
              key={card.tag}
              className="bg-white border border-[#D8D3C9] rounded-2xl p-7 sm:p-8 flex flex-col justify-between gap-6 hover:border-[#111111] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-[#F3EEE3] text-[#111111] flex items-center justify-center">
                    <card.icon size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#57534E]">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-card-title font-extrabold text-[#111111]">{card.title}</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">{card.desc}</p>

                <ul className="space-y-2 pt-2 border-t border-[#D8D3C9]/70">
                  {card.highlights.map((item) => (
                    <li key={item} className="text-xs font-medium text-[#111111] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D9541E] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={card.to}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#D9541E] transition-colors"
              >
                <span>{card.ctaLabel}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
