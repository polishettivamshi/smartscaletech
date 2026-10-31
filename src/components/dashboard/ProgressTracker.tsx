import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  Calendar, 
  ArrowUpRight, 
  PlusCircle, 
  RotateCcw, 
  Share2, 
  ExternalLink, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Target, 
  Sparkles,
  ChevronRight,
  Clock,
  Briefcase
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface ProgressMilestone {
  id: string;
  date: string;
  title: string;
  type: 'initial_scan' | 'rewrite' | 'linkedin' | 'interview' | 'offer' | 'custom';
  score: number;
  scoreChange?: number;
  description: string;
  tags: string[];
  status: 'completed' | 'verified';
}

const DEFAULT_MILESTONES: ProgressMilestone[] = [
  {
    id: 'm1',
    date: 'Week 1',
    title: 'Initial Resume Benchmark',
    type: 'initial_scan',
    score: 52,
    description: 'Original resume had multi-column tables, missing tech keywords, and low Workday ATS readability.',
    tags: ['Original Draft', 'Workday Parse Failed', '0 Callbacks'],
    status: 'completed',
  },
  {
    id: 'm2',
    date: 'Week 2',
    title: 'SmartScale ATS Re-Engineering (V1)',
    type: 'rewrite',
    score: 81,
    scoreChange: +29,
    description: 'Rebuilt into clean single-column format, added 45+ role keywords, restructured skills hierarchy.',
    tags: ['Single Column Layout', 'Role Keywords Added', 'ATS Friendly'],
    status: 'completed',
  },
  {
    id: 'm3',
    date: 'Week 3',
    title: 'Impact Metrics & LinkedIn Sync (V2)',
    type: 'linkedin',
    score: 91,
    scoreChange: +10,
    description: 'Added quantified achievements (XYZ formula), optimized LinkedIn headline hook and recruiter search keywords.',
    tags: ['Quantified Impact', 'LinkedIn Optimized', 'Search Hits +300%'],
    status: 'completed',
  },
  {
    id: 'm4',
    date: 'Week 4 (Current)',
    title: 'Interview-Ready Certification',
    type: 'offer',
    score: 98,
    scoreChange: +7,
    description: 'Final human polish by SmartScaleTech team. 98/100 match on Workday, Greenhouse & Darwinbox parsers.',
    tags: ['98/100 Top Tier', 'Interview Calls Active', 'Greenhouse Verified'],
    status: 'verified',
  },
];

const STORAGE_KEY = 'smartscale_user_progress_milestones_v1';
const PROFILE_KEY = 'smartscale_user_profile_data_v1';

