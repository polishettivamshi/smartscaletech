import { motion } from 'motion/react';
import { Clock, RefreshCw, Target, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

interface TrustGuaranteeBannerProps {
  onOpenSamples?: () => void;
}

export const TrustGuaranteeBanner = ({ onOpenSamples }: TrustGuaranteeBannerProps) => {
  const guarantees = [
    {
      icon: Clock,
      title: '24-48 Hours Turnaround',
      description: 'Lightning-fast delivery so you never miss an urgent job application deadline.',
      color: 'text-amber-500 bg-amber-50 border-amber-200/60',
    },
    {
      icon: RefreshCw,
      title: 'Free Unlimited Revisions',
      description: 'We edit and refine until you are 100% thrilled with your new resume and profile.',
      color: 'text-primary bg-primary/10 border-primary/20',
    },
    {
      icon: Target,
      title: '90+ ATS Score Guarantee',
      description: 'Engineered with verified keywords to beat Workday, Taleo, iCIMS, and Naukri filters.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
    },
    {
      icon: HeartHandshake,
      title: 'Direct Founder 1-on-1',
      description: 'No outsourced call centers. Chat directly with Founder Vamshi on WhatsApp (+91 90008 59695).',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200/60',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/70 mb-2">
              <ShieldCheck size={14} />
              <span>SmartScaleTech Ironclad Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Zero Risk. 100% Focused on Getting You Hired.
            </h2>
          </div>

          {onOpenSamples && (
            <button
              onClick={onOpenSamples}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              <Eye size={15} /> Preview Real Work Samples →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border mb-5 ${item.color}`}>
                  <item.icon size={22} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
