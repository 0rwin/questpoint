const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // Suppresses source map uploading logs during build
  silent: true,

  // Only upload source maps in production
  enabled: process.env.NODE_ENV === 'production',

  // Organization and project for Sentry (configure when ready)
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Auth token for uploading source maps
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

// Wrap config with Sentry
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
