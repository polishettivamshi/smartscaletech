import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import { SEO, SITE_URL } from '../../lib/seo';
import { Button } from '../ui/Button';
import { Breadcrumb } from '../ui/Breadcrumb';
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
      'Switch to a clean, single-column Word or LaTeX ATS structure with standard section headings so Workday, Taleo, and Naukri parse every skill accurately.',
    fixService: 'ATS Resume Writing',
    fixRoute: '/services/resume-writing',
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
    fixRoute: '/services/resume-writing',
    options: [
      { label: 'Yes — almost every bullet highlights measurable metrics', score: 20 },
      { label: 'Some metrics, mostly general project descriptions', score: 10 },
      { label: 'No numbers yet — just lists of duties or coursework', score: 3 },
    ],
  },
  {
    id: 'linkedin-search',
    category: 'LinkedIn Search Strength',
    question: 'Does your LinkedIn headline showcase your exact role, core stack, and proof points?',
    recommendation:
      'Update your headline with searchable role + tech keywords, add a branded banner image, and fill out all 50 skill tags.',
    fixService: 'LinkedIn Optimization',
    fixRoute: '/services/linkedin-optimization',
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
      'Complete 100% of your Naukri career preferences, IT skills matrix, and align your portal headline with target role keywords.',
    fixService: 'Naukri & Indeed Optimization',
    fixRoute: '/services/naukri-optimization',
    options: [
      { label: 'Updated with target role headline & structured skills', score: 15 },
      { label: 'Created an account once, resume uploaded without profile tuning', score: 7 },
      { label: 'Not set up or incomplete', score: 2 },
    ],
  },
  {
    id: 'github-portfolio',
    category: 'GitHub & Portfolio Proof',
    question: 'Can recruiters inspect pinned projects or a live portfolio link directly from your resume?',
    recommendation:
      'Pin 3–4 flagship projects with clean READMEs and launch a fast personal portfolio website so hiring managers verify your code quickly.',
    fixService: 'Portfolio Website & GitHub Audit',
    fixRoute: '/services/personal-portfolio',
    options: [
      { label: 'Yes — custom portfolio site + documented pinned GitHub repos', score: 15 },
      { label: 'Have GitHub repos, but no profile README or live portfolio site', score: 8 },
      { label: 'No live links or portfolio shared yet', score: 2 },
    ],
  },
  {
    id: 'interview-prep',
    category: 'Interview Readiness',
    question: 'If a hiring panel called you tomorrow, how prepared are you for technical & HR walkthroughs?',
    recommendation:
      'Run structured mock rounds covering project architecture decisions and offer benchmarking before final loops.',
    fixService: 'Mock Interview Coaching',
    fixRoute: '/services/interview-preparation',
    options: [
      { label: 'Practiced mock rounds & prepared crisp project walkthroughs', score: 15 },
      { label: 'Confident technically, less structured on HR & architecture stories', score: 8 },
      { label: 'Need structured mock interview feedback', score: 3 },
    ],
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
      label: 'High Screening Risk',
      color: 'text-[#C43D3D]',
    };
    if (score >= 85) {
      level = {
        label: 'Strong Application Setup',
        color: 'text-[#16845B]',
      };
    } else if (score >= 65) {
      level = {
        label: 'Solid Base, Key Signals Missing',
        color: 'text-[#D9541E]',
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
    `Hello SmartScaleTech,\n\nI completed the 60-Second Job Readiness Audit and scored *${totalScore}/100* (${tier.label}).\n\nFocus areas:\n${
      bottlenecks.map((b) => `• ${b.category}`).join('\n') || '• Final review & polish'
    }`
  )}`;

  return (
    <main className="bg-[#F3EEE3] text-[#111111] min-h-screen pt-10 sm:pt-14 pb-20">
      <SEO
        title="Free 60-Second Job Readiness Audit | SmartScaleTech (SST)"
        description="Self-assess your ATS resume formatting, quantified impact bullets, LinkedIn visibility, Naukri setup, and portfolio proof in 6 quick steps."
        path="/job-readiness-audit"
        jsonLd={auditJsonLd}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Free Tools', to: '/tools' },
            { label: 'Job Readiness Audit' },
          ]}
          className="mb-7"
        />

        <div className="max-w-3xl mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E] mb-2">
            Free 6-Checkpoint Diagnostic
          </p>
          <h1 className="text-hero-display font-extrabold text-[#111111]">
            60-Second Job Readiness Self-Audit
          </h1>
          <p className="mt-3 text-base text-[#57534E] leading-relaxed">
            Pinpoint which signals in your resume, LinkedIn, GitHub, or interview preparation need
            strengthening before submitting applications.
          </p>
        </div>

        {/* Step Counter */}
        <div className="mb-8 bg-white p-4 rounded-xl border border-[#D8D3C9] flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-[#57534E] mb-1.5">
              <span>Checkpoints Completed</span>
              <span className="tabular-nums text-[#111111]">
                {answeredCount} of {QUESTIONS.length}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#EAE3D5] overflow-hidden">
              <div
                className="h-full bg-[#D9541E] transition-all duration-300"
                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={() => setAnswers({})}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#57534E] hover:text-[#111111] cursor-pointer shrink-0"
            >
              <RotateCcw size={13} /> Reset
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            {QUESTIONS.map((q, index) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-6 border border-[#D8D3C9] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9541E]">
                    0{index + 1} · {q.category}
                  </span>
                  {answers[q.id] !== undefined && (
                    <CheckCircle2 size={16} className="text-[#16845B]" />
                  )}
                </div>
                <h2 className="text-base font-extrabold text-[#111111]">{q.question}</h2>
                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.score)}
                        aria-pressed={selected}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#F3EEE3]/75 border-[#111111] text-[#111111] font-bold'
                            : 'bg-white border-[#D8D3C9] text-[#57534E] hover:border-[#111111]/45'
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

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            {isComplete ? (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D8D3C9] space-y-6">
                <div className="text-center pb-5 border-b border-[#EAE3D5]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                    Readiness Index
                  </span>
                  <div className="mt-1 flex items-baseline justify-center gap-1.5 tabular-nums">
                    <span className={`text-5xl font-extrabold ${tier.color}`}>{totalScore}</span>
                    <span className="text-xl font-bold text-[#9E988C]">/100</span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-[#111111]">{tier.label}</p>
                </div>

                {bottlenecks.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
                      Priority Improvements ({bottlenecks.length})
                    </p>
                    {bottlenecks.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-xl bg-[#F3EEE3]/55 border border-[#D8D3C9] space-y-1.5"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                          <AlertTriangle size={14} className="shrink-0 text-[#D9541E]" />
                          <span>{b.category}</span>
                        </div>
                        <p className="text-xs text-[#57534E] leading-relaxed">{b.recommendation}</p>
                        <Link
                          to={b.fixRoute}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D9541E] hover:underline"
                        >
                          Recommended: {b.fixService} <ArrowRight size={11} />
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#16845B]/10 border border-[#16845B]/30 text-xs text-[#111111] font-medium flex items-start gap-2">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-[#16845B]" />
                    <span>
                      Strong setup across all 6 checkpoints. Tailor each submission using our ATS
                      JD Matcher before applying.
                    </span>
                  </div>
                )}

                <div className="space-y-2.5 pt-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="primary" size="md" className="w-full">
                      <MessageCircle size={15} /> Review Gaps on WhatsApp
                    </Button>
                  </a>
                  <Link to="/custom-package-builder" className="block">
                    <Button variant="secondary" size="md" className="w-full">
                      Customize Service Bundle <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-[#D8D3C9] text-center space-y-3">
                <h2 className="text-lg font-extrabold text-[#111111]">
                  Complete All {QUESTIONS.length} Checkpoints
                </h2>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Select an option for each step on the left to calculate your readiness score and
                  prioritized roadmap.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
