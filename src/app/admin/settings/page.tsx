'use client';

import { useState, useEffect } from 'react';
import { Settings, Power, RotateCcw, AlertCircle } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import {
  FeatureFlags,
  FEATURE_FLAG_METADATA,
  getFeatureFlags,
  setFeatureFlags,
  resetFeatureFlags,
} from '@/lib/feature-flags';
import { cn } from '@/lib/utils';

export default function AdminSettingsPage() {
  const [flags, setLocalFlags] = useState<FeatureFlags | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setLocalFlags(getFeatureFlags());
  }, []);

  const handleToggle = (flag: keyof FeatureFlags) => {
    if (!flags) return;

    // Prevent disabling MENU_BROWSING (always enabled)
    if (flag === 'MENU_BROWSING') return;

    const updated = { ...flags, [flag]: !flags[flag] };
    setLocalFlags(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!flags) return;
    setFeatureFlags(flags);
    setHasChanges(false);
  };

  const handleReset = () => {
    if (confirm('Reset all feature flags to defaults? This will disable all features.')) {
      resetFeatureFlags();
    }
  };

  if (!flags) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-quest-cream/60">Loading settings...</p>
      </div>
    );
  }

  // Group flags by category
  const categorizedFlags = Object.entries(FEATURE_FLAG_METADATA).reduce((acc, [key, meta]) => {
    const category = meta.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ key: key as keyof FeatureFlags, ...meta });
    return acc;
  }, {} as Record<string, Array<{ key: keyof FeatureFlags; label: string; description: string; requiresSetup?: string }>>);

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Settings size={32} className="text-quest-gold" />
            <h1 className="section-title">Admin Settings</h1>
          </div>
          <p className="section-subtitle">
            Enable or disable features for your Questpoint Cafe location
          </p>
        </div>
      </section>

      {/* Feature Flags */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Warning Banner */}
        <Card variant="default" className="bg-yellow-500/10 border-yellow-500/30">
          <div className="flex gap-3">
            <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
            <div className="text-sm text-quest-cream/80">
              <p className="font-medium mb-1">Important:</p>
              <p>
                Enabling features may require additional setup (API keys, database configuration, etc.).
                Only enable features once you have completed the necessary integrations.
              </p>
            </div>
          </div>
        </Card>

        {/* Core Features */}
        {(['Core', 'Integration', 'Advanced'] as const).map((category) => (
          <div key={category}>
            <h2 className="font-fantasy text-xl text-quest-gold mb-4">
              {category} Features
            </h2>
            <div className="space-y-3">
              {categorizedFlags[category]?.map((flag) => {
                const isEnabled = flags[flag.key];
                const isLocked = flag.key === 'MENU_BROWSING';

                return (
                  <Card
                    key={flag.key}
                    variant="default"
                    className={cn(
                      'transition-all',
                      isEnabled && 'border-quest-gold/30 bg-quest-gold/5'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Toggle Button */}
                      <button
                        onClick={() => handleToggle(flag.key)}
                        disabled={isLocked}
                        className={cn(
                          'flex-shrink-0 w-12 h-6 rounded-full transition-all relative',
                          isEnabled
                            ? 'bg-quest-gold'
                            : 'bg-quest-cream/20',
                          isLocked && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        <div
                          className={cn(
                            'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform',
                            isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          )}
                        />
                      </button>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-quest-cream">
                            {flag.label}
                          </h3>
                          {isEnabled && (
                            <Badge variant="gold" size="sm">
                              <Power size={10} className="mr-1" />
                              Enabled
                            </Badge>
                          )}
                          {isLocked && (
                            <Badge variant="ghost" size="sm">
                              Locked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-quest-cream/60 mb-2">
                          {flag.description}
                        </p>
                        {flag.requiresSetup && (
                          <p className="text-xs text-quest-gold/80 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {flag.requiresSetup}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-quest-cream/10">
          <Button
            variant="gold"
            size="lg"
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex-1"
          >
            Save Changes
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Reset to Defaults
          </Button>
        </div>

        {/* Status */}
        {hasChanges && (
          <Card variant="default" className="bg-quest-gold/10 border-quest-gold/30">
            <p className="text-sm text-quest-cream/80 text-center">
              You have unsaved changes. Click "Save Changes" to apply them.
            </p>
          </Card>
        )}
      </section>
    </div>
  );
}
