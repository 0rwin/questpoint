import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Middleware for Coming Soon Mode & Authentication
 *
 * COMING SOON MODE:
 * - Public visitors are redirected to /coming-soon
 * - Admin users (specified in ADMIN_EMAILS) can access the full site
 * - Staff can login via discrete link on /coming-soon page
 *
 * Protected routes require authentication:
 * - /account/*
 * - /checkout
 * - /orders/*
 * - /admin/*
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow these routes without any checks
  const publicRoutes = [
    '/coming-soon',
    '/auth',
    '/api',
    '/offline',
  ];

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Create Supabase client
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();

  // Check if user is admin
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
  const isAdmin = user && adminEmails.includes(user.email || '');

  // COMING SOON MODE: Redirect non-admins to /coming-soon
  if (!isAdmin) {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  // From here on, user is an authenticated admin

  // Define protected routes that require auth
  const protectedRoutes = ['/account', '/checkout', '/orders', '/admin'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
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
