import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Linkedin,
  FileText,
  TrendingUp,
  Check,
  X,
  Copy,
  Briefcase,
  Target,
} from 'lucide-react';
import { Button } from '../ui/Button';
import {
  scanResumeText,
  scanResumeVsJD,
  ROLE_KEYWORD_DATABASE,
  ATSAnalysisResult,
} from '../../lib/atsScanner';
import { submitLead } from '../../lib/leads';
import { trackEvent } from '../../lib/analytics';

const SAMPLE_RESUME = `Vamshi Polishetti
Full-Stack Developer | Hyderabad, Telangana | polishettivamshi123@gmail.com | +91 9000859695 | linkedin.com/in/polishettivamshi

PROFESSIONAL SUMMARY
Results-driven software engineer with 2+ years of experience in React, Node.js, and TypeScript. Passionate about building high-performance web applications and scalable RESTful APIs.

SKILLS
Languages & Frameworks: JavaScript, TypeScript, React, Node.js, Express, HTML5, CSS3, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, Git, Docker, REST API
Methodologies: Agile, CI/CD, Unit Testing

EXPERIENCE
Software Engineer | TechScale Solutions, Hyderabad | 2023 - Present
• Engineered 8+ full-stack web applications using React and Node.js, improving client page speed by 35%.
• Architected scalable REST APIs integrated with PostgreSQL, handling 20,000+ daily queries with 99.8% uptime.
• Automated release pipelines using Docker and GitHub Actions, cutting deployment time from 40 mins to 8 mins.

PROJECTS
Real-Time Analytics Portal | React, TypeScript, PostgreSQL
• Delivered an executive analytics dashboard supporting 5,000+ monthly users with 42% faster query performance.

EDUCATION
B.Tech in Computer Science & Engineering | JNTUH, Hyderabad | 2019 - 2023`;

const SAMPLE_JD = `Senior / Mid-Level Full-Stack Software Engineer (Hyderabad)
Required Skills & Qualifications:
- 2+ years experience with React, TypeScript, JavaScript, and Node.js (Express).
- Strong expertise designing REST API and GraphQL services backed by PostgreSQL or MongoDB.
- Hands-on experience with Redux, Tailwind CSS, Microservices architecture, and Redis caching.
- Familiarity with AWS (EC2, S3), Docker, GitHub Actions, and CI/CD pipelines.
- Experience writing Unit Testing with Jest and Agile/Scrum workflows.`;

