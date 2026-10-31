import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Share2,
  Linkedin,
  RefreshCw,
  FileText,
  TrendingUp,
  ShieldCheck,
  Check,
  X,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';
import { scanResumeText, ROLE_KEYWORD_DATABASE, ATSAnalysisResult } from '../../lib/atsScanner';
import { submitLead } from '../../lib/leads';
import { trackEvent } from '../../lib/analytics';

const SAMPLE_RESUME = `RAHUL SHARMA
Full-Stack Developer | Hyderabad, Telangana | rahul.sharma@example.com | +91 9000859695

PROFESSIONAL SUMMARY
Results-driven software engineer with 2+ years of experience in React, Node.js, and TypeScript. Passionate about building high-performance web applications and scalable RESTful APIs.

SKILLS
Languages & Frameworks: JavaScript, TypeScript, React, Node.js, Express, HTML5, CSS3, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, Git, Docker, REST APIs
Methodologies: Agile, CI/CD, Unit Testing

EXPERIENCE
Software Engineer | TechScale Solutions, Hyderabad | 2023 - Present
• Engineered 8+ full-stack web applications using React and Node.js, improving client page speed by 35%.
• Architected scalable REST APIs integrated with PostgreSQL, handling 20,000+ daily queries with 99.8% uptime.
• Automated release pipelines using Docker and GitHub Actions, cutting deployment time from 40 mins to 8 mins.
• Collaborated with product designers to implement responsive, mobile-first dashboards.

EDUCATION
B.Tech in Computer Science & Engineering | JNTUH, Hyderabad | 2019 - 2023`;

