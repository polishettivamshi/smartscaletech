import React from 'react';
import { 
  Linkedin, 
  ShieldCheck, 
  Clock, 
  Zap, 
  MessageCircle, 
  CheckCircle2, 
  Star,
  Users,
  FileCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { LinkedInServiceRequestForm } from './LinkedInServiceRequestForm';
import { SEO } from '../../lib/seo';

export const LinkedInServiceRequestPage: React.FC = () => {
  return (
    <main className="bg-slate-50 min-h-screen py-12 lg:py-20 text-slate-800">
      <SEO
        title="Request Services | Smart Scale Tech LinkedIn Portal"
        description="Submit your service request for ATS resume writing, LinkedIn profile optimization, or web development directly to founder Vamshi via WhatsApp (+91 90008 59695) or email."
        path="/request-service"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-black uppercase tracking-wider">
            <Linkedin size={15} /> Official LinkedIn Service Portal
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Request Services from <span className="text-primary">Smart Scale Tech</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Connected via our LinkedIn company page? Submit your exact project requirements below. Your request sends directly to founder Vamshi’s personal WhatsApp and official email for an immediate reply.
          </p>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-bold text-slate-700">
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
              <Sparkles size={18} className="text-emerald-600 mb-1" />
              <span>Free Proposal (₹0)</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
              <Zap size={18} className="text-primary mb-1" />
              <span>Starts at Just ₹199</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
              <Clock size={18} className="text-amber-600 mb-1" />
              <span>5-Min WhatsApp Reply</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
              <FileCheck size={18} className="text-indigo-600 mb-1" />
              <span>98/100 ATS Score</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="mb-16">
          <LinkedInServiceRequestForm
            sourcePage="/request-service"
          />
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              What Happens After You Submit?
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Simple 3-step turnaround designed for busy job seekers and hiring candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-black flex items-center justify-center text-base">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Instant Dispatch</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Your request details are dispatched via WhatsApp to <strong>+91 90008 59695</strong> and emailed to <strong>smartscaletechforyou@gmail.com</strong>.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-black flex items-center justify-center text-base">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Complimentary Audit &amp; Quote</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Vamshi reviews your existing profile or resume, sends a transparent fixed quote, and answers all questions over WhatsApp.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-black flex items-center justify-center text-base">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">24–48 Hr First Draft</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                We craft your ATS-compliant resume or LinkedIn makeover with Workday keyword benchmarks and provide revisions until you're completely satisfied.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Contacts Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-black">Need Immediate Assistance?</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md">
              You can also message founder Vamshi Polishetti directly on WhatsApp without filling out the form.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20saw%20your%20LinkedIn%20company%20page%20and%20would%20like%20to%20request%20a%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle size={18} fill="currentColor" /> Chat on WhatsApp (+91 90008 59695)
            </a>
            <a
              href="https://www.linkedin.com/company/smartscale-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              <Linkedin size={18} /> Company LinkedIn
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
