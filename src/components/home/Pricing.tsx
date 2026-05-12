import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { BookingModal } from './BookingModal';

const plans = [
  {
    name: "Career Starter",
    oneTimePrice: "999",
    monthlyPrice: "199",
    features: [
      "ATS Resume Writing",
      "LinkedIn Optimization",
      "Naukri Profile Setup",
      "GitHub Optimization",
      "Job Search Guide"
    ],
    popular: false
  },
  {
    name: "Portfolio Launch",
    oneTimePrice: "3,999",
    monthlyPrice: "499",
    features: [
      "Animated Portfolio Website",
      "ATS Resume Writing",
      "LinkedIn & GitHub Prep",
      "SEO Optimization",
      "1 Year Hosting Incl."
    ],
    popular: true
  },
  {
    name: "Business Web",
    oneTimePrice: "6,999",
    monthlyPrice: "999",
    features: [
      "5 Premium Pages",
      "Custom Lead Forms",
      "SEO & Google Maps",
      "WhatsApp Integration",
      "Performance Audit"
    ],
    popular: false
  }
];

export const Pricing = () => {
  const [billing, setBilling] = useState<'monthly' | 'one-time'>('one-time');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <section id="pricing" className="py-24 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Simple Transparent Pricing</h2>
          <p className="text-slate-700 font-medium mb-10">{billing === 'one-time' ? 'One-time Payment • No Hidden Charges' : 'Flexible Monthly Billing • Cancel Anytime'}</p>

          <div className="inline-flex items-center p-1 bg-slate-100 rounded-2xl shadow-inner relative z-0 mb-4">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative z-10 ${billing === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('one-time')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative z-10 ${billing === 'one-time' ? 'text-white' : 'text-slate-500'}`}
            >
              One-time
            </button>
            <motion.div
              layoutId="activeTab"
              initial={false}
              animate={{ x: billing === 'one-time' ? '100%' : '0%' }}
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-primary rounded-xl shadow-lg -z-0"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          </div>
          <div className="h-6">
            <AnimatePresence mode="wait">
              {billing === 'one-time' && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[10px] font-black uppercase text-primary whitespace-nowrap"
                >
                  Save up to 40% Today • Limited Time
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-10 rounded-[40px] bg-white border ${plan.popular ? 'border-primary ring-1 ring-primary shadow-2xl' : 'border-slate-100 shadow-xl shadow-slate-200/50'} flex flex-col h-full hover:-translate-y-2 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-xl shadow-primary/20">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider">{plan.name}</h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-5xl font-black text-slate-900">
                    ₹{billing === 'one-time' ? plan.oneTimePrice : plan.monthlyPrice}
                  </span>
                  {billing === 'monthly' && <span className="text-slate-400 font-bold self-end mb-1">/mo</span>}
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleSelectPlan(plan.name)}
                variant={plan.popular ? 'default' : 'outline'}
                className={`w-full h-14 rounded-2xl font-bold ${plan.popular ? 'bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                Select Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={selectedPlan !== null} 
        onClose={() => setSelectedPlan(null)} 
        planName={selectedPlan || ''} 
      />
    </section>
  );
};

