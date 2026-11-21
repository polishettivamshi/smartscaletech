import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Star, Users, Zap, Briefcase, TrendingUp, CheckCircle2, Linkedin, Search, User, Eye } from 'lucide-react';
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
              <span className="block text-2xl sm:text-3xl font-bold text-slate-500 tracking-normal mt-1 mb-2">(SmartScaleTech)</span>
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
              <strong className="text-slate-900">Build your website. Build your career.</strong> Smart Scale Tech (SmartScaleTech) helps businesses and job seekers in Hitech City, Hyderabad create a powerful digital presence that bypasses algorithms and generates real-world results.
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
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Zap size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-slate-900 truncate">5 Mins</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Reply Time</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-slate-900 truncate">100%</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">ATS Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                  <Briefcase size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-slate-900 truncate">Hitech City</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Hyderabad HQ</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Users size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-slate-900 truncate">1-on-1</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Direct Founder</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Visuals */}
          <div className="relative flex-1 w-full max-w-2xl lg:ml-10 min-h-[500px] lg:min-h-[600px] mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full min-h-[460px] lg:min-h-[560px] flex items-center justify-center"
            >
              <div className="relative h-full min-h-[440px] w-full flex items-center justify-center p-8 bg-linear-to-br from-indigo-50/70 via-slate-50 to-blue-50/50 rounded-3xl border border-slate-100 shadow-2xl overflow-hidden">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />
              </div>
              
              {/* Floating Platforms Card (Top) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 sm:top-4 w-52 sm:w-72 bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border border-slate-50 z-30">
                
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <p className="text-[10px] sm:text-sm font-bold text-slate-900">Profile Performance</p>
                  <div className="flex gap-0.5 sm:gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={8} className="text-amber-400 fill-amber-400" />)}
                  </div>
                </div>

                {/* Main Icon Container - This controls the gap for all three */}
                <div className="flex gap-2 sm:gap-4">
                  
                  {/* LinkedIn */}
                  <div className="flex-1 aspect-square rounded-lg sm:rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Linkedin size={20} className="text-slate-700" />
                  </div>

                  {/* Indeed */}
                  <div className="flex-1 aspect-square rounded-lg sm:rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Search size={20} className="text-slate-700" />
                  </div>

                  {/* Naukri */}
                  <div className="flex-1 aspect-square rounded-lg sm:rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <img
                      src={naukriLogo}
                      alt="Naukri"
                      className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                    />
                  </div>

                </div>

                <p className="text-[7px] sm:text-[10px] text-slate-500 mt-3 sm:mt-4 text-center lowercase">
                  Optimized for LinkedIn, Indeed & Naukri
                </p>
              </motion.div>

              {/* Floating Projects Card (Mid-Left) */}
              <motion.div 
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[45%] -left-4 sm:left-0 w-40 sm:w-56 bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border border-slate-50 z-40"
              >
                <p className="text-[9px] sm:text-xs text-slate-500 mb-1">Successful Projects</p>
                <p className="text-xl sm:text-3xl font-black text-slate-900">20+</p>
                <div className="flex mt-3 sm:mt-4 gap-1">
                   {[1,2,3,4,5].map(i => <div key={i} className="h-1 sm:h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-primary w-2/3" /></div>)}
                </div>
              </motion.div>

              {/* Floating Profile Card (Mid-Right) */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-4 sm:right-0 w-44 sm:w-64 bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border border-slate-50 z-20"
              >
                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                     <User size={24} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-sm font-bold text-slate-900 leading-tight">Profile Score</p>
                    <p className="text-[7px] sm:text-[10px] text-slate-400 uppercase font-black">Top Ranked</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[9px] sm:text-xs text-slate-500 mb-1">Your Growth</p>
                     <p className="text-lg sm:text-2xl font-black text-primary">98%</p>
                   </div>
                   <div className="h-8 w-8 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-primary text-white">
                      <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px]" />
                   </div>
                </div>
              </motion.div>

              {/* Zap Icon with Glow (Bottom Center) */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 sm:h-16 sm:w-16 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/50 cursor-pointer hover:scale-110 transition-transform">
                     <Zap size={28} fill="currentColor" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
