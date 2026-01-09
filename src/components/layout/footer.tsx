'use client';

import Link from 'next/link';
import { 
  Gamepad2, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Instagram,
  Youtube,
} from 'lucide-react';

// Discord icon as custom SVG since lucide doesn't have it
const DiscordIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// Twitch icon
const TwitchIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-quest-dark border-t border-quest-cream/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-quest-gold text-quest-dark p-1.5 rounded-lg">
                <Gamepad2 size={24} />
              </div>
              <span className="font-fantasy text-xl tracking-tight">QUESTPOINT</span>
            </Link>
            <p className="text-quest-cream/60 text-sm mb-6">
              Premium coffee & boba meets the ultimate gaming sanctuary. 
              Your quest begins here.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com/questpointcafe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-quest-cream/5 text-quest-cream/60 hover:text-quest-gold hover:bg-quest-gold/10 transition-all"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://discord.gg/questpoint" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-quest-cream/5 text-quest-cream/60 hover:text-quest-gold hover:bg-quest-gold/10 transition-all"
              >
                <DiscordIcon size={20} />
              </a>
              <a 
                href="https://twitch.tv/questpointcafe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-quest-cream/5 text-quest-cream/60 hover:text-quest-gold hover:bg-quest-gold/10 transition-all"
              >
                <TwitchIcon size={20} />
              </a>
              <a 
                href="https://youtube.com/@questpointcafe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-quest-cream/5 text-quest-cream/60 hover:text-quest-gold hover:bg-quest-gold/10 transition-all"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-fantasy text-quest-gold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/menu', label: 'Menu' },
                { href: '/events', label: 'Events' },
                { href: '/shop', label: 'Shop' },
                { href: '/stream', label: 'Watch Live' },
                { href: '/about', label: 'About Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-quest-cream/60 hover:text-quest-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Location */}
          <div>
            <h4 className="font-fantasy text-quest-gold text-sm uppercase tracking-wider mb-4">
              Visit Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-quest-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-quest-cream text-sm font-medium">Hours</p>
                  <p className="text-quest-cream/60 text-sm">Daily: 10 AM - Midnight</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-quest-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-quest-cream text-sm font-medium">Location</p>
                  <p className="text-quest-cream/60 text-sm">
                    Questpoint Plaza<br />
                    123 Gaming Way<br />
                    Your City, ST 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-fantasy text-quest-gold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-quest-gold shrink-0" />
                <a 
                  href="tel:+15551234567" 
                  className="text-quest-cream/60 hover:text-quest-gold transition-colors text-sm"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-quest-gold shrink-0" />
                <a 
                  href="mailto:hello@questpointcafe.com" 
                  className="text-quest-cream/60 hover:text-quest-gold transition-colors text-sm"
                >
                  hello@questpointcafe.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-quest-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-quest-cream/40 text-sm">
            © {new Date().getFullYear()} Questpoint Cafe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              href="/privacy" 
              className="text-quest-cream/40 hover:text-quest-cream text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-quest-cream/40 hover:text-quest-cream text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
