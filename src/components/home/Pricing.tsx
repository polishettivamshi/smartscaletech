import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, MessageCircle, SlidersHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';
import { BookingModal } from './BookingModal';
import { PaymentModal } from './PaymentModal';
import { OfferPrice } from '../ui/OfferPrice';

const plans = [
  {
    name: 'Career Starter',
    scope: 'Resume, LinkedIn & Job Portals',
    originalSubtotal: '1,046',
    oneTimePrice: '899',
    bundleNote: '14% Bundle Savings · Save ₹147',
    features: [
      'Role-Specific ATS Resume (Word + PDF)',
      'LinkedIn Profile & Headline Rewrite',
      'Naukri & Indeed Keyword Setup',
      'GitHub Profile README & Structure',
      'Unlimited Revisions until Interview-Ready',
      'Direct 1-on-1 Support · 24–48h Turnaround',
    ],
    popular: false,
  },
  {
    name: 'Portfolio Launch',
    scope: 'Website + Career Branding Bundle',
    originalSubtotal: '2,246',
    oneTimePrice: '1,999',
    bundleNote: '11% Bundle Savings · Save ₹247',
    features: [
      'Custom Responsive Portfolio Website',
      'Full ATS Resume Writing Included',
      'LinkedIn & GitHub Bio & Repo Setup',
      'Free Cloud Deployment Setup (₹0/mo Hosting)',
      'Google SEO & Schema Structured Data',
      'Full Source Code Handover & Walkthrough',
    ],
    popular: true,
  },
  {
    name: 'Business Web',
    scope: 'Company Website & Technical SEO',
    originalSubtotal: '5,498',
    oneTimePrice: '4,999',
    bundleNote: '9% Bundle Savings · Save ₹499',
    features: [
      'Up to 5 Custom Designed Responsive Pages',
      'WhatsApp Lead Capture & Inquiry Forms',
      'Google Search Console & Schema Setup',
      'Performance & Mobile-First Engineering',
      'Edge Cloud Hosting Setup (Zero Monthly Lock-in)',
      '30 Days Post-Launch Support & Maintenance',
    ],
    popular: false,
  },
];

export const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentPlan, setPaymentPlan] = useState<{
    name: string;
    amount: string;
    standardAmount: string;
  } | null>(null);
  const [trackFilter, setTrackFilter] = useState<'all' | 'job-seekers' | 'business'>('all');

  const visiblePlans = plans.filter((plan) => {
    if (trackFilter === 'all') return true;
    if (trackFilter === 'job-seekers') return plan.name !== 'Business Web';
    return plan.name !== 'Career Starter';
  });

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-[#F3EEE3] border-b border-[#D8D3C9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Transparent Round-Figure Pricing"
            title="Clear bundle packages."
            highlight="Zero hidden charges."
            description="One-time pricing with built-in multi-service savings, or mix individual Career and Business services in our interactive estimator."
          />

          <div
            role="tablist"
            aria-label="Filter pricing plans by audience"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white border border-[#D8D3C9] self-start lg:self-auto"
          >
            {[
              { id: 'all' as const, label: 'All Bundles' },
              { id: 'job-seekers' as const, label: 'Job Seekers' },
              { id: 'business' as const, label: 'Businesses' },
            ].map((tab) => {
              const active = trackFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTrackFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    active ? 'bg-[#111111] text-white' : 'text-[#57534E] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-6 items-stretch ${
            visiblePlans.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'lg:grid-cols-3'
          }`}
        >
          {visiblePlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative p-7 sm:p-8 rounded-2xl flex flex-col justify-between transition-colors ${
                plan.popular
                  ? 'bg-[#161616] text-white border border-[#111111]'
                  : 'bg-white text-[#111111] border border-[#D8D3C9]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
                      plan.popular ? 'text-[#F06B37]' : 'text-[#D9541E]'
                    }`}
                  >
                    {plan.scope}
                  </span>
                  {plan.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#D9541E] text-white">
                      Recommended
                    </span>
                  )}
                </div>

                <h3
                  className={`text-2xl font-extrabold tracking-tight ${
                    plan.popular ? 'text-white' : 'text-[#111111]'
                  }`}
                >
                  {plan.name}
                </h3>

                <div
                  className={`mt-5 rounded-xl p-5 border ${
                    plan.popular
                      ? 'bg-white/[0.04] border-white/15'
                      : 'bg-[#F3EEE3]/60 border-[#D8D3C9]'
                  }`}
                >
                  <div className="flex items-baseline gap-2.5 tabular-nums">
                    <span
                      className={`text-base font-semibold line-through ${
                        plan.popular ? 'text-white/45' : 'text-[#6B6862]'
                      }`}
                    >
                      ₹{plan.originalSubtotal}
                    </span>
                    <span
                      className={`text-4xl font-extrabold tracking-tight ${
                        plan.popular ? 'text-white' : 'text-[#111111]'
                      }`}
                    >
                      ₹{plan.oneTimePrice}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-xs font-bold ${
                      plan.popular ? 'text-[#34D399]' : 'text-[#16845B]'
                    }`}
                  >
                    {plan.bundleNote}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check
                        size={15}
                        className={`shrink-0 mt-0.5 ${
                          plan.popular ? 'text-[#F06B37]' : 'text-[#D9541E]'
                        }`}
                      />
                      <span className={plan.popular ? 'text-white/85' : 'text-[#57534E]'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-current/10">
                <Button
                  type="button"
                  variant={plan.popular ? 'primary' : 'dark'}
                  className="w-full"
                  onClick={() =>
                    setPaymentPlan({
                      name: plan.name,
                      amount: plan.oneTimePrice,
                      standardAmount: plan.originalSubtotal,
                    })
                  }
                >
                  Book {plan.name} · ₹{plan.oneTimePrice}
                </Button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    plan.popular
                      ? 'border-white/25 text-white hover:bg-white/10'
                      : 'border-[#D8D3C9] text-[#111111] hover:bg-[#F3EEE3]'
                  }`}
                >
                  <MessageCircle size={14} /> Discuss Custom Scope
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Confidence strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
          <div className="flex flex-wrap items-center gap-5 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#16845B]" /> One-time milestone payment
            </span>
            <span>UPI (GPay / PhonePe / Paytm)</span>
            <span className="inline-flex items-center gap-1">
              Need single items from{' '}
              <OfferPrice standardPrice={199} offerPrice={159} startingFrom compact />?
            </span>
          </div>

          <Link
            to="/custom-package-builder"
            className="inline-flex items-center gap-1.5 font-bold text-[#111111] hover:text-[#D9541E] underline underline-offset-4"
          >
            <SlidersHorizontal size={13} /> Open Custom Bundle Builder (Save up to 20%){' '}
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Standalone Custom Quote Banner */}
        <div className="mt-8 rounded-2xl bg-white border border-[#D8D3C9] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D9541E]">
              Custom Pick-and-Mix Estimator
            </p>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] mt-1">
              Need an ATS Resume + Naukri update, or Web Dev + AI Integration?
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1">
              Configure your exact combination across 18 Business and Career services and get an
              instant INR breakdown.
            </p>
          </div>
          <Link to="/custom-package-builder" className="shrink-0">
            <Button variant="primary" size="md">
              Build Custom Bundle <ArrowRight size={15} />
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
        standardAmount={paymentPlan?.standardAmount}
      />
    </section>
  );
};
