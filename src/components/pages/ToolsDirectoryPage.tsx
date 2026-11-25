import { Link } from 'react-router-dom';
import {
  FileSearch,
  Linkedin,
  ShieldCheck,
  SlidersHorizontal,
  ArrowRight,
} from 'lucide-react';
import { SEO } from '../../lib/seo';
import { Breadcrumb } from '../ui/Breadcrumb';

const TOOLS = [
  {
    title: 'Free ATS Resume & JD Matcher',
    badge: 'Browser Tool · No Login',
    desc: 'Upload a plain-text resume (.txt / .md / .csv) or paste your CV alongside any job description to check keyword coverage, measurable bullets, and formatting hygiene.',
    to: '/free-ats-resume-checker',
    cta: 'Open ATS Checker',
    icon: FileSearch,
  },
  {
    title: 'LinkedIn & Naukri Headline Generator',
    badge: '220-Char Formatter',
    desc: 'Generate structured Boolean-ready headlines and About drafts tuned to your target engineering, product, or marketing stack.',
    to: '/linkedin-headline-generator',
    cta: 'Generate Headlines',
    icon: Linkedin,
  },
  {
    title: '60-Second Job Readiness Audit',
    badge: '6-Point Diagnostic',
    desc: 'Quickly score your resume, LinkedIn, GitHub portfolio, and portal hygiene to prioritize what needs attention first.',
    to: '/job-readiness-audit',
    cta: 'Start Readiness Audit',
    icon: ShieldCheck,
  },
  {
    title: 'Interactive Bundle & Quote Builder',
    badge: 'Save 10% – 20%',
    desc: 'Mix and match Career and Business solutions across 6 clear steps with add-ons, automatic discounts, and WhatsApp/UPI dispatch.',
    to: '/custom-package-builder',
    cta: 'Launch Bundle Builder',
    icon: SlidersHorizontal,
  },
];

export const ToolsDirectoryPage = () => {
  return (
    <main className="bg-[#F3EEE3] min-h-screen">
      <SEO
        title="Free Career & Pricing Tools | SmartScaleTech (SST)"
        description="Free browser-based ATS resume & JD checker, LinkedIn headline generator, job readiness audit, and interactive bundle pricing estimator."
        path="/tools"
      />

      <section className="pt-12 pb-16 sm:pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Free Tools' }]} className="mb-7" />

          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-3">
            Studio Utilities
          </p>
          <h1 className="text-hero-display font-extrabold text-[#111111] max-w-3xl">
            Free diagnostics &amp; interactive estimators.
          </h1>
          <p className="mt-4 text-base text-[#57534E] max-w-2xl leading-relaxed">
            Run quick checks locally in your browser without creating an account or handing over
            private credentials.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOOLS.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="group bg-white border border-[#D8D3C9] hover:border-[#111111]/45 rounded-2xl p-7 flex flex-col justify-between gap-6 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-[#F3EEE3] border border-[#D8D3C9] text-[#111111] group-hover:text-[#D9541E] flex items-center justify-center transition-colors">
                      <tool.icon size={20} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-[#111111] group-hover:text-[#D9541E] transition-colors">
                    {tool.title}
                  </h2>
                  <p className="mt-2.5 text-sm text-[#57534E] leading-relaxed">{tool.desc}</p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] group-hover:text-[#D9541E] pt-4 border-t border-[#EAE3D5]">
                  {tool.cta} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
