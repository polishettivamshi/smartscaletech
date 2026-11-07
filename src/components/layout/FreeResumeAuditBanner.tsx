import { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export const FreeResumeAuditBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <aside aria-label="Announcement" className="bg-gradient-to-r from-indigo-900 via-primary to-indigo-800 text-white px-3 sm:px-4 py-2.5 text-xs font-semibold relative z-50 border-b border-white/10 shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shrink-0 animate-pulse">
            <Sparkles size={11} /> 100% Free
          </span>
          <p className="text-white text-center sm:text-left leading-tight truncate sm:whitespace-normal">
            <span className="font-bold">Not getting interview calls?</span> Send your resume for a{' '}
            <strong className="text-amber-300">Free 5-Minute ATS Audit</strong> by Founder Vamshi!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20would%20like%20a%20100%25%20Free%205-Minute%20ATS%20Audit%20for%20my%20resume."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] shadow-sm transition-all hover:scale-105"
          >
            <MessageCircle size={13} />
            <span>Send on WhatsApp</span>
          </a>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
