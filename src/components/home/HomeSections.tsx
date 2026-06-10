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

export const PrivacyPolicy = () => {
  return (
    <section id="privacy-policy" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Privacy Policy</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">SmartScaleTech respects your privacy when you visit https://smartscaletech.vercel.app and use our branding, resume, LinkedIn, or web development services.</p>
        </div>

        <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Information We Collect</h3>
            <p>When you contact us or request a quote, we may collect your name, email address, phone number, project requirements, professional background, and optional portfolio or resume details.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">How We Use Information</h3>
            <p>We use your data to reply to requests, deliver services, improve SmartScaleTech offerings, and maintain the website. We do not use your information for advertising without your consent.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Cookies and Site Analytics</h3>
            <p>We may use cookies and analytics tools to understand how visitors use our site and to keep forms working smoothly. This helps us improve performance on desktop and mobile.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Security and Sharing</h3>
            <p>We protect your information with standard security practices. We do not sell your personal data, and we only share it with trusted providers when needed to deliver services or comply with the law.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Contact</h3>
            <p>If you have any questions about this Privacy Policy, please email smartscaletechforyou@gmail.com.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TermsOfService = () => {
  return (
    <section id="terms-of-service" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Terms of Service</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">These terms apply to your use of SmartScaleTech at https://smartscaletech.vercel.app and any services requested through the site.</p>
        </div>

        <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Acceptance of Terms</h3>
            <p>By visiting our site or contacting us, you agree to these Terms of Service. If you do not agree, please do not use the website or request services.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Services Covered</h3>
            <p>SmartScaleTech delivers ATS-friendly resume services, LinkedIn optimization, personal branding, and website development. Specific project scope, pricing, and delivery terms are confirmed in writing before work begins.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Your Responsibilities</h3>
            <p>You agree to provide accurate information, cooperate with SmartScaleTech, and supply any materials needed to complete the service.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Intellectual Property</h3>
            <p>All materials on this website are owned by SmartScaleTech. You may not reproduce or distribute content without our permission. Work delivered to you becomes your property once agreed upon and paid for.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Limitation of Liability</h3>
            <p>SmartScaleTech is not liable for indirect or consequential losses arising from your use of the site or services. Our liability is limited to the amount you paid for the specific service.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Changes to Terms</h3>
            <p>We may update these terms from time to time. Continued use of the website following any changes constitutes acceptance of the revised terms.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
