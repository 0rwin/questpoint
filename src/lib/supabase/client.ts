// Supabase browser client
// TODO: Implement actual Supabase integration when franchise is activated

export interface AuthError {
  message: string;
  status?: number;
}

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    display_name?: string;
    [key: string]: any;
  };
}

/**
 * Creates a Supabase browser client
 * @returns Stub Supabase client for now
 */
export function createClient() {
  // TODO: Replace with actual Supabase client creation
  console.log('[STUB] Creating Supabase browser client');

  return {
    auth: {
      signInWithPassword: async (credentials: { email: string; password: string }) => {
        console.log('[STUB] Signing in with password:', credentials.email);
        return { data: { session: null }, error: null as AuthError | null };
      },
      signInWithOAuth: async (params: { provider: string; options?: { redirectTo?: string } }) => {
        console.log('[STUB] Signing in with OAuth:', params.provider);
        return { data: { url: null }, error: null as AuthError | null };
      },
      signUp: async (params: { email: string; password: string; options?: { data?: any; emailRedirectTo?: string } }) => {
        console.log('[STUB] Signing up:', params.email);
        return { data: { session: null, user: null }, error: null as AuthError | null };
      },
      signOut: async () => {
        console.log('[STUB] Signing out');
        return { error: null as AuthError | null };
      },
      getSession: async () => {
        console.log('[STUB] Getting session');
        return { data: { session: null }, error: null as AuthError | null };
      },
      getUser: async () => {
        console.log('[STUB] Getting user');
        return { data: { user: null as User | null }, error: null as AuthError | null };
      },
      resetPasswordForEmail: async (email: string, options?: { redirectTo?: string }) => {
        console.log('[STUB] Sending password reset email to:', email);
        return { data: {}, error: null as AuthError | null };
      },
      updateUser: async (attributes: { password?: string; email?: string; data?: any }) => {
        console.log('[STUB] Updating user:', attributes);
        return { data: { user: null }, error: null as AuthError | null };
      },
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        console.log('[STUB] Subscribing to auth state changes');
        return {
          data: {
            subscription: {
              unsubscribe: () => {
                console.log('[STUB] Unsubscribing from auth state changes');
              },
            },
          },
        };
      },
    },
    from: (table: string) => ({
      select: () => ({
        data: [],
        error: null as AuthError | null,
      }),
      insert: (data: any) => ({
        data: null,
        error: null as AuthError | null,
      }),
      update: (data: any) => ({
        data: null,
        error: null as AuthError | null,
      }),
      delete: () => ({
        data: null,
        error: null as AuthError | null,
      }),
    }),
  };
}
