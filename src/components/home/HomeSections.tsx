import { MessageCircle, FileCode2, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks = () => {
  const timeline = [
    {
      hour: 'Hour 0',
      name: '10-Min WhatsApp Discovery Brief',
      deliverable: 'Goal & Scope Locked',
      description:
        'Share your current resume, target role, or business website goal directly with Founder Vamshi on WhatsApp—no lengthy forms.',
      icon: MessageCircle,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/70',
    },
    {
      hour: 'Hour 12',
      name: 'First ATS Draft or Live Wireframe',
      deliverable: 'Reviewable Prototype',
      description:
        'Receive your restructured ATS keyword resume draft or interactive portfolio/website wireframe so we align early on direction.',
      icon: FileCode2,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      hour: 'Hour 24–36',
      name: 'Unlimited 1-on-1 Revisions',
      deliverable: '90+ ATS & Pixel Polish',
      description:
        'Fine-tune phrasing, metrics, visual layout, and mobile responsiveness together directly until every section passes review.',
      icon: RefreshCw,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/70',
    },
    {
      hour: 'Hour 48',
      name: 'Complete Source & File Handover',
      deliverable: 'Word, PDF & Live Deploy',
      description:
        'Walk away with editable Word + PDF files, full GitHub source code, and free ₹0/month cloud deployment with walkthrough.',
      icon: CheckCircle2,
      color: 'bg-amber-50 text-amber-600 border-amber-200/70',
    },
  ];

  return (
    <section id="how-it-works" className="bg-slate-50/70 py-24 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              Fast, Transparent Execution
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Your 48-Hour Delivery Timeline
            </h2>
            <p className="mt-3 text-base text-slate-600">
              From your first WhatsApp message to editable resumes, portfolios, and live websites—every milestone has a clear deliverable.
            </p>
          </div>

          <a
            href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20would%20like%20to%20start%20my%2048-hour%20delivery%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-primary text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            Start Hour 0 on WhatsApp <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeline.map((step, idx) => (
            <motion.div
              key={step.hour}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="relative flex flex-col justify-between p-7 bg-white rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${step.color}`}>
                    <step.icon size={22} />
                  </div>
                  <span className="text-sm font-black text-slate-900 tabular-nums">{step.hour}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">{step.name}</h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Output</span>
                <span className="font-bold text-slate-900">{step.deliverable}</span>
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
