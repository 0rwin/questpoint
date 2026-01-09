import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware for authentication and route protection
 *
 * NOTE: This is a stub implementation for MVP.
 * When Supabase is integrated, this will check actual auth sessions.
 *
 * Protected routes require authentication:
 * - /account/*
 * - /checkout
 * - /orders/*
 *
 * Public routes (no auth required):
 * - /
 * - /menu/*
 * - /events/*
 * - /auth/*
 * - /cart
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/account', '/checkout', '/orders'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // TODO: When Supabase is integrated, check actual session here
  // For now, we'll check for a simple auth cookie as a placeholder
  const hasAuthCookie = request.cookies.has('sb-access-token') ||
                        request.cookies.has('supabase-auth-token');

  // Stub: In production, this will check Supabase session
  // For MVP, users can access protected routes (will show empty states)
  const isAuthenticated = hasAuthCookie; // TODO: Replace with actual Supabase check

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to account if accessing auth pages while authenticated
  const authRoutes = ['/auth/login', '/auth/register'];
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
