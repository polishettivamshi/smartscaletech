import { useState } from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle, ArrowRight, MessageCircle, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const ResumeComparison = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'breakdown'>('comparison');

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Proven ATS Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Before vs. After: What Actually Gets Interviews
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Over 90% of applicants fail automated screening because of layout errors, missing keywords, and passive duty descriptions. Here is how SmartScaleTech transforms a resume:
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <AlertCircle size={14} className="shrink-0" />
            <span>[TODO: Replace placeholder text with your actual client before/after PDFs or screenshot snippets]</span>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {/* BEFORE CARD */}
          <div className="p-8 rounded-3xl bg-rose-50/40 border-2 border-rose-200/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-rose-200/70 mb-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 block">Typical Candidate Resume</span>
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <XCircle className="text-rose-500" size={24} /> Before (Failed ATS)
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-rose-600">38/100</span>
                  <span className="block text-[10px] font-bold text-rose-400 uppercase">ATS Parse Score</span>
                </div>
              </div>

              {/* Sample Content */}
              <div className="space-y-4 text-xs font-mono bg-white p-5 rounded-2xl border border-rose-100 text-slate-600 shadow-sm">
                <div className="p-2 bg-rose-50 rounded border border-rose-200 text-rose-800 font-sans font-bold text-[11px]">
                  ⚠️ Two-column Canva template with rating bars and tables (Unparsable by Workday &amp; Taleo)
                </div>

                <div className="opacity-75">
                  <p className="font-bold text-slate-800 font-sans text-sm">Experience: Software Engineer</p>
                  <p className="text-slate-400">XYZ Corp · 2023 - Present</p>
                  <ul className="list-disc pl-4 mt-2 space-y-1 font-sans text-slate-600 text-xs">
                    <li>Responsible for writing software code and fixing bugs reported by testing team.</li>
                    <li>Worked on company website using HTML, CSS, JavaScript.</li>
                    <li>Attended daily standup meetings and coordinated with team members.</li>
                    <li>Helped manager with ad-hoc tech support tasks.</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] font-sans text-rose-600 font-semibold space-y-1">
                  <p>❌ Zero measurable business impact (no metrics or percentages)</p>
                  <p>❌ Missing core keywords (REST APIs, Microservices, CI/CD, React)</p>
                  <p>❌ Passive responsibility language instead of achievements</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs font-semibold text-rose-700">
              Result: Filtered out automatically by ATS before any recruiter or hiring manager reviews it.
            </div>
          </div>

          {/* AFTER CARD */}
          <div className="p-8 rounded-3xl bg-emerald-50/50 border-2 border-emerald-400 shadow-xl shadow-emerald-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-emerald-200 mb-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 block">SmartScaleTech Re-engineered</span>
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <CheckCircle className="text-emerald-500" size={24} /> After (Interview Ready)
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-600">98/100</span>
                  <span className="block text-[10px] font-bold text-emerald-500 uppercase">ATS Pass Rate</span>
                </div>
              </div>

              {/* Sample Content */}
              <div className="space-y-4 text-xs font-mono bg-white p-5 rounded-2xl border border-emerald-200 text-slate-700 shadow-sm">
                <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-800 font-sans font-bold text-[11px]">
                  ✅ 100% ATS-compliant single-column hierarchy &amp; verified standard headings
                </div>

                <div>
                  <p className="font-bold text-slate-900 font-sans text-sm">Full-Stack Software Engineer</p>
                  <p className="text-slate-400">XYZ Tech Solutions · Hyderabad, IN · 2023 - Present</p>
                  <ul className="list-disc pl-4 mt-2 space-y-1.5 font-sans text-slate-700 text-xs leading-relaxed">
                    <li>
                      Architected 12+ RESTful microservices in <strong>React, Node.js, and PostgreSQL</strong>, cutting average API latency by <strong>42%</strong>.
                    </li>
                    <li>
                      Engineered automated <strong>Docker &amp; GitHub Actions CI/CD</strong> pipelines, accelerating release cycles from bi-weekly to daily.
                    </li>
                    <li>
                      Collaborated with cross-functional product teams to scale platform throughput to handle <strong>50,000+ daily active users</strong> with 99.9% uptime.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] font-sans text-emerald-700 font-semibold space-y-1">
                  <p>✅ Built with STAR formula (Situation, Task, Action, Result)</p>
                  <p>✅ Exact role keywords matched to current Indian tech job market</p>
                  <p>✅ Passes Naukri, LinkedIn, Workday, and Greenhouse keyword extractors</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200 text-xs font-semibold text-emerald-800">
              Result: Reaches the hiring manager's desk with top-ranking relevancy.
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-white">Want your existing resume checked?</h4>
            <p className="text-slate-300 text-sm font-medium">
              Send your current draft on WhatsApp for a quick, confidential ATS readability audit.
            </p>
          </div>
          <a
            href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20would%20like%20a%20free%20quick%20ATS%20audit%20of%20my%20current%20resume."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button className="h-13 px-8 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-500/25">
              <MessageCircle size={18} className="mr-2" /> Send Resume on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
