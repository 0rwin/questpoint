/**
 * Sentry Client Configuration
 *
 * Spec Section 8.1.4 - Performance Monitoring (Error Tracking)
 * Captures client-side errors and sends to Sentry
 *
 * @stub This configuration will be activated when Sentry DSN is configured
 */

import * as Sentry from '@sentry/nextjs';

// Only initialize Sentry if DSN is configured
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring

    // Session Replay
    replaysSessionSampleRate: 0.1, // Sample 10% of sessions
    replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors

    // Environment
    environment: process.env.NODE_ENV,

    // Release tracking
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

    // Integrations
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Filter out common browser errors that we can't control
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
    ],

    // Don't send errors from localhost
    beforeSend(event, hint) {
      if (window.location.hostname === 'localhost') {
        return null;
      }
      return event;
    },
  });
} else {
  console.log('[Sentry] Not initialized - NEXT_PUBLIC_SENTRY_DSN not configured');
}
