'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '@/components/ui/toast';

/**
 * Toast Hook & Provider
 *
 * Global toast notification system
 * Usage:
 * ```tsx
 * const { toast } = useToast();
 * toast.success('Order placed!', 'Your order will be ready in 15 minutes');
 * ```
 */

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  toast: {
    success: (title: string, description?: string, duration?: number) => void;
    error: (title: string, description?: string, duration?: number) => void;
    info: (title: string, description?: string, duration?: number) => void;
    warning: (title: string, description?: string, duration?: number) => void;
  };
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (
      variant: ToastItem['variant'],
      title: string,
      description?: string,
      duration?: number
    ) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastItem = {
        id,
        title,
        description,
        variant,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (title: string, description?: string, duration?: number) =>
      addToast('success', title, description, duration),
    error: (title: string, description?: string, duration?: number) =>
      addToast('error', title, description, duration),
    info: (title: string, description?: string, duration?: number) =>
      addToast('info', title, description, duration),
    warning: (title: string, description?: string, duration?: number) =>
      addToast('warning', title, description, duration),
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}

      {/* Toast Container - Bottom Right */}
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toastItem) => (
          <Toast
            key={toastItem.id}
            id={toastItem.id}
            title={toastItem.title}
            description={toastItem.description}
            variant={toastItem.variant}
            duration={toastItem.duration}
            onClose={() => removeToast(toastItem.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
