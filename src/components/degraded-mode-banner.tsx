'use client';

import { AlertTriangle, Phone, Mail, MapPin, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { DEGRADED_MODE_CONFIG } from '@/lib/offline-cache';

/**
 * Degraded Mode Banner
 *
 * Spec Section 6.2 - Supabase Outage Handling
 * Displays when online ordering is unavailable
 */

interface DegradedModeBannerProps {
  isVisible: boolean;
  reason?: string;
}

export function DegradedModeBanner({ isVisible, reason }: DegradedModeBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-40 animate-slide-down">
      <div className="bg-yellow-500/10 border-b-2 border-yellow-500/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-start gap-4">
            {/* Warning Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <AlertTriangle size={24} className="text-yellow-500" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-yellow-400 mb-1">
                {DEGRADED_MODE_CONFIG.message}
              </h3>
              <p className="text-quest-cream/70 text-sm mb-3">
                {reason || 'We\'re experiencing technical difficulties. You can still visit us in person!'}
              </p>

              {/* Contact Information */}
              <Card className="bg-quest-charcoal/50 border-yellow-500/20 mb-3">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-quest-gold text-sm mb-2">
                      Contact Us
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-quest-cream/80">
                        <Phone size={14} className="text-quest-gold" />
                        <a
                          href={`tel:${DEGRADED_MODE_CONFIG.contactInfo.phone}`}
                          className="hover:text-quest-gold transition-colors"
                        >
                          {DEGRADED_MODE_CONFIG.contactInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-quest-cream/80">
                        <Mail size={14} className="text-quest-gold" />
                        <a
                          href={`mailto:${DEGRADED_MODE_CONFIG.contactInfo.email}`}
                          className="hover:text-quest-gold transition-colors"
                        >
                          {DEGRADED_MODE_CONFIG.contactInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-quest-gold text-sm mb-2">
                      Visit In Person
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-quest-cream/80">
                        <MapPin size={14} className="text-quest-gold flex-shrink-0 mt-0.5" />
                        <span>{DEGRADED_MODE_CONFIG.contactInfo.address}</span>
                      </div>
                      <div className="flex items-start gap-2 text-quest-cream/80">
                        <Clock size={14} className="text-quest-gold flex-shrink-0 mt-0.5" />
                        <span>{DEGRADED_MODE_CONFIG.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-yellow-500/20">
                  <p className="text-xs text-quest-cream/60">
                    💡 <strong>Note:</strong> All orders are pickup-only. You can always order at the counter!
                  </p>
                </div>
              </Card>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="flex-shrink-0 text-quest-cream/40 hover:text-quest-cream transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
