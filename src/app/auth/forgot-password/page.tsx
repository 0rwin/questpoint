'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-quest-purple mx-auto mb-6 flex items-center justify-center">
            <CheckCircle size={40} className="text-quest-gold" />
          </div>
          <h1 className="font-fantasy text-3xl text-quest-cream mb-4">Check Your Email</h1>
          <p className="text-quest-cream/60 mb-8">
            We&apos;ve sent a password reset link to{' '}
            <strong className="text-quest-cream">{email}</strong>.
            Click the link in the email to reset your password.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login">
              <Button variant="gold" className="w-full">Back to Sign In</Button>
            </Link>
            <button
              onClick={() => setSuccess(false)}
              className="text-quest-cream/60 text-sm hover:text-quest-cream"
            >
              Didn&apos;t receive the email? Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-quest-gold text-quest-dark p-2 rounded-xl">
              <Gamepad2 size={28} />
            </div>
            <span className="font-fantasy text-2xl">QUESTPOINT</span>
          </Link>
          <h1 className="font-fantasy text-3xl text-quest-cream mb-2">Forgot Password</h1>
          <p className="text-quest-cream/60">
            Enter your email and we&apos;ll send you a link to reset your password
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              required
            />

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" variant="gold" className="w-full" isLoading={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-quest-cream/60 hover:text-quest-cream text-sm"
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        </Card>

        {/* Back to home */}
        <p className="mt-8 text-center">
          <Link href="/" className="text-quest-cream/40 text-sm hover:text-quest-cream">
            ← Back to Questpoint
          </Link>
        </p>
      </div>
    </div>
  );
}
