import type { Metadata } from 'next';
import { Card } from '@/components/ui';

/**
 * Privacy Policy Page
 *
 * Spec Section 8.2 - Privacy Compliance
 * States data collection practices, GDPR/CCPA compliant
 */

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, use, and protect your data at Questpoint Cafe.',
};

export default function PrivacyPage() {
  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Privacy Policy</h1>
          <p className="section-subtitle">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Card>
          <div className="prose prose-invert max-w-none space-y-6">
            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">Overview</h2>
              <p className="text-quest-cream/80 leading-relaxed">
                At Questpoint Cafe, we respect your privacy and are committed to protecting your
                personal data. This privacy policy explains how we collect, use, and safeguard your
                information when you use our website and services.
              </p>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">
                Information We Collect
              </h2>
              <div className="space-y-4 text-quest-cream/80 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-quest-cream mb-2">
                    1. Account Information
                  </h3>
                  <p>
                    When you create an account, we collect your email address, name, and optionally
                    your phone number. This information is used to identify you, process your
                    orders, and communicate with you about your account.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-quest-cream mb-2">2. Order Information</h3>
                  <p>
                    When you place an order, we collect details about your order including items
                    ordered, customizations, pickup time, and payment information. Payment data is
                    processed securely through Square and is not stored on our servers.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-quest-cream mb-2">3. Usage Data</h3>
                  <p>
                    We collect anonymized analytics data about how you use our website, including
                    pages visited, features used, and interactions. This data is used to improve our
                    services and is collected through Vercel Analytics.
                  </p>
                  <p className="mt-2">
                    <strong>We do NOT collect:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Your browsing history outside our website</li>
                    <li>Personal identifiable information in analytics events</li>
                    <li>Search queries (only the length of queries, not the content)</li>
                    <li>Any data we don't explicitly need to provide our services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-quest-cream mb-2">4. Cookies</h3>
                  <p>
                    We use essential cookies to keep you logged in and remember your preferences. We
                    also use analytics cookies (with your consent) to understand how our site is
                    used. You can manage your cookie preferences through the banner shown on your
                    first visit.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">How We Use Your Data</h2>
              <div className="space-y-2 text-quest-cream/80">
                <p>Your information is used for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Processing and fulfilling your orders</li>
                  <li>Managing your account and loyalty points</li>
                  <li>Sending order updates and event notifications</li>
                  <li>Improving our website and services through analytics</li>
                  <li>Complying with legal obligations</li>
                </ul>
                <p className="mt-4">
                  <strong>We will NEVER:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Sell your personal data to third parties</li>
                  <li>Share your data for advertising purposes</li>
                  <li>Use your data for purposes you haven't consented to</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">Data Retention</h2>
              <p className="text-quest-cream/80 leading-relaxed">
                We retain your account information as long as your account is active. Order history
                is retained for 7 years for tax and accounting purposes. You can request deletion of
                your account at any time through your account settings.
              </p>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">Your Rights</h2>
              <div className="space-y-2 text-quest-cream/80">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of analytics tracking</li>
                  <li>Export your data in a portable format</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at{' '}
                  <a
                    href="mailto:privacy@questpointcafe.com"
                    className="text-quest-gold hover:underline"
                  >
                    privacy@questpointcafe.com
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">Third-Party Services</h2>
              <div className="space-y-2 text-quest-cream/80">
                <p>We use the following trusted third-party services:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>Supabase:</strong> Database and authentication
                  </li>
                  <li>
                    <strong>Square:</strong> Payment processing
                  </li>
                  <li>
                    <strong>Vercel:</strong> Website hosting and analytics
                  </li>
                </ul>
                <p className="mt-4">
                  Each of these services has their own privacy policies and security measures. We
                  only share the minimum necessary data with these services.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">Security</h2>
              <p className="text-quest-cream/80 leading-relaxed">
                We implement industry-standard security measures to protect your data, including
                encryption in transit (HTTPS), secure authentication, and regular security audits.
                However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">Children's Privacy</h2>
              <p className="text-quest-cream/80 leading-relaxed">
                Our services are not directed to children under 13. We do not knowingly collect
                personal information from children under 13. If you believe we have collected such
                information, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">Changes to This Policy</h2>
              <p className="text-quest-cream/80 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any
                material changes by posting the new policy on this page and updating the "Last
                updated" date.
              </p>
            </div>

            <div>
              <h2 className="font-fantasy text-xl text-quest-gold mb-3">Contact Us</h2>
              <div className="space-y-2 text-quest-cream/80">
                <p>If you have questions about this privacy policy, please contact us:</p>
                <ul className="space-y-1">
                  <li>
                    Email:{' '}
                    <a
                      href="mailto:privacy@questpointcafe.com"
                      className="text-quest-gold hover:underline"
                    >
                      privacy@questpointcafe.com
                    </a>
                  </li>
                  <li>Phone: (555) 555-QUEST</li>
                  <li>Address: 123 Gaming Ave, Your City, CA 12345</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-quest-cream/10">
              <p className="text-quest-cream/50 text-sm">
                This privacy policy is compliant with GDPR, CCPA, and other applicable data
                protection regulations.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
