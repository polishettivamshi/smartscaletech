import { SEO, SITE_URL } from '../../lib/seo';
import { ATSCheckerTool } from './ATSCheckerTool';
import { ArrowRight, MessageCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ATS_FAQS = [
  {
    q: 'Is the SmartScaleTech ATS Resume Checker completely free?',
    a: 'Yes. Both Role Benchmark scans and Resume vs. Job Description (JD) keyword comparisons are 100% free with unlimited runs and zero sign-up wall.',
  },
  {
    q: 'What is a good ATS score before applying to tech jobs in India?',
    a: 'Target 85/100 or higher. Resumes scoring below 70 often miss required stack keywords or lack quantified STAR impact metrics, lowering shortlisting odds on Workday, Taleo, iCIMS, and Naukri.',
  },
  {
    q: 'How does the Resume vs. Job Description (JD) Match work?',
    a: 'Paste the exact Job Description from LinkedIn, Naukri, or a company careers portal alongside your resume text. The tool extracts high-signal technical skills and compares them word-for-word against your resume.',
  },
  {
    q: 'Why do multi-column Canva or graphic resumes score poorly on ATS?',
    a: 'Many legacy Applicant Tracking Systems flatten PDFs left-to-right across columns, scrambling section headers and hiding skills inside progress bars or icons. Single-column Word/LaTeX structures parse cleanly.',
  },
];

const atsCheckerJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Free ATS Resume Checker & Job Description Matcher',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/free-ats-resume-checker`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    provider: { '@id': `${SITE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Free ATS Resume Checker',
        item: `${SITE_URL}/free-ats-resume-checker`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ATS_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export const FreeATSCheckerPage = () => {
  return (
    <main className="bg-page text-page min-h-screen pt-24 pb-20">
      <SEO
        title="Free ATS Resume Checker & JD Match Scanner | Smart Scale Tech (SST)"
        description="Check your ATS resume score free in 10 seconds with Smart Scale Tech (SST). Compare your resume against any Job Description, detect missing skills, verify STAR metrics, and pass Workday & Naukri screening."
        keywords="free ats resume checker, ats score checker india, resume jd keyword matcher, check resume ats score online, workday ats checker, naukri resume score checker, sst ats checker, smart scale tech ats checker"
        path="/free-ats-resume-checker"
        jsonLd={atsCheckerJsonLd}
      />

      {/* Main Tool Container */}
      <section className="py-6 sm:py-10">
        <ATSCheckerTool />
      </section>

      {/* Educational Explainer */}
      <section className="py-16 bg-white border-y border-slate-100 mt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              How Our Free ATS Resume Checker Evaluates Your CV
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Modeled on real parsing logic used by Workday, Taleo, iCIMS, LinkedIn Recruiter, and Naukri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Role &amp; JD Keyword Match</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compares your skills against target tech roles or extracts exact keywords from any live Job Description you paste.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">STAR Impact &amp; Action Verbs</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Counts quantified results (percentages, latency, user volume) and ownership verbs that hiring managers scan first.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">ATS Section &amp; Length Audit</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Verifies standard Summary, Skills, Experience, Projects, and Education headings plus plain-text contact links.
              </p>
            </div>
          </div>

          {/* FAQ + Other Tools Cross-Links */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Search size={18} className="text-primary" /> ATS Checker FAQs
              </h3>
              <dl className="space-y-4">
                {ATS_FAQS.map((faq) => (
                  <div key={faq.q} className="border-b border-slate-200/70 pb-3 last:border-b-0 last:pb-0">
                    <dt className="text-sm font-bold text-slate-900">{faq.q}</dt>
                    <dd className="mt-1 text-xs text-slate-600 leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-black text-slate-900">More Free Tools &amp; Custom Plans</h3>
              <Link
                to="/linkedin-headline-generator"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary">
                    LinkedIn &amp; Naukri Headline Generator
                  </p>
                  <p className="text-xs text-slate-500">Craft recruiter-searchable headlines under 220 characters</p>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-primary" />
              </Link>
              <Link
                to="/job-readiness-audit"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary">
                    60-Second Job Readiness Audit
                  </p>
                  <p className="text-xs text-slate-500">Diagnose why applications aren&apos;t turning into interviews</p>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-primary" />
              </Link>
              <Link
                to="/custom-package-builder"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary">
                    Custom Package Builder (Save up to 20%)
                  </p>
                  <p className="text-xs text-slate-500">Pick only ATS Resume, LinkedIn, Naukri, or Portfolio add-ons</p>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-primary" />
              </Link>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-black">Want your resume rewritten to 95–98/100 ATS score?</h4>
              <p className="text-xs text-slate-300">
                Work 1-on-1 with founder Vamshi Polishetti in Hitech City. Fast 24–48 hr delivery.
              </p>
            </div>
            <a
              href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20used%20your%20Free%20ATS%20Checker%20and%20want%20to%20book%20a%20full%20resume%20rewrite."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <button className="h-12 px-6 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-md shadow-green-500/25 flex items-center gap-2 cursor-pointer">
                <MessageCircle size={16} /> Book on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
