import { SEO } from '../../lib/seo';
import { ATSCheckerTool } from './ATSCheckerTool';
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FreeATSCheckerPage = () => {
  return (
    <main className="bg-page text-page min-h-screen pt-24 pb-20">
      <SEO
        title="Free ATS Resume Checker & Keyword Matcher | SmartScaleTech Hyderabad"
        description="Test your resume against Applicant Tracking System (ATS) algorithms for free. See your score, detected tech keywords, and missing qualifications in 10 seconds."
        path="/free-ats-resume-checker"
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
              How Does Our ATS Checker Work?
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Based on the real parsing architectures used by Workday, Taleo, iCIMS, and Indian job portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Keyword Density Matching</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Scans your text against high-frequency keywords found in current live job postings for software developers and tech roles in Hyderabad.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">STAR Impact &amp; Metrics</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluates whether your experience bullet points contain quantifiable numbers, percentages, and performance results.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Format &amp; Length Health</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Checks that your word count and density fall within the optimal 400-800 word range for single or two-page parsing.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-black">Need a complete rewrite that scores 90+?</h4>
              <p className="text-xs text-slate-300">
                Work directly with founder Vamshi Polishetti in Hitech City. Fixed price ₹999 with 24-48 hr delivery.
              </p>
            </div>
            <a
              href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20used%20your%20Free%20ATS%20Checker%20and%20want%20to%20book%20a%20full%20resume%20rewrite."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <button className="h-12 px-6 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-md shadow-green-500/25 flex items-center gap-2 cursor-pointer">
                <MessageCircle size={16} /> Book on WhatsApp (₹999)
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
