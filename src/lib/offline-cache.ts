/**
 * Offline Cache System
 *
 * Spec Section 6.2 - Supabase Outage Handling
 * - Cache menu data for 24 hours
 * - Provide degraded mode when Supabase is unavailable
 */

import { MenuItem } from '@/types/menu';

const CACHE_KEYS = {
  MENU: 'questpoint_menu_cache',
  TIMESTAMP: 'questpoint_menu_cache_timestamp',
  SUPABASE_STATUS: 'questpoint_supabase_status',
} as const;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Save menu data to localStorage cache
 */
export function cacheMenuData(menuItems: MenuItem[]): void {
  try {
    localStorage.setItem(CACHE_KEYS.MENU, JSON.stringify(menuItems));
    localStorage.setItem(CACHE_KEYS.TIMESTAMP, Date.now().toString());
    console.log('[CACHE] Menu data cached successfully');
  } catch (error) {
    console.error('[CACHE] Failed to cache menu data:', error);
  }
}

/**
 * Get cached menu data if available and not expired
 */
export function getCachedMenuData(): MenuItem[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.MENU);
    const timestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);

    if (!cached || !timestamp) {
      return null;
    }

    const cacheAge = Date.now() - parseInt(timestamp, 10);

    if (cacheAge > CACHE_DURATION) {
      console.log('[CACHE] Menu cache expired, clearing');
      clearMenuCache();
      return null;
    }

    console.log('[CACHE] Using cached menu data');
    return JSON.parse(cached) as MenuItem[];
  } catch (error) {
    console.error('[CACHE] Failed to read cached menu data:', error);
    return null;
  }
}

/**
 * Clear menu cache
 */
export function clearMenuCache(): void {
  try {
    localStorage.removeItem(CACHE_KEYS.MENU);
    localStorage.removeItem(CACHE_KEYS.TIMESTAMP);
    console.log('[CACHE] Menu cache cleared');
  } catch (error) {
    console.error('[CACHE] Failed to clear menu cache:', error);
  }
}

/**
 * Check if menu cache is available and valid
 */
export function hasValidMenuCache(): boolean {
  const cached = localStorage.getItem(CACHE_KEYS.MENU);
  const timestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);

  if (!cached || !timestamp) {
    return false;
  }

  const cacheAge = Date.now() - parseInt(timestamp, 10);
  return cacheAge <= CACHE_DURATION;
}

/**
 * Supabase connection status
 */
export type SupabaseStatus = 'online' | 'offline' | 'degraded';

/**
 * Check if Supabase is available
 */
export async function checkSupabaseStatus(): Promise<SupabaseStatus> {
  try {
    // TODO: Replace with actual Supabase health check
    // For now, return online (stub)
    console.log('[STUB] Checking Supabase status...');

    // In production, this would:
    // const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    //   headers: { apikey: supabaseKey }
    // });
    // return response.ok ? 'online' : 'offline';

    return 'online';
  } catch (error) {
    console.error('[SUPABASE] Health check failed:', error);
    return 'offline';
  }
}

/**
 * Save Supabase status to localStorage
 */
export function setSupabaseStatus(status: SupabaseStatus): void {
  try {
    localStorage.setItem(CACHE_KEYS.SUPABASE_STATUS, status);
  } catch (error) {
    console.error('[CACHE] Failed to save Supabase status:', error);
  }
}

/**
 * Get saved Supabase status
 */
export function getSupabaseStatus(): SupabaseStatus {
  try {
    const status = localStorage.getItem(CACHE_KEYS.SUPABASE_STATUS);
    return (status as SupabaseStatus) || 'online';
  } catch (error) {
    return 'online';
  }
}

/**
 * Degraded mode configuration
 */
export interface DegradedModeConfig {
  isEnabled: boolean;
  message: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  hours: string;
}

export const DEGRADED_MODE_CONFIG: DegradedModeConfig = {
  isEnabled: false, // Will be set dynamically based on Supabase status
  message: 'Online ordering is temporarily unavailable.',
  contactInfo: {
    phone: '(555) 555-QUEST',
    email: 'hello@questpointcafe.com',
    address: '123 Gaming Ave, Your City, CA 12345',
  },
  hours: 'Mon-Thu: 8AM-10PM, Fri-Sat: 8AM-12AM, Sun: 10AM-8PM',
};
