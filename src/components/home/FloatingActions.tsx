import { motion } from 'motion/react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
      {showScrollTop && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="h-11 w-11 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-slate-600 flex items-center justify-center shadow-lg transition-colors hover:bg-slate-50 hover:text-primary cursor-pointer"
          title="Back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}

      <a
        href="https://wa.me/919000859695"
        target="_blank"
        rel="noopener noreferrer"
        className="h-11 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 text-xs font-bold whitespace-nowrap"
        title="Chat on WhatsApp (+91 90008 59695)"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={18} fill="currentColor" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
};
