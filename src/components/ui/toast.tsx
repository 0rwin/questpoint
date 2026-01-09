'use client';

import { forwardRef, useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Toast Notification System
 *
 * Spec Section 5.3 - Component Patterns
 * - Bottom-right notifications
 * - Auto-dismiss after 5 seconds
 * - Supports 4 variants: success, error, info, warning
 */

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, variant = 'info', duration = 5000, onClose }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Trigger enter animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });

      // Auto-dismiss after duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
      setIsVisible(false);
      // Wait for exit animation
      setTimeout(() => {
        onClose();
      }, 300);
    };

    const variants = {
      success: {
        icon: CheckCircle,
        bgClass: 'bg-green-500/10 border-green-500/30',
        iconClass: 'text-green-500',
        titleClass: 'text-green-400',
      },
      error: {
        icon: AlertCircle,
        bgClass: 'bg-red-500/10 border-red-500/30',
        iconClass: 'text-red-500',
        titleClass: 'text-red-400',
      },
      info: {
        icon: Info,
        bgClass: 'bg-quest-gold/10 border-quest-gold/30',
        iconClass: 'text-quest-gold',
        titleClass: 'text-quest-gold',
      },
      warning: {
        icon: AlertTriangle,
        bgClass: 'bg-yellow-500/10 border-yellow-500/30',
        iconClass: 'text-yellow-500',
        titleClass: 'text-yellow-400',
      },
    };

    const { icon: Icon, bgClass, iconClass, titleClass } = variants[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'pointer-events-auto w-full max-w-sm rounded-xl border backdrop-blur-md p-4 shadow-lg',
          'transition-all duration-300',
          bgClass,
          isVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        )}
        role="alert"
      >
        <div className="flex items-start gap-3">
          <Icon className={cn('flex-shrink-0', iconClass)} size={20} />
          <div className="flex-1 min-w-0">
            <p className={cn('font-semibold text-sm', titleClass)}>{title}</p>
            {description && (
              <p className="text-sm text-quest-cream/60 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-quest-cream/40 hover:text-quest-cream transition-colors"
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast };
