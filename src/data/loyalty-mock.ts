/**
 * Mock Loyalty/Rewards Data
 *
 * This file contains mock rewards and points transactions for development and testing.
 * When SUPABASE_ENABLED = true, the app will query the database instead.
 */

export type RewardType = 'free_item' | 'discount' | 'percentage_off';
export type PointsTransactionType = 'purchase' | 'redemption' | 'bonus' | 'referral' | 'event' | 'adjustment';

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  rewardType: RewardType;
  rewardValue: {
    itemId?: string;
    discount?: number;
    percentage?: number;
  };
  isActive: boolean;
  sortOrder: number;
  imageUrl?: string;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  amount: number; // Positive for earn, negative for redeem
  type: PointsTransactionType;
  description: string;
  orderId?: string;
  createdAt: string;
}

// Mock rewards catalog
export const MOCK_REWARDS: Reward[] = [
  {
    id: 'rwd_1',
    name: 'Free Small Coffee',
    description: 'Redeem for any small hot or iced coffee from our menu',
    pointsRequired: 100,
    rewardType: 'free_item',
    rewardValue: {
      itemId: 'menu_coffee_small',
    },
    isActive: true,
    sortOrder: 1,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400',
  },
  {
    id: 'rwd_2',
    name: 'Free Boba Drink',
    description: 'Choose any medium boba tea from our signature collection',
    pointsRequired: 200,
    rewardType: 'free_item',
    rewardValue: {
      itemId: 'menu_boba_medium',
    },
    isActive: true,
    sortOrder: 2,
    imageUrl: 'https://images.unsplash.com/photo-1558857563-b371033873b8?q=80&w=400',
  },
  {
    id: 'rwd_3',
    name: '$5 Off Purchase',
    description: 'Get $5 off any order of $15 or more',
    pointsRequired: 250,
    rewardType: 'discount',
    rewardValue: {
      discount: 5.0,
    },
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'rwd_4',
    name: 'Free Specialty Drink',
    description: 'Redeem for any specialty drink including our signature lattes',
    pointsRequired: 300,
    rewardType: 'free_item',
    rewardValue: {
      itemId: 'menu_specialty',
    },
    isActive: true,
    sortOrder: 4,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400',
  },
  {
    id: 'rwd_5',
    name: '15% Off Entire Order',
    description: 'Save 15% on your entire purchase (drinks, food, and retail)',
    pointsRequired: 400,
    rewardType: 'percentage_off',
    rewardValue: {
      percentage: 15,
    },
    isActive: true,
    sortOrder: 5,
  },
  {
    id: 'rwd_6',
    name: '$10 Off Purchase',
    description: 'Get $10 off any order of $30 or more',
    pointsRequired: 500,
    rewardType: 'discount',
    rewardValue: {
      discount: 10.0,
    },
    isActive: true,
    sortOrder: 6,
  },
  {
    id: 'rwd_7',
    name: 'Free Food Item',
    description: 'Choose any food item from our menu (sandwiches, snacks, or sides)',
    pointsRequired: 350,
    rewardType: 'free_item',
    rewardValue: {
      itemId: 'menu_food',
    },
    isActive: true,
    sortOrder: 7,
    imageUrl: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?q=80&w=400',
  },
  {
    id: 'rwd_8',
    name: '25% Off Entire Order',
    description: 'Save 25% on your entire purchase - our best discount reward!',
    pointsRequired: 750,
    rewardType: 'percentage_off',
    rewardValue: {
      percentage: 25,
    },
    isActive: true,
    sortOrder: 8,
  },
  {
    id: 'rwd_9',
    name: 'Free Event Entry',
    description: 'Free entry to any tournament or event (up to $15 value)',
    pointsRequired: 600,
    rewardType: 'discount',
    rewardValue: {
      discount: 15.0,
    },
    isActive: true,
    sortOrder: 9,
  },
  {
    id: 'rwd_10',
    name: '$15 Off Purchase',
    description: 'Save $15 on any order of $50 or more',
    pointsRequired: 1000,
    rewardType: 'discount',
    rewardValue: {
      discount: 15.0,
    },
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'rwd_11',
    name: '$25 Off Purchase',
    description: 'Save $25 on any order of $75 or more - our top tier reward!',
    pointsRequired: 2500,
    rewardType: 'discount',
    rewardValue: {
      discount: 25.0,
    },
    isActive: true,
    sortOrder: 11,
  },
  {
    id: 'rwd_12',
    name: 'Birthday Bonus',
    description: 'Special birthday reward - free drink of your choice!',
    pointsRequired: 0, // Free on birthday
    rewardType: 'free_item',
    rewardValue: {
      itemId: 'menu_any_drink',
    },
    isActive: true,
    sortOrder: 12,
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400',
  },
];

