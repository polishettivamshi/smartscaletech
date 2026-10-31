import { useState } from 'react';
import { Linkedin, Bell, ArrowRight, Download, Users, CheckCircle, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { TemplateDownloadModal } from './TemplateDownloadModal';
import { trackEvent } from '../../lib/analytics';

export const LinkedInCommunitySection = () => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleFollowClick = () => {
    trackEvent('cta_click', { cta: 'linkedin_community_follow' });
  };

  const sampleUpdates = [
    {
      tag: 'Off-Campus Drive',
      title: 'Top 5 Off-Campus Tech Drives in Hyderabad (Hitech City / Gachibowli)',
      date: 'Updated Weekly on LinkedIn',
      desc: 'Curated list of 2024–2026 batch fresher openings across TCS, Infosys, and high-growth Madhapur tech startups.',
    },
    {
      tag: 'Resume Teardown',
      title: 'Why 2-Column Canva Resumes Fail Workday & Taleo ATS Parsers',
      date: 'Weekly Case Study',
      desc: 'Step-by-step breakdown of how rearranging headings and formatting quantified STAR bullets increased interview callbacks.',
    },
    {
      tag: 'Salary & Keywords',
      title: 'Top 15 React & Java Keywords Recruiter Algorithms Search in 2026',
      date: 'Cheat Sheet',
      desc: 'Exact taxonomy and framework groupings to feature in your Skills matrix for 3x higher search ranking.',
    },
  ];

  return (
    <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission & Follow Hook */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold uppercase tracking-wider">
              <Linkedin size={14} /> Official LinkedIn Community
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Get Weekly <span className="text-primary">Hyderabad Hiring</span> &amp; ATS Insights
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Follow our official LinkedIn page to receive weekly resume breakdowns, Hyderabad tech hiring drives, and exclusive candidate optimization templates.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                <span>Weekly off-campus placement &amp; referral lists</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                <span>Actionable resume rewrite case studies &amp; keyword lists</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                <span>Direct Q&amp;A sessions with founder Vamshi Polishetti</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://www.linkedin.com/company/smartscale-tech"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFollowClick}
                className="flex-1"
              >
                <Button className="w-full h-13 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs shadow-lg shadow-[#0A66C2]/25 transition-all">
                  <Linkedin size={16} className="mr-2" /> Follow @smartscale-tech
                </Button>
              </a>

              <Button
                onClick={() => setShowTemplateModal(true)}
                variant="outline"
                className="h-13 px-5 rounded-xl border-slate-300 text-slate-700 font-bold text-xs hover:bg-white transition-all"
              >
                <Download size={15} className="mr-1.5 text-primary" /> Free Template Pack
              </Button>
            </div>

            <p className="text-[11px] text-slate-400">
              Also active on our{' '}
              <a
                href="https://whatsapp.com/channel/0029VbCFJRKJJhzXxOaL7g28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold hover:underline"
              >
                Official WhatsApp Channel
              </a>{' '}
              for instant alerts.
            </p>
          </div>

          {/* Right Column: Live-Style Post Previews */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <Bell size={14} className="text-amber-500" /> Recent Community Drops
              </span>
              <a
                href="https://www.linkedin.com/company/smartscale-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                View all on LinkedIn <ExternalLink size={12} />
              </a>
            </div>

            {sampleUpdates.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-primary/40 hover:shadow-xl hover:shadow-slate-100 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-slate-400 font-medium">{item.date}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#0A66C2]">
                  <Linkedin size={13} />
                  <span>Read full breakdown on LinkedIn</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TemplateDownloadModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
      />
    </section>
  );
};
