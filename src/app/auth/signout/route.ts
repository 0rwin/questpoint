import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Sign Out Route Handler
 *
 * Handles user logout and redirects to homepage
 */

export async function POST(request: Request) {
  const supabase = await createClient();

  // Sign out from Supabase
  await supabase.auth.signOut();

  // Redirect to homepage
  return NextResponse.redirect(new URL('/', request.url));
}

export async function GET(request: Request) {
  // Allow GET requests too for simple links
  return POST(request);
}