// Mock points transactions for a user
export const MOCK_POINTS_TRANSACTIONS: PointsTransaction[] = [
  {
    id: 'txn_1',
    userId: 'user_123',
    amount: 100,
    type: 'bonus',
    description: 'Birthday bonus - Happy Birthday! 🎉',
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'txn_2',
    userId: 'user_123',
    amount: 25,
    type: 'purchase',
    description: 'Earned from order #QP-20260102-001',
    orderId: 'order_abc',
    createdAt: new Date('2026-01-02').toISOString(),
  },
  {
    id: 'txn_3',
    userId: 'user_123',
    amount: 50,
    type: 'event',
    description: 'Event attendance - Friday Night Magic',
    createdAt: new Date('2026-01-03').toISOString(),
  },
  {
    id: 'txn_4',
    userId: 'user_123',
    amount: 32,
    type: 'purchase',
    description: 'Earned from order #QP-20260104-012',
    orderId: 'order_def',
    createdAt: new Date('2026-01-04').toISOString(),
  },
  {
    id: 'txn_5',
    userId: 'user_123',
    amount: -100,
    type: 'redemption',
    description: 'Redeemed: Free Small Coffee',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'txn_6',
    userId: 'user_123',
    amount: 200,
    type: 'referral',
    description: 'Referral bonus - Friend signed up!',
    createdAt: new Date('2026-01-06').toISOString(),
  },
  {
    id: 'txn_7',
    userId: 'user_123',
    amount: 18,
    type: 'purchase',
    description: 'Earned from order #QP-20260107-005',
    orderId: 'order_ghi',
    createdAt: new Date('2026-01-07').toISOString(),
  },
  {
    id: 'txn_8',
    userId: 'user_123',
    amount: 50,
    type: 'event',
    description: 'Event attendance - Commander League',
    createdAt: new Date('2026-01-07').toISOString(),
  },
];

// Calculate user points summary
export function getUserPointsSummary(userId: string) {
  const transactions = MOCK_POINTS_TRANSACTIONS.filter((txn) => txn.userId === userId);

  const currentBalance = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const lifetimeEarned = transactions
    .filter((txn) => txn.amount > 0)
    .reduce((sum, txn) => sum + txn.amount, 0);
  const totalRedeemed = Math.abs(
    transactions
      .filter((txn) => txn.amount < 0)
      .reduce((sum, txn) => sum + txn.amount, 0)
  );

  return {
    currentBalance,
    lifetimeEarned,
    totalRedeemed,
    transactions: transactions.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
  };
}

// Get rewards user can afford
export function getAffordableRewards(userPoints: number): Reward[] {
  return MOCK_REWARDS.filter(
    (reward) => reward.isActive && reward.pointsRequired <= userPoints && reward.pointsRequired > 0
  ).sort((a, b) => a.sortOrder - b.sortOrder);
}

// Get all active rewards
export function getActiveRewards(): Reward[] {
  return MOCK_REWARDS.filter((reward) => reward.isActive && reward.pointsRequired > 0).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}

// Get reward by ID
export function getRewardById(id: string): Reward | undefined {
  return MOCK_REWARDS.find((reward) => reward.id === id);
}

// Check if user has birthday this month
export function hasBirthdayThisMonth(birthday: Date): boolean {
  const now = new Date();
  return birthday.getMonth() === now.getMonth();
}

// Check if user is eligible for birthday bonus
export function isEligibleForBirthdayBonus(
  userId: string,
  birthday: Date
): { eligible: boolean; alreadyClaimed: boolean } {
  const thisMonth = hasBirthdayThisMonth(birthday);
  if (!thisMonth) {
    return { eligible: false, alreadyClaimed: false };
  }

  // Check if already claimed this year
  const now = new Date();
  const birthdayBonusThisYear = MOCK_POINTS_TRANSACTIONS.some(
    (txn) =>
      txn.userId === userId &&
      txn.type === 'bonus' &&
      txn.description.includes('Birthday') &&
      new Date(txn.createdAt).getFullYear() === now.getFullYear()
  );

  return {
    eligible: true,
    alreadyClaimed: birthdayBonusThisYear,
  };
}
