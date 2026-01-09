/**
 * Global Keyboard Shortcuts Hook
 *
 * Implements WCAG 2.1 Level AA keyboard navigation shortcuts
 * Spec Section 4.2 - Accessibility
 */

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  handler: () => void;
  condition?: () => boolean; // Optional condition to enable/disable shortcut
}

/**
 * Register global keyboard shortcuts
 * Usage:
 * ```tsx
 * useKeyboardShortcuts([
 *   { key: 'c', shift: true, description: 'Open cart', handler: () => router.push('/cart') }
 * ]);
 * ```
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in an input/textarea
      const target = event.target as HTMLElement;
      const isInputField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true';

      // Exception: ':' for search should work even in non-input contexts
      if (event.key === ':' && !isInputField) {
        // Allow : shortcut to work
      } else if (isInputField && event.key !== ':') {
        // Don't trigger other shortcuts when in input fields
        return;
      }

      for (const shortcut of shortcuts) {
        // Check if condition is met (if specified)
        if (shortcut.condition && !shortcut.condition()) {
          continue;
        }

        // Match key and modifiers
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatches = shortcut.alt ? event.altKey : !event.altKey;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
          event.preventDefault();
          shortcut.handler();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

/**
 * Global app-wide keyboard shortcuts
 * These are registered in the root layout
 */
export function useGlobalKeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();

  useKeyboardShortcuts([
    // Shift+C: Open cart
    {
      key: 'c',
      shift: true,
      description: 'Open cart',
      handler: () => {
        router.push('/cart');
      },
    },

    // : (colon): Focus search bar
    {
      key: ':',
      description: 'Focus search bar',
      handler: () => {
        const searchInput = document.querySelector<HTMLInputElement>('input[type="search"], input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        }
      },
    },

    // 1-5: Filter by category (only on menu page)
    {
      key: '1',
      description: 'Filter: All',
      condition: () => pathname === '/menu',
      handler: () => {
        const allButton = document.querySelector<HTMLButtonElement>('button:has-text("All")') ||
                          Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
                            (btn) => btn.textContent?.trim() === 'All'
                          );
        allButton?.click();
      },
    },
    {
      key: '2',
      description: 'Filter: Coffee',
      condition: () => pathname === '/menu',
      handler: () => {
        const coffeeButton = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
          (btn) => btn.textContent?.includes('Coffee')
        );
        coffeeButton?.click();
      },
    },
    {
      key: '3',
      description: 'Filter: Boba',
      condition: () => pathname === '/menu',
      handler: () => {
        const bobaButton = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
          (btn) => btn.textContent?.includes('Boba')
        );
        bobaButton?.click();
      },
    },
    {
      key: '4',
      description: 'Filter: Smoothies',
      condition: () => pathname === '/menu',
      handler: () => {
        const smoothieButton = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
          (btn) => btn.textContent?.includes('Smoothies')
        );
        smoothieButton?.click();
      },
    },
    {
      key: '5',
      description: 'Filter: Food',
      condition: () => pathname === '/menu',
      handler: () => {
        const foodButton = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
          (btn) => btn.textContent?.includes('Food')
        );
        foodButton?.click();
      },
    },
  ]);
}

/**
 * Keyboard shortcuts for cart item quantity adjustment
 * Use this hook in the cart component for each cart item
 */
export function useCartItemShortcuts(itemId: string, onIncrement: () => void, onDecrement: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger if this cart item is focused or within focus
      const target = event.target as HTMLElement;
      const cartItem = target.closest(`[data-cart-item-id="${itemId}"]`);

      if (!cartItem) return;

      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        onIncrement();
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        onDecrement();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [itemId, onIncrement, onDecrement]);
}
