import { motion } from 'motion/react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[60] flex flex-col gap-3 sm:gap-4">
      <motion.a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, x: -5 }}
        className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30 transition-shadow hover:shadow-xl"
        title="Chat with us"
      >
        <MessageCircle size={24} fill="currentColor" />
      </motion.a>

      <motion.a
        href="tel:+911234567890"
        whileHover={{ scale: 1.1, x: -5 }}
        className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl"
        title="Call us"
      >
        <Phone size={20} fill="currentColor" />
      </motion.a>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="h-12 w-12 rounded-full bg-white border border-slate-100 text-slate-400 flex items-center justify-center shadow-lg shadow-slate-200/50 transition-all hover:bg-slate-50 hover:text-primary"
          title="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </div>
  );
};
