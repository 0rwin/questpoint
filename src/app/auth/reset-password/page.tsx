'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gamepad2, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
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
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);

      // Redirect to account after 2 seconds
      setTimeout(() => {
        router.push('/account');
      }, 2000);
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
          <h1 className="font-fantasy text-3xl text-quest-cream mb-4">Password Reset!</h1>
          <p className="text-quest-cream/60 mb-8">
            Your password has been successfully updated. Redirecting to your account...
          </p>
          <Link href="/account">
            <Button variant="gold">Go to Account</Button>
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
          <h1 className="font-fantasy text-3xl text-quest-cream mb-2">Reset Password</h1>
          <p className="text-quest-cream/60">Enter your new password</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="New Password"
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
              label="Confirm New Password"
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

            <Button type="submit" variant="gold" className="w-full" isLoading={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
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