export const ATSCheckerTool = () => {
  const [role, setRole] = useState('Full-Stack Developer (MERN / MEAN)');
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSAnalysisResult | null>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);
  const [showSharePreview, setShowSharePreview] = useState(false);

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    trackEvent('cta_click', { cta: 'run_ats_scan', role });

    setTimeout(async () => {
      const scanResult = scanResumeText(resumeText, role);
      setResult(scanResult);
      setIsAnalyzing(false);

      // Auto-save lead if contact details entered or anonymous audit
      await submitLead({
        name: userName.trim() || 'ATS Scanner User',
        phone: userPhone.trim() || 'Website Audit',
        service: `ATS Scan: ${role} (Score: ${scanResult.score}/100)`,
        sourcePage: window.location.pathname,
        note: `Grade: ${scanResult.grade} | Matched ${scanResult.matchedKeywords.length} keywords`,
      });
    }, 800);
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME);
    setRole('Full-Stack Developer (MERN / MEAN)');
  };

  const getLinkedInShareText = () => {
    return [
      `🚀 I just scanned my resume using the Free ATS Resume Checker by SmartScaleTech!`,
      ``,
      `📊 My ATS Readiness Score: ${result?.score || 98}/100 (${result?.grade || 'Interview Ready'})`,
      `🎯 Target Role: ${role}`,
      ``,
      `💡 About SmartScaleTech (https://smartscaletech.vercel.app):`,
      `SmartScaleTech is a Hyderabad (Hitech City) based career acceleration & tech agency helping candidates clear automated ATS screening and land 3x more interview callbacks.`,
      ``,
      `What SmartScaleTech delivers:`,
      `✅ ATS Resume Writing & Re-engineering (clears Workday, Taleo, iCIMS, Naukri & LinkedIn)`,
      `✅ LinkedIn Profile Optimization & Executive Personal Branding`,
      `✅ Modern Web Development & Custom Portfolio Platforms`,
      `✅ 1-on-1 direct founder guidance with 24-48 hr fast turnaround`,
      ``,
      `Check your resume score for free before applying to jobs:`,
      `👉 Test your score: https://smartscaletech.vercel.app/free-ats-resume-checker`,
      ``,
      `Official Website: https://smartscaletech.vercel.app`,
      `Follow Company: https://www.linkedin.com/company/smartscale-tech`,
      ``,
      `#SmartScaleTech #ATSResume #ResumeWriting #CareerGrowth #HyderabadJobs #TechJobs #JobSearch`
    ].join('\n');
  };

  const shareOnLinkedIn = async () => {
    trackEvent('cta_click', { cta: 'share_ats_linkedin' });
    const fullText = getLinkedInShareText();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 5000);
      }
    } catch {
      // Fallback if clipboard API is restricted
    }

    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      'https://smartscaletech.vercel.app/free-ats-resume-checker'
    )}`;
    window.open(shareUrl, '_blank');
  };

  const copyShareTextOnly = async () => {
    trackEvent('cta_click', { cta: 'copy_share_text' });
    const fullText = getLinkedInShareText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 5000);
      }
    } catch {
      // Ignore
    }
  };

  const bookRewriteUrl = `https://wa.me/919000859695?text=${encodeURIComponent(
    `Hello Vamshi,\n\nI just ran my resume through your ATS Scanner for the role *${role}* and scored *${result?.score}/100*.\n\nMissing keywords:\n${result?.missingKeywords.slice(0, 6).join(', ')}\n\nI want to book an expert ATS resume rewrite (₹999). Please advise next steps.`
  )}`;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} /> 100% Free · Instant ATS Scanner
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Check Your <span className="text-primary">ATS Resume Score</span> in 10 Seconds
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
          See if your resume passes automated screening algorithms used by top tech companies and recruiters in Hyderabad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText className="text-primary" size={20} /> Paste Resume Text
            </h3>
            <button
              onClick={handleLoadSample}
              type="button"
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Load Sample Resume
            </button>
          </div>

          <form onSubmit={handleScan} className="space-y-4">
            {/* Target Role Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Role in Hyderabad / Tech
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                {Object.keys(ROLE_KEYWORD_DATABASE).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Contact for saving report */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  WhatsApp Number (Optional)
                </label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="9000859695"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Resume Text Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Resume Content (Text / Copy-Paste)
              </label>
              <textarea
                required
                rows={9}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the raw text of your resume here (Summary, Skills, Work Experience, Projects, Education)..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400 resize-y"
              />
            </div>

            <Button
              type="submit"
              disabled={isAnalyzing || !resumeText.trim()}
              className="w-full h-13 rounded-2xl bg-primary hover:bg-primary-dark font-bold text-sm shadow-xl shadow-primary/25 transition-all cursor-pointer"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Scanning ATS Algorithms...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Scan ATS Readability &amp; Keywords <ArrowRight size={16} />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/30 shadow-2xl space-y-6"
              >
                {/* Score Card */}
                <div className="text-center pb-6 border-b border-slate-100">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    ATS Match Score
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={`text-6xl font-black ${
                        result.score >= 80
                          ? 'text-emerald-500'
                          : result.score >= 60
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }`}
                    >
                      {result.score}
                    </span>
                    <span className="text-2xl font-bold text-slate-300">/100</span>
                  </div>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                      result.score >= 80
                        ? 'bg-emerald-100 text-emerald-700'
                        : result.score >= 60
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {result.grade}
                  </span>
                </div>

                {/* Keywords Matched vs Missing */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Keywords Detected ({result.matchedKeywords.length})</span>
                    <span className="text-emerald-600 font-bold">Good Match</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.length > 0 ? (
                      result.matchedKeywords.map((kw) => (
                        <span key={kw} className="px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                          <Check size={11} /> {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No role keywords detected</span>
                    )}
                  </div>
                </div>

                {result.missingKeywords.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Missing Core Keywords ({result.missingKeywords.length})</span>
                      <span className="text-rose-500 font-bold">Add to Resume</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords.slice(0, 10).map((kw) => (
                        <span key={kw} className="px-2 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold flex items-center gap-1">
                          <X size={11} /> {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths & Action items */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  {result.risks.map((risk, i) => (
                    <div key={i} className="flex items-start gap-2 text-rose-700 bg-rose-50/70 p-2.5 rounded-xl border border-rose-100">
                      <AlertTriangle size={15} className="shrink-0 mt-0.5 text-rose-500" />
                      <span>{risk}</span>
                    </div>
                  ))}
                  {result.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                      <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-600" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                {/* Conversion Action Buttons */}
                <div className="pt-4 space-y-3">
                  <a href={bookRewriteUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-lg shadow-green-500/25">
                      <MessageCircle size={16} className="mr-1.5" /> Book Expert Rewrite on WhatsApp (₹999)
                    </Button>
                  </a>

                  <div className="space-y-2">
                    <button
                      onClick={shareOnLinkedIn}
                      type="button"
                      className="w-full h-11 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Linkedin size={16} /> Share My Score on LinkedIn
                    </button>

                    <a href="/dashboard" className="block">
                      <button
                        type="button"
                        className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                      >
                        <TrendingUp size={16} className="text-emerald-600" /> Track Improvements in Career Dashboard
                      </button>
                    </a>

                    {copiedShare && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-start gap-1.5 shadow-xs"
                      >
                        <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>Post text with SmartScaleTech review copied to clipboard! Paste it into LinkedIn.</span>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                      <button
                        type="button"
                        onClick={() => setShowSharePreview(!showSharePreview)}
                        className="text-primary hover:underline font-bold cursor-pointer"
                      >
                        {showSharePreview ? 'Hide Post Preview' : 'Preview LinkedIn Post Text'}
                      </button>
                      <button
                        type="button"
                        onClick={copyShareTextOnly}
                        className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                      >
                        <Copy size={12} /> Copy Post Text
                      </button>
                    </div>

                    {showSharePreview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto shadow-inner"
                      >
                        {getLinkedInShareText()}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <TrendingUp size={28} />
                </div>
                <h4 className="text-lg font-black text-slate-900">Instant AI &amp; Keyword Audit</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Select your target role and paste your current draft. You will immediately see your ATS score, detected keywords, and recommendations.
                </p>
                <div className="pt-2 text-[11px] font-bold text-slate-400">
                  ⚡ Tested for Workday, Taleo, iCIMS, and Naukri.
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
