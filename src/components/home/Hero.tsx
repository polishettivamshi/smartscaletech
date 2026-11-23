import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Star, Users, Zap, Briefcase, TrendingUp, CheckCircle2, Linkedin, Globe, Code2, Eye, ShieldCheck } from 'lucide-react';
import naukriLogo from '/images/naukri_logo.webp';

interface HeroProps {
  onOpenSamples?: () => void;
}

export const Hero = ({ onOpenSamples }: HeroProps = {}) => {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-20 lg:pt-20 lg:pb-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 border border-slate-100 mb-8"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-[10px] font-bold">#1</span>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ATS Resume Writing &amp; Web Development Agency in Hyderabad</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-black tracking-tight text-slate-900 sm:text-6xl md:text-7xl leading-[1.2]"
            >
              <span className="block text-primary">Smart Scale Tech</span>
              <span className="block text-2xl sm:text-3xl font-bold text-slate-500 tracking-normal mt-1 mb-2">(SmartScaleTech · SST)</span>
              <span className="block">ATS Resume Writing</span>
              <span className="block">&amp; Web Development</span>
              <span className="block text-2xl sm:text-4xl md:text-5xl text-slate-900 mt-3">in Hyderabad, India</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto lg:mx-0"
            >
              <strong className="text-slate-900">Build your website. Build your career.</strong> Smart Scale Tech (SST / SmartScaleTech) helps businesses and job seekers in Hitech City, Hyderabad create a powerful digital presence that bypasses algorithms and generates real-world results.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base leading-relaxed text-slate-500 max-w-2xl mx-auto lg:mx-0"
            >
              We offer ATS resume writing, LinkedIn optimization, UI/UX design, web development, and personal portfolio websites for clients in Hitech City, Hyderabad and across India.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Link to="/free-ats-resume-checker">
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-indigo-700 hover:from-primary/90 hover:to-indigo-800 text-white shadow-xl shadow-primary/25 transition-all hover:-translate-y-1 font-bold">
                  ⚡ Check ATS Score Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%0A%0AI%27m%20interested%20in%20your%20services.%0A%0AService%20Required%3A%0A%5BATS%20Resume%20%2F%20LinkedIn%20Optimization%20%2F%20Portfolio%20%2F%20Website%20%2F%20Other%5D%0A%0AName%3A%0AEmail%3A%0APhone%3A%0A%0ACurrent%20Role%2FBusiness%3A%0A%0AMy%20Requirement%3A%0A%0APreferred%20Time%20for%20Discussion%3A%0A%0APlease%20get%20in%20touch%20with%20me." target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/20 transition-all hover:-translate-y-1">
                  📞 WhatsApp Consultation
                </Button>
              </a>
              <a href="#pricing">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 transition-all hover:-translate-y-1">
                  View Packages
                </Button>
              </a>
            </motion.div>

            {/* Quick value trigger */}
            {onOpenSamples && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              >
                <button
                  type="button"
                  onClick={onOpenSamples}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs"
                >
                  <Eye size={14} className="text-primary" />
                  <span>Preview Real Work Samples (97/100 ATS)</span>
                </button>
              </motion.div>
            )}
            
            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 text-left"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">5 Mins</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-snug mt-0.5">Reply Time</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">100%</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-snug mt-0.5">ATS Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">Hitech City</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-snug mt-0.5">Hyderabad HQ</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">1-on-1</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-snug mt-0.5">Direct Founder</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Visuals */}
          <div className="relative flex-1 w-full max-w-2xl lg:ml-10 min-h-[520px] sm:min-h-[550px] lg:min-h-[600px] mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full min-h-[520px] sm:min-h-[550px] lg:min-h-[580px] flex items-center justify-center"
            >
              <div className="relative h-full min-h-[500px] sm:min-h-[530px] w-full flex items-center justify-center p-8 bg-linear-to-br from-indigo-50/70 via-slate-50 to-blue-50/50 rounded-3xl border border-slate-100 shadow-2xl overflow-hidden">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />
              </div>
              
              {/* Floating Multi-Platform Card (Top) */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 sm:top-5 w-64 sm:w-80 bg-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-100 z-30"
              >
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <p className="text-[11px] sm:text-sm font-bold text-slate-900">Multi-Platform Optimization</p>
                  <div className="flex items-center gap-0.5 shrink-0" aria-label="Rated 5 out of 5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
                  </div>
                </div>

                {/* 4-Platform Grid: LinkedIn, Naukri, Indeed, Web & SEO */}
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                  {/* LinkedIn */}
                  <div className="rounded-xl bg-slate-50 py-2.5 px-1 flex flex-col items-center justify-center border border-slate-100">
                    <Linkedin size={18} className="text-[#0A66C2]" />
                    <span className="mt-1 text-[9px] sm:text-[10px] font-bold text-slate-700">LinkedIn</span>
                  </div>

                  {/* Naukri */}
                  <div className="rounded-xl bg-slate-50 py-2.5 px-1 flex flex-col items-center justify-center border border-slate-100">
                    <img
                      src={naukriLogo}
                      alt="Naukri"
                      referrerPolicy="no-referrer"
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                    <span className="mt-1 text-[9px] sm:text-[10px] font-bold text-slate-700">Naukri</span>
                  </div>

                  {/* Indeed */}
                  <div className="rounded-xl bg-slate-50 py-2.5 px-1 flex flex-col items-center justify-center border border-slate-100">
                    <Globe size={18} className="text-indigo-600" />
                    <span className="mt-1 text-[9px] sm:text-[10px] font-bold text-slate-700">Indeed</span>
                  </div>

                  {/* Web & SEO */}
                  <div className="rounded-xl bg-slate-50 py-2.5 px-1 flex flex-col items-center justify-center border border-slate-100">
                    <Code2 size={18} className="text-emerald-600" />
                    <span className="mt-1 text-[9px] sm:text-[10px] font-bold text-slate-700">Web/SEO</span>
                  </div>
                </div>

                <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-3 text-center">
                  ATS Job Portals, Portfolios &amp; Google Search Ready
                </p>
              </motion.div>

              {/* Floating Projects & Delivery Card (Mid-Left) */}
              <motion.div 
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[37%] sm:top-[42%] -left-1 sm:left-1 w-[166px] sm:w-60 bg-white p-3.5 sm:p-5 rounded-3xl shadow-2xl border border-slate-100 z-40"
              >
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500">Projects Delivered</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">20+</p>
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-600">24–48 Hrs</span>
                </div>
                <p className="text-[9px] sm:text-[11px] text-slate-500 mt-1">
                  Resumes · Portfolios · Web
                </p>
                <div className="flex mt-3 gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-primary w-4/5" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating ATS Resume Score Card (Mid-Right) */}
              <motion.div 
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[48%] sm:top-[44%] -right-1 sm:right-1 w-[172px] sm:w-64 bg-white p-3.5 sm:p-5 rounded-3xl shadow-2xl border border-slate-100 z-20"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-4">
                  <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} className="text-emerald-600 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-sm font-bold text-slate-900 leading-tight">ATS Resume Score</p>
                    <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5">Verified Standard</p>
                  </div>
                </div>
                <div className="flex justify-between items-end gap-2">
                  <div>
                    <p className="text-[9px] sm:text-xs text-slate-500 mb-0.5">Benchmark Score</p>
                    <p className="text-lg sm:text-2xl font-black text-primary tabular-nums leading-none">97/100</p>
                    <p className="text-[9px] sm:text-[11px] font-semibold text-emerald-600 mt-1.5">+3x Recruiter Views</p>
                  </div>
                  <div className="h-8 w-8 sm:h-11 sm:w-11 flex items-center justify-center rounded-full bg-primary text-white shrink-0">
                    <TrendingUp size={16} />
                  </div>
                </div>
              </motion.div>

              {/* Interactive ATS Score Check Trigger (Bottom Center) */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40">
                <Link
                  to="/free-ats-resume-checker"
                  aria-label="Test your ATS resume score for free"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-primary hover:bg-indigo-700 text-white px-5 py-3 shadow-2xl shadow-primary/40 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
                >
                  <Zap size={17} fill="currentColor" className="shrink-0" />
                  <span className="text-xs sm:text-sm font-bold">Test Your ATS Score Free</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 shrink-0" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
