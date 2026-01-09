import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header, MobileNav, Footer } from '@/components/layout';
import { FeatureFlagsProvider } from '@/hooks/use-feature-flags';
import { KeyboardShortcutsProvider } from '@/components/keyboard-shortcuts-provider';
import { KeyboardShortcutsHelp } from '@/components/keyboard-shortcuts-help';
import { ToastProvider } from '@/hooks/use-toast';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';
import { WebVitals } from './web-vitals';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://questpointcafe.com'),
  title: {
    default: 'Questpoint Cafe | Your Quest Begins Here',
    template: '%s | Questpoint Cafe',
  },
  description: 'Premium coffee & boba meets the ultimate gaming sanctuary. Order drinks, register for events, and level up your daily ritual.',
  keywords: ['gaming cafe', 'coffee', 'boba', 'MTG', 'Magic the Gathering', 'board games', 'esports'],
  authors: [{ name: 'Questpoint Cafe' }],
  creator: 'Questpoint Cafe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://questpointcafe.com',
    siteName: 'Questpoint Cafe',
    title: 'Questpoint Cafe | Your Quest Begins Here',
    description: 'Premium coffee & boba meets the ultimate gaming sanctuary.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Questpoint Cafe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Questpoint Cafe | Your Quest Begins Here',
    description: 'Premium coffee & boba meets the ultimate gaming sanctuary.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <FeatureFlagsProvider>
          <ToastProvider>
            <KeyboardShortcutsProvider>
              {/* Header */}
              <Header />

              {/* Main content with padding for fixed header and mobile nav */}
              <main className="flex-1 pt-16 pb-20 md:pb-0">
                {children}
              </main>

              {/* Footer - hidden on mobile, visible on desktop */}
              <div className="hidden md:block">
                <Footer />
              </div>

              {/* Mobile navigation - only visible on mobile */}
              <MobileNav />

              {/* Keyboard shortcuts help (floating button + modal) */}
              <KeyboardShortcutsHelp />

              {/* Cookie consent banner */}
              <CookieConsentBanner />
            </KeyboardShortcutsProvider>
          </ToastProvider>
        </FeatureFlagsProvider>

        {/* Analytics & Performance Monitoring */}
        <Analytics />
        <SpeedInsights />
        <WebVitals />
      </body>
    </html>
  );
}
