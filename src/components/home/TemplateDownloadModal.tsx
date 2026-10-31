import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Linkedin, MessageCircle, CheckCircle2, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { submitLead } from '../../lib/leads';
import { trackEvent } from '../../lib/analytics';

interface TemplateDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateDownloadModal = ({ isOpen, onClose }: TemplateDownloadModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hasFollowed, setHasFollowed] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const downloadTemplateFile = () => {
    trackEvent('cta_click', { cta: 'download_free_template' });

    // Generate verified ATS single-column template content
    const templateContent = `================================================================================
FIRSTNAME LASTNAME
Hyderabad, Telangana | phone: +91 9000859695 | email: yourname@email.com
LinkedIn: linkedin.com/in/yourprofile | GitHub: github.com/yourusername
================================================================================

PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
Results-driven Software Engineer with [X] years of experience architecting and 
deploying high-performance web applications using React, Node.js, and modern cloud 
technologies. Proven track record of optimizing API latency by [X]% and delivering 
mission-critical features in agile environments.

CORE COMPETENCIES & TECHNICAL SKILLS
--------------------------------------------------------------------------------
• Languages & Frameworks: JavaScript, TypeScript, React.js, Node.js, Express, HTML5, CSS3, Tailwind CSS
• Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, EC2), Docker, Git
• Tools & Practices: RESTful APIs, CI/CD Pipelines, Microservices, Agile/Scrum, Unit Testing

PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------------------
[JOB TITLE] | [COMPANY NAME], Hyderabad, India
[Month, Year] – Present
• Architected and shipped [X] full-stack microservices, increasing platform throughput by [X]%.
• Spearheaded migration to Docker containerization, reducing release deployment time from [X] mins to [X] mins.
• Collaborated with cross-functional teams to scale database queries, cutting response times by [X]%.
• Mentored [X] junior developers and established code review standards across engineering teams.

[PREVIOUS JOB TITLE] | [PREVIOUS COMPANY NAME], Hyderabad, India
[Month, Year] – [Month, Year]
• Developed responsive frontend user interfaces using React and TypeScript for [X]+ daily active users.
• Implemented automated testing suites, increasing test coverage from [X]% to [X]%.
• Optimized bundle size by [X]%, accelerating mobile page load speeds across Indian networks.

NOTABLE PROJECTS
--------------------------------------------------------------------------------
E-Commerce Real-Time Platform | Tech Stack: React, Node.js, PostgreSQL, Redis
• Built a full-stack e-commerce engine with live cart synchronization and payment gateway integration.
• Handled 5,000+ concurrent simulated requests with sub-200ms latency. Live Demo: [link]

EDUCATION & CERTIFICATIONS
--------------------------------------------------------------------------------
• Bachelor of Technology in Computer Science & Engineering | [University Name], Hyderabad (2020 - 2024)
• AWS Certified Solutions Architect – Associate (2025)
================================================================================
Template verified for: Workday, Taleo, iCIMS, Greenhouse, and Naukri.
Provided by SmartScaleTech (https://smartscaletech.vercel.app)
================================================================================`;

    const blob = new Blob([templateContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SmartScaleTech_ATS_Master_Template.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsDownloaded(true);
  };

  const handleUnlockAndDownload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() || phone.trim()) {
      await submitLead({
        name: name.trim() || 'Template Requester',
        phone: phone.trim() || 'Pending Phone',
        service: 'Free ATS Template Download',
        sourcePage: window.location.pathname,
        note: 'Downloaded free ATS template pack',
      });
    }

    downloadTemplateFile();
  };

  const openLinkedInAndUnlock = () => {
    trackEvent('cta_click', { cta: 'linkedin_follow_unlock' });
    window.open('https://www.linkedin.com/company/smartscale-tech', '_blank');
    setHasFollowed(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="p-8">
              {!isDownloaded ? (
                <>
                  <div className="text-center mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                      <FileCheck size={28} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                      Free Resource
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">
                      Download ATS Resume Template Pack
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto">
                      Single-column layout pre-configured with STAR bullet points and verified to pass Workday, Taleo, and Naukri parsers.
                    </p>
                  </div>

                  {/* Step 1: Follow on LinkedIn button */}
                  <div className="p-4 rounded-2xl bg-[#0A66C2]/5 border border-[#0A66C2]/20 mb-5 text-center">
                    <p className="text-xs font-bold text-slate-800 mb-2.5 flex items-center justify-center gap-1.5">
                      <Linkedin size={16} className="text-[#0A66C2]" /> Step 1: Follow SmartScaleTech on LinkedIn
                    </p>
                    <button
                      type="button"
                      onClick={openLinkedInAndUnlock}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Linkedin size={15} /> Follow @smartscale-tech {hasFollowed && <CheckCircle2 size={15} className="text-emerald-300" />}
                    </button>
                    <span className="block text-[10px] text-slate-400 mt-1.5">
                      Follow to get weekly off-campus placement alerts &amp; tech hiring updates
                    </span>
                  </div>

                  {/* Step 2: Instant Download Form */}
                  <form onSubmit={handleUnlockAndDownload} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rahul Sharma"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9000859695"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark font-bold text-xs shadow-md shadow-primary/20 mt-2"
                    >
                      <Download size={16} className="mr-2" /> Download ATS Template Pack Instantly
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Template Downloaded!</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Check your downloads folder for <strong>SmartScaleTech_ATS_Master_Template.txt</strong>.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-2">
                    <p className="font-bold text-slate-900">💡 Next Step for Maximum Interviews:</p>
                    <p>
                      Want Vamshi and our engineering team to write your bullets, inject verified keywords, and optimize your LinkedIn profile?
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919000859695?text=Hello%20SmartScaleTech%2C%20I%20downloaded%20your%20free%20ATS%20template%20and%20would%20like%20an%20expert%20review%20or%20rewrite."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-md shadow-green-500/20"
                  >
                    <MessageCircle size={16} /> Chat with Vamshi on WhatsApp (₹999 Package)
                  </a>
                  <button
                    onClick={onClose}
                    className="text-xs text-slate-400 hover:text-slate-600 underline font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
