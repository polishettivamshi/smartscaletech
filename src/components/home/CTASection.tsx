import { Button } from '../ui/Button';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-12 bg-white px-4">
      <div className="mx-auto max-w-7xl bg-primary rounded-[40px] p-8 md:p-16 overflow-hidden relative shadow-2xl shadow-primary/20 border border-transparent">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
           <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1]">Ready to transform your digital presence with SmartScaleTech?</h2>
              <p className="text-white/90 font-bold text-lg">Join 20+ professionals already winning with SmartScaleTech's ATS resume, LinkedIn optimization, and web development solutions.</p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%0A%0AI%27m%20interested%20in%20your%20services.%0A%0AService%20Required%3A%0A%5BATS%20Resume%20%2F%20LinkedIn%20Optimization%20%2F%20Portfolio%20%2F%20Website%20%2F%20Other%5D%0A%0AName%3A%0AEmail%3A%0APhone%3A%0A%0ACurrent%20Role%2FBusiness%3A%0A%0AMy%20Requirement%3A%0A%0APreferred%20Time%20for%20Discussion%3A%0A%0APlease%20get%20in%20touch%20with%20me." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full h-14 px-10 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-green-500/30">
                   <MessageCircle className="mr-2 h-4 w-4" /> Chat Now
                </Button>
              </a>
              <a href="#pricing" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-14 px-10 rounded-2xl bg-white border-0 text-primary hover:bg-slate-50 font-black uppercase tracking-widest text-xs">
                   View Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#portfolio" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-14 px-10 rounded-2xl border-white/30 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs">
                   Our Portfolio
                </Button>
              </a>
           </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-full w-1/3 bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 h-32 w-32 bg-primary-dark/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};

