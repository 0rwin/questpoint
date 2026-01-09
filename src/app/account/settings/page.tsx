'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Bell,
  Trash2,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { Card, Button, Input, Badge } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

interface NotificationPreferences {
  orderUpdates: boolean;
  eventReminders: boolean;
  pointsRewards: boolean;
  marketing: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Profile data
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phone: '',
    birthday: '',
  });

  // Password change
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    orderUpdates: true,
    eventReminders: true,
    pointsRewards: true,
    marketing: false,
  });

  // Account deletion
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      // TODO: Load from database when integrated
      // For now, populate from auth metadata
      setProfileData({
        displayName: user.user_metadata?.display_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        birthday: user.user_metadata?.birthday || '',
      });

      setIsLoading(false);
    };

    loadUserData();
  }, [router]);

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (profileData.displayName.length < 2) {
      setError('Display name must be at least 2 characters');
      setIsSaving(false);
      return;
    }

    // Phone format validation (XXX) XXX-XXXX
    if (profileData.phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(profileData.phone)) {
      setError('Phone must be in format: (XXX) XXX-XXXX');
      setIsSaving(false);
      return;
    }

    try {
      const supabase = createClient();

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          display_name: profileData.displayName,
          phone: profileData.phone,
          birthday: profileData.birthday,
        },
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // TODO: Update profiles table when database integrated

      setSuccess('Profile updated successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (passwordData.newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      setIsSaving(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setIsSaving(false);
      return;
    }

    try {
      const supabase = createClient();

      // TODO: Verify current password when integrated

      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess('Password changed successfully!');
      setShowPasswordSection(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle notification preferences update
  const handleNotificationUpdate = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // TODO: Save to database when integrated
      console.log('[STUB] Saving notification preferences:', notifications);

      setSuccess('Notification preferences updated!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update notification preferences');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle account deletion
  const handleAccountDeletion = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setError('Please type DELETE to confirm');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // TODO: Check for upcoming events first (from spec)
      // If user has upcoming events, schedule deletion for after last event

      // TODO: Implement deletion logic:
      // - Anonymize profile data
      // - Delete favorites, event_registrations
      // - Retain orders (anonymized) for business records

      console.log('[STUB] Account deletion requested');

      // For now, just sign out
      const supabase = createClient();
      await supabase.auth.signOut();

      router.push('/');
    } catch (err) {
      setError('Failed to process account deletion');
    } finally {
      setIsSaving(false);
    }
  };

  // Format phone input
  const formatPhoneInput = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  if (isLoading) {
    return (
      <div className="page-enter min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quest-gold" />
      </div>
    );
  }

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Account Settings</h1>
          <p className="section-subtitle">Manage your profile and preferences</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Global success/error messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 flex items-center gap-3">
            <CheckCircle size={20} />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
            <AlertTriangle size={20} />
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-quest-purple/20 flex items-center justify-center">
                <User size={20} className="text-quest-gold" />
              </div>
              <div>
                <h2 className="font-fantasy text-xl text-quest-cream">Profile Information</h2>
                <p className="text-quest-cream/50 text-sm">Update your personal details</p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <Input
                type="text"
                label="Display Name"
                placeholder="Your name"
                value={profileData.displayName}
                onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                leftIcon={<User size={18} />}
                required
                minLength={2}
              />

              <div className="relative">
                <Input
                  type="email"
                  label="Email Address"
                  value={profileData.email}
                  leftIcon={<Mail size={18} />}
                  disabled
                  className="opacity-60 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-quest-cream/40">
                  Email changes require verification. Contact support to change your email.
                </p>
              </div>

              <div>
                <Input
                  type="tel"
                  label="Phone Number (Optional)"
                  placeholder="(555) 123-4567"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: formatPhoneInput(e.target.value) })}
                  leftIcon={<Phone size={18} />}
                  maxLength={14}
                />
                <p className="mt-1 text-xs text-quest-cream/40">
                  Used for order updates and notifications
                </p>
              </div>

              <div>
                <Input
                  type="date"
                  label="Birthday (Optional)"
                  value={profileData.birthday}
                  onChange={(e) => setProfileData({ ...profileData, birthday: e.target.value })}
                  leftIcon={<Calendar size={18} />}
                />
                <p className="mt-1 text-xs text-quest-cream/40 flex items-center gap-1">
                  <span className="text-quest-gold">🎉</span>
                  Get 100 bonus points on your birthday!
                </p>
              </div>

              <Button type="submit" variant="gold" isLoading={isSaving}>
                <Save size={18} />
                Save Changes
              </Button>
            </form>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-quest-purple/20 flex items-center justify-center">
                <Bell size={20} className="text-quest-gold" />
              </div>
              <div>
                <h2 className="font-fantasy text-xl text-quest-cream">Notification Preferences</h2>
                <p className="text-quest-cream/50 text-sm">Choose what updates you want to receive</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Order Updates */}
              <div className="flex items-start justify-between p-4 rounded-xl bg-quest-cream/5 hover:bg-quest-cream/10 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-quest-cream">Order Updates</h3>
                    <Badge variant="gold" size="sm">Recommended</Badge>
                  </div>
                  <p className="text-quest-cream/60 text-sm">
                    Status changes (preparing, ready, completed)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications({ ...notifications, orderUpdates: !notifications.orderUpdates })}
                  className={cn(
                    'relative w-12 h-7 rounded-full transition-colors',
                    notifications.orderUpdates ? 'bg-quest-gold' : 'bg-quest-cream/20'
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform',
                      notifications.orderUpdates ? 'right-1' : 'left-1'
                    )}
                  />
                </button>
              </div>

              {/* Event Reminders */}
              <div className="flex items-start justify-between p-4 rounded-xl bg-quest-cream/5 hover:bg-quest-cream/10 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-quest-cream">Event Reminders</h3>
                    <Badge variant="gold" size="sm">Recommended</Badge>
                  </div>
                  <p className="text-quest-cream/60 text-sm">
                    24h and 1h before registered events
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications({ ...notifications, eventReminders: !notifications.eventReminders })}
                  className={cn(
                    'relative w-12 h-7 rounded-full transition-colors',
                    notifications.eventReminders ? 'bg-quest-gold' : 'bg-quest-cream/20'
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform',
                      notifications.eventReminders ? 'right-1' : 'left-1'
                    )}
                  />
                </button>
              </div>

              {/* Points & Rewards */}
              <div className="flex items-start justify-between p-4 rounded-xl bg-quest-cream/5 hover:bg-quest-cream/10 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-quest-cream">Points & Rewards</h3>
                    <Badge variant="gold" size="sm">Recommended</Badge>
                  </div>
                  <p className="text-quest-cream/60 text-sm">
                    Milestones, new rewards available, points expiring soon
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications({ ...notifications, pointsRewards: !notifications.pointsRewards })}
                  className={cn(
                    'relative w-12 h-7 rounded-full transition-colors',
                    notifications.pointsRewards ? 'bg-quest-gold' : 'bg-quest-cream/20'
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform',
                      notifications.pointsRewards ? 'right-1' : 'left-1'
                    )}
                  />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between p-4 rounded-xl bg-quest-cream/5 hover:bg-quest-cream/10 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-quest-cream mb-1">Marketing</h3>
                  <p className="text-quest-cream/60 text-sm">
                    New menu items, promotions, general events
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                  className={cn(
                    'relative w-12 h-7 rounded-full transition-colors',
                    notifications.marketing ? 'bg-quest-gold' : 'bg-quest-cream/20'
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform',
                      notifications.marketing ? 'right-1' : 'left-1'
                    )}
                  />
                </button>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={handleNotificationUpdate}
                isLoading={isSaving}
              >
                <Save size={18} />
                Save Preferences
              </Button>
            </div>
          </Card>

          {/* Password & Security */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-quest-purple/20 flex items-center justify-center">
                <Lock size={20} className="text-quest-gold" />
              </div>
              <div>
                <h2 className="font-fantasy text-xl text-quest-cream">Password & Security</h2>
                <p className="text-quest-cream/50 text-sm">Manage your password and account security</p>
              </div>
            </div>

            {!showPasswordSection ? (
              <Button
                variant="ghost"
                onClick={() => setShowPasswordSection(true)}
              >
                <Lock size={18} />
                Change Password
              </Button>
            ) : (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPasswords ? 'text' : 'password'}
                    label="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    leftIcon={<Lock size={18} />}
                    required
                  />
                </div>

                <div className="relative">
                  <Input
                    type={showPasswords ? 'text' : 'password'}
                    label="New Password"
                    placeholder="At least 8 characters"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    leftIcon={<Lock size={18} />}
                    required
                    minLength={8}
                  />
                </div>

                <div className="relative">
                  <Input
                    type={showPasswords ? 'text' : 'password'}
                    label="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    leftIcon={<Lock size={18} />}
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="text-quest-cream/60 text-sm hover:text-quest-cream flex items-center gap-2"
                >
                  {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPasswords ? 'Hide' : 'Show'} passwords
                </button>

                <div className="flex gap-3">
                  <Button type="submit" variant="gold" isLoading={isSaving}>
                    Update Password
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowPasswordSection(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Card>

          {/* Danger Zone - Account Deletion */}
          <Card className="border-red-500/30 bg-red-500/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <div>
                <h2 className="font-fantasy text-xl text-red-400">Danger Zone</h2>
                <p className="text-quest-cream/50 text-sm">Irreversible account actions</p>
              </div>
            </div>

            {!showDeleteConfirm ? (
              <>
                <p className="text-quest-cream/60 mb-4">
                  Deleting your account will anonymize your profile and remove your personal data.
                  Order history will be retained for business records but anonymized.
                </p>
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 size={18} />
                  Delete Account
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 font-medium mb-2">⚠️ This action cannot be undone</p>
                  <ul className="text-quest-cream/60 text-sm space-y-1 list-disc list-inside">
                    <li>Your profile will be permanently anonymized</li>
                    <li>Favorites and preferences will be deleted</li>
                    <li>Event registrations will be cancelled</li>
                    <li>Points balance will be forfeited</li>
                    <li>Order history will remain (anonymized)</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-quest-cream mb-2 text-sm">
                    Type <strong className="text-red-400">DELETE</strong> to confirm:
                  </label>
                  <Input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="DELETE"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="danger"
                    onClick={handleAccountDeletion}
                    disabled={deleteConfirmText !== 'DELETE'}
                    isLoading={isSaving}
                  >
                    <Trash2 size={18} />
                    Confirm Deletion
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
