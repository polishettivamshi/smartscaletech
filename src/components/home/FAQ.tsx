import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Accordion, AccordionItemData } from '../ui/Accordion';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

type FaqCategory = 'All' | 'Business' | 'Career';

const FAQS: (AccordionItemData & { category: Exclude<FaqCategory, 'All'> })[] = [
  {
    category: 'Business',
    question: 'What is Smart Scale Tech (SST / SmartScaleTech)?',
    answer:
      'Smart Scale Tech—also searched as SST or SmartScaleTech—is an independent Hitech City, Hyderabad studio founded by Vamshi Polishetti. We engineer custom business websites, UI/UX systems, API & AI integrations, alongside ATS-ready resumes, LinkedIn optimization, and B.Tech/M.Tech final year projects.',
  },
  {
    category: 'Business',
    question: 'Do we get full ownership of website code and designs?',
    answer:
      'Yes. We build clean React, TypeScript, Node.js, or Python codebases without proprietary CMS lock-in. Upon project completion, full source files and deployment walkthroughs are handed over directly to your team.',
  },
  {
    category: 'Business',
    question: 'How long does a business website or custom web app take?',
    answer:
      'Focused business websites typically launch within 5 to 10 working days depending on page count and content readiness. Custom web apps, APIs, or AI workflow integrations are scoped by milestone before work begins.',
  },
  {
    category: 'Career',
    question: 'What makes a resume ATS-friendly for Indian & global hiring portals?',
    answer:
      'Automated parsers such as Workday, Taleo, Greenhouse, and Naukri extract plain text top-to-bottom. We replace fragile multi-column graphics and icons with crisp single-column typography, role-aligned technical keywords, and quantified STAR bullet points.',
  },
  {
    category: 'Career',
    question: 'How fast are career profiles and resumes delivered?',
    answer:
      'Your first structured ATS resume or LinkedIn draft arrives within 24–48 hours, followed by unlimited iterative refinements until you are confident in every bullet.',
  },
  {
    category: 'Career',
    question: 'Do you require my LinkedIn account password?',
    answer:
      'No. You never share account credentials. We deliver your headline variations, About rewrite, STAR experience bullets, skill list, and custom header banner ready to copy and paste securely.',
  },
  {
    category: 'Career',
    question: 'Do you support remote clients outside Hyderabad?',
    answer:
      'Yes. While our studio operates from Hitech City, Hyderabad, we work digitally via WhatsApp and video consultations with engineers, freshers, and founders across India and abroad.',
  },
];

export const FAQ = () => {
  const [category, setCategory] = useState<FaqCategory>('All');

  const filteredFaqs =
    category === 'All' ? FAQS : FAQS.filter((item) => item.category === category);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white border-b border-[#D8D3C9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Common Questions"
              title="Clear answers before"
              highlight="we get started."
            />

            {/* Category filter tabs */}
            <div
              role="tablist"
              aria-label="Filter FAQs by category"
              className="mt-8 mb-6 inline-flex items-center gap-1 p-1 rounded-xl bg-[#F3EEE3] border border-[#D8D3C9]"
            >
              {(['All', 'Business', 'Career'] as FaqCategory[]).map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      active ? 'bg-[#111111] text-white' : 'text-[#57534E] hover:text-[#111111]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <Accordion key={category} items={filteredFaqs} defaultOpenIndex={0} />
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#F3EEE3] border border-[#D8D3C9] rounded-2xl p-8 sm:p-10 lg:sticky lg:top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-3">
                Direct Studio Desk
              </p>
              <h3 className="text-2xl font-extrabold text-[#111111]">
                Have a specific project or career requirement?
              </h3>
              <p className="mt-3 text-sm text-[#57534E] leading-relaxed">
                Send your current resume, project brief, or website URL. We respond directly with
                practical recommendations, realistic turnaround, and transparent pricing.
              </p>

              <div className="mt-7 space-y-3">
                <Link to="/request-service" className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Start a Project <ArrowRight size={16} />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="secondary" size="lg" className="w-full">
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </Button>
                </a>
              </div>

              <div className="mt-6 pt-5 border-t border-[#D8D3C9] text-xs text-[#57534E] flex items-center justify-between">
                <span>Hitech City, Hyderabad</span>
                <span className="font-semibold text-[#111111]">Mon–Sat · IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