export const ATSCheckerTool = () => {
  const [scanMode, setScanMode] = useState<'role' | 'jd'>('role');
  const [role, setRole] = useState('Full-Stack Developer (MERN / MEAN)');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSAnalysisResult | null>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);
  const [showSharePreview, setShowSharePreview] = useState(false);

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!resumeText.trim()) return;
    if (scanMode === 'jd' && !jobDescription.trim()) return;

    setIsAnalyzing(true);
    trackEvent('cta_click', { cta: 'run_ats_scan', mode: scanMode, role });

    setTimeout(async () => {
      const scanResult =
        scanMode === 'jd'
          ? scanResumeVsJD(resumeText, jobDescription, role)
          : scanResumeText(resumeText, role);

      setResult(scanResult);
      setIsAnalyzing(false);

      if (userName.trim() || userPhone.trim()) {
        await submitLead({
          name: userName.trim() || 'ATS Scanner User',
          phone: userPhone.trim() || 'Website Audit',
          service:
            scanMode === 'jd'
              ? `JD Match Scan (Score: ${scanResult.score}/100)`
              : `ATS Scan: ${role} (Score: ${scanResult.score}/100)`,
          sourcePage: window.location.pathname,
          note: `Grade: ${scanResult.grade} | Matched ${scanResult.matchedKeywords.length} keywords | Missing ${scanResult.missingKeywords.length}`,
        });
      }
    }, 600);
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME);
    setRole('Full-Stack Developer (MERN / MEAN)');
    if (scanMode === 'jd') {
      setJobDescription(SAMPLE_JD);
    }
  };

  const getLinkedInShareText = () => {
    return [
      `🚀 I just scanned my resume using the Free ATS & JD Match Checker by SmartScaleTech!`,
      ``,
      `📊 Score: ${result?.score || 97}/100 (${result?.grade || 'Interview Ready'})`,
      `🎯 Target: ${scanMode === 'jd' ? 'Custom Job Description Match' : role}`,
      ``,
      `Check your resume against Workday/Taleo ATS rules & live job descriptions for free:`,
      `👉 https://smartscaletech.vercel.app/free-ats-resume-checker`,
      ``,
      `#SmartScaleTech #ATSResume #ResumeChecker #HyderabadJobs #TechCareers`,
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
      // Ignore
    }

    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      'https://smartscaletech.vercel.app/free-ats-resume-checker'
    )}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const copyShareTextOnly = async () => {
    trackEvent('cta_click', { cta: 'copy_share_text' });
    try {
      await navigator.clipboard.writeText(getLinkedInShareText());
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 5000);
    } catch {
      // Ignore
    }
  };

  const bookRewriteUrl = `https://wa.me/919000859695?text=${encodeURIComponent(
    `Hello Vamshi,\n\nI just ran my resume through your ${
      scanMode === 'jd' ? 'Resume vs Job Description Matcher' : `ATS Scanner for ${role}`
    } and scored *${result?.score}/100*.\n\nMissing keywords:\n${
      result?.missingKeywords.slice(0, 8).join(', ') || 'None'
    }\n\nI want to upgrade my resume to 95+ ATS readiness. Please advise next steps.`
  )}`;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} /> 100% Free · Role Scan + Job Description Matcher
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Free <span className="text-primary">ATS Resume Checker</span> &amp; JD Matcher
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
          Check your ATS compatibility score, compare your resume word-for-word against any Job Description, and spot missing keywords in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-100">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 mb-6">
            <button
              type="button"
              onClick={() => setScanMode('role')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                scanMode === 'role'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase size={14} className={scanMode === 'role' ? 'text-primary' : ''} />
              Role Benchmark Scan
            </button>
            <button
              type="button"
              onClick={() => setScanMode('jd')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                scanMode === 'jd'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target size={14} className={scanMode === 'jd' ? 'text-primary' : ''} />
              Resume vs. Job Description
            </button>
          </div>

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText className="text-primary" size={20} />
              {scanMode === 'jd' ? 'Paste Resume + Target JD' : 'Paste Resume Text'}
            </h2>
            <button
              onClick={handleLoadSample}
              type="button"
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              {scanMode === 'jd' ? 'Load Sample Resume + JD' : 'Load Sample Resume'}
            </button>
          </div>

          <form onSubmit={handleScan} className="space-y-4">
            {scanMode === 'role' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Role
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
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Job Description (Paste Requirements / Skills)
                </label>
                <textarea
                  required
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the Job Description from LinkedIn, Naukri, Indeed, or company careers page..."
                  className="w-full p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200 text-xs sm:text-sm font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400 resize-y"
                />
              </div>
            )}

            {/* Optional Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
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
                Resume Content (Plain Text / Copy-Paste)
              </label>
              <textarea
                required
                rows={8}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the text of your resume here (Summary, Skills, Experience, Projects, Education)..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400 resize-y"
              />
            </div>

            <Button
              type="submit"
              disabled={
                isAnalyzing ||
                !resumeText.trim() ||
                (scanMode === 'jd' && !jobDescription.trim())
              }
              className="w-full h-13 rounded-2xl bg-primary hover:bg-primary-dark font-bold text-sm shadow-xl shadow-primary/25 transition-all cursor-pointer"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Running ATS &amp; Keyword Check...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {scanMode === 'jd'
                    ? 'Compare Resume vs. Job Description'
                    : 'Scan ATS Readability & Keywords'}{' '}
                  <ArrowRight size={16} />
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
                key={`${result.mode}-${result.score}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/30 shadow-2xl space-y-6"
              >
                {/* Score Card */}
                <div className="text-center pb-5 border-b border-slate-100">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    {result.mode === 'jd' ? 'Job Description Match Score' : 'ATS Compatibility Score'}
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

                {/* Section Completeness Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Standard ATS Sections</span>
                    <span className="text-slate-500 font-semibold">{result.wordCount} words</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Summary', 'Skills', 'Experience', 'Projects', 'Education'].map((sec) => {
                      const found = result.sectionsFound.includes(sec);
                      return (
                        <span
                          key={sec}
                          className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 border ${
                            found
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : 'bg-rose-50 border-rose-200 text-rose-700'
                          }`}
                        >
                          {found ? <Check size={10} /> : <X size={10} />} {sec}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Keywords Matched */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      Keywords Detected ({result.matchedKeywords.length})
                    </span>
                    <span className="text-emerald-600 font-bold">Matched</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.length > 0 ? (
                      result.matchedKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold flex items-center gap-1"
                        >
                          <Check size={11} /> {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No target keywords detected</span>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                {result.missingKeywords.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">
                        Missing Keywords ({result.missingKeywords.length})
                      </span>
                      <span className="text-rose-500 font-bold">Add to Resume</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords.slice(0, 12).map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold flex items-center gap-1"
                        >
                          <X size={11} /> {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risks & Strengths */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  {result.risks.map((risk, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-rose-700 bg-rose-50/70 p-2.5 rounded-xl border border-rose-100"
                    >
                      <AlertTriangle size={15} className="shrink-0 mt-0.5 text-rose-500" />
                      <span>{risk}</span>
                    </div>
                  ))}
                  {result.strengths.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100"
                    >
                      <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-600" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                {/* Conversion Buttons */}
                <div className="pt-3 space-y-3">
                  <a href={bookRewriteUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-lg shadow-green-500/25">
                      <MessageCircle size={16} className="mr-1.5" /> Fix Missing Keywords with Vamshi
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

                    {copiedShare && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-start gap-1.5">
                        <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>Post text copied to clipboard! Paste it into LinkedIn.</span>
                      </div>
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
                        <Copy size={12} /> Copy Text
                      </button>
                    </div>

                    {showSharePreview && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                        {getLinkedInShareText()}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  {scanMode === 'jd'
                    ? 'Resume vs. Job Description Audit'
                    : 'Instant ATS & Keyword Audit'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {scanMode === 'jd'
                    ? 'Paste a live Job Description and your resume to see the exact skill gaps before you hit Apply.'
                    : 'Select your target role and paste your resume draft. We check keywords, STAR metrics, action verbs, and ATS sections.'}
                </p>
                <div className="pt-2 text-[11px] font-bold text-slate-400">
                  ⚡ Tested against Workday, Taleo, iCIMS, and Naukri parsing rules.
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
