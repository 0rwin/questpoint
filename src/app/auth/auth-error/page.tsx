'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Gamepad2, AlertCircle } from 'lucide-react';
import { Card, Button } from '@/components/ui';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Common error messages
  const getErrorMessage = () => {
    if (errorDescription) {
      return errorDescription;
    }

    switch (error) {
      case 'access_denied':
        return 'You cancelled the authentication process. Please try again.';
      case 'invalid_request':
        return 'There was an issue with the authentication request. Please try again.';
      case 'unauthorized_client':
        return 'Authentication is not properly configured. Please contact support.';
      default:
        return 'An error occurred during authentication. Please try again or contact support if the problem persists.';
    }
  };

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
        </div>

        <Card>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-red-400" />
            </div>
            <h1 className="font-fantasy text-2xl text-quest-cream mb-3">Authentication Error</h1>
            <p className="text-quest-cream/60 mb-6">{getErrorMessage()}</p>

            {error && (
              <p className="text-quest-cream/40 text-xs mb-6">
                Error Code: <code className="bg-quest-dark px-2 py-1 rounded">{error}</code>
              </p>
            )}

            <div className="flex flex-col gap-3">
              <Link href="/auth/login">
                <Button variant="gold" className="w-full">
                  Try Again
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-quest-cream/10">
              <p className="text-quest-cream/40 text-sm">
                Need help?{' '}
                <a href="mailto:support@questpointcafe.com" className="text-quest-gold hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quest-gold" />
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
