'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  ChevronLeft,
  AlertCircle,
  Check,
  Clock,
  MapPin,
  Coffee,
  Gift,
} from 'lucide-react';
import { Button, Card, Badge, Input } from '@/components/ui';
import { useCartStore } from '@/store/cart-store';
import { useFeature } from '@/hooks/use-feature-flags';
import { formatCurrency, cn } from '@/lib/utils';
import { processPayment, type PaymentResult } from '@/lib/square/payments-stub';
import { AfterHoursNotice } from '@/components/features/orders/after-hours-notice';

// Mock user data (will come from auth)
const MOCK_USER = {
  id: 'user_123',
  email: 'customer@example.com',
  name: 'John Doe',
  points: 1250, // Available points
  isGuest: false, // Set to true to test guest redirect
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    orderType,
    getSubtotal,
    getTax,
    getTotal,
    clearCart,
  } = useCartStore();

  const squareEnabled = useFeature('SQUARE_PAYMENTS_ENABLED');
  const orderingEnabled = useFeature('ORDERING_ENABLED');

  // State
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPointsPrompt, setShowPointsPrompt] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [tableNumber, setTableNumber] = useState('');

  // Calculate max redeemable points (1 point = $0.01)
  const maxRedeemablePoints = Math.min(
    MOCK_USER.points,
    Math.floor(getTotal() * 100)
  );

  // Calculate points benefit
  const pointsDiscount = usePoints ? pointsToUse / 100 : 0;

  // Calculate tip
  const tipAmount =
    tipPercentage > 0
      ? (getSubtotal() * tipPercentage) / 100
      : parseFloat(customTip) || 0;

  // Final total
  const finalTotal = getTotal() - pointsDiscount + tipAmount;

  // Points earned on this order
  const pointsEarned = Math.floor(getSubtotal());

  // Estimated ready time (mock calculation)
  const estimatedMinutes = items.length * 3 + 10;

  // Check if guest user
  useEffect(() => {
    if (MOCK_USER.isGuest) {
      router.push('/auth/login?redirect=/checkout');
    }
  }, [router]);

  // Show points prompt if user has enough points
  useEffect(() => {
    if (maxRedeemablePoints >= 100 && !showPointsPrompt) {
      setShowPointsPrompt(true);
      setPointsToUse(maxRedeemablePoints); // Auto-select max benefit
    }
  }, [maxRedeemablePoints, showPointsPrompt]);

  // Redirect if cart is empty or ordering disabled
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
    if (!orderingEnabled) {
      router.push('/cart');
    }
  }, [items, orderingEnabled, router]);

  const handleApplyPoints = () => {
    setUsePoints(true);
    setShowPointsPrompt(false);
  };

  const handleDeclinePoints = () => {
    setUsePoints(false);
    setPointsToUse(0);
    setShowPointsPrompt(false);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Step 1: Process payment (stubbed Square integration)
      const paymentResult: PaymentResult = await processPayment({
        amount: finalTotal,
        cardholderName: MOCK_USER.name,
        saveCard,
      });

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment failed');
      }

      // Step 2: Create order record (payment-first approach)
      const orderData = {
        userId: MOCK_USER.id,
        items: items.map((item) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          customizations: item.customizations,
          specialInstructions: item.specialInstructions,
        })),
        orderType,
        tableNumber: orderType === 'dine_in' ? tableNumber : null,
        subtotal: getSubtotal(),
        tax: getTax(),
        tipAmount,
        pointsUsed: usePoints ? pointsToUse : 0,
        total: finalTotal,
        paymentIntentId: paymentResult.paymentIntentId,
        estimatedReadyMinutes: estimatedMinutes,
      };

      // Call order API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();

      // Step 3: Clear cart and redirect to confirmation
      clearCart();
      router.push(`/orders/${order.orderNumber}`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft size={18} />
              Back to Cart
            </Button>
          </Link>
          <h1 className="section-title mb-2">Checkout</h1>
          <p className="section-subtitle">Complete your order</p>
        </div>
      </section>

      {/* Points Prompt Modal */}
      {showPointsPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/70" onClick={handleDeclinePoints} />
          <Card className="relative z-10 max-w-md w-full">
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-quest-gold/20 flex items-center justify-center flex-shrink-0">
                <Gift className="text-quest-gold" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-fantasy text-xl text-quest-cream mb-2">
                  Use Your Points?
                </h3>
                <p className="text-quest-cream/70 text-sm">
                  Your {MOCK_USER.points} points can save you{' '}
                  {formatCurrency(maxRedeemablePoints / 100)}. Apply discount?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="gold" size="lg" onClick={handleApplyPoints} className="flex-1">
                Yes, Apply Points
              </Button>
              <Button variant="ghost" size="lg" onClick={handleDeclinePoints} className="flex-1">
                No Thanks
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* After Hours Notice */}
            <AfterHoursNotice />
            {/* Order Type */}
            <Card>
              <h2 className="font-fantasy text-xl text-quest-gold mb-4">Order Type</h2>
              <div className="flex items-center gap-3 p-4 bg-quest-charcoal/50 rounded-lg border border-quest-gold/30">
                {orderType === 'pickup' ? (
                  <>
                    <Coffee className="text-quest-gold" size={24} />
                    <div>
                      <p className="font-medium text-quest-cream">Pickup</p>
                      <p className="text-sm text-quest-cream/60">
                        Ready in ~{estimatedMinutes} minutes
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <MapPin className="text-quest-gold" size={24} />
                    <div className="flex-1">
                      <p className="font-medium text-quest-cream mb-2">Dine-In</p>
                      <Input
                        placeholder="Table number (e.g., T-5)"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="max-w-xs"
                      />
                      <p className="text-xs text-quest-cream/40 mt-1">
                        Staff will assign table if ordering from counter
                      </p>
                    </div>
                  </>
                )}
              </div>
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="mt-3">
                  Change Order Type
                </Button>
              </Link>
            </Card>

            {/* Tipping */}
            <Card>
              <h2 className="font-fantasy text-xl text-quest-gold mb-4">Add a Tip</h2>
              <p className="text-sm text-quest-cream/60 mb-4">
                Tips are pooled across all staff and distributed weekly
              </p>

              <div className="grid grid-cols-4 gap-3 mb-4">
                {[15, 18, 20].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => {
                      setTipPercentage(percent);
                      setCustomTip('');
                    }}
                    className={cn(
                      'p-3 rounded-lg border-2 transition-all',
                      tipPercentage === percent
                        ? 'border-quest-gold bg-quest-gold/10 text-quest-gold'
                        : 'border-quest-cream/10 text-quest-cream/70 hover:border-quest-cream/30'
                    )}
                  >
                    <div className="font-bold">{percent}%</div>
                    <div className="text-xs">
                      {formatCurrency((getSubtotal() * percent) / 100)}
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setTipPercentage(0);
                  }}
                  className={cn(
                    'p-3 rounded-lg border-2 transition-all',
                    tipPercentage === 0 && !customTip
                      ? 'border-quest-gold bg-quest-gold/10 text-quest-gold'
                      : 'border-quest-cream/10 text-quest-cream/70 hover:border-quest-cream/30'
                  )}
                >
                  <div className="font-bold text-sm">Custom</div>
                </button>
              </div>

              {(tipPercentage === 0 || customTip) && (
                <div>
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customTip}
                    onChange={(e) => {
                      setCustomTip(e.target.value);
                      setTipPercentage(0);
                    }}
                    leftIcon={<span className="text-quest-cream/60">$</span>}
                    step="0.50"
                    min="0"
                  />
                </div>
              )}
            </Card>

            {/* Payment Method */}
            <Card>
              <h2 className="font-fantasy text-xl text-quest-gold mb-4">Payment Method</h2>

              {squareEnabled ? (
                <div className="space-y-4">
                  <div className="p-4 bg-quest-charcoal/50 rounded-lg border border-quest-cream/10">
                    <CreditCard className="text-quest-gold mb-2" size={24} />
                    <p className="text-sm text-quest-cream/60">
                      Square payment form would load here when enabled
                    </p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <p className="text-quest-cream">Save card for future orders</p>
                      <p className="text-quest-cream/40">
                        Securely stored via Square Customer Vault
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <Card className="bg-yellow-500/10 border-yellow-500/30">
                  <div className="flex gap-3">
                    <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-500 mb-1">Payments Disabled</p>
                      <p className="text-quest-cream/80">
                        Square payments are not enabled. Visit{' '}
                        <Link href="/admin/settings" className="text-quest-gold hover:underline">
                          Admin Settings
                        </Link>{' '}
                        to enable payment processing.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <h2 className="font-fantasy text-xl text-quest-gold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    {item.image && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-quest-cream truncate">{item.name}</p>
                      <p className="text-xs text-quest-cream/40">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-quest-gold font-medium whitespace-nowrap">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 py-4 border-t border-quest-cream/10">
                <div className="flex justify-between text-sm text-quest-cream/70">
                  <span>Subtotal</span>
                  <span>{formatCurrency(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm text-quest-cream/70">
                  <span>Tax (8.25%)</span>
                  <span>{formatCurrency(getTax())}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between text-sm text-quest-cream/70">
                    <span>Tip</span>
                    <span>{formatCurrency(tipAmount)}</span>
                  </div>
                )}
                {usePoints && pointsDiscount > 0 && (
                  <div className="flex justify-between text-sm text-quest-gold">
                    <span>Points Discount</span>
                    <span>-{formatCurrency(pointsDiscount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-quest-cream/10 mb-6">
                <span className="font-fantasy text-lg text-quest-cream">Total</span>
                <span className="font-bold text-2xl text-quest-gold">
                  {formatCurrency(finalTotal)}
                </span>
              </div>

              {/* Points Info */}
              <div className="mb-6 p-3 bg-quest-gold/10 rounded-lg border border-quest-gold/30">
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="text-quest-gold flex-shrink-0" size={16} />
                  <span className="text-quest-cream/80">
                    You'll earn <strong className="text-quest-gold">{pointsEarned} points</strong>{' '}
                    with this order
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                variant="gold"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing || !squareEnabled}
                isLoading={isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : `Place Order - ${formatCurrency(finalTotal)}`}
              </Button>

              <p className="text-xs text-quest-cream/40 text-center mt-3">
                {orderType === 'pickup'
                  ? `Ready in ~${estimatedMinutes} minutes`
                  : 'Order will be prepared fresh'}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
