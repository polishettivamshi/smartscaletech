import { motion, AnimatePresence } from 'motion/react';
import { Check, MessageCircle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { BookingModal } from './BookingModal';
import { PaymentModal } from './PaymentModal';

const plans = [
  {
    name: "Career Starter",
    scope: "Resume, LinkedIn & Job Portals",
    support: "1-on-1 WhatsApp Support",
    oneTimePrice: "999",
    monthlyPrice: "499",
    features: [
      "Role-Specific ATS Resume (Word + PDF)",
      "LinkedIn Profile & Headline Re-write",
      "Naukri & Job Portal Keyword Setup",
      "GitHub Profile Readme & Structure",
      "Unlimited Revisions until Interview-Ready",
      "Direct 1-on-1 Support (Reply in 5 Mins)",
      "24-48 Hours Fast Turnaround"
    ],
    popular: false
  },
  {
    name: "Portfolio Launch",
    scope: "Website + Career Branding Bundle",
    support: "Direct Developer & Founder Support",
    oneTimePrice: "2,999",
    monthlyPrice: "1,999",
    features: [
      "Custom Animated Portfolio Website",
      "Full ATS Resume Writing Included",
      "LinkedIn & GitHub Bio & Repo Setup",
      "Free Cloud Deployment Setup (₹0/mo Server)",
      "Google SEO & Schema Structured Data",
      "Full Source Code Handover & Walkthrough",
      "Direct Founder Support (Reply in 5 Mins)"
    ],
    popular: true
  },
  {
    name: "Business Web",
    scope: "Full-Stack Company Web Presence",
    support: "30 Days Post-Launch Support",
    oneTimePrice: "5,999",
    monthlyPrice: "2,999",
    features: [
      "5 Custom Designed Responsive Pages",
      "WhatsApp Lead Capture & Inquiry Forms",
      "Google Search Console & Maps Setup",
      "Performance Audit (Sub-2s Fast Load)",
      "Free Cloud Hosting Setup (No Server Fees)",
      "30 Days Dedicated Maintenance & Support",
      "Priority WhatsApp & Call (Reply in 5 Mins)"
    ],
    popular: false
  }
];

export const Pricing = () => {
  const [billing, setBilling] = useState<'monthly' | 'one-time'>('one-time');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentPlan, setPaymentPlan] = useState<{ name: string; amount: string } | null>(null);

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

              <div className="space-y-2.5">
                <Button
                  onClick={() =>
                    setPaymentPlan({
                      name: plan.name,
                      amount: billing === 'one-time' ? plan.oneTimePrice : plan.monthlyPrice,
                    })
                  }
                  className={`w-full h-12 rounded-xl font-bold text-sm shadow-md transition-all ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Pay Now / Book with Advance
                </Button>

                <Button
                  onClick={() => handleSelectPlan(plan.name)}
                  variant="outline"
                  className="w-full h-12 rounded-xl font-bold text-xs border-green-300 text-green-700 hover:bg-green-50"
                >
                  <MessageCircle size={16} className="mr-1.5 text-green-600" />
                  Chat &amp; Custom Scope
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400 mt-4 pt-4 border-t border-slate-100">
                <Clock size={14} className="text-green-500" />
                Reply within 5 minutes · Direct founder support
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={selectedPlan !== null} 
        onClose={() => setSelectedPlan(null)} 
        planName={selectedPlan || ''} 
      />

      <PaymentModal
        isOpen={paymentPlan !== null}
        onClose={() => setPaymentPlan(null)}
        planName={paymentPlan?.name || ''}
        amount={paymentPlan?.amount || '999'}
      />
    </section>
  );
};

