import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivityItem {
  id: string;
  name: string;
  city: string;
  action: string;
  timeAgo: string;
  badge: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    name: 'Rohit K.',
    city: 'Hyderabad',
    action: 'booked LinkedIn 360° Profile Optimization',
    timeAgo: '4 mins ago',
    badge: '₹299',
  },
  {
    id: '2',
    name: 'Ananya S.',
    city: 'Bangalore',
    action: 'received 95/100 ATS Resume Makeover',
    timeAgo: '11 mins ago',
    badge: '95/100 ATS',
  },
  {
    id: '3',
    name: 'Karthik V.',
    city: 'Hitech City, Hyderabad',
    action: 'launched Developer Portfolio Website',
    timeAgo: '24 mins ago',
    badge: 'Live Site',
  },
  {
    id: '4',
    name: 'Sneha R.',
    city: 'Pune',
    action: 'got 3 interview calls within 7 days of rewrite',
    timeAgo: '38 mins ago',
    badge: 'Interview Call',
  },
  {
    id: '5',
    name: 'Deepak M.',
    city: 'Chennai',
    action: 'requested Free Service Proposal via WhatsApp',
    timeAgo: '52 mins ago',
    badge: 'Free Proposal',
  },
];

export const LiveActivityTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % recentActivities.length);
        setIsVisible(true);
      }, 600);
    }, 7000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = recentActivities[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[340px] sm:max-w-[380px] pointer-events-auto">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100/90 text-left"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} className="text-emerald-500" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {current.name}
                </span>
                <span className="text-[10px] text-slate-400">· {current.city}</span>
                <span className="ml-auto inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-black bg-primary/10 text-primary">
                  <Sparkles size={9} />
                  {current.badge}
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-600 leading-snug line-clamp-2">
                {current.action}
              </p>
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-50">
                <span className="text-[10px] font-semibold text-slate-400">
                  {current.timeAgo}
                </span>
                <Link
                  to="/request-service"
                  className="text-[10px] font-bold text-primary hover:text-primary-dark hover:underline"
                >
                  Get Yours →
                </Link>
              </div>
            </div>

            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-300 hover:text-slate-500 p-1 self-start rounded-lg transition-colors"
              title="Dismiss notifications"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
