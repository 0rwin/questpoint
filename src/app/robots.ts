import { MetadataRoute } from 'next';

/**
 * Robots.txt Configuration
 *
 * Controls search engine crawling behavior
 * Spec Section 4.6 - SEO
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://questpointcafe.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/account/*',     // Private user account pages
          '/admin/*',       // Admin panel
          '/api/*',         // API endpoints
          '/checkout',      // Checkout page (no need to index)
          '/cart',          // Cart page (no need to index)
          '/auth/*',        // Authentication pages
        ],
      },
      {
        userAgent: 'GPTBot',  // OpenAI web crawler
        disallow: '/',        // Opt out of AI training
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
