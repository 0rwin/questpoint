'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  CheckCircle,
  Clock,
  MapPin,
  Coffee,
  Receipt,
  Home,
  Share2,
  Download,
  Edit,
  Phone,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { formatCurrency, formatTime, cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ orderNumber: string }>;
}

// Mock order data (will come from API/Supabase)
const MOCK_ORDER = {
  id: 'order_123',
  orderNumber: 'QP-20260107-001',
  status: 'confirmed',
  orderType: 'pickup',
  items: [
    {
      id: '1',
      name: 'Mana Potion Boba',
      quantity: 2,
      price: 7.0,
      image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?q=80&w=400',
      customizations: {
        size: 'Large (20oz)',
        sweetness: '75%',
        toppings: ['Tapioca Boba'],
      },
    },
    {
      id: '2',
      name: 'Hot Black Lotus Latte',
      quantity: 1,
      price: 6.5,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400',
      customizations: {
        size: 'Medium (16oz)',
        milk: 'Oat Milk',
      },
    },
  ],
  subtotal: 20.5,
  tax: 1.69,
  tipAmount: 3.08,
  pointsUsed: 0,
  total: 25.27,
  pointsEarned: 20,
  estimatedReadyAt: new Date(Date.now() + 15 * 60000).toISOString(),
  createdAt: new Date().toISOString(),
  tableNumber: null,
};

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';

