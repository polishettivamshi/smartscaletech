import { Linkedin, Mail, Phone, MapPin, MessageCircle, ShieldCheck, Code, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const FounderSection = () => {
  return (
    <section id="about" className="py-24 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Founder Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative p-8 rounded-[36px] bg-slate-50 border border-slate-200 shadow-xl shadow-slate-100">
              <div className="h-28 w-28 rounded-2xl bg-linear-to-br from-primary to-accent text-white flex items-center justify-center font-black text-4xl shadow-lg mb-6">
                VP
              </div>

              <div className="space-y-1 mb-6">
                <span className="text-[11px] font-black uppercase text-primary tracking-widest block">Founder &amp; Principal Consultant</span>
                <h3 className="text-3xl font-black text-slate-900">Vamshi Polishetti</h3>
                <p className="text-sm font-semibold text-slate-500">Hitech City, Hyderabad, Telangana</p>
              </div>

              <p className="text-xs leading-relaxed text-slate-600 mb-6">
                Full-stack developer and career branding strategist helping engineers and companies translate technical work into clear, high-converting digital assets.
              </p>

              {/* Direct Channels */}
              <div className="space-y-3 pt-6 border-t border-slate-200/80 text-xs font-semibold text-slate-700">
                <a
                  href="https://www.linkedin.com/in/polishettivamshi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-xs"
                >
                  <Linkedin size={18} className="text-[#0A66C2]" />
                  <span>Connect on LinkedIn (Vamshi Polishetti)</span>
                </a>

                <a
                  href="tel:+919000859695"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-xs"
                >
                  <Phone size={18} className="text-green-600" />
                  <span>+91 9000859695 (Direct Call / WhatsApp)</span>
                </a>

                <a
                  href="mailto:smartscaletechforyou@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-xs"
                >
                  <Mail size={18} className="text-primary" />
                  <span>smartscaletechforyou@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={14} /> The Story Behind SmartScaleTech
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              We Bridge The Gap Between <span className="text-primary">Technical Skill</span> and <span className="text-primary">Getting Hired</span>.
            </h2>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed font-normal">
              <p>
                In Hyderabad’s bustling tech corridor across Hitech City, Gachibowli, and Madhapur, hundreds of thousands of talented developers, freshers, and professionals apply to jobs every day.
              </p>
              <p>
                Yet, most applications are rejected within seconds—not because the candidate is unqualified, but because automated Applicant Tracking Systems (ATS) cannot parse their format, or their bullet points read like passive job descriptions rather than high-impact achievements.
              </p>
              <p>
                At SmartScaleTech, we take an engineering approach to personal branding and web presence. Whether crafting an ATS resume, building an animated developer portfolio, or launching a full-stack business web app, every project is built from scratch with modern standards and zero fluff.
              </p>
            </div>

            {/* Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Direct 1-on-1 Attention</p>
                  <p className="text-slate-500 mt-0.5">You talk directly to the builder and writer, not an outsourced call centre.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Transparent Pricing</p>
                  <p className="text-slate-500 mt-0.5">Fixed packages starting at ₹999 with zero hidden charges or surprise upsells.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20would%20like%20to%20discuss%20a%20project%2Fresume%20with%20SmartScaleTech."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="h-13 px-7 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-500/20">
                  <MessageCircle size={18} className="mr-2" /> Message Vamshi on WhatsApp
                </Button>
              </a>
              <a href="#pricing">
                <Button variant="outline" className="h-13 px-7 rounded-xl border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50">
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
