import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FreeResumeAuditBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <aside aria-label="Announcement" className="bg-slate-900 text-white px-3 sm:px-4 py-2 text-xs font-medium relative z-50 border-b border-slate-800">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start min-w-0">
          <span className="text-amber-300 font-bold shrink-0">Free 5-Min Audit</span>
          <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
          <p className="text-slate-200 truncate">
            Not getting interview calls? Send your resume for a quick ATS review
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://wa.me/919000859695?text=Hello%20Vamshi%2C%20I%20would%20like%20a%20100%25%20Free%205-Minute%20ATS%20Audit%20for%20my%20resume."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors whitespace-nowrap"
          >
            <MessageCircle size={13} />
            <span>WhatsApp Resume</span>
          </a>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Dismiss banner"
            aria-label="Dismiss announcement banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
