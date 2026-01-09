/**
 * Feature Flags System
 *
 * Controls which features are enabled/disabled in the application.
 * Features can be toggled on when stores open or franchisees purchase systems.
 */

export interface FeatureFlags {
  // Core Features
  MENU_BROWSING: boolean;
  ORDERING_ENABLED: boolean;
  EVENTS_ENABLED: boolean;
  LOYALTY_ENABLED: boolean;
  RETAIL_ENABLED: boolean;
  STREAMING_ENABLED: boolean;

  // Third-Party Integrations
  SUPABASE_ENABLED: boolean;
  SQUARE_PAYMENTS_ENABLED: boolean;
  TWITCH_INTEGRATION: boolean;

  // Advanced Features
  PUSH_NOTIFICATIONS: boolean;
  EMAIL_NOTIFICATIONS: boolean;
  SMS_NOTIFICATIONS: boolean;
  PWA_INSTALL_PROMPT: boolean;
  ANALYTICS_ENABLED: boolean;
}

// Default feature flag values (all disabled for new franchisees)
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  MENU_BROWSING: true, // Always enabled (read-only browsing)
  ORDERING_ENABLED: false,
  EVENTS_ENABLED: false,
  LOYALTY_ENABLED: false,
  RETAIL_ENABLED: false,
  STREAMING_ENABLED: false,

  SUPABASE_ENABLED: false,
  SQUARE_PAYMENTS_ENABLED: false,
  TWITCH_INTEGRATION: false,

  PUSH_NOTIFICATIONS: false,
  EMAIL_NOTIFICATIONS: false,
  SMS_NOTIFICATIONS: false,
  PWA_INSTALL_PROMPT: false,
  ANALYTICS_ENABLED: false,
};

// Feature flag metadata for admin UI
export const FEATURE_FLAG_METADATA: Record<keyof FeatureFlags, {
  label: string;
  description: string;
  category: 'Core' | 'Integration' | 'Advanced';
  requiresSetup?: string;
}> = {
  MENU_BROWSING: {
    label: 'Menu Browsing',
    description: 'Allow customers to view menu items (always enabled)',
    category: 'Core',
  },
  ORDERING_ENABLED: {
    label: 'Online Ordering',
    description: 'Enable customers to place orders online',
    category: 'Core',
    requiresSetup: 'Requires Square Payments and Supabase',
  },
  EVENTS_ENABLED: {
    label: 'Event Management',
    description: 'Enable event registration and calendar',
    category: 'Core',
    requiresSetup: 'Requires Supabase',
  },
  LOYALTY_ENABLED: {
    label: 'Loyalty Program',
    description: 'Enable points earning and rewards',
    category: 'Core',
    requiresSetup: 'Requires Supabase',
  },
  RETAIL_ENABLED: {
    label: 'Retail Shop',
    description: 'Enable TCG product sales',
    category: 'Core',
    requiresSetup: 'Requires Square Payments',
  },
  STREAMING_ENABLED: {
    label: 'Live Streaming',
    description: 'Enable Twitch/YouTube stream display',
    category: 'Core',
  },

  SUPABASE_ENABLED: {
    label: 'Supabase Database',
    description: 'Connect to Supabase for data storage and auth',
    category: 'Integration',
    requiresSetup: 'Requires Supabase project credentials',
  },
  SQUARE_PAYMENTS_ENABLED: {
    label: 'Square Payments',
    description: 'Enable payment processing',
    category: 'Integration',
    requiresSetup: 'Requires Square Developer account',
  },
  TWITCH_INTEGRATION: {
    label: 'Twitch Integration',
    description: 'Connect to Twitch for live streaming',
    category: 'Integration',
    requiresSetup: 'Requires Twitch developer credentials',
  },

  PUSH_NOTIFICATIONS: {
    label: 'Push Notifications',
    description: 'Send push notifications to users',
    category: 'Advanced',
  },
  EMAIL_NOTIFICATIONS: {
    label: 'Email Notifications',
    description: 'Send email notifications',
    category: 'Advanced',
    requiresSetup: 'Requires email service configuration',
  },
  SMS_NOTIFICATIONS: {
    label: 'SMS Notifications',
    description: 'Send SMS notifications',
    category: 'Advanced',
    requiresSetup: 'Requires Twilio or similar service',
  },
  PWA_INSTALL_PROMPT: {
    label: 'PWA Install Prompt',
    description: 'Prompt users to install as PWA',
    category: 'Advanced',
  },
  ANALYTICS_ENABLED: {
    label: 'Analytics',
    description: 'Track usage analytics',
    category: 'Advanced',
  },
};

// Get feature flags from localStorage (admin controlled)
export function getFeatureFlags(): FeatureFlags {
  if (typeof window === 'undefined') {
    return DEFAULT_FEATURE_FLAGS;
  }

  try {
    const stored = localStorage.getItem('questpoint-feature-flags');
    if (!stored) {
      return DEFAULT_FEATURE_FLAGS;
    }

    const parsed = JSON.parse(stored);
    // Merge with defaults to ensure all flags exist
    return { ...DEFAULT_FEATURE_FLAGS, ...parsed };
  } catch (error) {
    console.error('Failed to load feature flags:', error);
    return DEFAULT_FEATURE_FLAGS;
  }
}

// Set feature flags to localStorage
export function setFeatureFlags(flags: Partial<FeatureFlags>): void {
  if (typeof window === 'undefined') return;

  try {
    const current = getFeatureFlags();
    const updated = { ...current, ...flags };
    localStorage.setItem('questpoint-feature-flags', JSON.stringify(updated));

    // Reload the page to apply changes
    window.location.reload();
  } catch (error) {
    console.error('Failed to save feature flags:', error);
  }
}

// Reset to defaults
export function resetFeatureFlags(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem('questpoint-feature-flags', JSON.stringify(DEFAULT_FEATURE_FLAGS));
  window.location.reload();
}

// Check if a feature is enabled
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[flag] === true;
}
