import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui';

/**
 * Admin Layout
 *
 * Protects all /admin routes with authentication
 * Only accessible to logged-in users
 */

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth/login?redirect=/admin&admin=true');
  }

  // TODO: Check if user has admin role
  // For now, any authenticated user can access admin panel

  return (
    <div className="min-h-screen bg-quest-dark">
      {/* Admin Header */}
      <header className="bg-quest-charcoal border-b border-quest-gold/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="font-fantasy text-xl text-quest-gold">Admin Panel</h1>
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  href="/admin/events"
                  className="text-sm text-quest-cream/70 hover:text-quest-cream transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="/admin/menu"
                  className="text-sm text-quest-cream/70 hover:text-quest-cream transition-colors"
                >
                  Menu
                </Link>
                <Link
                  href="/admin/inventory"
                  className="text-sm text-quest-cream/70 hover:text-quest-cream transition-colors"
                >
                  Inventory
                </Link>
                <Link
                  href="/admin/settings"
                  className="text-sm text-quest-cream/70 hover:text-quest-cream transition-colors"
                >
                  Settings
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-quest-cream/60 hidden sm:block">
                {session.user.email}
              </span>
              <Link href="/">
                <Button variant="ghost" size="sm" leftIcon={<Home size={16} />}>
                  Site
                </Button>
              </Link>
              <form action="/auth/signout" method="post">
                <Button variant="ghost" size="sm" leftIcon={<LogOut size={16} />}>
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main>{children}</main>
    </div>
  );
}
