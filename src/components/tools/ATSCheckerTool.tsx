import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
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
  Upload,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { StatusBanner } from '../ui/StatusBanner';
import {
  scanResumeText,
  scanResumeVsJD,
  ROLE_KEYWORD_DATABASE,
  ATSAnalysisResult,
} from '../../lib/atsScanner';
import { submitLead } from '../../lib/leads';
import { trackEvent } from '../../lib/analytics';

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_TEXT_EXTENSIONS = ['.txt', '.md', '.csv'];

const SAMPLE_RESUME = `Vamshi Polishetti
Full-Stack Developer | Hyderabad, Telangana | smartscaletechforyou@gmail.com | +91 9000859695

PROFESSIONAL SUMMARY
Software engineer with 2+ years of experience in React, Node.js, and TypeScript building scalable web applications and RESTful APIs.

SKILLS
Languages & Frameworks: JavaScript, TypeScript, React, Node.js, Express, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, Git, Docker, REST API
Methodologies: Agile, CI/CD, Unit Testing

EXPERIENCE
Software Engineer | TechScale Solutions, Hyderabad | 2023 - Present
• Engineered 8+ full-stack web applications using React and Node.js, improving page speed by 35%.
• Architected REST APIs backed by PostgreSQL, handling 20,000+ daily queries.
• Automated deployment pipelines using Docker and GitHub Actions, cutting release time from 40 mins to 8 mins.

PROJECTS
Real-Time Analytics Portal | React, TypeScript, PostgreSQL
• Delivered an executive analytics dashboard supporting 5,000+ monthly users with 42% faster query performance.

EDUCATION
B.Tech in Computer Science & Engineering | JNTUH, Hyderabad | 2019 - 2023`;

const SAMPLE_JD = `Full-Stack Software Engineer (Hyderabad)
Required Skills & Qualifications:
- 2+ years experience with React, TypeScript, JavaScript, and Node.js (Express).
- Strong expertise designing REST API and GraphQL services backed by PostgreSQL or MongoDB.
- Hands-on experience with Redux, Tailwind CSS, Microservices architecture, and Redis caching.
- Familiarity with AWS (EC2, S3), Docker, GitHub Actions, and CI/CD pipelines.
- Experience writing Unit Testing with Jest and Agile workflows.`;

