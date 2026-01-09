'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Gift, 
  Clock, 
  Heart, 
  Settings, 
  LogOut,
  ChevronRight,
  Star,
  Coffee,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

// Mock user data - will come from Supabase auth + profile
const mockUser = {
  id: '1',
  displayName: 'Alex Chen',
  email: 'alex@example.com',
  points: 850,
  lifetimePoints: 2450,
  memberSince: '2025-06-15',
};

// Mock order history
const recentOrders = [
  {
    id: 'QP-ABC123',
    date: '2026-01-02T14:30:00',
    items: ['Black Lotus Latte', 'Soft Pretzel'],
    total: 13.00,
    pointsEarned: 13,
    status: 'completed',
  },
  {
    id: 'QP-DEF456',
    date: '2025-12-28T11:00:00',
    items: ['Mana Potion Boba', 'Takoyaki'],
    total: 15.75,
    pointsEarned: 15,
    status: 'completed',
  },
  {
    id: 'QP-GHI789',
    date: '2025-12-20T16:45:00',
    items: ['Cold Brew', 'Brown Sugar Milk Tea'],
    total: 11.50,
    pointsEarned: 11,
    status: 'completed',
  },
];

// Rewards catalog
const rewards = [
  { points: 250, name: 'Free Boba Topping', description: 'Add any topping to your drink' },
  { points: 500, name: 'Free Pastry', description: 'Any pastry or snack item' },
  { points: 1000, name: 'Free Drink', description: 'Any drink, any size' },
  { points: 2500, name: '$10 Off Retail', description: 'TCG products or merch' },
];

// Account menu items
const menuItems = [
  { icon: Clock, label: 'Order History', href: '/account/orders' },
  { icon: Gift, label: 'Rewards & Points', href: '/account/rewards' },
  { icon: Calendar, label: 'My Events', href: '/account/events' },
  { icon: Heart, label: 'Favorites', href: '/account/favorites' },
  { icon: CreditCard, label: 'Payment Methods', href: '/account/payments' },
  { icon: Settings, label: 'Settings', href: '/account/settings' },
];

export default function AccountPage() {
  const [isLoggedIn] = useState(true); // Will be from auth context
  
  // Calculate next reward
  const nextReward = rewards.find(r => r.points > mockUser.points) || rewards[rewards.length - 1];
  const pointsToNext = nextReward.points - mockUser.points;
  const progressPercent = (mockUser.points / nextReward.points) * 100;

  if (!isLoggedIn) {
    return <LoginPrompt />;
  }

  return (
    <div className="page-enter">
      {/* Header with user info */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-quest-purple flex items-center justify-center text-quest-gold">
              <User size={32} />
            </div>
            <div>
              <h1 className="font-fantasy text-2xl text-quest-cream">
                {mockUser.displayName}
              </h1>
              <p className="text-quest-cream/60 text-sm">
                Member since {formatDate(mockUser.memberSince, { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Points Card - SIMPLIFIED, NOT GAMIFIED */}
            <Card className="relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-quest-gold/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-quest-cream/60 text-sm mb-1">Your Points</p>
                    <p className="font-fantasy text-4xl text-quest-gold">
                      {mockUser.points.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="gold">
                    <Star size={12} className="mr-1" />
                    Member
                  </Badge>
                </div>

                {/* Progress to next reward */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-quest-cream/60">Next reward: {nextReward.name}</span>
                    <span className="text-quest-gold font-medium">{pointsToNext} pts to go</span>
                  </div>
                  <div className="h-2 bg-quest-dark rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-quest-purple to-quest-gold transition-all duration-500"
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-quest-cream/10">
                  <div>
                    <p className="text-quest-cream/50 text-xs uppercase">Lifetime Points</p>
                    <p className="text-quest-cream font-semibold">{mockUser.lifetimePoints.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-quest-cream/50 text-xs uppercase">Points Earned This Month</p>
                    <p className="text-quest-cream font-semibold">127</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Available Rewards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-fantasy text-xl text-quest-gold flex items-center gap-2">
                  <Gift size={20} />
                  Available Rewards
                </h2>
                <Link
                  href="/account/rewards"
                  className="text-quest-gold text-sm hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rewards.map((reward) => {
                  const canRedeem = mockUser.points >= reward.points;
                  return (
                    <Card
                      key={reward.points}
                      className={cn(
                        'relative overflow-hidden transition-all',
                        canRedeem ? 'border-quest-gold/30' : 'opacity-60'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-quest-cream">{reward.name}</p>
                          <p className="text-quest-cream/50 text-sm">{reward.description}</p>
                        </div>
                        <Badge variant={canRedeem ? 'gold' : 'ghost'}>
                          {reward.points} pts
                        </Badge>
                      </div>
                      {canRedeem && (
                        <Link href="/account/rewards">
                          <Button size="sm" variant="purple" className="mt-4 w-full">
                            Redeem
                          </Button>
                        </Link>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-fantasy text-xl text-quest-gold flex items-center gap-2">
                  <Clock size={20} />
                  Recent Orders
                </h2>
                <Link 
                  href="/account/orders"
                  className="text-quest-gold text-sm hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Card key={order.id} variant="ghost" padding="sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-quest-cream font-medium text-sm">
                          {order.items.join(', ')}
                        </p>
                        <p className="text-quest-cream/50 text-xs">
                          {formatDate(order.date)} · {order.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-quest-cream font-medium">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-quest-gold text-xs">
                          +{order.pointsEarned} pts
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h3 className="font-fantasy text-lg text-quest-cream mb-4">Quick Actions</h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-quest-cream/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className="text-quest-cream/50 group-hover:text-quest-gold transition-colors" />
                      <span className="text-quest-cream/80 group-hover:text-quest-cream transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-quest-cream/30" />
                  </Link>
                ))}
              </div>
            </Card>

            {/* Earn More Points */}
            <Card className="bg-quest-purple/20 border-quest-purple/30">
              <h3 className="font-fantasy text-lg text-quest-gold mb-3">Earn More Points</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-quest-cream/80">
                  <Coffee size={16} className="text-quest-gold" />
                  <span>1 point per $1 spent</span>
                </li>
                <li className="flex items-center gap-2 text-quest-cream/80">
                  <Calendar size={16} className="text-quest-gold" />
                  <span>50 bonus points per event</span>
                </li>
                <li className="flex items-center gap-2 text-quest-cream/80">
                  <User size={16} className="text-quest-gold" />
                  <span>200 points for referrals</span>
                </li>
                <li className="flex items-center gap-2 text-quest-cream/80">
                  <Gift size={16} className="text-quest-gold" />
                  <span>100 bonus on your birthday</span>
                </li>
              </ul>
            </Card>

            {/* Sign Out */}
            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-quest-cream/50 hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Login prompt for non-authenticated users
function LoginPrompt() {
  return (
    <div className="page-enter min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-quest-purple/30 flex items-center justify-center mx-auto mb-6">
          <User size={40} className="text-quest-gold" />
        </div>
        <h1 className="font-fantasy text-3xl text-quest-cream mb-4">
          Join the Quest
        </h1>
        <p className="text-quest-cream/60 mb-8">
          Create an account to earn points, track orders, and register for events.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/auth/register">
            <Button className="w-full" size="lg">
              Create Account
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost" className="w-full" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
