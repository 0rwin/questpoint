'use client';

import { useState } from 'react';
import { Coffee, Calendar, Gamepad2, Sparkles, Mail, MapPin, Clock } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { LOCATION, BUSINESS_HOURS } from '@/config/business';
import Link from 'next/link';

/**
 * Coming Soon Landing Page
 *
 * Displayed before public launch
 * Features newsletter signup and discrete admin access
 */

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Save email to Supabase newsletter table
    console.log('Newsletter signup:', email);

    setIsSubmitted(true);
    setEmail('');

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-quest-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-quest-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-quest-gold/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl w-full space-y-8 text-center">
        {/* Logo / Title */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles size={40} className="text-quest-gold animate-pulse" />
            <h1 className="font-fantasy text-6xl md:text-7xl text-quest-cream">
              Questpoint Cafe
            </h1>
            <Sparkles size={40} className="text-quest-gold animate-pulse" />
          </div>

          <p className="text-2xl md:text-3xl text-quest-gold font-medium">
            Your Quest Begins Soon
          </p>

          <p className="text-lg md:text-xl text-quest-cream/80 max-w-2xl mx-auto">
            Premium coffee & boba meets the ultimate gaming sanctuary.
            We're putting the final touches on your new favorite spot.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 animate-slide-up">
          <Card className="bg-quest-purple/20 border-quest-purple/30">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-quest-purple/30 flex items-center justify-center">
                <Coffee size={28} className="text-quest-gold" />
              </div>
              <h3 className="font-fantasy text-lg text-quest-cream">Craft Beverages</h3>
              <p className="text-sm text-quest-cream/70">
                Specialty coffee, boba tea, and gaming-themed drinks
              </p>
            </div>
          </Card>

          <Card className="bg-quest-gold/20 border-quest-gold/30">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-quest-gold/30 flex items-center justify-center">
                <Gamepad2 size={28} className="text-quest-purple" />
              </div>
              <h3 className="font-fantasy text-lg text-quest-cream">Gaming Lounge</h3>
              <p className="text-sm text-quest-cream/70">
                Board games, MTG tournaments, and esports events
              </p>
            </div>
          </Card>

          <Card className="bg-quest-purple/20 border-quest-purple/30">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-quest-purple/30 flex items-center justify-center">
                <Calendar size={28} className="text-quest-gold" />
              </div>
              <h3 className="font-fantasy text-lg text-quest-cream">Events</h3>
              <p className="text-sm text-quest-cream/70">
                Weekly tournaments, game nights, and community gatherings
              </p>
            </div>
          </Card>
        </div>

        {/* Newsletter Signup */}
        <Card className="max-w-xl mx-auto bg-quest-charcoal/50 border-quest-gold/30">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Mail size={24} className="text-quest-gold" />
              <h2 className="font-fantasy text-2xl text-quest-cream">Stay Updated</h2>
            </div>

            <p className="text-quest-cream/70">
              Join our newsletter to be the first to know when we launch!
            </p>

            {isSubmitted ? (
              <div className="py-3 px-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 font-medium">
                  ✓ Thanks! We'll notify you at launch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" variant="gold" className="sm:w-auto">
                  Notify Me
                </Button>
              </form>
            )}
          </div>
        </Card>

        {/* Location & Hours */}
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Card className="bg-quest-charcoal/30 border-quest-cream/10">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-quest-gold flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-quest-cream mb-1">Location</h3>
                <p className="text-sm text-quest-cream/70">
                  {LOCATION.address.street}<br />
                  {LOCATION.address.city}, {LOCATION.address.state} {LOCATION.address.zip}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-quest-charcoal/30 border-quest-cream/10">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-quest-gold flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-quest-cream mb-1">Opening Hours</h3>
                <p className="text-sm text-quest-cream/70">
                  {BUSINESS_HOURS.displayDays}<br />
                  {BUSINESS_HOURS.displayHours}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Social Links (Optional) */}
        <div className="pt-8">
          <p className="text-quest-cream/50 text-sm mb-4">Follow our journey</p>
          <div className="flex items-center justify-center gap-4">
            {/* Add social media links when available */}
            <a
              href="#"
              className="text-quest-cream/60 hover:text-quest-gold transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <span className="text-quest-cream/30">•</span>
            <a
              href="#"
              className="text-quest-cream/60 hover:text-quest-gold transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <span className="text-quest-cream/30">•</span>
            <a
              href="#"
              className="text-quest-cream/60 hover:text-quest-gold transition-colors"
              aria-label="Discord"
            >
              Discord
            </a>
          </div>
        </div>
      </div>

      {/* Discrete Admin Access - Hidden in footer */}
      <div className="absolute bottom-4 right-4">
        <Link
          href="/auth/login?admin=true"
          className="text-quest-cream/20 hover:text-quest-cream/40 transition-colors text-xs"
        >
          Staff
        </Link>
      </div>
    </div>
  );
}
