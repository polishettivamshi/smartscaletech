import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-12 bg-white dark:bg-slate-950 px-4">
      <div className="mx-auto max-w-7xl bg-primary dark:bg-slate-900 rounded-[40px] p-8 md:p-16 overflow-hidden relative shadow-2xl shadow-primary/20 dark:shadow-none border border-transparent dark:border-slate-800">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
           <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1]">Ready to transform your digital presence?</h2>
              <p className="text-primary-foreground/80 dark:text-slate-400 font-bold text-lg">Join 500+ professionals already winning with our optimized strategies.</p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#pricing" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-14 px-10 rounded-2xl bg-white border-0 text-primary hover:bg-slate-50 font-black uppercase tracking-widest text-xs">
                   Get A Free Quote <ArrowRight className="ml-2 h-4 w-4" />
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
        <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-white/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 h-32 w-32 bg-primary-dark/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};

