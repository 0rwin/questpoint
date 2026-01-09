'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Keyboard, X } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * Keyboard Shortcuts Help Modal
 *
 * Shows available keyboard shortcuts to the user
 * Triggered by pressing ? key
 */

interface Shortcut {
  keys: string[];
  description: string;
  condition?: string;
}

const GLOBAL_SHORTCUTS: Shortcut[] = [
  { keys: ['Shift', 'C'], description: 'Open cart' },
  { keys: [':'], description: 'Focus search bar' },
  { keys: ['?'], description: 'Show keyboard shortcuts help' },
];

const MENU_PAGE_SHORTCUTS: Shortcut[] = [
  { keys: ['1'], description: 'Filter: All' },
  { keys: ['2'], description: 'Filter: Coffee' },
  { keys: ['3'], description: 'Filter: Boba' },
  { keys: ['4'], description: 'Filter: Smoothies' },
  { keys: ['5'], description: 'Filter: Food' },
];

const CART_PAGE_SHORTCUTS: Shortcut[] = [
  { keys: ['+'], description: 'Increase quantity (when cart item focused)' },
  { keys: ['-'], description: 'Decrease quantity (when cart item focused)' },
];

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open/close with ? key
      if (event.key === '?' && !event.shiftKey) {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Close with Escape key
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const isMenuPage = pathname === '/menu';
  const isCartPage = pathname === '/cart';

  if (!isOpen) {
    // Floating button to open shortcuts help
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-4 z-50 p-3 rounded-full bg-quest-purple shadow-lg hover:shadow-gold-glow transition-all group"
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard size={20} className="text-quest-gold group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card
          className="max-w-lg w-full max-h-[80vh] overflow-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-quest-purple/20">
                <Keyboard size={24} className="text-quest-gold" />
              </div>
              <h2 className="font-fantasy text-2xl text-quest-cream">Keyboard Shortcuts</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-quest-cream/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-quest-cream/60" />
            </button>
          </div>

          {/* Shortcuts List */}
          <div className="space-y-6">
            {/* Global Shortcuts */}
            <div>
              <h3 className="text-sm font-bold text-quest-gold uppercase mb-3">
                Global Shortcuts
              </h3>
              <div className="space-y-2">
                {GLOBAL_SHORTCUTS.map((shortcut, idx) => (
                  <ShortcutRow key={idx} shortcut={shortcut} />
                ))}
              </div>
            </div>

            {/* Menu Page Shortcuts */}
            {isMenuPage && (
              <div>
                <h3 className="text-sm font-bold text-quest-gold uppercase mb-3">
                  Menu Page
                </h3>
                <div className="space-y-2">
                  {MENU_PAGE_SHORTCUTS.map((shortcut, idx) => (
                    <ShortcutRow key={idx} shortcut={shortcut} />
                  ))}
                </div>
              </div>
            )}

            {/* Cart Page Shortcuts */}
            {isCartPage && (
              <div>
                <h3 className="text-sm font-bold text-quest-gold uppercase mb-3">
                  Cart Page
                </h3>
                <div className="space-y-2">
                  {CART_PAGE_SHORTCUTS.map((shortcut, idx) => (
                    <ShortcutRow key={idx} shortcut={shortcut} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-quest-cream/10">
            <p className="text-quest-cream/50 text-xs text-center">
              Press <kbd className="px-1.5 py-0.5 rounded bg-quest-cream/10 text-quest-cream font-mono">?</kbd> to
              toggle this help
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}

function ShortcutRow({ shortcut }: { shortcut: Shortcut }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-quest-cream/5 transition-colors">
      <span className="text-quest-cream/80 text-sm">{shortcut.description}</span>
      <div className="flex gap-1">
        {shortcut.keys.map((key, idx) => (
          <kbd
            key={idx}
            className="px-2 py-1 rounded bg-quest-cream/10 text-quest-cream font-mono text-xs font-medium"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}
