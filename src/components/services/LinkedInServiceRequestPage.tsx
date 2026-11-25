import React from 'react';
import { Linkedin, MessageCircle } from 'lucide-react';
import { LinkedInServiceRequestForm } from './LinkedInServiceRequestForm';
import { Breadcrumb } from '../ui/Breadcrumb';
import { OfferPrice } from '../ui/OfferPrice';

export const LinkedInServiceRequestPage: React.FC = () => {
  return (
    <main className="bg-[#F3EEE3] min-h-screen py-12 lg:py-16 text-[#111111]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: 'Home', to: '/' }, { label: 'Start a Project' }]}
          className="mb-8"
        />

        <div className="max-w-3xl mb-10 space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E]">
            Project &amp; Service Inquiry · Zero Upfront Fee
          </p>

          <h1 className="text-hero-display font-extrabold text-[#111111]">
            Tell us what you are building or improving.
          </h1>

          <p className="text-[#57534E] text-base sm:text-lg leading-relaxed">
            Submit your requirements below for web development, AI integrations, ATS resumes, or
            LinkedIn optimization. Requests route directly to founder Vamshi on WhatsApp and
            official email for clear scoping.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-[#111111]">
            <div className="p-3.5 bg-white rounded-xl border border-[#D8D3C9]">
              <span className="block text-[10px] uppercase tracking-wider text-[#57534E] font-medium">
                Consultation
              </span>
              <span className="mt-0.5 block">₹0 Free Scope</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#D8D3C9]">
              <span className="block text-[10px] uppercase tracking-wider text-[#57534E] font-medium">
                Single Services
              </span>
              <span className="mt-0.5 block">
                <OfferPrice standardPrice={199} offerPrice={159} startingFrom compact />
              </span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#D8D3C9]">
              <span className="block text-[10px] uppercase tracking-wider text-[#57534E] font-medium">
                Draft Turnaround
              </span>
              <span className="mt-0.5 block">24–48 Hours</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#D8D3C9]">
              <span className="block text-[10px] uppercase tracking-wider text-[#57534E] font-medium">
                Execution
              </span>
              <span className="mt-0.5 block">Direct Founder</span>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <LinkedInServiceRequestForm sourcePage="/request-service" />
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl p-7 sm:p-10 border border-[#D8D3C9] mb-12">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-6">
            What happens after you submit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#D9541E]">01</span>
              <h3 className="font-extrabold text-[#111111] text-base">Direct Dispatch</h3>
              <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed">
                Your brief dispatches via WhatsApp (+91 90008 59695) and email
                (smartscaletechforyou@gmail.com).
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#D9541E]">02</span>
              <h3 className="font-extrabold text-[#111111] text-base">Scope &amp; Fixed Quote</h3>
              <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed">
                Vamshi reviews your current profile or project goal, confirms exact deliverables,
                and shares a transparent fixed quote.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#D9541E]">03</span>
              <h3 className="font-extrabold text-[#111111] text-base">Iterative Delivery</h3>
              <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed">
                Career drafts arrive in 24–48 hours; custom web builds progress cleanly with direct
                review checkpoints.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Contact Strip */}
        <div className="bg-[#161616] text-white rounded-2xl p-7 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold">Prefer messaging directly?</h3>
            <p className="text-white/75 text-xs sm:text-sm max-w-md">
              Skip the form and send your brief directly on WhatsApp or connect on LinkedIn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20would%20like%20to%20request%20a%20SmartScaleTech%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D9541E] hover:bg-[#B94414] text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp (+91 90008 59695)
            </a>
            <a
              href="https://www.linkedin.com/company/smartscale-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/25 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              <Linkedin size={16} /> Company LinkedIn
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
