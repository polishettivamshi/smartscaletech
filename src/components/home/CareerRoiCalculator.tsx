import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Calculator, CheckCircle2, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

interface TierData {
  label: string;
  defaultCtc: number;
  expectedHikePercent: number;
  avgCallbackMultiplier: number;
  recommendedService: string;
  recommendedPrice: string;
}

const tiers: Record<string, TierData> = {
  fresher: {
    label: 'Fresher / College Graduate',
    defaultCtc: 3.5,
    expectedHikePercent: 40,
    avgCallbackMultiplier: 4,
    recommendedService: 'Freshers ATS Resume + Project Showcase',
    recommendedPrice: '₹199',
  },
  junior: {
    label: '1 - 3 Years (Junior Developer)',
    defaultCtc: 6.0,
    expectedHikePercent: 35,
    avgCallbackMultiplier: 3.5,
    recommendedService: 'Career Launch Combo (Resume + LinkedIn)',
    recommendedPrice: '₹699',
  },
  mid: {
    label: '3 - 5 Years (Mid-Level Engineer)',
    defaultCtc: 12.0,
    expectedHikePercent: 30,
    avgCallbackMultiplier: 3,
    recommendedService: 'Full Career Suite + Portfolio Website',
    recommendedPrice: '₹999',
  },
  senior: {
    label: '5+ Years (Senior / Tech Lead)',
    defaultCtc: 20.0,
    expectedHikePercent: 25,
    avgCallbackMultiplier: 2.8,
    recommendedService: 'Executive Brand + Complete Digital Footprint',
    recommendedPrice: '₹1,499',
  },
};

export const CareerRoiCalculator = () => {
  const [selectedTier, setSelectedTier] = useState<string>('junior');
  const [currentCtc, setCurrentCtc] = useState<number>(6.0);

  const tier = tiers[selectedTier];
  const annualGainLakhs = (currentCtc * tier.expectedHikePercent) / 100;
  const annualGainRupees = Math.round(annualGainLakhs * 100000);
  const monthlyGainRupees = Math.round(annualGainRupees / 12);
  const numericServicePrice = parseInt(tier.recommendedPrice.replace(/[^0-9]/g, '')) || 699;
  const roiMultiplier = Math.round(annualGainRupees / numericServicePrice);

  const handleTierChange = (key: string) => {
    setSelectedTier(key);
    setCurrentCtc(tiers[key].defaultCtc);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-indigo-300 text-xs font-bold mb-4">
            <Calculator size={14} />
            <span>Interactive Career ROI Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            See How 1 Better Interview Call Pays You Back
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A rejected resume costs you months of delayed income. See the measurable return of upgrading your resume and LinkedIn with SmartScaleTech.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Card */}
          <div className="lg:col-span-6 bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  1. Select Your Experience Level
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {Object.entries(tiers).map(([key, data]) => (
                    <button
                      key={key}
                      onClick={() => handleTierChange(key)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                        selectedTier === key
                          ? 'bg-primary/20 border-primary text-white shadow-md shadow-primary/20'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <p className="text-xs font-bold leading-tight">{data.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. Current Annual CTC (in Lakhs)
                  </label>
                  <span className="text-lg font-black text-emerald-400">
                    ₹{currentCtc.toFixed(1)} LPA
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  step="0.5"
                  value={currentCtc}
                  onChange={(e) => setCurrentCtc(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>₹2 LPA</span>
                  <span>₹15 LPA</span>
                  <span>₹35 LPA</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                  <Sparkles size={15} className="text-amber-400" />
                  <span>Expected Salary Hike: <strong>+{tier.expectedHikePercent}%</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                  <TrendingUp size={15} className="text-emerald-400" />
                  <span>Interview Callback Multiplier: <strong>{tier.avgCallbackMultiplier}x more calls</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>Verified across 250+ tech placements in India</span>
              <span className="text-emerald-400 font-bold">100% Guaranteed ATS Pass</span>
            </div>
          </div>

          {/* Results Showcase Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-primary/30 via-slate-800/90 to-slate-900 rounded-3xl p-6 sm:p-8 border border-primary/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-300">
                  Your Projected Career Gain
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {roiMultiplier}x Estimated ROI
                </span>
              </div>

              {/* Huge Numbers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-700/80">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Annual Salary Hike
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400">
                    +₹{(annualGainRupees / 100000).toFixed(2)} Lakhs
                  </p>
                  <span className="text-[10px] text-slate-400">per year increment</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-700/80">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Monthly In-Hand Gain
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-indigo-300">
                    +₹{monthlyGainRupees.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-slate-400">extra every month</span>
                </div>
              </div>

              {/* Service Recommendation */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-semibold">Recommended Package:</span>
                  <span className="text-sm font-black text-amber-400">{tier.recommendedPrice}</span>
                </div>
                <p className="text-xs font-bold text-white">{tier.recommendedService}</p>
                <p className="text-[11px] text-slate-400">
                  Pay once starting from ₹199 to earn ₹{monthlyGainRupees.toLocaleString('en-IN')} extra each month.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  'Bypass Workday, Taleo, iCIMS, and Naukri algorithmic auto-rejection',
                  'Optimized with quantified achievement metrics (STAR method)',
                  'Direct WhatsApp collaboration with Founder Vamshi until you get hired',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
              <Link to="/request-service" className="w-full">
                <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark font-bold text-xs shadow-lg shadow-primary/30">
                  Claim Career Upgrade <ArrowRight size={14} className="ml-1.5" />
                </Button>
              </Link>
              <a
                href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20used%20the%20ROI%20calculator%20on%20SmartScaleTech%20and%20want%20to%20upgrade%20my%20resume%20and%20LinkedIn."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold text-xs"
                >
                  <MessageCircle size={15} className="mr-1.5 text-emerald-400" />
                  Free WhatsApp Chat
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
