'use client';

/**
 * Web Vitals Reporting
 *
 * Spec Section 8.1.4 - Performance Monitoring
 * Reports Core Web Vitals (LCP, FID, CLS) to analytics
 */

import { useReportWebVitals } from 'next/web-vitals';
import { PerformanceTracking } from '@/lib/analytics';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Only track Core Web Vitals and important metrics
    if (
      metric.name === 'FCP' || // First Contentful Paint
      metric.name === 'LCP' || // Largest Contentful Paint
      metric.name === 'CLS' || // Cumulative Layout Shift
      metric.name === 'FID' || // First Input Delay
      metric.name === 'TTFB' || // Time to First Byte
      metric.name === 'INP' // Interaction to Next Paint
    ) {
      PerformanceTracking.reportWebVitals(metric);
    }
  });

  return null;
}
