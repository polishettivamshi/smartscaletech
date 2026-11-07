import React from 'react';
import { X, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LinkedInServiceRequestForm } from './LinkedInServiceRequestForm';

interface LinkedInServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const LinkedInServiceRequestModal: React.FC<LinkedInServiceRequestModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl my-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <LinkedInServiceRequestForm
            initialService={initialService}
            sourcePage="modal"
            onSuccess={() => {}}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
