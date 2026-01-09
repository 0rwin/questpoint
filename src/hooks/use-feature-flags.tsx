'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FeatureFlags, getFeatureFlags, DEFAULT_FEATURE_FLAGS } from '@/lib/feature-flags';

// Feature Flags Context
const FeatureFlagsContext = createContext<FeatureFlags>(DEFAULT_FEATURE_FLAGS);

// Provider component
export function FeatureFlagsProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FEATURE_FLAGS);

  useEffect(() => {
    // Load flags on mount
    setFlags(getFeatureFlags());

    // Listen for storage changes (when flags are updated in admin)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'questpoint-feature-flags') {
        setFlags(getFeatureFlags());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <FeatureFlagsContext.Provider value={flags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

// Hook to access feature flags
export function useFeatureFlags() {
  return useContext(FeatureFlagsContext);
}

// Hook to check if a specific feature is enabled
export function useFeature(flag: keyof FeatureFlags): boolean {
  const flags = useFeatureFlags();
  return flags[flag] === true;
}
