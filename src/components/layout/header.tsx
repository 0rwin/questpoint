'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Gamepad2,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cart-store';
import { createClient, type User as SupabaseUser } from '@/lib/supabase/client';

const navLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/events', label: 'Events' },
  { href: '/shop', label: 'Shop' },
  { href: '/stream', label: 'Watch' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  // Get user session
  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-user-menu]')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isUserMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-quest-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-quest-gold text-quest-dark p-1.5 rounded-lg transition-transform group-hover:scale-110">
              <Gamepad2 size={24} />
            </div>
            <span className="font-fantasy text-xl tracking-tight hidden sm:block">
              QUESTPOINT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  pathname === link.href
                    ? 'text-quest-gold bg-quest-gold/10'
                    : 'text-quest-cream/70 hover:text-quest-cream hover:bg-quest-cream/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="p-2 text-quest-cream/60 hover:text-quest-gold transition-colors rounded-lg hover:bg-quest-cream/5">
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-quest-cream/60 hover:text-quest-gold transition-colors rounded-lg hover:bg-quest-cream/5"
            >
              <ShoppingCart size={20} />
              {/* Cart badge - show when items exist */}
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-quest-gold text-quest-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse-gold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Account / Login */}
            {!isLoading && (
              <>
                {user ? (
                  <div className="relative" data-user-menu>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-quest-cream/70 hover:text-quest-gold hover:bg-quest-cream/5 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-quest-purple flex items-center justify-center">
                        <User size={16} className="text-quest-gold" />
                      </div>
                      <span className="text-sm font-medium">
                        {user.user_metadata?.display_name || 'Account'}
                      </span>
                    </button>

                    {/* User dropdown menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-quest-charcoal border border-quest-cream/10 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                        <div className="p-3 border-b border-quest-cream/10">
                          <p className="text-quest-cream font-medium text-sm">
                            {user.user_metadata?.display_name || 'User'}
                          </p>
                          <p className="text-quest-cream/50 text-xs truncate">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/account"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-quest-cream/70 hover:text-quest-cream hover:bg-quest-cream/5 transition-colors"
                          >
                            <User size={18} />
                            <span className="text-sm">My Account</span>
                          </Link>
                          <Link
                            href="/account/settings"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-quest-cream/70 hover:text-quest-cream hover:bg-quest-cream/5 transition-colors"
                          >
                            <Settings size={18} />
                            <span className="text-sm">Settings</span>
                          </Link>
                        </div>
                        <div className="border-t border-quest-cream/10 py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                          >
                            <LogOut size={18} />
                            <span className="text-sm">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      <User size={18} />
                      <span>Sign In</span>
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-quest-cream/60 hover:text-quest-gold transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-quest-cream/10 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-base font-medium transition-all',
                    pathname === link.href
                      ? 'text-quest-gold bg-quest-gold/10'
                      : 'text-quest-cream/70 hover:text-quest-cream hover:bg-quest-cream/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium text-quest-cream/70 hover:text-quest-cream hover:bg-quest-cream/5 flex items-center gap-2"
                  >
                    <User size={18} />
                    My Account
                  </Link>
                  <Link
                    href="/account/settings"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium text-quest-cream/70 hover:text-quest-cream hover:bg-quest-cream/5 flex items-center gap-2"
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-base font-medium text-quest-gold hover:bg-quest-gold/10"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
