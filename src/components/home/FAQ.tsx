import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Send, HelpCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

const faqs = [
  {
    q: "What is an ATS-friendly resume?",
    a: "It is a resume that is structured and keyword-optimized to pass through Applicant Tracking Systems used by 90% of Fortune 500 companies."
  },
  {
    q: "How long does it take to complete an order?",
    a: "Usually, we deliver the first draft within 3-5 business days depending on the package selected."
  },
  {
    q: "Do you offer revisions?",
    a: "Yes, all our packages include unlimited revisions until you are 100% satisfied with the result."
  },
  {
    q: "Will my information be kept confidential?",
    a: "Absolutely. We follow strict data protection policies and never share your details with third parties."
  },
  {
    q: "Do you build custom websites?",
    a: "Yes, we specialize in custom web applications, SaaS platforms, and professional portfolios tailored to your specific needs."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-page">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="flex w-full items-center justify-between py-6 text-left"
                  >
                    <span className={`text-sm font-bold transition-colors ${openIndex === idx ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                      {faq.q}
                    </span>
                    <div className={`h-6 w-6 rounded-lg flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-primary/5 text-primary' : 'text-slate-300'}`}>
                      {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 sticky top-32">
               <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Have more questions?</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">We're here to help you succeed!</p>
               </div>
               
               <div className="relative mb-8">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 bg-primary/10 rounded-full blur-3xl" />
                  <div className="relative h-48 w-full flex items-center justify-center">
                     <div className="h-40 w-40 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-50 dark:border-slate-700 flex items-center justify-center text-primary relative translate-x-4 rotate-6">
                        <HelpCircle size={64} fill="currentColor" fillOpacity={0.1} />
                     </div>
                     <div className="absolute h-32 w-32 bg-primary rounded-3xl shadow-2xl flex items-center justify-center text-white -translate-x-4 -rotate-12">
                        <Send size={48} />
                     </div>
                  </div>
               </div>

               <a href="#contact">
                 <Button className="w-full h-12 rounded-2xl bg-primary hover:bg-primary-dark font-bold shadow-lg shadow-primary/20">
                   Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
