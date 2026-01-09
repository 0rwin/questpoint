import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  isCafeOpenNow,
  canAcceptOrders,
  LOCATION,
  LANGUAGE_CONFIG,
} from '@/config/business';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(LANGUAGE_CONFIG.default, {
    style: 'currency',
    currency: LANGUAGE_CONFIG.currency,
  }).format(amount);
}

/**
 * Check if cafe is currently open
 * Spec Section 9.2 - Business hours: 7 AM - 10 PM daily
 * @deprecated Use isCafeOpenNow from @/config/business instead
 */
export function isCafeOpen() {
  return isCafeOpenNow();
}

// Re-export for convenience
export { isCafeOpenNow, canAcceptOrders, LOCATION };

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options || defaultOptions).format(d);
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d);
}
