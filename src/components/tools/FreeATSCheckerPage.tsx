import { SEO, SITE_URL } from '../../lib/seo';
import { ATSCheckerTool } from './ATSCheckerTool';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Accordion } from '../ui/Accordion';
import { Button } from '../ui/Button';

const ATS_FAQS = [
  {
    q: 'Is the SmartScaleTech ATS Resume Checker free?',
    a: 'Yes. Both Role Benchmark diagnostics and Resume vs. Job Description keyword comparisons run locally in your browser without paywalls or mandatory signup.',
  },
  {
    q: 'What should I target before applying through ATS portals?',
    a: 'Ensure standard headings (Summary, Skills, Experience, Projects, Education), clean single-column formatting, relevant stack keywords, and quantified outcomes in experience bullets.',
  },
  {
    q: 'Why do multi-column Canva or graphic templates score lower?',
    a: 'Legacy Applicant Tracking Systems flatten PDFs left-to-right across columns, often mixing text blocks or skipping skills hidden inside progress bars and icons.',
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
      { '@type': 'ListItem', position: 2, name: 'Free ATS Resume Checker', item: `${SITE_URL}/free-ats-resume-checker` },
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
    <main className="bg-[#F3EEE3] text-[#111111] min-h-screen pt-10 sm:pt-14 pb-20">
      <SEO
        title="Free ATS Resume Checker & JD Match Scanner | SmartScaleTech (SST)"
        description="Check your ATS resume keywords locally in your browser. Compare your resume against any Job Description and verify STAR metrics."
        path="/free-ats-resume-checker"
        jsonLd={atsCheckerJsonLd}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Free Tools', to: '/tools' },
            { label: 'ATS Resume Checker' },
          ]}
        />
      </div>

      <section className="py-4">
        <ATSCheckerTool />
      </section>

      <section className="py-16 bg-white border-y border-[#D8D3C9] mt-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: '01',
                title: 'Role & JD Keyword Coverage',
                desc: 'Compares your skills against common tech roles or terms extracted directly from any live Job Description.',
              },
              {
                num: '02',
                title: 'STAR Impact & Ownership Verbs',
                desc: 'Checks whether your bullets cite concrete outcomes (%, throughput, scale) instead of generic duties.',
              },
              {
                num: '03',
                title: 'ATS Section Readability',
                desc: 'Verifies standard Summary, Skills, Experience, Projects, and Education headers plus word count balance.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-2xl bg-[#F3EEE3]/45 border border-[#D8D3C9] space-y-2"
              >
                <span className="text-xs font-extrabold text-[#D9541E]">{item.num}</span>
                <h2 className="text-base font-extrabold text-[#111111]">{item.title}</h2>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-extrabold text-[#111111] mb-6">
                ATS Diagnostic FAQs
              </h2>
              <Accordion
                items={ATS_FAQS.map((f) => ({ question: f.q, answer: f.a }))}
                defaultOpenIndex={0}
              />
            </div>

            <div className="lg:col-span-5 bg-[#161616] text-white rounded-2xl p-7 space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E87A4E]">
                Hands-On Career Engineering
              </p>
              <h3 className="text-xl font-extrabold">
                Want a clean single-column rewrite delivered in 48 hours?
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Work directly with SmartScaleTech to turn your raw history into an editable Word +
                PDF resume aligned to your target stack.
              </p>
              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20ran%20the%20ATS%20Checker%20and%20want%20to%20book%20a%20resume%20rewrite."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="md" className="w-full">
                    <MessageCircle size={15} /> Book Resume Review (WhatsApp)
                  </Button>
                </a>
                <Link to="/services/resume-writing">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full border-white/25 text-white hover:bg-white/10"
                  >
                    Explore ATS Resume Service <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
