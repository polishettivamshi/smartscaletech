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
    <div className="fixed bottom-16 right-4 sm:right-6 z-40 flex items-center gap-2">
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="h-10 w-10 rounded-xl bg-white border border-[#D8D3C9] text-[#111111] flex items-center justify-center shadow-md transition-colors hover:border-[#111111] hover:text-[#D9541E] cursor-pointer"
          title="Back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      <a
        href="https://wa.me/919000859695"
        target="_blank"
        rel="noopener noreferrer"
        className="advisor-glow h-10 px-4 rounded-xl bg-[#111111] hover:bg-[#D9541E] text-white flex items-center gap-2 transition-colors text-xs font-bold whitespace-nowrap"
        title="Chat on WhatsApp (+91 90008 59695)"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={15} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
};