export const ATSCheckerTool = () => {
  const [scanMode, setScanMode] = useState<'role' | 'jd'>('role');
  const [role, setRole] = useState('Full-Stack Developer (MERN / MEAN)');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSAnalysisResult | null>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);
  const [showSharePreview, setShowSharePreview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = async (file: File) => {
    setFileError(null);
    const lowerName = file.name.toLowerCase();

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError('File exceeds 2 MB limit. Please upload a plain-text file under 2 MB or paste your CV text below.');
      return;
    }

    const isPlainTextExt = ALLOWED_TEXT_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
    if (!isPlainTextExt) {
      setFileError(
        `".${lowerName.split('.').pop() || 'file'}" binary documents cannot be reliably parsed client-side without external libraries. Please upload a .txt, .md, or .csv export—or copy & paste your resume text directly below.`
      );
      return;
    }

    try {
      const content = await file.text();
      const cleanContent = content.trim();
      if (cleanContent.split(/\s+/).length < 15) {
        setFileError('The uploaded text file appears nearly empty. Please check the file or paste your resume content below.');
        return;
      }
      setResumeText(cleanContent);
      setUploadedFileName(file.name);
      setResult(null);
    } catch {
      setFileError('Unable to read the selected file. Please paste your resume text directly.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void processFile(file);
    }
  };

  const handleClearFile = () => {
    setUploadedFileName(null);
    setFileError(null);
    setResumeText('');
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnalyzing) return;
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
        try {
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
        } catch (error) {
          console.error('Could not email the ATS scan lead:', error);
        }
      }
    }, 350);
  };

  const handleLoadSample = () => {
    setFileError(null);
    setUploadedFileName(null);
    setResumeText(SAMPLE_RESUME);
    setRole('Full-Stack Developer (MERN / MEAN)');
    if (scanMode === 'jd') {
      setJobDescription(SAMPLE_JD);
    }
  };

  const getLinkedInShareText = () => {
    return [
      `I ran my resume through the SmartScaleTech Browser ATS & JD Diagnostic.`,
      ``,
      `Score: ${result?.score || 0}/100 (${result?.grade || 'Diagnostic'})`,
      `Target: ${scanMode === 'jd' ? 'Job Description Match' : role}`,
      ``,
      `Try the free client-side checker:`,
      `https://smartscaletech.vercel.app/free-ats-resume-checker`,
    ].join('\n');
  };

  const shareOnLinkedIn = async () => {
    trackEvent('cta_click', { cta: 'share_ats_linkedin' });
    try {
      await navigator.clipboard.writeText(getLinkedInShareText());
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 4000);
    } catch {
      // Ignore clipboard failure
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
      setTimeout(() => setCopiedShare(false), 4000);
    } catch {
      // Ignore
    }
  };

  const bookRewriteUrl = `https://wa.me/919000859695?text=${encodeURIComponent(
    `Hello SmartScaleTech,\n\nI ran my resume through your ${
      scanMode === 'jd' ? 'Resume vs Job Description Matcher' : `ATS Scanner for ${role}`
    } and scored *${result?.score}/100*.\n\nMissing keywords:\n${
      result?.missingKeywords.slice(0, 8).join(', ') || 'None'
    }\n\nI would like to book a resume review.`
  )}`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
          100% Free · Browser-Side Diagnostic
        </p>
        <h1 className="text-hero-display font-extrabold text-[#111111]">
          ATS Resume &amp; JD Keyword Diagnostic
        </h1>
        <p className="mt-3 text-base text-[#57534E] leading-relaxed">
          Drop a plain-text resume file (`.txt`, `.md`, `.csv`) or paste your CV text to inspect
          keyword coverage, measurable bullets, and ATS section readability locally.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#D8D3C9] space-y-6">
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#F3EEE3] border border-[#D8D3C9]">
            <button
              type="button"
              onClick={() => setScanMode('role')}
              className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                scanMode === 'role' ? 'bg-[#111111] text-white' : 'text-[#57534E] hover:text-[#111111]'
              }`}
            >
              <Briefcase size={14} /> Role Benchmark Scan
            </button>
            <button
              type="button"
              onClick={() => setScanMode('jd')}
              className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                scanMode === 'jd' ? 'bg-[#111111] text-white' : 'text-[#57534E] hover:text-[#111111]'
              }`}
            >
              <Target size={14} /> Resume vs. Job Description
            </button>
          </div>

          <form onSubmit={handleScan} className="space-y-5">
            {scanMode === 'role' ? (
              <div>
                <label
                  htmlFor="ats-role"
                  className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
                >
                  Target Role Benchmark
                </label>
                <select
                  id="ats-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-sm font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
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
                <label
                  htmlFor="ats-jd"
                  className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
                >
                  Target Job Description
                </label>
                <textarea
                  id="ats-jd"
                  required
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the Job Description requirements from LinkedIn, Naukri, or company careers..."
                  className="w-full p-3.5 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-xs sm:text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E] resize-y"
                />
              </div>
            )}

            {/* Drag and Drop File Zone */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                  Upload Plain-Text File or Paste Below
                </span>
                <button
                  onClick={handleLoadSample}
                  type="button"
                  className="text-xs font-bold text-[#D9541E] hover:underline cursor-pointer"
                >
                  Load Sample Data
                </button>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`rounded-xl border border-dashed p-4 text-center transition-colors ${
                  isDragging
                    ? 'border-[#D9541E] bg-[#D9541E]/5'
                    : 'border-[#D8D3C9] bg-[#F3EEE3]/35'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.csv,text/plain"
                  onChange={handleFileChange}
                  className="sr-only"
                  id="resume-file-upload"
                />
                {uploadedFileName ? (
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-[#111111] inline-flex items-center gap-1.5">
                      <FileText size={15} className="text-[#16845B]" /> Loaded: {uploadedFileName}
                    </span>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="resume-file-upload"
                        className="font-bold text-[#D9541E] hover:underline cursor-pointer"
                      >
                        Replace File
                      </label>
                      <button
                        type="button"
                        onClick={handleClearFile}
                        className="font-bold text-[#57534E] hover:text-[#111111] cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="resume-file-upload"
                    className="flex flex-col items-center gap-1.5 cursor-pointer py-1"
                  >
                    <Upload size={18} className="text-[#57534E]" />
                    <span className="text-xs font-semibold text-[#111111]">
                      Drag &amp; drop a <code>.txt</code> / <code>.md</code> / <code>.csv</code> resume
                      or <span className="text-[#D9541E] underline">browse file</span>
                    </span>
                    <span className="text-[11px] text-[#57534E]">
                      Max 2 MB · For PDF/DOCX files, copy &amp; paste plain text below
                    </span>
                  </label>
                )}
              </div>

              {fileError && (
                <StatusBanner tone="error" className="mt-3">
                  {fileError}
                </StatusBanner>
              )}
            </div>

            <div>
              <label
                htmlFor="ats-resume-text"
                className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
              >
                Resume Content
              </label>
              <textarea
                id="ats-resume-text"
                required
                rows={8}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your Summary, Skills, Experience, Projects, and Education text here..."
                className="w-full p-4 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-xs sm:text-sm font-mono text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E] resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="ats-user-name"
                  className="block text-[11px] font-bold text-[#57534E] uppercase tracking-wider mb-1"
                >
                  Your Name (Optional, to log follow-up)
                </label>
                <input
                  id="ats-user-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Optional"
                  className="w-full h-10 px-3 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>
              <div>
                <label
                  htmlFor="ats-user-phone"
                  className="block text-[11px] font-bold text-[#57534E] uppercase tracking-wider mb-1"
                >
                  WhatsApp Number (Optional)
                </label>
                <input
                  id="ats-user-phone"
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="Optional"
                  className="w-full h-10 px-3 rounded-xl bg-[#F3EEE3]/45 border border-[#D8D3C9] text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={
                isAnalyzing ||
                !resumeText.trim() ||
                (scanMode === 'jd' && !jobDescription.trim())
              }
              className="w-full"
            >
              {isAnalyzing ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Resume Structure &amp; Keywords...
                </span>
              ) : (
                <>
                  {scanMode === 'jd' ? 'Compare Resume vs. JD' : 'Run ATS Diagnostic'}{' '}
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-4">
          {result ? (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D8D3C9] space-y-6">
              <div className="text-center pb-5 border-b border-[#EAE3D5]">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E] block mb-1">
                  {result.mode === 'jd' ? 'JD Keyword Alignment' : 'Local ATS Structure Estimate'}
                </span>
                <div className="flex items-baseline justify-center gap-1.5 tabular-nums">
                  <span
                    className={`text-5xl font-extrabold ${
                      result.score >= 80
                        ? 'text-[#16845B]'
                        : result.score >= 60
                        ? 'text-[#D9541E]'
                        : 'text-[#C43D3D]'
                    }`}
                  >
                    {result.score}
                  </span>
                  <span className="text-xl font-bold text-[#9E988C]">/100</span>
                </div>
                <p className="mt-2 text-xs font-bold text-[#111111]">{result.grade}</p>
              </div>

              <StatusBanner tone="info">
                Diagnostic estimate based on local keyword &amp; structure heuristics—not an
                employer hiring guarantee.
              </StatusBanner>

              {/* Sections */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111111]">Standard Sections</span>
                  <span className="text-[#57534E] tabular-nums">{result.wordCount} words</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Summary', 'Skills', 'Experience', 'Projects', 'Education'].map((sec) => {
                    const found = result.sectionsFound.includes(sec);
                    return (
                      <span
                        key={sec}
                        className={`px-2 py-1 rounded-md text-[11px] font-semibold inline-flex items-center gap-1 border ${
                          found
                            ? 'bg-[#16845B]/10 border-[#16845B]/30 text-[#111111]'
                            : 'bg-[#C43D3D]/10 border-[#C43D3D]/30 text-[#111111]'
                        }`}
                      >
                        {found ? <Check size={11} /> : <X size={11} />} {sec}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Matched */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111111]">
                    Detected Keywords ({result.matchedKeywords.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchedKeywords.length > 0 ? (
                    result.matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded bg-[#F3EEE3] border border-[#D8D3C9] text-[#111111] text-[11px] font-semibold"
                      >
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#57534E]">No target keywords matched yet.</span>
                  )}
                </div>
              </div>

              {/* Missing */}
              {result.missingKeywords.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#111111] block">
                    Missing Signals ({result.missingKeywords.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.slice(0, 12).map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded bg-[#C43D3D]/10 border border-[#C43D3D]/30 text-[#111111] text-[11px] font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Risks & Strengths */}
              <div className="space-y-2 pt-3 border-t border-[#EAE3D5] text-xs">
                {result.risks.map((risk, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-[#111111] bg-[#C43D3D]/8 p-2.5 rounded-xl border border-[#C43D3D]/25"
                  >
                    <AlertTriangle size={14} className="shrink-0 mt-0.5 text-[#C43D3D]" />
                    <span>{risk}</span>
                  </div>
                ))}
                {result.strengths.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-[#111111] bg-[#16845B]/8 p-2.5 rounded-xl border border-[#16845B]/25"
                  >
                    <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-[#16845B]" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <a href={bookRewriteUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="primary" size="md" className="w-full">
                    <MessageCircle size={15} /> Book Resume Review (WhatsApp)
                  </Button>
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/request-service">
                    <Button variant="secondary" size="sm" className="w-full">
                      Request Proposal
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setResult(null)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D3C9] text-xs font-bold text-[#111111] hover:bg-[#F3EEE3] cursor-pointer"
                  >
                    <RotateCcw size={13} /> Re-analyze
                  </button>
                </div>

                <div className="pt-2 border-t border-[#EAE3D5] flex items-center justify-between text-[11px] text-[#57534E]">
                  <button
                    type="button"
                    onClick={shareOnLinkedIn}
                    className="inline-flex items-center gap-1 font-bold text-[#111111] hover:text-[#D9541E] cursor-pointer"
                  >
                    <Linkedin size={13} /> Share Summary
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSharePreview((v) => !v)}
                    className="hover:underline cursor-pointer"
                  >
                    {showSharePreview ? 'Hide Text' : 'Preview Post'}
                  </button>
                  <button
                    type="button"
                    onClick={copyShareTextOnly}
                    className="inline-flex items-center gap-1 font-semibold hover:text-[#111111] cursor-pointer"
                  >
                    <Copy size={12} /> {copiedShare ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {showSharePreview && (
                  <pre className="p-3 bg-[#F3EEE3] rounded-xl border border-[#D8D3C9] text-[11px] font-mono text-[#111111] whitespace-pre-wrap">
                    {getLinkedInShareText()}
                  </pre>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-[#D8D3C9] text-center space-y-3">
              <div className="h-12 w-12 rounded-xl bg-[#F3EEE3] border border-[#D8D3C9] text-[#111111] flex items-center justify-center mx-auto">
                <TrendingUp size={22} />
              </div>
              <h2 className="text-lg font-extrabold text-[#111111]">
                {scanMode === 'jd' ? 'Resume vs. JD Check' : 'Role Benchmark Audit'}
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Upload a plain-text resume or paste your draft on the left to inspect missing stack
                keywords, quantified bullets, and standard section headings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
