import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  description,
  actionLabel,
  actionTo,
  align = 'left',
  dark = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center max-w-3xl mx-auto' : 'lg:flex-row lg:items-end lg:justify-between',
        className
      )}
    >
      <div className={align === 'center' ? 'max-w-3xl' : 'max-w-2xl'}>
        <p
          className={cn(
            'text-[11px] font-bold uppercase tracking-[0.16em] mb-3',
            dark ? 'text-[#E87A4E]' : 'text-[#57534E]'
          )}
        >
          {eyebrow}
        </p>
        <h2
          className={cn(
            'text-section-display font-extrabold',
            dark ? 'text-white' : 'text-[#111111]'
          )}
        >
          {title}{' '}
          {highlight && (
            <span className={dark ? 'text-[#F06B37]' : 'text-[#D9541E]'}>{highlight}</span>
          )}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-4 text-base sm:text-[17px] leading-relaxed',
              dark ? 'text-white/75' : 'text-[#57534E]'
            )}
          >
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionTo && align === 'left' && (
        <Link
          to={actionTo}
          className={cn(
            'inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline shrink-0 self-start lg:self-auto',
            dark ? 'text-white hover:text-[#F06B37]' : 'text-[#111111] hover:text-[#D9541E]'
          )}
        >
          <span>{actionLabel}</span>
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
};
