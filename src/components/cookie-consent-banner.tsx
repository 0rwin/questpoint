'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { setAnalyticsConsent, hasAnalyticsConsent } from '@/lib/analytics';
import Link from 'next/link';

/**
 * Cookie Consent Banner
 *
 * Spec Section 8.2 - Privacy Compliance
 * - GDPR/CCPA compliant cookie consent
 * - Links to privacy policy
 * - Remembers user preference in localStorage
 */

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already consented or declined
    const hasConsent = localStorage.getItem('analytics_consent');
    if (hasConsent === null) {
      // No preference set, show banner
      setIsVisible(true);
    }
    setIsLoaded(true);
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setIsVisible(false);
  };

  // Don't render until client-side hydration complete
  if (!isLoaded || !isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <Card className="bg-quest-charcoal border-quest-gold/30 shadow-gold-glow">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-quest-gold/20 flex items-center justify-center flex-shrink-0">
            <Cookie size={20} className="text-quest-gold" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-fantasy text-lg text-quest-cream mb-2">Cookie Preferences</h3>
            <p className="text-sm text-quest-cream/70 mb-4">
              We use cookies and analytics to improve your experience and understand how our site is
              used. Your data is anonymized and never sold to third parties.
            </p>

            <div className="text-xs text-quest-cream/50 mb-4">
              <p>
                By clicking "Accept", you consent to our use of cookies for analytics. View our{' '}
                <Link href="/privacy" className="text-quest-gold hover:underline">
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="gold" size="sm" onClick={handleAccept} className="flex-1">
                Accept All
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDecline} className="flex-1">
                Decline
              </Button>
            </div>
          </div>

          <button
            onClick={handleDecline}
            className="text-quest-cream/50 hover:text-quest-cream transition-colors flex-shrink-0"
            aria-label="Close banner"
          >
            <X size={20} />
          </button>
        </div>
      </Card>
    </div>
  );
}
