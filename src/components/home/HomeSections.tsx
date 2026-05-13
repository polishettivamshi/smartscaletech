import { UserPlus, CreditCard, Map as MapIcon, Shield, Search, Globe, Users, Rocket, TrendingUp, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      name: 'Free Consultation',
      description: 'Discuss your goals with our experts and get a customized roadmap.',
      icon: Users,
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 2,
      name: 'Strategic Execution',
      description: 'We build your website, optimize your profile, and craft your brand.',
      icon: Rocket,
      color: 'bg-accent/10 text-accent',
    },
    {
      id: 3,
      name: 'Growth & Success',
      description: 'Launch your digital presence and start seeing real-world results.',
      icon: TrendingUp,
      color: 'bg-emerald-100 text-emerald-600',
    },
  ];

  return (
    <section id="portfolio" className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-500">Your journey to a powerful digital presence in 3 simple steps.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center p-10 bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className={`flex h-20 w-20 items-center justify-center rounded-[24px] ${step.color} mb-8`}>
                <step.icon size={32} />
              </div>
              <div className="absolute top-10 right-10 text-6xl font-black text-slate-100 opacity-50 select-none">
                {step.id}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{step.name}</h3>
              <p className="mt-4 text-center text-slate-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhyJoin = () => {
  const reasons = [
    {
      name: 'Increase Visibility',
      description: 'Showcase your profile to thousands of professionals.',
      icon: Shield,
      percentage: 95,
      color: 'bg-primary'
    },
    {
      name: 'Discover People',
      description: 'Find and connect with professionals in your city or domain.',
      icon: Search,
      percentage: 88,
      color: 'bg-accent'
    },
    {
      name: 'Grow Network',
      description: 'Expand your network and create new opportunities.',
      icon: Globe,
      percentage: 92,
      color: 'bg-indigo-500'
    },
    {
    name: 'Unlock Opportunities',
    description: 'Get noticed by top recruiters and industry leaders.',
    icon: Briefcase,
    percentage: 94,
    color: 'bg-emerald-500'
  }
  ];

  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Why Join SmartScaleTech?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">We provide the tools and platform you need to excel in your career and grow your digital presence.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, idx) => (
            <motion.div
              key={reason.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-start p-8 rounded-[32px] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-slate-900 mb-6 group-hover:scale-110 transition-transform`}>
                <reason.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{reason.name}</h3>
              <p className="mt-2 text-slate-500 text-sm leading-relaxed mb-6">{reason.description}</p>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Success Rate</span>
                  <span className="text-xs font-bold text-slate-900">{reason.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${reason.percentage}%` }}
                    transition={{ duration: 1.5, delay: idx * 0.2 + 0.5, ease: "easeOut" }}
                    className={`h-full ${reason.color} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
