// Supabase server client
// TODO: Implement actual Supabase integration when franchise is activated

export interface AuthError {
  message: string;
  status?: number;
}

/**
 * Creates a Supabase server client
 * @returns Stub Supabase client for now
 */
export async function createClient() {
  // TODO: Replace with actual Supabase client creation
  console.log('[STUB] Creating Supabase server client');

  return {
    auth: {
      exchangeCodeForSession: async (code: string) => {
        console.log('[STUB] Exchanging code for session:', code);
        return { error: null as AuthError | null };
      },
      getSession: async () => {
        console.log('[STUB] Getting session');

        // In development, return a mock session to test admin panel
        if (process.env.NODE_ENV === 'development') {
          const mockSession = {
            user: {
              id: 'mock-user-id',
              email: 'admin@questpointcafe.com',
              created_at: new Date().toISOString(),
            },
            access_token: 'mock-access-token',
            expires_at: Date.now() + 3600000,
          };
          return { data: { session: mockSession as any }, error: null as AuthError | null };
        }

        return { data: { session: null }, error: null as AuthError | null };
      },
      getUser: async () => {
        console.log('[STUB] Getting user');
        return { data: { user: null }, error: null as AuthError | null };
      },
      signOut: async () => {
        console.log('[STUB] Signing out');
        return { error: null as AuthError | null };
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
