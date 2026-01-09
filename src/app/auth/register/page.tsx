'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gamepad2, Mail, Lock, Eye, EyeOff, User, Gift } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            display_name: formData.displayName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
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

  const handleOAuthSignup = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-quest-purple mx-auto mb-6 flex items-center justify-center">
            <Mail size={40} className="text-quest-gold" />
          </div>
          <h1 className="font-fantasy text-3xl text-quest-cream mb-4">Check Your Email</h1>
          <p className="text-quest-cream/60 mb-8">
            We&apos;ve sent a confirmation link to <strong className="text-quest-cream">{formData.email}</strong>. 
            Click the link to activate your account and start earning rewards!
          </p>
          <Link href="/auth/login">
            <Button variant="ghost">Back to Sign In</Button>
          </Link>
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
          <h1 className="font-fantasy text-3xl text-quest-cream mb-2">Create Account</h1>
          <p className="text-quest-cream/60">Join the quest and start earning rewards</p>
        </div>

        {/* Rewards Teaser */}
        <Card className="mb-6 bg-quest-gold/10 border-quest-gold/30">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-quest-gold/20">
              <Gift size={24} className="text-quest-gold" />
            </div>
            <div>
              <p className="text-quest-cream font-medium">Welcome Bonus!</p>
              <p className="text-quest-cream/60 text-sm">Get 100 points when you create an account</p>
            </div>
          </div>
        </Card>

        <Card>
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuthSignup('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 rounded-xl font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>

            <button
              onClick={() => handleOAuthSignup('apple')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Sign up with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-quest-cream/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-quest-charcoal text-quest-cream/40">or sign up with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="displayName"
              label="Display Name"
              placeholder="Your name"
              value={formData.displayName}
              onChange={handleChange}
              leftIcon={<User size={18} />}
              required
            />

            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              leftIcon={<Mail size={18} />}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                leftIcon={<Lock size={18} />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-quest-cream/40 hover:text-quest-cream"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              leftIcon={<Lock size={18} />}
              required
            />

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <p className="text-quest-cream/40 text-xs">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-quest-gold hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-quest-gold hover:underline">Privacy Policy</Link>.
            </p>

            <Button type="submit" variant="gold" className="w-full" isLoading={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign in link */}
          <p className="mt-6 text-center text-quest-cream/60 text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-quest-gold hover:underline">
              Sign in
            </Link>
          </p>
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
