import { Link } from 'react-router-dom';
import {
  FileSearch,
  Linkedin,
  ShieldCheck,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const TOOLS = [
  {
    title: 'Free ATS Resume & JD Matcher',
    tag: 'Most Popular • Free',
    desc: 'Scan your CV against tech roles or paste any live Job Description to uncover missing keywords and formatting gaps.',
    to: '/free-ats-resume-checker',
    cta: 'Check My ATS Score',
    icon: FileSearch,
    accent: 'bg-primary/10 text-primary',
  },
  {
    title: 'LinkedIn & Naukri Headline Generator',
    tag: '220-Char Ready • Free',
    desc: 'Generate 4 recruiter-searchable headlines plus a structured About summary tailored to your exact role and stack.',
    to: '/linkedin-headline-generator',
    cta: 'Generate Headlines',
    icon: Linkedin,
    accent: 'bg-[#0A66C2]/10 text-[#0A66C2]',
  },
  {
    title: '60-Second Job Readiness Audit',
    tag: '6 Checkpoints • Free',
    desc: 'Answer 6 quick questions to score your overall job-hunt setup and identify your #1 interview bottleneck.',
    to: '/job-readiness-audit',
    cta: 'Run Free Audit',
    icon: ShieldCheck,
    accent: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Custom Service Bundle Builder',
    tag: 'Save Up to 20%',
    desc: 'Prefer selecting individual services instead of fixed plans? Mix Career, Portfolio, or Web add-ons with instant pricing.',
    to: '/custom-package-builder',
    cta: 'Build My Bundle',
    icon: SlidersHorizontal,
    accent: 'bg-amber-50 text-amber-600',
  },
];

export const FreeToolsSection = () => {
  return (
    <section id="free-tools" className="py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} /> Free Interactive Career Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Test Before You Book: Free ATS, LinkedIn &amp; Pricing Tools
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            Use our free interactive tools first—no login required—then decide if you want expert execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all flex flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${tool.accent}`}>
                    <tool.icon size={21} />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                    {tool.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-primary group-hover:gap-2.5 transition-all">
                {tool.cta} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
