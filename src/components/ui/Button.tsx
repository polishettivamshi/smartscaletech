import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
      primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
      secondary: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100',
      outline: 'border border-slate-200 text-slate-700 hover:bg-slate-50',
      ghost: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 py-2.5',
      lg: 'px-8 py-4 text-lg font-bold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] font-semibold cursor-pointer',
          variants[variant as keyof typeof variants],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
