import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check, MessageCircle, Clock, SlidersHorizontal, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { BookingModal } from './BookingModal';
import { PaymentModal } from './PaymentModal';

const plans = [
  {
    name: "Career Starter",
    scope: "Resume, LinkedIn & Job Portals",
    support: "1-on-1 WhatsApp Support",
    originalSubtotal: "1,896",
    oneTimePrice: "1,500",
    bundleNote: "21% Bundle Savings · Save ₹396",
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
    originalSubtotal: "3,396",
    oneTimePrice: "3,000",
    bundleNote: "12% Bundle Savings · Save ₹396",
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
    originalSubtotal: "6,998",
    oneTimePrice: "6,000",
    bundleNote: "14% Bundle Savings · Save ₹998",
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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentPlan, setPaymentPlan] = useState<{ name: string; amount: string } | null>(null);
  const [trackFilter, setTrackFilter] = useState<'all' | 'job-seekers' | 'business'>('all');

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  const visiblePlans = plans.filter((plan) => {
    if (trackFilter === 'all') return true;
    if (trackFilter === 'job-seekers') return plan.name !== 'Business Web';
    return plan.name !== 'Career Starter';
  });

  return (
    <section
      id="pricing"
      className="relative py-24 bg-linear-to-b from-indigo-50/75 via-white to-slate-50 border-y border-indigo-100/80 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[44rem] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-[11px] font-black uppercase tracking-widest mb-4 shadow-xs">
            <Sparkles size={13} className="text-amber-600" /> Ready-to-Grab Bundle Pricing · Save Up to ₹998
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Simple, Round-Figure <span className="text-primary">Bundle Pricing</span>
          </h2>
          <p className="text-slate-700 font-semibold text-base mb-6">
            One-Time Payment • Zero Hidden Charges • Built-In Bundle Discounts
          </p>

          {/* Audience Switcher */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs mb-5">
            {[
              { id: 'all' as const, label: 'All Packages' },
              { id: 'job-seekers' as const, label: 'For Job Seekers' },
              { id: 'business' as const, label: 'For Businesses & Projects' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTrackFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  trackFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="block">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200/80 rounded-full text-xs font-semibold text-indigo-900 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Want to pick only specific services?</span>
              <Link
                to="/custom-package-builder"
                className="text-primary hover:text-primary-dark font-black underline underline-offset-2 ml-1 inline-flex items-center gap-1"
              >
                <SlidersHorizontal size={12} /> Build Your Own Bundle (Save up to 20%) →
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-8 items-stretch pt-4 ${
            visiblePlans.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'
          }`}
        >
          {visiblePlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 sm:p-10 rounded-[36px] flex flex-col h-full transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 text-white border-2 border-primary ring-4 ring-primary/20 shadow-2xl shadow-primary/25 md:-translate-y-2'
                  : 'bg-white text-slate-900 border-2 border-slate-200/90 hover:border-primary/50 shadow-xl shadow-slate-200/60'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-amber-400 to-orange-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles size={12} /> Most Popular Bundle
                </div>
              )}

              <div className="text-center mb-6">
                <span
                  className={`text-[11px] font-black uppercase tracking-widest block mb-1.5 ${
                    plan.popular ? 'text-indigo-300' : 'text-primary'
                  }`}
                >
                  {plan.scope}
                </span>
                <h3
                  className={`text-2xl font-black uppercase tracking-wide ${
                    plan.popular ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {plan.name}
                </h3>

                {/* Highlighted Price Box */}
                <div
                  className={`mt-5 rounded-2xl p-5 border ${
                    plan.popular
                      ? 'bg-white/10 border-white/15'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-baseline justify-center gap-2.5">
                    <span
                      className={`text-lg font-bold line-through ${
                        plan.popular ? 'text-slate-400' : 'text-slate-400'
                      }`}
                    >
                      ₹{plan.originalSubtotal}
                    </span>
                    <span
                      className={`text-5xl font-black tracking-tight ${
                        plan.popular ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      ₹{plan.oneTimePrice}
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-black ${
                        plan.popular
                          ? 'bg-emerald-400/20 border border-emerald-400/40 text-emerald-300'
                          : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      }`}
                    >
                      {plan.bundleNote}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.popular
                          ? 'bg-emerald-400/20 text-emerald-300'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        plan.popular ? 'text-slate-100' : 'text-slate-700'
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                <Button
                  onClick={() =>
                    setPaymentPlan({
                      name: plan.name,
                      amount: plan.oneTimePrice,
                    })
                  }
                  className={`w-full h-12 rounded-xl font-black text-sm shadow-lg transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/25'
                      : 'bg-primary hover:bg-primary-dark text-white shadow-primary/20'
                  }`}
                >
                  <Zap size={15} className="mr-1.5" />
                  Grab {plan.name} · ₹{plan.oneTimePrice}
                </Button>

                <Button
                  onClick={() => handleSelectPlan(plan.name)}
                  variant="outline"
                  className={`w-full h-11 rounded-xl font-bold text-xs cursor-pointer ${
                    plan.popular
                      ? 'border-white/25 text-white hover:bg-white/10'
                      : 'border-green-300 text-green-700 hover:bg-green-50'
                  }`}
                >
                  <MessageCircle
                    size={16}
                    className={`mr-1.5 ${plan.popular ? 'text-emerald-400' : 'text-green-600'}`}
                  />
                  Chat &amp; Custom Scope
                </Button>
              </div>
              <div
                className={`flex items-center justify-center gap-2 text-[11px] font-bold mt-4 pt-4 border-t ${
                  plan.popular
                    ? 'text-slate-300 border-white/10'
                    : 'text-slate-500 border-slate-100'
                }`}
              >
                <Clock size={14} className={plan.popular ? 'text-emerald-400' : 'text-green-500'} />
                Reply within 5 minutes · Direct founder support
              </div>
            </motion.div>
          ))}
        </div>

        {/* Confidence & Payment Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-emerald-600" /> 100% One-Time Payment
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check size={15} className="text-primary" /> Pay via UPI (GPay / PhonePe / Paytm)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={15} className="text-emerald-600" /> Starts Immediately After Booking
          </span>
        </div>

        {/* Custom Bundle Estimator Banner */}
        <div className="mt-10 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Flexible Pick-and-Mix Calculator
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Only need ATS Resume + Naukri, or Web Dev + SEO?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Use our interactive Custom Bundle Builder to select exact services and unlock automatic 10%–20% bundle discounts.
            </p>
          </div>
          <Link to="/custom-package-builder" className="shrink-0">
            <Button className="h-12 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg">
              Open Bundle Builder <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </Link>
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
        amount={paymentPlan?.amount || '1500'}
      />
    </section>
  );
};

