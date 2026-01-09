/**
 * Sentry Server Configuration
 *
 * Spec Section 8.1.4 - Performance Monitoring (Error Tracking)
 * Captures server-side errors and sends to Sentry
 *
 * @stub This configuration will be activated when Sentry DSN is configured
 */

import * as Sentry from '@sentry/nextjs';

// Only initialize Sentry if DSN is configured
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: 0.1, // Capture 10% of transactions

    // Environment
    environment: process.env.NODE_ENV,

    // Release tracking
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

    // Don't send errors from localhost
    beforeSend(event) {
      if (process.env.NODE_ENV === 'development') {
        return null;
      }
      return event;
    },
  });
} else {
  console.log('[Sentry] Not initialized - NEXT_PUBLIC_SENTRY_DSN not configured');
}
