import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidthClass = 'max-w-3xl',
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Dialog'}
    >
      <div
        className="fixed inset-0 bg-[#111111]/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 w-full ${maxWidthClass} bg-white border border-[#D8D3C9] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || subtitle) && (
          <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#D8D3C9] bg-[#F3EEE3]/50 shrink-0">
            <div>
              {subtitle && (
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#57534E] mb-1">
                  {subtitle}
                </p>
              )}
              {title && (
                <h3 className="text-lg sm:text-xl font-extrabold text-[#111111]">{title}</h3>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-lg text-[#57534E] hover:text-[#111111] hover:bg-[#EAE3D5] transition-colors cursor-pointer shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
