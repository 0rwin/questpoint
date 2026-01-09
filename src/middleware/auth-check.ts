/**
 * Authentication Check Middleware Helper
 *
 * Checks if user is authenticated for protected routes
 * Used by admin panel and account pages
 */

import { createClient } from '@/lib/supabase/server';

export async function checkAuth() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    isAuthenticated: !!session,
    user: session?.user || null,
  };
}

export async function checkAdminAuth() {
  const { isAuthenticated, user } = await checkAuth();

  if (!isAuthenticated || !user) {
    return {
      isAdmin: false,
      user: null,
    };
  }

  // TODO: Check if user has admin role in database
  // For now, check if email is in admin list
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  const isAdmin = adminEmails.includes(user.email || '');

  return {
    isAdmin,
    user: isAdmin ? user : null,
  };
}
