import { UserPlus, CreditCard, Map as MapIcon, Shield, Search, Globe, Users } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      name: 'Register',
      description: 'Sign up with your LinkedIn profile and verify your details.',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 2,
      name: 'Pay ₹5',
      description: 'Complete the payment of ₹5 to confirm your registration.',
      icon: CreditCard,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      id: 3,
      name: 'Show on Map',
      description: 'Your profile will be visible on India map for everyone.',
      icon: MapIcon,
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How it Works
          </p>
          <p className="mt-4 text-lg text-gray-600">Get started in 3 simple steps</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} mb-6`}>
                <step.icon size={32} />
              </div>
              <div className="absolute top-6 right-8 text-4xl font-black text-gray-50 opacity-10 select-none">
                0{step.id}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{step.name}</h3>
              <p className="mt-4 text-center text-gray-600">{step.description}</p>
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
    },
    {
      name: 'Discover People',
      description: 'Find and connect with professionals in your city or domain.',
      icon: Search,
    },
    {
      name: 'Grow Network',
      description: 'Expand your network and create new opportunities.',
      icon: Globe,
    },
    {
      name: 'Be Part of India',
      description: 'Be a part of India\'s largest professional community.',
      icon: Users,
    },
  ];

  return (
    <section className="bg-gray-900 py-24 text-white">
      <div className="mx-auto max-max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Join?</h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, idx) => (
            <motion.div
              key={reason.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 mb-6 border border-blue-500/30">
                <reason.icon size={24} />
              </div>
              <h3 className="text-lg font-bold">{reason.name}</h3>
              <p className="mt-2 text-gray-400 text-sm">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