export const ProgressTracker: React.FC = () => {
  const [milestones, setMilestones] = useState<ProgressMilestone[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved milestones', e);
        }
      }
    }
    return DEFAULT_MILESTONES;
  });

  const [candidateName, setCandidateName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(PROFILE_KEY) || 'Candidate / Member';
    }
    return 'Candidate / Member';
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // New milestone form state
  const [newTitle, setNewTitle] = useState('');
  const [newScore, setNewScore] = useState(95);
  const [newType, setNewType] = useState<ProgressMilestone['type']>('interview');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('Today');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
    } catch (e) {
      console.error('Error saving milestones', e);
    }
  }, [milestones]);

  const saveCandidateName = (name: string) => {
    setCandidateName(name);
    setIsEditingName(false);
    try {
      localStorage.setItem(PROFILE_KEY, name);
    } catch (e) {
      console.error('Error saving profile name', e);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset progress tracker to the recommended verified benchmark timeline?')) {
      setMilestones(DEFAULT_MILESTONES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MILESTONES));
    }
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const lastScore = milestones.length > 0 ? milestones[milestones.length - 1].score : 50;
    const scoreDiff = newScore - lastScore;

    const newEntry: ProgressMilestone = {
      id: 'm_' + Date.now(),
      date: newDate.trim() || 'Today',
      title: newTitle.trim(),
      type: newType,
      score: Math.min(100, Math.max(0, Number(newScore))),
      scoreChange: scoreDiff,
      description: newDesc.trim() || 'Progress checkpoint recorded.',
      tags: [newType.toUpperCase(), `${newScore}/100 Score`],
      status: 'completed',
    };

    setMilestones((prev) => [...prev, newEntry]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewScore(95);
  };

  const currentMilestone = milestones[milestones.length - 1] || DEFAULT_MILESTONES[DEFAULT_MILESTONES.length - 1];
  const initialMilestone = milestones[0] || DEFAULT_MILESTONES[0];
  const totalGain = currentMilestone.score - initialMilestone.score;

  const handleShareLinkedIn = () => {
    const text = `🚀 Tracked my career profile progress with SmartScaleTech (Hitech City, Hyderabad)!
📈 ATS Score improvement: From ${initialMilestone.score}/100 to ${currentMilestone.score}/100 (+${totalGain} pts)!
⚡ Single-column ATS optimization and keyword alignment makes a massive difference in recruiter callbacks.

Check your score and track your progress at https://smartscaletech.vercel.app/dashboard`;

    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://smartscaletech.vercel.app/dashboard')}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-10 text-white shadow-2xl border border-white/10 mb-8">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black tracking-wide mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE CANDIDATE DASHBOARD
            </div>
            
            <div className="flex items-center gap-3">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={candidateName}
                    autoFocus
                    onBlur={(e) => saveCandidateName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveCandidateName(e.currentTarget.value)}
                    className="bg-slate-800 text-white font-black text-2xl sm:text-3xl px-3 py-1 rounded-xl border border-primary/50 focus:outline-hidden"
                  />
                  <Button size="sm" onClick={() => setIsEditingName(false)}>Save</Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 group">
                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                    {candidateName}&apos;s Career Progress
                  </h1>
                  <button 
                    onClick={() => setIsEditingName(true)}
                    className="text-xs text-slate-400 hover:text-white underline decoration-dotted transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Track how your ATS pass rate, recruiter visibility, and interview readiness compound after using SmartScaleTech career services.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg shadow-primary/25 flex items-center gap-2"
            >
              <PlusCircle size={16} /> Log Milestone
            </Button>
            
            <button
              onClick={handleShareLinkedIn}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all flex items-center gap-2 border border-white/10"
              title="Share progress to LinkedIn"
            >
              <Share2 size={16} className="text-[#0A66C2]" />
              {copiedShare ? 'Copied & Opening!' : 'Share Milestone'}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5"
              title="Reset to recommended demo timeline"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Quick KPI stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Current ATS Score</span>
              <Target size={14} className="text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                {currentMilestone.score}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/ 100</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              +{totalGain} pts total improvement
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Recruiter Visibility</span>
              <Sparkles size={14} className="text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">5.4x</span>
              <span className="text-xs text-slate-400 font-semibold">Growth</span>
            </div>
            <div className="text-[11px] font-bold text-slate-300 mt-1">
              ~65 search appearances / wk
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Interview Readiness</span>
              <ShieldCheck size={14} className="text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">98%</span>
              <span className="text-xs text-emerald-400 font-semibold">Ready</span>
            </div>
            <div className="text-[11px] font-bold text-slate-300 mt-1">
              Workday & Greenhouse Pass
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Milestones Logged</span>
              <Award size={14} className="text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">{milestones.length}</span>
              <span className="text-xs text-slate-400 font-semibold">Checkpoints</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-400 mt-1">
              Active Career Sprint
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Optimization Journey & Milestones
            </h2>
            <span className="text-xs font-bold text-slate-400">
              Persisted in Local Browser
            </span>
          </div>

          {/* Stepper container */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8">
            {milestones.map((m, index) => {
              const isLast = index === milestones.length - 1;
              const isFirst = index === 0;

              return (
                <div key={m.id} className="relative group">
                  {/* Stepper node circle */}
                  <div 
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border-4 border-white shadow-md transition-all ${
                      isLast 
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 scale-110' 
                        : isFirst 
                        ? 'bg-slate-400 text-white' 
                        : 'bg-primary text-white'
                    }`}
                  >
                    {isLast ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <span className="text-xs font-black">{index + 1}</span>
                    )}
                  </div>

                  {/* Card content */}
                  <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    isLast 
                      ? 'bg-emerald-50/40 border-emerald-200/80 shadow-md' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {m.date}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          {m.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-base sm:text-lg font-black ${
                          m.score >= 90 ? 'text-emerald-600' : m.score >= 75 ? 'text-primary' : 'text-slate-600'
                        }`}>
                          {m.score}/100
                        </span>
                        {m.scoreChange !== undefined && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            m.scoreChange >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {m.scoreChange >= 0 ? `+${m.scoreChange}` : m.scoreChange} pts
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {m.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      {m.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}

                      {isLast && (
                        <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1 ml-auto">
                          <CheckCircle2 size={12} /> Certified 98/100
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Repeat-Visitor CTA */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">Targeting a new company or role?</h4>
                <p className="text-xs text-slate-600">Re-scan against new job descriptions to maintain your 98% ATS readiness.</p>
              </div>
            </div>
            <a href="/free-ats-resume-checker">
              <Button size="sm" className="whitespace-nowrap font-bold text-xs">
                Free ATS Scan Tool <ArrowUpRight size={14} className="ml-1" />
              </Button>
            </a>
          </div>
        </div>

        {/* Sidebar (Right 1 col) */}
        <div className="space-y-6">
          {/* Quick Consultation Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">5-Min Human Review</h3>
                <p className="text-xs text-slate-500">Direct with founder Vamshi</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Have an upcoming interview at a Hyderabad tech company? Send your resume PDF on WhatsApp for rapid feedback before submitting.
            </p>

            <a 
              href="https://wa.me/919000859695?text=Hi%20Vamshi,%20I'm%20tracking%20my%20progress%20on%20SmartScaleTech%20and%20would%20like%20a%20quick%205-minute%20resume%20review!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20"
            >
              <MessageCircle size={16} fill="currentColor" /> Chat on WhatsApp (+91 90008 59695)
            </a>
          </div>

          {/* Action Checklist for Repeat Visitors */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-black text-slate-900 text-base mb-3 flex items-center gap-2">
              <Target size={18} className="text-primary" />
              Repeat Visitor Action Checklist
            </h3>
            
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <span><strong>Check ATS parseability</strong> every time you apply to Workday / Greenhouse portals.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <span><strong>Log interview callbacks</strong> to monitor your application-to-call conversion rate.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <span><strong>Update LinkedIn skills</strong> weekly to rank in recruiter talent search filters.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <span><strong>Return to SmartScaleTech</strong> for cover letters & portfolio tweaks when shortlisted.</span>
              </li>
            </ul>
          </div>

          {/* Recommended Upgrade Card */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-primary/5 to-indigo-50 border border-primary/20">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider mb-3">
              <Briefcase size={12} /> Full Package
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">
              Career Launch Combo (₹1,499)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Get your resume, LinkedIn profile, and custom cover letter hand-crafted with 48-hr turnaround and guaranteed 98% ATS pass score.
            </p>
            <a 
              href="/#pricing" 
              className="inline-flex items-center text-xs font-black text-primary hover:text-primary-hover gap-1"
            >
              View Pricing Details <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-1">
              Log Progress Milestone
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Record a new ATS scan, interview call, or profile update to track your career sprint.
            </p>

            <form onSubmit={handleAddMilestone} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Received Interview Call from MNC"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Timeline Label
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. Week 5 or Today"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ATS / Readiness Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newScore}
                    onChange={(e) => setNewScore(Number(e.target.value))}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:outline-hidden font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Type of Milestone
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:outline-hidden bg-white"
                >
                  <option value="interview">📞 Interview Callback Received</option>
                  <option value="rewrite">📄 Resume ATS Revision</option>
                  <option value="linkedin">💼 LinkedIn Profile Update</option>
                  <option value="offer">🎉 Job Offer / Shortlist</option>
                  <option value="initial_scan">🔍 New ATS Scan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes / Observations
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="e.g. Applied via Workday portal; HR called within 48 hours for initial technical round."
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:outline-hidden resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <Button type="submit" size="sm" className="font-bold text-xs">
                  Save Milestone
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
