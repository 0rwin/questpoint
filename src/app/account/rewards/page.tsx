'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Gift,
  Star,
  TrendingUp,
  History,
  Award,
  Sparkles,
  Tag,
  Percent,
  Coffee,
  AlertCircle,
  CheckCircle,
  Info,
  Share2,
  Copy,
  Clock,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import {
  getActiveRewards,
  getUserPointsSummary,
  getAffordableRewards,
  isEligibleForBirthdayBonus,
  type Reward,
  type RewardType,
} from '@/data/loyalty-mock';
import { useFeature } from '@/hooks/use-feature-flags';

// Mock user with birthday
const MOCK_USER = {
  id: 'user_123',
  email: 'customer@example.com',
  name: 'John Doe',
  birthday: new Date('1995-01-15'), // January birthday for testing
};

// Reward type icons and colors
const rewardTypeConfig: Record<RewardType, { icon: typeof Gift; color: string; label: string }> = {
  free_item: { icon: Coffee, color: 'purple', label: 'Free Item' },
  discount: { icon: Tag, color: 'gold', label: 'Discount' },
  percentage_off: { icon: Percent, color: 'success', label: 'Percentage Off' },
};

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'history'>('catalog');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [referralCopied, setReferralCopied] = useState(false);

  const loyaltyEnabled = useFeature('LOYALTY_ENABLED');

  // Generate referral code (in production, this would come from user profile)
  const referralCode = MOCK_USER.id.slice(-6).toUpperCase();
  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : 'https://questpoint.com'}/ref/${referralCode}`;

  // Copy referral link to clipboard
  const handleCopyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setReferralCopied(true);
      setTimeout(() => setReferralCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy referral link');
    }
  };

  // Get user's points and transactions
  const pointsSummary = getUserPointsSummary(MOCK_USER.id);
  const { currentBalance, lifetimeEarned, totalRedeemed, transactions } = pointsSummary;

  // Get rewards
  const allRewards = getActiveRewards();
  const affordableRewards = getAffordableRewards(currentBalance);

  // Check birthday bonus eligibility
  const birthdayBonus = isEligibleForBirthdayBonus(MOCK_USER.id, MOCK_USER.birthday);

  const handleRedeem = async (reward: Reward) => {
    if (currentBalance < reward.pointsRequired) {
      alert('Not enough points to redeem this reward');
      return;
    }

    setSelectedReward(reward);
    setIsRedeeming(true);

    console.log('[STUB] Redeeming reward:', reward.name);

    try {
      // Simulate redemption
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(`Successfully redeemed: ${reward.name}!\n\nYour reward code will be sent to ${MOCK_USER.email}`);
      setSelectedReward(null);
    } catch (error) {
      console.error('Redemption error:', error);
      alert('Redemption failed. Please try again.');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleClaimBirthdayBonus = async () => {
    console.log('[STUB] Claiming birthday bonus');
    alert('🎉 Happy Birthday! 100 bonus points have been added to your account!');
  };

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Rewards</h1>
          <p className="section-subtitle">Earn points and redeem for exclusive rewards</p>
        </div>
      </section>

      {/* Loyalty Not Enabled */}
      {!loyaltyEnabled && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <div className="flex gap-3">
              <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
              <div className="text-sm">
                <p className="font-medium text-yellow-500 mb-1">Loyalty Program Disabled</p>
                <p className="text-quest-cream/80">
                  The loyalty program is not currently enabled. Visit{' '}
                  <Link href="/admin/settings" className="text-quest-gold hover:underline">
                    Admin Settings
                  </Link>{' '}
                  to enable loyalty rewards.
                </p>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Points Summary */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Current Balance */}
          <Card className="bg-quest-gold/10 border-quest-gold/30">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-gold/20 flex items-center justify-center flex-shrink-0">
                <Star className="text-quest-gold" size={24} />
              </div>
              <div>
                <p className="text-xs text-quest-cream/40 uppercase mb-1">Current Points</p>
                <p className="font-fantasy text-3xl text-quest-gold">{currentBalance}</p>
              </div>
            </div>
          </Card>

          {/* Lifetime Earned */}
          <Card className="bg-quest-charcoal/50">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-purple/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-quest-purple" size={24} />
              </div>
              <div>
                <p className="text-xs text-quest-cream/40 uppercase mb-1">Lifetime Earned</p>
                <p className="font-fantasy text-3xl text-quest-cream">{lifetimeEarned}</p>
              </div>
            </div>
          </Card>

          {/* Total Redeemed */}
          <Card className="bg-quest-charcoal/50">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-xs text-quest-cream/40 uppercase mb-1">Total Redeemed</p>
                <p className="font-fantasy text-3xl text-quest-cream">{totalRedeemed}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Birthday Bonus Banner */}
        {birthdayBonus.eligible && !birthdayBonus.alreadyClaimed && (
          <Card className="bg-quest-purple/10 border-quest-purple/30 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-quest-purple/20 flex items-center justify-center flex-shrink-0">
                <Gift className="text-quest-purple" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-fantasy text-lg text-quest-cream mb-2">
                  🎉 Happy Birthday!
                </h3>
                <p className="text-quest-cream/70 mb-3">
                  Claim your special birthday bonus of 100 points!
                </p>
                <Button variant="purple" size="sm" onClick={handleClaimBirthdayBonus}>
                  Claim Birthday Bonus
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Points Value Info */}
        <Card className="mb-6 bg-quest-purple/10 border-quest-purple/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-quest-gold/20 flex items-center justify-center">
              <Sparkles className="text-quest-gold" size={20} />
            </div>
            <div>
              <h3 className="font-fantasy text-lg text-quest-gold">Points Value</h3>
              <p className="text-quest-cream/70 text-sm">
                <strong className="text-quest-gold">100 points = $1.00</strong> • Simple math, real savings
              </p>
            </div>
          </div>
        </Card>

        {/* How to Earn Points */}
        <Card className="mb-6">
          <h3 className="font-fantasy text-lg text-quest-gold mb-3">How to Earn Points</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-quest-gold flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-medium text-quest-cream text-sm">Make Purchases</p>
                <p className="text-xs text-quest-cream/60">Earn 1 point per $1 spent</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-quest-gold flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-medium text-quest-cream text-sm">Attend Events</p>
                <p className="text-xs text-quest-cream/60">Earn 50 points per event</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-quest-gold flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-medium text-quest-cream text-sm">Birthday Bonus</p>
                <p className="text-xs text-quest-cream/60">Get 100 points on your birthday</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-quest-gold flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-medium text-quest-cream text-sm">Refer Friends</p>
                <p className="text-xs text-quest-cream/60">Earn 200 points per referral</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Referral Program */}
        <Card className="mb-6 bg-quest-gold/10 border-quest-gold/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-quest-gold/20 flex items-center justify-center">
              <Share2 className="text-quest-gold" size={20} />
            </div>
            <div>
              <h3 className="font-fantasy text-lg text-quest-gold">Refer Friends, Earn Points</h3>
              <p className="text-quest-cream/70 text-sm">
                Share your link and both of you get <strong className="text-quest-gold">200 points</strong> when they make their first order
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-quest-cream/60 text-xs uppercase mb-2">Your Referral Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-2 bg-quest-dark rounded-lg text-quest-cream text-sm border border-quest-cream/10 focus:outline-none"
                />
                <Button
                  variant={referralCopied ? 'ghost' : 'gold'}
                  size="sm"
                  onClick={handleCopyReferral}
                >
                  {referralCopied ? (
                    <>
                      <CheckCircle size={18} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="p-3 bg-quest-cream/5 rounded-lg text-xs text-quest-cream/60">
              <p className="mb-1">
                <strong className="text-quest-cream">How it works:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Your friend signs up using your link</li>
                <li>They get 100 points immediately</li>
                <li>When they make their first order ($10+), you both get 100 more points</li>
                <li>Total: 200 points each!</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Points Expiration Info */}
        <Card className="mb-8 border-yellow-500/30 bg-yellow-500/5">
          <div className="flex items-start gap-3">
            <Clock className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-yellow-500 mb-2">Points Expiration Policy</h3>
              <div className="text-quest-cream/70 text-sm space-y-2">
                <p>
                  Points expire <strong className="text-quest-cream">12 months</strong> after you earn them.
                  When you redeem points, the oldest ones are used first (FIFO).
                </p>
                <p>
                  We'll send you a reminder email when points are about to expire so you never lose rewards!
                </p>
                <p className="text-quest-cream/50 text-xs pt-2 border-t border-quest-cream/10">
                  💡 Check your email quarterly for points balance updates
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('catalog')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeTab === 'catalog'
                ? 'bg-quest-gold text-quest-dark'
                : 'bg-quest-cream/5 text-quest-cream/60 hover:text-quest-cream hover:bg-quest-cream/10'
            )}
          >
            Rewards Catalog
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeTab === 'history'
                ? 'bg-quest-gold text-quest-dark'
                : 'bg-quest-cream/5 text-quest-cream/60 hover:text-quest-cream hover:bg-quest-cream/10'
            )}
          >
            Points History
          </button>
        </div>

        {/* Rewards Catalog */}
        {activeTab === 'catalog' && (
          <div className="space-y-4">
            {allRewards.length === 0 ? (
              <Card className="text-center py-12">
                <Gift className="mx-auto mb-4 text-quest-cream/20" size={48} />
                <h3 className="font-fantasy text-xl text-quest-cream mb-2">No Rewards Available</h3>
                <p className="text-quest-cream/60">Check back later for new rewards!</p>
              </Card>
            ) : (
              <>
                {allRewards.map((reward) => {
                  const canAfford = currentBalance >= reward.pointsRequired;
                  const config = rewardTypeConfig[reward.rewardType];
                  const RewardIcon = config.icon;

                  return (
                    <RewardCard
                      key={reward.id}
                      reward={reward}
                      canAfford={canAfford}
                      onRedeem={handleRedeem}
                      isRedeeming={isRedeeming && selectedReward?.id === reward.id}
                      loyaltyEnabled={loyaltyEnabled}
                    />
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* Points History */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <Card className="text-center py-12">
                <History className="mx-auto mb-4 text-quest-cream/20" size={48} />
                <h3 className="font-fantasy text-xl text-quest-cream mb-2">No Transaction History</h3>
                <p className="text-quest-cream/60">Your points activity will appear here</p>
              </Card>
            ) : (
              <>
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="bg-quest-charcoal/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={transaction.amount > 0 ? 'success' : 'ghost'}
                            size="sm"
                          >
                            {transaction.type}
                          </Badge>
                          <span className="text-xs text-quest-cream/40">
                            {formatDate(new Date(transaction.createdAt))}
                          </span>
                        </div>
                        <p className="text-quest-cream text-sm">{transaction.description}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={cn(
                            'font-bold text-lg',
                            transaction.amount > 0 ? 'text-green-500' : 'text-red-400'
                          )}
                        >
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

// Reward Card Component
interface RewardCardProps {
  reward: Reward;
  canAfford: boolean;
  onRedeem: (reward: Reward) => void;
  isRedeeming: boolean;
  loyaltyEnabled: boolean;
}

function RewardCard({ reward, canAfford, onRedeem, isRedeeming, loyaltyEnabled }: RewardCardProps) {
  const config = rewardTypeConfig[reward.rewardType];
  const RewardIcon = config.icon;

  return (
    <Card
      variant={canAfford ? 'default' : 'default'}
      className={cn(!canAfford && 'opacity-60')}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        {reward.imageUrl && (
          <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={reward.imageUrl} alt={reward.name} fill className="object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={config.color as any} size="sm">
                  <RewardIcon size={12} className="mr-1" />
                  {config.label}
                </Badge>
                {!canAfford && (
                  <Badge variant="ghost" size="sm">
                    <Info size={12} className="mr-1" />
                    Not Enough Points
                  </Badge>
                )}
              </div>
              <h3 className="font-fantasy text-lg text-quest-cream mb-1">{reward.name}</h3>
              <p className="text-sm text-quest-cream/60">{reward.description}</p>
            </div>

            {/* Points Required */}
            <div className="text-right">
              <p className="text-xs text-quest-cream/40 uppercase mb-1">Cost</p>
              <p className="font-bold text-xl text-quest-gold flex items-center gap-1">
                <Star size={18} className="fill-quest-gold" />
                {reward.pointsRequired}
              </p>
            </div>
          </div>

          {/* Redeem Button */}
          <div className="flex items-center justify-between pt-3 border-t border-quest-cream/10">
            <div className="text-sm text-quest-cream/60">
              {reward.rewardType === 'free_item' && 'Free item'}
              {reward.rewardType === 'discount' && `${formatCurrency(reward.rewardValue.discount!)} off`}
              {reward.rewardType === 'percentage_off' && `${reward.rewardValue.percentage}% off`}
            </div>
            <Button
              variant={canAfford ? 'gold' : 'ghost'}
              size="sm"
              onClick={() => onRedeem(reward)}
              disabled={!canAfford || isRedeeming || !loyaltyEnabled}
              isLoading={isRedeeming}
            >
              {isRedeeming ? 'Redeeming...' : 'Redeem'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
