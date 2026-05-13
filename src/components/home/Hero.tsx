import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { ArrowRight, Star, Users, Zap, Briefcase, TrendingUp, CheckCircle2 } from 'lucide-react';
import naukriLogo from '/images/naukri_logo.jpg';

export const Hero = () => {
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
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Digital Branding Agency</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-black tracking-tight text-slate-900 sm:text-6xl md:text-7xl leading-[1.2]"
            >
              <span className="block whitespace-nowrap">
                Build Your <span className="text-primary">Website.</span>
              </span>
              <span className="block whitespace-nowrap">
                Build Your <span className="text-accent">Career.</span>
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto lg:mx-0"
            >
              We help businesses and job seekers create a powerful digital presence that bypasses algorithms and generates real-world results.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a href="#pricing">
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary-dark shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
                  Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all hover:-translate-y-1">
                  View Services
                </Button>
              </a>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary/5 text-primary">
                  <Users size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-slate-900 truncate">10+</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Happy Clients</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Star size={20} fill="currentColor" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-slate-900 truncate">4.9/5★</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Client Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                  <Briefcase size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-slate-900 truncate">1+</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Years Exp.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                  <CheckCircle2 size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-slate-900 truncate">100%</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Satisfaction</p>
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
              className="relative w-full h-full flex items-center justify-center"
            >
              <IndiaMapVisualization />
              
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
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>

                  {/* Indeed */}
                  <div className="flex-1 aspect-square rounded-lg sm:rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <img
                      src="https://images.icon-icons.com/2389/PNG/512/indeed_logo_icon_145170.png"
                      alt="Indeed"
                      className="h-4 w-4 sm:h-6 sm:w-6"
                    />
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
                <p className="text-xl sm:text-3xl font-black text-slate-900">10+</p>
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
                  <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-slate-100">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
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

const IndiaMapVisualization = () => {
  // More accurate simplified path for India
  return (
    <div className="relative h-full w-full flex items-center justify-center p-8 bg-blue-50/30 rounded-3xl backdrop-blur-sm border border-blue-100/50 shadow-2xl overflow-hidden">
      <svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full opacity-40 drop-shadow-md"
      >
        <path
          d="M246,13.6c-4.4,0-8.8,3.3-11.4,7.4c-2.4,3.7-4.8,7.4-7.2,11.1c-2.4,3.7-4.8,11.4-8.8,15.1c-3.1,2.9-7.9,2.9-11.4,5.4c-3.4,2.5-6.8,5.1-10.3,7.6c-3.4,2.6-6.9,5.2-10.4,7.8c-3.5,2.6-7,8.2-10.5,10.8c-2.6,2-6.5,2-9.1,4c-1.8,1.4-3.5,2.9-5.3,4.3c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-4.4,11-8.7,21.9-13.1,32.9c-2.7,6.8-5.3,13.6-8,20.4c-2.7,6.8-5.3,13.7-8,20.5c-2.7,6.8-5.3,13.7-8,20.5c-1.3,3.3-2.6,6.6-3.9,9.9c-0.6,1.6-1.3,3.3-1.9,4.9c-0.6,1.6-1.3,3.3-1.9,4.9c-2,5-4.1,10.1-6.1,15.1c-2,5-4.1,10.1-6.1,15.1c-1.4,3.5-2.8,7-4.2,10.5c-2.2,5.2-4.4,10.5-6.6,15.7c-3.1,7.4-6.3,14.8-9.4,22.2c-3.1,7.4-6.3,14.8-9.4,22.2c-0.9,2.2-1.9,4.4-2.8,6.6c0,4.4,3.3,8.8,7.4,11.4c3.7,2.4,7.4,4.8,11.1,7.2c3.7,2.4,11.4,4.8,15.1,8.8c2.9,3.1,2.9,7.9,5.4,11.4c2.5,3.4,5.1,6.8,7.6,10.3c2.6,3.4,5.2,6.9,7.8,10.4c2.6,3.5,8.2,7,10.8,10.5c2,2.6,2,6.5,4,9.1c1.4,1.8,2.9,3.5,4.3,5.3c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c11,4.4,21.9,8.7,32.9,13.1c6.8,2.7,13.6,5.3,20.4,8c6.8,2.7,13.7,5.3,20.5,8c6.8,2.7,13.7,5.3,20.5,8c3.3,1.3,6.6,2.6,9.9,3.9c0.7,0.3,1.3,0.6,2,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c23.6,9.6,47.3,19.3,70.9,28.9c3.1,1.3,6.3,2.5,9.4,3.8l0.9,4.4l4.4,0.9c3.1,0.6,6.2,1.2,9.3,1.8c3.1,0.6,6.2,1.2,9.3,1.8c3.1,0.6,6.2,1.2,9.3,1.8c0.8,0.2,1.7,0.3,2.5,0.5l4.4,0.9c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c21.8,4.4,43.7,8.7,65.5,13.1c11.1,2.2,22.2,4.4,33.3,6.7c11.1,2.2,22.2,4.4,33.3,6.7c11.1,2.2,22.2,4.4,33.3,6.7c1.7,0.3,3.3,0.7,5,1h1c0-0.7,0-1.3,0-2c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-1.1-16.1-2.2-32.3-3.3-48.4c-0.6-8.1-1.1-16.1-1.7-24.2c-0.6-8.1-1.1-16.1-1.7-24.2c-0.6-8.1-1.1-16.1-1.7-24.2c-0.3-4-0.6-8.1-0.9-12.1c-0.2-2-0.3-4-0.5-6.1c-0.2-2-0.3-4-0.5-6.1c-1.2-15.1-2.4-30.3-3.6-45.4c-1.2-15.1-2.4-30.3-3.6-45.4c-0.8-10.6-1.7-21.2-2.5-31.8c-1.3-15.7-2.6-31.5-3.9-47.2c-1.9-22.2-3.7-44.5-5.6-66.7c-1.9-22.2-3.7-44.5-5.6-66.7c-0.5-6.6-1.1-13.1-1.7-19.7c0-4.4-3.3-8.8-7.4-11.4c-3.7-2.4-7.4-4.8-11.1-7.2c-3.7-2.4-11.4-4.8-15.1-8.8c-2.9-3.1-2.9-7.9-5.4-11.4c-2.5-3.4-5.1-6.8-7.6-10.3c-2.6-3.4-5.2-6.9-7.8-10.4c-2.6-3.5-8.2-7-10.8-10.5c-2-2.6-2-6.5-4-9.1c-1.4-1.8-2.9-3.5-4.3-5.3c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-11-4.4-21.9-8.7-32.9-13.1c-6.8-2.7-13.6-5.3-20.4-8c-6.8-2.7-13.7-5.3-20.5-8c-6.8-2.7-13.7-5.3-20.5-8c-3.3-1.3-6.6-2.6-9.9-3.9c-1.6-0.6-3.3-1.3-4.9-1.9c-1.6-0.6-3.3-1.3-4.9-1.9c-5-2-10.1-4.1-15.1-6.1c-5-2-10.1-4.1-15.1-6.1c-3.5-1.4-7-2.8-10.5-4.2c-5.2-2.2-10.5-4.4-15.7-6.6c-7.4-3.1-14.8-6.3-22.2-9.4c-7.4-3.1-14.8-6.3-22.2-9.4c-2.2-0.9-4.4-1.9-6.6-2.8c0-4.4-3.3-8.8-7.4-11.4c-3.7-2.4-7.4-4.8-11.1-7.2c-3.7-2.4-11.4-4.8-15.1-8.8c-3.1-2.9-7.9-2.9-11.4-5.4c-3.4-2.5-6.8-5.1-10.3-7.6c-3.4-2.6-6.9-5.2-10.4-7.8c-3.5-2.6-7-8.2-10.5-10.8c-2.6-2-6.5-2-9.1-4c-1.8-1.4-3.5-2.9-5.3-4.3c-1.8-1.4-3.6-2.8-5.4-4.2c-1.8-1.4-3.6-2.8-5.4-4.2c-1.8-1.4-3.6-2.8-5.4-4.2l-0.5,0.5c0,1,0,2.1,0,3.1c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c1.1,31.7,2.2,63.4,3.3,95.1c0.6,15.9,1.1,31.7,1.7,47.6c0.6,15.9,1.1,31.7,1.7,47.6c0.6,15.9,1.1,31.7,1.7,47.6c0.3,7.9,0.6,15.9,0.9,23.8c0.2,4,0.3,7.9,0.5,11.9c0.2,4,0.3,7.9,0.5,11.9c1.2,29.7,2.4,59.4,3.6,89c1.2,29.7,2.4,59.4,3.6,89c0.8,20.8,1.7,41.6,2.5,62.4c1.3,30.8,2.6,61.7,3.9,92.5c1.9,43.6,3.7,87.2,5.6,130.8c1.9,43.6,3.7,87.2,5.6,131l0.5,0.5c4.4,0,8.8-3.3,11.4-7.4c2.4-3.7,4.8-7.4,7.2-11.1c2.4-3.7,4.8-11.4,8.8-15.1c3.1-2.9,7.9-2.9,11.4-5.4c3.4-2.5,6.8-5.1,10.3-7.6c3.4-2.6,6.9-5.2,10.4-7.8c3.5-2.6,7-8.2,10.5-10.8c2.6-2,6.5-2,9.1-4c1.8-1.4,3.5-2.9,5.3-4.3c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c0.6-1.4,1.1-2.8,1.7-4.2c0.6-1.4,1.1-2.8,1.7-4.2"
          fill="#3b82f6"
        />
      </svg>
      {/* Markers */}
      <div className="absolute inset-0">
         <ProfileMarker top="20%" left="50%" name="Rahul Verma" />
         <ProfileMarker top="45%" left="65%" name="Sneha Reddy" />
         <ProfileMarker top="60%" left="40%" name="Vasantha P" />
         <ProfileMarker top="30%" left="35%" name="Kiran Kumar" />
         <ProfileMarker top="75%" left="55%" name="Vamshi P" />
      </div>
    </div>
  );
};

const ProfileMarker = ({ top, left, name }: { top: string; left: string; name: string }) => (
  <motion.div 
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: Math.random() * 2 }}
    style={{ top, left }}
    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
  >
    <div className="relative">
      <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-blue-100 shadow-lg ring-2 ring-blue-500/20 transition-transform group-hover:scale-110">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-900 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
        {name}
      </div>
    </div>
  </motion.div>
);
