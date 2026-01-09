'use client';

import { useGlobalKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

/**
 * Keyboard Shortcuts Provider
 *
 * Registers global keyboard shortcuts for accessibility
 * Spec Section 4.2 - Accessibility
 *
 * Shortcuts:
 * - Shift+C: Open cart
 * - : Focus search bar
 * - 1-5: Filter by category (menu page only)
 * - +/-: Adjust quantity (cart items)
 */
export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  useGlobalKeyboardShortcuts();
  return <>{children}</>;
}
