import { Linkedin, Mail, Phone, MessageCircle, ShieldCheck, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

export const FounderSection = () => {
  return (
    <section id="about" className="py-24 bg-slate-50/60 border-t border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Founder Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative background glow */}
              <div className="absolute -inset-2 rounded-[40px] bg-linear-to-r from-primary/20 via-accent/20 to-primary/10 blur-xl opacity-70 -z-10" />

              <div className="relative rounded-[36px] bg-slate-950 border-2 border-slate-800/80 shadow-2xl overflow-hidden group">
                {/* Image Container with high-end framing */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-slate-900">
                  <img
                    src="/assets/aistudio/Mobile_Background_img_Home_22174709.jpg"
                    alt="Vamshi Polishetti - Founder of SmartScaleTech"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle gradient vignette at bottom for readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Status Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Founder &amp; Principal Consultant
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                      <MapPin size={10} /> Hitech City
                    </span>
                  </div>

                  {/* Bottom Portrait Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/10">
                    <h3 className="text-xl sm:text-2xl font-black text-white">Vamshi Polishetti</h3>
                    <p className="text-xs text-primary font-bold mt-0.5">
                      Full-Stack Engineer &amp; Career Branding Strategist
                    </p>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Hitech City, Hyderabad, Telangana · Serving Clients Nationwide
                    </p>
                  </div>
                </div>

                {/* Direct Connect Action Row */}
                <div className="p-4 bg-slate-950 border-t border-slate-800/80 grid grid-cols-3 gap-2">
                  <a
                    href="https://www.linkedin.com/in/polishettivamshi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#0A66C2] text-slate-300 hover:text-white transition-all group/btn"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin size={18} className="text-[#0A66C2] mb-1 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold">LinkedIn</span>
                  </a>

                  <a
                    href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20would%20like%20to%20discuss%20a%20project%2Fresume%20with%20SmartScaleTech."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-green-500 text-slate-300 hover:text-white transition-all group/btn"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle size={18} className="text-green-500 mb-1 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold">WhatsApp</span>
                  </a>

                  <a
                    href="mailto:smartscaletechforyou@gmail.com"
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-primary text-slate-300 hover:text-white transition-all group/btn"
                    title="Send Email"
                  >
                    <Mail size={18} className="text-primary mb-1 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Founder's Message
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Built by an <span className="text-primary">Engineer</span>, Not a Generic Resume Agency.
            </h2>

            <div className="relative pl-5 border-l-2 border-primary/40 my-4">
              <p className="text-base sm:text-lg italic text-slate-700 font-medium leading-relaxed">
                "Most tech resumes and agency portfolios in Hyderabad fail for one simple reason: they are written by people who have never built software or faced an engineering interview panel. We combine genuine tech experience with ATS keyword science to give you a decisive edge."
              </p>
              <span className="block text-xs font-bold text-slate-400 mt-2 not-italic">
                — Vamshi Polishetti, Founder
              </span>
            </div>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed font-normal">
              <p>
                Based in Hyderabad’s tech corridor at Hitech City, SmartScaleTech was founded to solve a critical problem: hundreds of thousands of talented engineers and graduates across India apply to jobs daily, yet over 90% get rejected by automated screening before a hiring manager ever looks at their experience.
              </p>
              <p>
                Whether crafting a high-impact ATS resume, developing an animated portfolio website, or deploying a high-speed business web app, you work directly with technical consultants who understand frameworks, architectures, and what modern recruiters actually search for.
              </p>
            </div>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Direct 1-on-1 Consultation</p>
                  <p className="text-slate-500 mt-0.5">Talk directly with Vamshi—no middle agents, no automated generic templates.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">⚡ 5-Minute WhatsApp Response</p>
                  <p className="text-slate-500 mt-0.5">Fast communication and quick 24-48 hour project turnarounds.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20would%20like%20to%20discuss%20a%20project%2Fresume%20with%20SmartScaleTech."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="h-13 px-8 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 transition-all hover:-translate-y-0.5">
                  <MessageCircle size={18} className="mr-2" /> Message Vamshi on WhatsApp
                </Button>
              </a>
              <a href="#pricing">
                <Button variant="outline" className="h-13 px-7 rounded-xl border-slate-300 text-slate-700 font-bold text-sm hover:bg-white transition-all hover:-translate-y-0.5">
                  View Packages &amp; Pricing
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