export default function OrderConfirmationPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [order, setOrder] = useState(MOCK_ORDER);
  const [isLoading, setIsLoading] = useState(true);
  const [isReordering, setIsReordering] = useState(false);

  // Calculate time since order placed (for modification window)
  const [timeSinceOrder, setTimeSinceOrder] = useState(0);

  useEffect(() => {
    // Fetch order from API (stubbed)
    const fetchOrder = async () => {
      console.log('[STUB] Fetching order:', resolvedParams.orderNumber);
      // In real app: const response = await fetch(`/api/orders/${orderNumber}`)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchOrder();
  }, [resolvedParams.orderNumber]);

  // Real-time status updates (stubbed - will use Supabase Realtime)
  useEffect(() => {
    if (isLoading || order.status === 'completed') return;

    // Simulate status progression for demo
    const statusProgression: OrderStatus[] = ['confirmed', 'preparing', 'ready', 'completed'];
    let currentIndex = statusProgression.indexOf(order.status as OrderStatus);

    const interval = setInterval(() => {
      if (currentIndex < statusProgression.length - 1) {
        currentIndex++;
        setOrder((prev) => ({
          ...prev,
          status: statusProgression[currentIndex],
        }));
        console.log('[STUB] Order status updated to:', statusProgression[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 20000); // Update every 20 seconds for demo

    return () => clearInterval(interval);
  }, [isLoading, order.status]);

  // Track time since order for modification window
  useEffect(() => {
    const interval = setInterval(() => {
      const orderTime = new Date(order.createdAt).getTime();
      const now = Date.now();
      const seconds = Math.floor((now - orderTime) / 1000);
      setTimeSinceOrder(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [order.createdAt]);

  const canModify = timeSinceOrder < 120; // 2 minutes = 120 seconds
  const modificationTimeLeft = Math.max(0, 120 - timeSinceOrder);

  // Check if order is delayed beyond estimated ready time
  const readyTime = new Date(order.estimatedReadyAt);
  const isDelayed = Date.now() > readyTime.getTime() && order.status !== 'completed' && order.status !== 'ready';
  const minutesDelayed = Math.floor((Date.now() - readyTime.getTime()) / 60000);

  const handleReorder = async () => {
    setIsReordering(true);
    // Add items back to cart (stubbed)
    console.log('[STUB] Reordering items:', order.items);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/cart');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quest-gold mx-auto mb-4" />
          <p className="text-quest-cream/60">Loading order details...</p>
        </div>
      </div>
    );
  }

  const minutesUntilReady = Math.max(
    0,
    Math.floor((readyTime.getTime() - Date.now()) / 60000)
  );

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Success Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h1 className="font-fantasy text-4xl text-quest-cream mb-3">
            Order Confirmed!
          </h1>
          <p className="text-xl text-quest-cream/70 mb-2">
            Order #{order.orderNumber}
          </p>
          <p className="text-quest-cream/60">
            A confirmation has been sent to your email and phone
          </p>
        </div>
      </section>

      {/* Order Status */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Modification Window Alert */}
        {canModify && order.status !== 'completed' && (
          <Card className="mb-6 bg-quest-gold/10 border-quest-gold/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-quest-gold flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="font-medium text-quest-cream mb-1">
                  Order can be modified for {Math.floor(modificationTimeLeft / 60)}:
                  {String(modificationTimeLeft % 60).padStart(2, '0')} more
                </p>
                <p className="text-sm text-quest-cream/70 mb-3">
                  You can edit your order within 2 minutes of placement
                </p>
                <Button variant="gold" size="sm">
                  <Edit size={14} className="mr-2" />
                  Edit Order
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Order Timeout Notification */}
        {isDelayed && (
          <Card className="mb-6 bg-yellow-500/10 border-yellow-500/30">
            <div className="flex items-start gap-3">
              <Clock className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="font-medium text-quest-cream mb-1">
                  Your Order is Taking Longer Than Expected
                </p>
                <p className="text-sm text-quest-cream/70 mb-2">
                  We're working on it! Your order is running about {minutesDelayed} {minutesDelayed === 1 ? 'minute' : 'minutes'} behind schedule.
                </p>
                <p className="text-sm text-quest-cream/60">
                  We apologize for the delay. If you have any concerns, please{' '}
                  <a href="tel:5551234567" className="text-quest-gold hover:underline font-medium">
                    call us at (555) 123-4567
                  </a>
                  .
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Status Timeline */}
        <Card className="mb-6">
          <h2 className="font-fantasy text-xl text-quest-gold mb-6">Order Status</h2>

          <OrderStatusTimeline status={order.status as OrderStatus} />

          <div className="mt-6 pt-6 border-t border-quest-cream/10">
            <div className="flex items-start gap-4">
              {order.orderType === 'pickup' ? (
                <div className="w-12 h-12 rounded-full bg-quest-gold/20 flex items-center justify-center flex-shrink-0">
                  <Coffee className="text-quest-gold" size={24} />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-quest-purple/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-quest-purple" size={24} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium text-quest-cream mb-2">
                  {order.orderType === 'pickup' ? 'Pickup Order' : 'Dine-In'}
                </h3>
                {order.status !== 'completed' && (
                  <div className="flex items-center gap-2 text-quest-cream/70 mb-2">
                    <Clock size={16} />
                    <span className="text-sm">
                      Ready in <strong className="text-quest-gold">{minutesUntilReady} min</strong> (~
                      {formatTime(readyTime)})
                    </span>
                  </div>
                )}
                {order.tableNumber && (
                  <p className="text-sm text-quest-cream/60">
                    Table: {order.tableNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Locked Order - Call for Changes */}
        {!canModify && order.status !== 'completed' && (
          <Card className="mb-6 bg-quest-charcoal/50 border-quest-cream/10">
            <div className="text-center py-4">
              <Phone className="mx-auto mb-3 text-quest-cream/40" size={32} />
              <p className="text-quest-cream/70 mb-1">
                Need to make changes?
              </p>
              <a
                href="tel:5551234567"
                className="text-quest-gold hover:underline font-medium"
              >
                Call us at (555) 123-4567
              </a>
            </div>
          </Card>
        )}

        {/* Order Items */}
        <Card className="mb-6">
          <h2 className="font-fantasy text-xl text-quest-gold mb-4">Order Details</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-quest-cream/10 last:border-0 last:pb-0">
                {item.image && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-quest-cream">{item.name}</h3>
                    <span className="text-quest-gold font-bold whitespace-nowrap">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                  <p className="text-sm text-quest-cream/40 mb-2">
                    Quantity: {item.quantity}
                  </p>
                  {item.customizations && (
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(item.customizations).map(([key, value]) => {
                        if (Array.isArray(value)) {
                          return value.map((v) => (
                            <Badge key={v} variant="ghost" size="sm">
                              {v}
                            </Badge>
                          ));
                        }
                        return (
                          <Badge key={key} variant="ghost" size="sm">
                            {value}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6">
          <h2 className="font-fantasy text-xl text-quest-gold mb-4">Payment Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-quest-cream/70">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-quest-cream/70">
              <span>Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            {order.tipAmount > 0 && (
              <div className="flex justify-between text-quest-cream/70">
                <span>Tip</span>
                <span>{formatCurrency(order.tipAmount)}</span>
              </div>
            )}
            {order.pointsUsed > 0 && (
              <div className="flex justify-between text-quest-gold">
                <span>Points Used</span>
                <span>-{formatCurrency(order.pointsUsed / 100)}</span>
              </div>
            )}
            <div className="pt-3 border-t border-quest-cream/10 flex justify-between">
              <span className="font-fantasy text-lg text-quest-cream">Total Paid</span>
              <span className="font-bold text-xl text-quest-gold">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </Card>

        {/* Points Earned */}
        {order.pointsEarned > 0 && (
          <Card className="mb-6 bg-quest-gold/10 border-quest-gold/30">
            <div className="text-center py-4">
              <p className="text-quest-cream mb-2">You earned</p>
              <p className="font-fantasy text-3xl text-quest-gold mb-2">
                {order.pointsEarned} Points
              </p>
              <p className="text-sm text-quest-cream/60">
                Keep ordering to unlock rewards!
              </p>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="grid sm:grid-cols-3 gap-3">
          <Link href="/">
            <Button variant="ghost" size="lg" className="w-full flex items-center justify-center gap-2">
              <Home size={18} />
              Home
            </Button>
          </Link>
          <Button
            variant="gold"
            size="lg"
            onClick={handleReorder}
            isLoading={isReordering}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Reorder
          </Button>
          <Link href="/account/orders">
            <Button variant="ghost" size="lg" className="w-full flex items-center justify-center gap-2">
              <Receipt size={18} />
              All Orders
            </Button>
          </Link>
        </div>

        {/* Share/Download Options */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center gap-2 text-quest-cream/60 hover:text-quest-gold transition-colors text-sm">
            <Share2 size={16} />
            Share Receipt
          </button>
          <button className="flex items-center gap-2 text-quest-cream/60 hover:text-quest-gold transition-colors text-sm">
            <Download size={16} />
            Download PDF
          </button>
        </div>

        {/* Help Text */}
        <Card className="mt-6 bg-quest-charcoal/50">
          <p className="text-sm text-quest-cream/60 text-center">
            Need to make changes?{' '}
            <Link href="/contact" className="text-quest-gold hover:underline">
              Contact us
            </Link>{' '}
            or call <strong className="text-quest-cream">(555) 123-4567</strong>
          </p>
        </Card>
      </section>
    </div>
  );
}

// Order Status Timeline Component
function OrderStatusTimeline({ status }: { status: OrderStatus }) {
  const statuses: {status: OrderStatus; label: string; icon: typeof CheckCircle}[] = [
    { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
    { status: 'preparing', label: 'Being Prepared', icon: Clock },
    { status: 'ready', label: 'Ready for Pickup', icon: Coffee },
    { status: 'completed', label: 'Completed', icon: CheckCircle },
  ];

  const currentIndex = statuses.findIndex((s) => s.status === status);

  return (
    <div className="space-y-4">
      {statuses.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <div key={step.status} className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                isCompleted && 'bg-green-500/20 border-2 border-green-500',
                isCurrent && 'bg-quest-gold/20 border-2 border-quest-gold animate-pulse-gold',
                isPending && 'bg-quest-cream/5 border-2 border-quest-cream/20'
              )}
            >
              <Icon
                size={20}
                className={cn(
                  isCompleted && 'text-green-500',
                  isCurrent && 'text-quest-gold',
                  isPending && 'text-quest-cream/30'
                )}
              />
            </div>

            {/* Label */}
            <div className="flex-1">
              <p
                className={cn(
                  'font-medium',
                  (isCompleted || isCurrent) && 'text-quest-cream',
                  isPending && 'text-quest-cream/40'
                )}
              >
                {step.label}
              </p>
              {isCurrent && (
                <p className="text-sm text-quest-gold">In progress...</p>
              )}
              {isCompleted && (
                <p className="text-sm text-green-500">✓ Complete</p>
              )}
            </div>

            {/* Connector Line */}
            {index < statuses.length - 1 && (
              <div
                className={cn(
                  'absolute left-5 w-0.5 h-8 -mb-8 mt-10 transition-all',
                  index < currentIndex ? 'bg-green-500' : 'bg-quest-cream/10'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
