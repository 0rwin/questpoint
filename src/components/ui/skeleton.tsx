/**
 * Skeleton Loading Components
 *
 * Spec Section 5.4 - Animation
 * - Loading states: Skeleton screens
 *
 * Usage:
 * ```tsx
 * <Skeleton className="h-4 w-48" />
 * <Skeleton variant="card" />
 * <Skeleton variant="menu-item" />
 * ```
 */

import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'menu-item' | 'event-card' | 'text' | 'avatar';
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-full mb-2',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-64 w-full',
    'menu-item': 'h-96 w-full',
    'event-card': 'h-80 w-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-quest-cream/5',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton Card - For loading menu items, products, etc.
 */
export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-quest-charcoal/30 border border-quest-cream/5 animate-pulse">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />

      {/* Content skeleton */}
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-quest-cream/10">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton List - For loading lists of items
 */
export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 rounded-xl bg-quest-charcoal/30 border border-quest-cream/5 animate-pulse"
        >
          <Skeleton className="h-20 w-20 flex-shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-5 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Table - For loading table rows
 */
export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 animate-pulse">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Text - For loading text blocks
 */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  );
}
