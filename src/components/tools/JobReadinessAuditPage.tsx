import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { SEO, SITE_URL } from '../../lib/seo';
import { Button } from '../ui/Button';
import { trackEvent } from '../../lib/analytics';

interface Question {
  id: string;
  category: string;
  question: string;
  recommendation: string;
  fixService: string;
  fixRoute: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'resume-format',
    category: 'ATS Resume Structure',
    question: 'What format is your current resume built in?',
    recommendation:
      'Switch to a clean, single-column Word/LaTeX ATS structure with standard section headings so Workday, Taleo, and Naukri parse every skill accurately.',
    fixService: 'ATS Resume Writing',
    fixRoute: '/ats-resume-writing-hyderabad',
    options: [
      { label: 'Clean single-column Word / LaTeX / standard ATS format', score: 20 },
      { label: 'Canva / 2-column graphic template with icons or progress bars', score: 6 },
      { label: 'Old college doc / not updated recently', score: 3 },
    ],
  },
  {
    id: 'quantified-bullets',
    category: 'Impact & STAR Metrics',
    question: 'Do your experience or project bullets contain real numbers (%, latency, users, scale)?',
    recommendation:
      'Rewrite passive responsibility lines into Action + Metric + Outcome bullets (e.g., "Reduced API latency by 38% across 20K daily requests").',
    fixService: 'ATS Resume Writing',
    fixRoute: '/ats-resume-writing-hyderabad',
    options: [
      { label: 'Yes — almost every bullet highlights measurable metrics', score: 20 },
      { label: 'Some metrics, mostly general project descriptions', score: 10 },
      { label: 'No numbers yet — just lists of duties or coursework', score: 3 },
    ],
  },
  {
    id: 'linkedin-search',
    category: 'LinkedIn Search Strength',
    question: 'Does your LinkedIn headline showcase your exact role, core stack, and value proof?',
    recommendation:
      'Update your headline with searchable role + tech keywords, add a branded banner image, and fill out all 50 skill tags.',
    fixService: 'LinkedIn Optimization',
    fixRoute: '/linkedin-profile-optimization-hyderabad',
    options: [
      { label: 'Yes — keyword-rich headline, custom banner & structured About', score: 15 },
      { label: 'Only lists current job title or university name', score: 6 },
      { label: 'Says "Looking for opportunities" or rarely updated', score: 2 },
    ],
  },
  {
    id: 'naukri-indeed',
    category: 'Naukri & Indeed Discovery',
    question: 'How complete and active are your Naukri and Indeed profiles?',
    recommendation:
      'Complete 100% of your Naukri career preferences, IT skills table, and refresh your profile headline regularly so recruiter Nvites climb.',
    fixService: 'Naukri & Indeed Optimization',
    fixRoute: '/custom-package-builder',
    options: [
      { label: '95%+ complete with role headline & active visibility', score: 15 },
      { label: 'Created an account once, resume uploaded without profile tuning', score: 7 },
      { label: 'Not set up or less than 60% complete', score: 2 },
    ],
  },
  {
    id: 'github-portfolio',
    category: 'GitHub & Portfolio Proof',
    question: 'Can recruiters inspect pinned projects or a live portfolio link directly from your resume?',
    recommendation:
      'Pin 3–4 flagship projects with clean READMEs and launch a fast personal portfolio website so hiring managers verify your skills in 30 seconds.',
    fixService: 'Portfolio Website & GitHub Audit',
    fixRoute: '/portfolio-website-hyderabad',
    options: [
      { label: 'Yes — custom portfolio site + documented pinned GitHub repos', score: 15 },
      { label: 'Have GitHub repos, but no profile README or live portfolio site', score: 8 },
      { label: 'No live links or portfolio shared yet', score: 2 },
    ],
  },
  {
    id: 'interview-prep',
    category: 'Interview & Offer Readiness',
    question: 'If an HR/Tech interviewer called you tomorrow, how ready are you for project & CTC rounds?',
    recommendation:
      'Run at least 2 realistic mock technical/HR sessions and benchmark target CTC ranges before final interviews.',
    fixService: 'Interview Coaching & Salary Strategy',
    fixRoute: '/custom-package-builder',
    options: [
      { label: 'Practiced mock rounds & prepared crisp project walkthroughs', score: 15 },
      { label: 'Confident technically, but nervous on HR/salary negotiation', score: 8 },
      { label: 'Need structured mock interview practice & feedback', score: 3 },
    ],
  },
];

const AUDIT_FAQS = [
  {
    q: 'How is the Job Readiness Score calculated?',
    a: 'Your score (out of 100) weights 6 real screening checkpoints used by Hyderabad & pan-India tech recruiters: ATS format compatibility, quantified STAR metrics, LinkedIn keyword visibility, Naukri/Indeed profile strength, GitHub/portfolio proof, and interview readiness.',
  },
  {
    q: 'What is a good score to target before applying aggressively?',
    a: 'Aim for 85+/100 before sending out dozens of applications. Applying with a 40–60/100 profile often wastes good job openings due to automated ATS filtering.',
  },
];

const auditJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '60-Second Job Readiness Self-Audit by SmartScaleTech',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/job-readiness-audit`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    provider: { '@id': `${SITE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AUDIT_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export const JobReadinessAuditPage = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === QUESTIONS.length;

  const { totalScore, bottlenecks, tier } = useMemo(() => {
    const score = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const maxMap: Record<string, number> = {
      'resume-format': 20,
      'quantified-bullets': 20,
      'linkedin-search': 15,
      'naukri-indeed': 15,
      'github-portfolio': 15,
      'interview-prep': 15,
    };

    const issues = QUESTIONS.filter((q) => (answers[q.id] ?? 0) < maxMap[q.id] * 0.75);

    let level = {
      label: 'Critical Shortlisting Risk',
      color: 'text-rose-600',
      badge: 'bg-rose-100 text-rose-800',
    };
    if (score >= 85) {
      level = {
        label: 'Interview Ready (Top 10%)',
        color: 'text-emerald-600',
        badge: 'bg-emerald-100 text-emerald-800',
      };
    } else if (score >= 65) {
      level = {
        label: 'Good Foundation, Missing Key Signals',
        color: 'text-amber-600',
        badge: 'bg-amber-100 text-amber-800',
      };
    }

    return { totalScore: score, bottlenecks: issues, tier: level };
  }, [answers]);

  const handleSelect = (qId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: score }));
    if (Object.keys(answers).length + 1 === QUESTIONS.length) {
      trackEvent('cta_click', { cta: 'completed_job_readiness_audit' });
    }
  };

  const whatsappUrl = `https://wa.me/919000859695?text=${encodeURIComponent(
    `Hello Vamshi,\n\nI just took the SmartScaleTech 60-Second Job Readiness Audit and scored *${totalScore}/100* (${tier.label}).\n\nAreas needing optimization:\n${
      bottlenecks.map((b) => `• ${b.category}`).join('\n') || '• Final polish & interview readiness'
    }\n\nPlease suggest the best upgrade plan for me.`
  )}`;

  return (
    <main className="bg-page text-page min-h-screen pt-24 pb-20">
      <SEO
        title="Free 60-Second Job Readiness Audit | Smart Scale Tech (SST)"
        description="Find out why your job applications aren't getting callbacks. Take Smart Scale Tech (SST)'s free 6-checkpoint Job Readiness Audit covering ATS resume, LinkedIn, Naukri, and portfolio strength."
        keywords="job readiness audit free, why not getting interview calls india, resume linkedin naukri checkup, career readiness score, sst job readiness audit, smart scale tech hyderabad"
        path="/job-readiness-audit"
        jsonLd={auditJsonLd}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} /> Free 6-Checkpoint Diagnostic
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Why Aren&apos;t You Getting <span className="text-primary">Interview Calls?</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Answer 6 quick questions to calculate your real Job Readiness Score (0–100) and pinpoint which fixes unlock recruiter callbacks.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
              <span>Diagnostic Progress</span>
              <span>
                {answeredCount} of {QUESTIONS.length} answered
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={() => setAnswers({})}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer shrink-0"
            >
              <RotateCcw size={13} /> Reset
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Questions Column */}
          <div className="lg:col-span-7 space-y-4">
            {QUESTIONS.map((q, index) => (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {index + 1}. {q.category}
                  </span>
                  {answers[q.id] !== undefined && (
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">{q.question}</h2>
                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.score)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          selected
                            ? 'bg-primary/8 border-primary text-primary shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Live Results Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            {isComplete ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-primary/30 shadow-2xl space-y-6">
                <div className="text-center pb-5 border-b border-slate-100">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Your Job Readiness Score
                  </span>
                  <div className="mt-1 flex items-baseline justify-center gap-1.5">
                    <span className={`text-6xl font-black ${tier.color}`}>{totalScore}</span>
                    <span className="text-2xl font-bold text-slate-300">/100</span>
                  </div>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${tier.badge}`}>
                    {tier.label}
                  </span>
                </div>

                {bottlenecks.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Priority Bottlenecks ({bottlenecks.length})
                    </p>
                    {bottlenecks.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                          <AlertTriangle size={14} className="shrink-0 text-rose-600" />
                          <span>{b.category}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed">
                          {b.recommendation}
                        </p>
                        <Link
                          to={b.fixRoute}
                          className="inline-flex items-center gap-1 text-[11px] font-black text-primary hover:underline"
                        >
                          Recommended: {b.fixService} <ArrowRight size={11} />
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-start gap-2">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-600" />
                    <span>
                      Strong profile across all 6 checkpoints! Use our JD Match mode in the ATS Checker to tailor each job application.
                    </span>
                  </div>
                )}

                <div className="space-y-2.5 pt-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-lg shadow-green-500/20">
                      <MessageCircle size={16} className="mr-1.5" /> Fix My Bottlenecks on WhatsApp
                    </Button>
                  </a>
                  <Link to="/custom-package-builder" className="block">
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-xl border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      Customize My Service Bundle <ArrowRight size={14} className="ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Sparkles size={26} />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Answer All {QUESTIONS.length} Checkpoints
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select an option for each question on the left to unlock your live score (0–100) and personalized fix roadmap.
                </p>
                <div className="pt-2 text-[11px] font-bold text-slate-400">
                  Takes less than 60 seconds · Zero login required
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
