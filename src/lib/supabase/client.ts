import { createBrowserClient } from '@supabase/ssr';
import type { User as SupabaseUser } from '@supabase/supabase-js';

/**
 * Creates a Supabase client for browser use
 * Uses environment variables for configuration
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Supabase] Missing environment variables');
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Re-export types for convenience
export type User = SupabaseUser;
