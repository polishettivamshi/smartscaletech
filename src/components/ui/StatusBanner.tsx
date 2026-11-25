import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface StatusBannerProps {
  tone: 'info' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  tone,
  title,
  children,
  className = '',
}) => {
  const styles = {
    info: {
      wrap: 'bg-white border-[#D8D3C9] text-[#111111]',
      icon: 'text-[#57534E]',
      Icon: Info,
    },
    success: {
      wrap: 'bg-[#16845B]/8 border-[#16845B]/30 text-[#111111]',
      icon: 'text-[#16845B]',
      Icon: CheckCircle2,
    },
    error: {
      wrap: 'bg-[#C43D3D]/8 border-[#C43D3D]/30 text-[#111111]',
      icon: 'text-[#C43D3D]',
      Icon: AlertCircle,
    },
  }[tone];

  const Icon = styles.Icon;

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-xl border p-4 flex items-start gap-3 text-xs sm:text-sm ${styles.wrap} ${className}`}
    >
      <Icon size={18} className={`shrink-0 mt-0.5 ${styles.icon}`} />
      <div className="space-y-1">
        {title && <p className="font-bold">{title}</p>}
        <div className="text-[#57534E] leading-relaxed">{children}</div>
      </div>
    </div>
  );
};
