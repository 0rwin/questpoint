'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-quest-cream/80 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-quest-cream/40">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'w-full bg-quest-dark/50 border border-quest-cream/10 rounded-xl px-4 py-3',
              'text-quest-cream placeholder:text-quest-cream/40',
              'transition-all duration-300',
              'focus:outline-none focus:border-quest-gold/50 focus:ring-2 focus:ring-quest-gold/20',
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-quest-cream/40">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
