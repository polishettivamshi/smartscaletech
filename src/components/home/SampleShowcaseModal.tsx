import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, FileText, Linkedin, Globe, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

interface SampleShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'fullstack' | 'fresher' | 'linkedin' | 'portfolio';
}

export const SampleShowcaseModal = ({
  isOpen,
  onClose,
  defaultTab = 'fullstack',
}: SampleShowcaseModalProps) => {
  const [activeTab, setActiveTab] = useState<'fullstack' | 'fresher' | 'linkedin' | 'portfolio'>(defaultTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300">
                    Live Deliverables Showcase
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  See Our Real ATS Resumes &amp; Portfolios
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('fullstack')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'fullstack'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <FileText size={14} /> Full-Stack Resume (95/100 ATS)
              </button>
              <button
                onClick={() => setActiveTab('fresher')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'fresher'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <FileText size={14} /> Fresher / Graduate (92/100 ATS)
              </button>
              <button
                onClick={() => setActiveTab('linkedin')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'linkedin'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Linkedin size={14} /> LinkedIn Makeover (Before / After)
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Globe size={14} /> Developer Portfolio Website
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1 text-slate-800 text-xs leading-relaxed space-y-4">
              {activeTab === 'fullstack' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                    <span className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      ATS Score: 95/100 • Parsed by Workday, Taleo, iCIMS, &amp; Naukri
                    </span>
                    <span className="text-[11px] font-black uppercase text-emerald-700 bg-white px-2 py-0.5 rounded shadow-xs">
                      Working Pro Pack (₹399)
                    </span>
                  </div>

                  {/* Watermarked Sample Card */}
                  <div className="relative p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-[11px] space-y-4 text-slate-800 select-none overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] rotate-[-25deg]">
                      <span className="text-7xl font-black uppercase text-slate-900 tracking-widest">
                        SMARTSCALE TECH
                      </span>
                    </div>

                    <div className="text-center pb-3 border-b border-slate-300">
                      <p className="text-base font-black tracking-wider text-slate-900 font-sans">
                        SRIKANTH REDDY
                      </p>
                      <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                        Hyderabad, Telangana | +91 90008 59695 | srikanth.dev@gmail.com | linkedin.com/in/srikanth-fullstack
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-slate-900 uppercase tracking-wider mb-1 font-sans text-xs">
                        PROFESSIONAL SUMMARY
                      </p>
                      <p className="text-slate-600 font-sans">
                        Full-Stack Software Engineer with 3.5 years of experience designing and scaling resilient web applications using React.js, Node.js, and PostgreSQL. Reduced API latency by 38% and supported 50,000+ monthly active users in high-growth SaaS environments.
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-slate-900 uppercase tracking-wider mb-1 font-sans text-xs">
                        TECHNICAL SKILLS
                      </p>
                      <p className="text-slate-600 font-sans">
                        <strong>Languages &amp; Frameworks:</strong> TypeScript, JavaScript, React.js, Next.js, Node.js, Express, Tailwind CSS<br />
                        <strong>Databases &amp; Cloud:</strong> PostgreSQL, MongoDB, Redis, AWS (S3, EC2), Docker, Git, CI/CD Pipelines
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-slate-900 uppercase tracking-wider mb-1 font-sans text-xs">
                        PROFESSIONAL EXPERIENCE
                      </p>
                      <p className="font-bold text-slate-900 font-sans">
                        Software Engineer | CloudScale Systems, Hitech City, Hyderabad (2022 - Present)
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600 font-sans mt-1">
                        <li>Architected real-time analytics dashboard with React and WebSockets, cutting query load times by 42%.</li>
                        <li>Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle from 3 days to 4 hours.</li>
                        <li>Optimized SQL indexing and connection pooling in PostgreSQL, handling 2,500+ requests/second with zero downtime.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'fresher' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-indigo-600" />
                      ATS Score: 92/100 • Specially Crafted for Campus &amp; Off-Campus Hiring
                    </span>
                    <span className="text-[11px] font-black uppercase text-indigo-700 bg-white px-2 py-0.5 rounded shadow-xs">
                      Fresher Starter (₹199)
                    </span>
                  </div>

                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl font-sans text-xs space-y-4 text-slate-700">
                    <div className="border-b border-slate-200 pb-3 text-center">
                      <p className="text-sm font-black text-slate-900 uppercase">ANANYA SHARMA</p>
                      <p className="text-[11px] text-slate-500">
                        B.Tech Computer Science (2025 Graduate) • Hyderabad • github.com/ananya-dev • LeetCode: 200+ Solved
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                        PROJECTS (STAR Quantified Format)
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <p className="font-bold text-slate-900 text-xs">
                            AI Resume ATS Scanner Web App (React, Node.js, Tailwind)
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            • Built full-stack scanner extracting resume keywords with 98% accuracy and providing instant heuristic scoring.<br />
                            • Tested across 150+ sample resumes; deployed live on Vercel with 1,200+ unique user sessions.
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <p className="font-bold text-slate-900 text-xs">
                            E-Commerce Cart &amp; Order Engine (Node.js, MongoDB, JWT)
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            • Designed RESTful microservices with JWT authentication and simulated Razorpay payments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'linkedin' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <Linkedin size={16} className="text-[#0A66C2]" />
                      Recruiter Search Views: +1,400% Increase in 14 Days
                    </span>
                    <span className="text-[11px] font-black uppercase text-blue-700 bg-white px-2 py-0.5 rounded shadow-xs">
                      LinkedIn 360° (₹299)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-red-200 text-red-800">
                        BEFORE (0 Inbound Recruiter Messages)
                      </span>
                      <p className="text-xs font-semibold text-slate-800">
                        Headline: "Student at JNTU Hyderabad | Looking for opportunities"
                      </p>
                      <p className="text-[11px] text-slate-500">
                        About: "Hardworking student eager to learn and grow in IT industry. Please connect with me."
                      </p>
                      <p className="text-[10px] text-red-600 font-bold">
                        ❌ Zero keywords, invisible to recruiter LinkedIn search filters.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-emerald-200 text-emerald-800">
                        AFTER (5-10 Inbound Messages / Month)
                      </span>
                      <p className="text-xs font-bold text-slate-900">
                        Headline: "Full Stack Engineer | React.js, Node.js, TypeScript | Building High-Throughput APIs | Top 5% Hackathon Finalist"
                      </p>
                      <p className="text-[11px] text-slate-700">
                        About: Structured story with bulleted tech stack, quantified metrics, direct portfolio links, and clear contact CTA.
                      </p>
                      <p className="text-[10px] text-emerald-700 font-bold">
                        ✅ Appears in top 5% of recruiter searches for "React Hyderabad".
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <Globe size={16} className="text-purple-600" />
                      Live Animated Portfolio Website (Free Lifetime Cloud Hosting)
                    </span>
                    <span className="text-[11px] font-black uppercase text-purple-700 bg-white px-2 py-0.5 rounded shadow-xs">
                      Portfolio Launch (₹999)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-red-500"></span>
                        <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                        <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                        <span className="text-[11px] text-slate-400 font-mono ml-2">
                          https://yourname-portfolio.vercel.app
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">
                        Sub-1s Fast Load
                      </span>
                    </div>

                    <div className="p-3 bg-slate-800/80 rounded-xl space-y-2">
                      <p className="text-sm font-bold text-white">Features Included in ₹999 Package:</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                        <div>• Interactive Hero with 3D/Motion elements</div>
                        <div>• Live Project Cards with GitHub &amp; Demo links</div>
                        <div>• One-Click WhatsApp contact button</div>
                        <div>• Full Resume PDF Download trigger</div>
                        <div>• Custom Domain or free .vercel.app setup</div>
                        <div>• 100% Mobile &amp; Desktop Responsive</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium text-center sm:text-left">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Ready to transform your profile? Services start from ₹199.</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link to="/request-service" className="flex-1 sm:flex-none" onClick={onClose}>
                  <Button className="w-full sm:w-auto h-11 px-5 rounded-xl bg-primary hover:bg-primary-dark font-bold text-xs shadow-md">
                    Request Proposal (₹0 Free) <ExternalLink size={13} className="ml-1.5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20saw%20your%20sample%20resumes%20and%20portfolios%20on%20SmartScaleTech%20and%20want%20to%20get%20started."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-11 px-4 rounded-xl border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-bold text-xs"
                  >
                    <MessageCircle size={15} className="mr-1.5 text-emerald-600" />
                    WhatsApp Vamshi
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
