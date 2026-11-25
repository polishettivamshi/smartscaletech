import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => {
    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      default: 'bg-[#111111] text-white hover:bg-[#2A2927] border border-transparent',
      primary: 'bg-[#D9541E] text-white hover:bg-[#B94414] border border-transparent',
      accent: 'bg-[#D9541E] text-white hover:bg-[#B94414] border border-transparent',
      dark: 'bg-[#111111] text-white hover:bg-[#2A2927] border border-transparent',
      secondary: 'bg-white text-[#111111] hover:bg-[#EAE3D5] border border-[#D8D3C9]',
      outline: 'bg-transparent border border-[#111111]/25 text-[#111111] hover:border-[#111111] hover:bg-white/60',
      ghost: 'bg-transparent text-[#57534E] hover:text-[#111111] hover:bg-[#EAE3D5]/60',
    };

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
      sm: 'px-4 py-2 text-xs font-semibold rounded-lg',
      md: 'px-5 py-2.5 text-sm font-semibold rounded-xl',
      lg: 'px-7 py-3.5 text-sm sm:text-base font-semibold rounded-xl',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9541E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EEE3] disabled:opacity-50 disabled:pointer-events-none active:translate-y-[0.5px] cursor-pointer whitespace-nowrap',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
