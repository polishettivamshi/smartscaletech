import { Link } from 'react-router-dom';
import {
  FileSearch,
  Linkedin,
  ShieldCheck,
  SlidersHorizontal,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const TOOLS = [
  {
    title: 'ATS Resume & JD Matcher',
    tag: 'Free · Client-Side',
    desc: 'Upload a text resume or paste any live Job Description to uncover missing technical keywords and formatting gaps.',
    to: '/free-ats-resume-checker',
    cta: 'Open ATS Checker',
    icon: FileSearch,
  },
  {
    title: 'LinkedIn Headline Generator',
    tag: '220-Char Ready · Free',
    desc: 'Generate recruiter-searchable LinkedIn & Naukri headlines plus a structured About draft matched to your stack.',
    to: '/linkedin-headline-generator',
    cta: 'Generate Headlines',
    icon: Linkedin,
  },
  {
    title: '60-Second Job Readiness Audit',
    tag: '6 Checkpoints · Free',
    desc: 'Score your overall resume, LinkedIn, GitHub, and interview readiness in one minute to find the biggest bottleneck.',
    to: '/job-readiness-audit',
    cta: 'Run Readiness Audit',
    icon: ShieldCheck,
  },
  {
    title: 'Custom Bundle Builder',
    tag: 'Save 10% – 20%',
    desc: 'Pick individual Business Web or Career services with live add-ons and automatic multi-service bundle discounts.',
    to: '/custom-package-builder',
    cta: 'Build Custom Bundle',
    icon: SlidersHorizontal,
  },
];

export const FreeToolsSection = () => {
  return (
    <section id="free-tools" className="py-20 sm:py-24 bg-white border-b border-[#D8D3C9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Interactive Studio Utilities"
          title="Test your profile before you book."
          highlight="Zero login required."
          description="Use our browser-based diagnostics and interactive bundle estimator first—then decide if you want hands-on studio execution."
          actionLabel="Explore all tools"
          actionTo="/tools"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="group p-6 rounded-2xl bg-[#F3EEE3]/45 border border-[#D8D3C9] hover:bg-white hover:border-[#111111]/40 transition-all flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="h-10 w-10 rounded-xl bg-white border border-[#D8D3C9] text-[#111111] flex items-center justify-center group-hover:border-[#D9541E] group-hover:text-[#D9541E] transition-colors">
                    <tool.icon size={18} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                    {tool.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#111111] group-hover:text-[#D9541E] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] group-hover:text-[#D9541E] group-hover:gap-2 transition-all pt-3 border-t border-[#D8D3C9]/80">
                {tool.cta} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
