import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Linkedin, Mail, MessageCircle, MapPin } from 'lucide-react';
import { SEO } from '../../lib/seo';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Button } from '../ui/Button';

export const AboutPage = () => {
  return (
    <main className="bg-[#F3EEE3] min-h-screen">
      <SEO
        title="About SmartScaleTech (SST) · Hitech City Digital Studio"
        description="SmartScaleTech (SST) is an independent engineering and career solutions studio in Hitech City, Hyderabad founded by Vamshi Polishetti."
        path="/about"
      />

      <section className="pt-12 pb-16 sm:pt-16 border-b border-[#D8D3C9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About Studio' }]} className="mb-7" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E]">
                Independent Digital Studio · Hitech City, Hyderabad
              </p>
              <h1 className="text-hero-display font-extrabold text-[#111111]">
                Built by an engineer, focused on practical execution.
              </h1>
              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
                SmartScaleTech (also searched as Smart Scale Tech or SST) started in Hitech City,
                Hyderabad with one direct observation: founders overpay for slow website templates,
                and skilled engineers lose interviews because generic agencies rewrite their resumes
                without understanding software stacks.
              </p>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                We operate as a lean, direct-consultation studio led by founder Vamshi Polishetti.
                When you work with us on a business website, AI workflow integration, or technical
                career makeover, you speak directly with the engineer scoping and shipping the work—no
                account-manager layers and no outsourced template factories.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white border border-[#D8D3C9] rounded-xl p-5">
                  <CheckCircle2 size={18} className="text-[#16845B] mb-2" />
                  <h2 className="text-sm font-extrabold text-[#111111]">Direct Engineering Input</h2>
                  <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                    Technical stacks, keyword matrices, and UI decisions come from real software
                    development practice.
                  </p>
                </div>
                <div className="bg-white border border-[#D8D3C9] rounded-xl p-5">
                  <CheckCircle2 size={18} className="text-[#D9541E] mb-2" />
                  <h2 className="text-sm font-extrabold text-[#111111]">Honest, Transparent Scope</h2>
                  <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                    Upfront round-figure INR pricing, full code &amp; file ownership, and no
                    inflated ranking or hiring guarantees.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link to="/request-service">
                  <Button variant="primary" size="lg">
                    Start a Project <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/work">
                  <Button variant="secondary" size="lg">
                    Explore Our Work
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#161616] text-white rounded-2xl overflow-hidden border border-[#111111]">
                <div className="aspect-[4/5] bg-[#1D1C1A] overflow-hidden relative">
                  <img
                    src="/assets/aistudio/Mobile_Background_img_Home_22174709.webp"
                    alt="Vamshi Polishetti — Founder of SmartScaleTech"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-xl font-extrabold">Vamshi Polishetti</h2>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E87A4E]">
                        <MapPin size={12} /> Hitech City
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-1">
                      Founder &amp; Principal Consultant · SmartScaleTech (SST)
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/15 text-xs">
                    <a
                      href="https://www.linkedin.com/in/polishettivamshi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Linkedin size={14} /> LinkedIn
                    </a>
                    <a
                      href="https://wa.me/919000859695"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a
                      href="mailto:smartscaletechforyou@gmail.com"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Mail size={14} /> Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
