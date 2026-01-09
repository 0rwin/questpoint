'use client';

import { WifiOff, RefreshCw, Phone, MapPin } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import Link from 'next/link';

/**
 * Offline Fallback Page
 *
 * Spec Section 6.3 - Network Resilience
 * Shown when user is offline and requested page is not cached
 */

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-quest-purple/20 flex items-center justify-center mx-auto mb-6">
          <WifiOff size={40} className="text-quest-gold" />
        </div>

        {/* Title */}
        <h1 className="font-fantasy text-3xl text-quest-cream mb-3">
          You're Offline
        </h1>

        {/* Description */}
        <p className="text-quest-cream/60 mb-6">
          It looks like you've lost your internet connection. Don't worry, you can still:
        </p>

        {/* Available Actions */}
        <div className="space-y-3 mb-8 text-left">
          <Card className="bg-quest-charcoal/50 p-4">
            <p className="text-sm text-quest-cream/80">
              ✓ Browse cached menu items
            </p>
          </Card>
          <Card className="bg-quest-charcoal/50 p-4">
            <p className="text-sm text-quest-cream/80">
              ✓ View your cart and saved items
            </p>
          </Card>
          <Card className="bg-quest-charcoal/50 p-4">
            <p className="text-sm text-quest-cream/80">
              ✓ Visit us in person to order!
            </p>
          </Card>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full"
            onClick={() => window.location.reload()}
            leftIcon={<RefreshCw size={20} />}
          >
            Retry Connection
          </Button>

          <Link href="/menu" className="block">
            <Button variant="ghost" size="lg" className="w-full">
              Browse Cached Menu
            </Button>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-quest-cream/10 space-y-3">
          <p className="text-quest-cream/40 text-sm font-semibold uppercase mb-3">
            Visit Us In Person
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-quest-cream/70">
            <Phone size={14} className="text-quest-gold" />
            <a href="tel:+15555555555" className="hover:text-quest-gold transition-colors">
              (555) 555-QUEST
            </a>
          </div>

          <div className="flex items-start justify-center gap-2 text-sm text-quest-cream/70">
            <MapPin size={14} className="text-quest-gold flex-shrink-0 mt-0.5" />
            <span>123 Gaming Ave, Your City, CA 12345</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
