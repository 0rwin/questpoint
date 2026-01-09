'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Coffee, 
  Calendar, 
  ShoppingBag, 
  User 
} from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/menu', icon: Coffee, label: 'Menu' },
  { href: '/events', icon: Calendar, label: 'Events' },
  { href: '/shop', icon: ShoppingBag, label: 'Shop' },
  { href: '/account', icon: User, label: 'Account' },
];

export function MobileNav() {
  const pathname = usePathname();

  // Check if current path matches (including nested routes)
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-quest-gold/10 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all',
                active
                  ? 'text-quest-gold'
                  : 'text-quest-cream/50 hover:text-quest-cream/80'
              )}
            >
              <item.icon 
                size={22} 
                strokeWidth={active ? 2.5 : 2}
                className={cn(
                  'transition-transform',
                  active && 'scale-110'
                )}
              />
              <span className={cn(
                'text-[10px] font-semibold uppercase tracking-tight',
                active && 'text-quest-gold'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
