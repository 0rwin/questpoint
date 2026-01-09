'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ChevronRight,
  MapPin,
  Coffee,
  CreditCard,
  AlertCircle,
  Edit
} from 'lucide-react';
import { Card, Button, Badge, Input } from '@/components/ui';
import { useCartStore, type CartItem } from '@/store/cart-store';
import { cn, formatCurrency } from '@/lib/utils';
import { useFeature } from '@/hooks/use-feature-flags';
import { MOCK_MENU_ITEMS } from '@/data/menu-mock';
import { CustomizationModal } from '@/components/features/menu/customization-modal';
import { CartStalenessModal } from '@/components/features/cart/cart-staleness-modal';
import { useCartItemShortcuts } from '@/hooks/use-keyboard-shortcuts';

export default function CartPage() {
  const {
    items,
    orderType,
    setOrderType,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTax,
    getTotal,
    getItemCount,
    clearCart,
    addItem,
  } = useCartStore();

  const orderingEnabled = useFeature('ORDERING_ENABLED');

  const [promoCode, setPromoCode] = useState('');
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showStalenessModal, setShowStalenessModal] = useState(false);
  const [staleItems, setStaleItems] = useState<any[]>([]);

  // Mock user points - would come from auth
  const userPoints = 850;
  const maxRedeemablePoints = Math.min(userPoints, Math.floor(getTotal() * 100)); // 1 point = $0.01

  // Check for cart staleness on mount
  useEffect(() => {
    checkCartStaleness();
  }, []);

  const checkCartStaleness = () => {
    const stale = items
      .map((cartItem) => {
        const currentMenuItem = MOCK_MENU_ITEMS.find((m) => m.id === cartItem.menuItemId);

        if (!currentMenuItem) {
          return {
            cartItem,
            status: 'removed',
            message: `${cartItem.name} is no longer available`,
          };
        }

        if (currentMenuItem.price !== cartItem.price) {
          return {
            cartItem,
            currentMenuItem,
            status: 'price_changed',
            message: `${cartItem.name} is now ${formatCurrency(
              currentMenuItem.price
            )} (was ${formatCurrency(cartItem.price)})`,
            oldPrice: cartItem.price,
            newPrice: currentMenuItem.price,
          };
        }

        if (!currentMenuItem.isAvailable) {
          return {
            cartItem,
            status: 'unavailable',
            message: `${cartItem.name} is currently unavailable`,
          };
        }

        return null;
      })
      .filter(Boolean);

    if (stale.length > 0) {
      setStaleItems(stale);
      setShowStalenessModal(true);
    }
  };

  const handleStalenessDecision = (itemId: string, action: 'keep' | 'remove', newPrice?: number) => {
    if (action === 'remove') {
      removeItem(itemId);
    }
    // For 'keep', we don't update price in mock - it will be handled by real DB sync
  };

  // Calculate food/drink item count for warning
  const foodDrinkCount = items
    .filter((item) => {
      const menuItem = MOCK_MENU_ITEMS.find((m) => m.id === item.menuItemId);
      return menuItem && ['coffee', 'boba', 'smoothie', 'food', 'specialty'].includes(menuItem.category);
    })
    .reduce((sum, item) => sum + item.quantity, 0);

  const showLargeOrderWarning = foodDrinkCount > 10;

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="page-enter">
        {/* Header */}
        <section className="bg-quest-gradient border-b border-quest-cream/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <h1 className="section-title mb-2">Your Cart</h1>
            <p className="section-subtitle">
              {getItemCount()} {getItemCount() === 1 ? 'item' : 'items'} ready to order
            </p>
          </div>
        </section>

        {/* Large Order Warning */}
        {showLargeOrderWarning && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <div className="flex gap-3">
                <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
                <div className="text-sm">
                  <p className="font-medium text-yellow-500 mb-1">Large Order!</p>
                  <p className="text-quest-cream/80">
                    You have {foodDrinkCount} food/drink items. Estimated prep time: 30-45 minutes.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Order Type Toggle */}
            <Card>
              <h3 className="font-fantasy text-lg text-quest-gold mb-4">Order Type</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOrderType('pickup')}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                    orderType === 'pickup'
                      ? 'border-quest-gold bg-quest-gold/10'
                      : 'border-quest-cream/10 hover:border-quest-cream/30'
                  )}
                >
                  <Coffee size={24} className={orderType === 'pickup' ? 'text-quest-gold' : 'text-quest-cream/60'} />
                  <span className={orderType === 'pickup' ? 'text-quest-gold font-medium' : 'text-quest-cream/60'}>
                    Pickup
                  </span>
                </button>
                <button
                  onClick={() => setOrderType('dine_in')}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                    orderType === 'dine_in'
                      ? 'border-quest-gold bg-quest-gold/10'
                      : 'border-quest-cream/10 hover:border-quest-cream/30'
                  )}
                >
                  <MapPin size={24} className={orderType === 'dine_in' ? 'text-quest-gold' : 'text-quest-cream/60'} />
                  <span className={orderType === 'dine_in' ? 'text-quest-gold font-medium' : 'text-quest-cream/60'}>
                    Dine In
                  </span>
                </button>
              </div>
            </Card>

            {/* Cart Items List */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-fantasy text-lg text-quest-gold">Items</h3>
                <button 
                  onClick={clearCart}
                  className="text-quest-cream/40 text-sm hover:text-red-400 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="divide-y divide-quest-cream/10">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                    onRemove={() => removeItem(item.id)}
                    onEdit={() => setEditingItem(item.id)}
                  />
                ))}
              </div>
            </Card>

            {/* Add More Items */}
            <Link href="/menu">
              <Card variant="interactive" className="flex items-center justify-center gap-2 py-4">
                <Plus size={18} className="text-quest-gold" />
                <span className="text-quest-cream">Add More Items</span>
              </Card>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <h3 className="font-fantasy text-lg text-quest-gold mb-4">Order Summary</h3>
              
              {/* Subtotals */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-quest-cream/60">
                  <span>Subtotal</span>
                  <span>{formatCurrency(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-quest-cream/60">
                  <span>Tax</span>
                  <span>{formatCurrency(getTax())}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="py-4 border-t border-quest-cream/10">
                <label className="text-sm text-quest-cream/60 mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm" disabled={!promoCode}>
                    Apply
                  </Button>
                </div>
              </div>

              {/* Points Redemption */}
              {userPoints > 0 && (
                <div className="py-4 border-t border-quest-cream/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-quest-cream/60">Use Points</span>
                    <span className="text-sm text-quest-gold">{userPoints} available</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      value={pointsToRedeem}
                      onChange={(e) => setPointsToRedeem(Math.min(Number(e.target.value), maxRedeemablePoints))}
                      min={0}
                      max={maxRedeemablePoints}
                      className="flex-1"
                    />
                    <span className="text-quest-cream/40 text-sm whitespace-nowrap">
                      = {formatCurrency(pointsToRedeem / 100)}
                    </span>
                  </div>
                  <p className="text-xs text-quest-cream/40 mt-1">100 points = $1.00 discount</p>
                </div>
              )}

              {/* Total */}
              <div className="pt-4 border-t border-quest-cream/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-quest-cream font-medium">Total</span>
                  <span className="font-fantasy text-2xl text-quest-gold">
                    {formatCurrency(getTotal() - (pointsToRedeem / 100))}
                  </span>
                </div>

                {/* Points Earned */}
                <div className="flex items-center gap-2 text-sm text-quest-gold bg-quest-gold/10 p-3 rounded-lg mb-4">
                  <AlertCircle size={16} />
                  <span>You&apos;ll earn {Math.floor(getSubtotal())} points with this order</span>
                </div>

                <Link href="/checkout">
                  <Button variant="gold" className="w-full" size="lg" rightIcon={<CreditCard size={18} />}>
                    Checkout
                  </Button>
                </Link>

                <p className="text-xs text-quest-cream/40 text-center mt-3">
                  Secure checkout powered by Square
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>

    {/* Cart Staleness Modal */}
    <CartStalenessModal
      isOpen={showStalenessModal}
      onClose={() => setShowStalenessModal(false)}
      staleItems={staleItems}
      onDecision={handleStalenessDecision}
    />

    {/* Edit Customization Modal */}
    {editingItem && (() => {
      const item = items.find((i) => i.id === editingItem);
      const menuItem = item && MOCK_MENU_ITEMS.find((m) => m.id === item.menuItemId);
      return menuItem ? (
        <CustomizationModal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          item={menuItem}
          onAddToCart={(updated) => {
            // Remove old item and add updated one
            removeItem(editingItem);
            addItem(updated);
            setEditingItem(null);
          }}
        />
      ) : null;
    })()}
  </>
  );
}

// Cart Item Row Component
function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  onEdit,
}: {
  item: CartItem;
  onUpdateQuantity: (qty: number) => void;
  onRemove: () => void;
  onEdit?: () => void;
}) {
  const menuItem = MOCK_MENU_ITEMS.find((m) => m.id === item.menuItemId);
  // Max quantity: 10 for food/drinks (retail products would be 99)
  const maxQuantity = 10;
  const isCustomizable = menuItem && ['coffee', 'boba', 'smoothie', 'specialty'].includes(menuItem.category);

  // Keyboard shortcuts for quantity adjustment (+/- keys when focused)
  useCartItemShortcuts(
    item.id,
    () => onUpdateQuantity(Math.min(item.quantity + 1, maxQuantity)),
    () => onUpdateQuantity(Math.max(item.quantity - 1, 1))
  );

  return (
    <div
      className="py-4 first:pt-0 last:pb-0"
      data-cart-item-id={item.id}
      tabIndex={0}
      role="group"
      aria-label={`Cart item: ${item.name}`}
    >
      <div className="flex gap-4">
        {/* Image */}
        {item.image && (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-fantasy text-quest-cream">{item.name}</h4>
            <span className="text-quest-gold font-bold whitespace-nowrap">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>

          {/* Customizations */}
          {item.customizations && Object.keys(item.customizations).length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {item.customizations.size && (
                <Badge variant="ghost" size="sm">{item.customizations.size}</Badge>
              )}
              {item.customizations.milk && (
                <Badge variant="ghost" size="sm">{item.customizations.milk}</Badge>
              )}
              {item.customizations.toppings?.map((topping) => (
                <Badge key={topping} variant="ghost" size="sm">{topping}</Badge>
              ))}
            </div>
          )}

          {/* Special Instructions */}
          {item.specialInstructions && (
            <p className="text-quest-cream/40 text-xs mt-1 italic">
              Note: {item.specialInstructions}
            </p>
          )}

          {/* Quantity & Controls */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                disabled={item.quantity === 1}
                className={cn(
                  'p-1.5 rounded-lg bg-quest-cream/5 hover:bg-quest-cream/10 transition-colors',
                  item.quantity === 1 && 'opacity-30 cursor-not-allowed'
                )}
              >
                <Minus size={16} className="text-quest-cream/60" />
              </button>
              <span className="w-8 text-center text-quest-cream font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                disabled={item.quantity >= maxQuantity}
                className={cn(
                  'p-1.5 rounded-lg bg-quest-cream/5 hover:bg-quest-cream/10 transition-colors',
                  item.quantity >= maxQuantity && 'opacity-30 cursor-not-allowed'
                )}
              >
                <Plus size={16} className="text-quest-cream/60" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Edit Button (if customizable) */}
              {isCustomizable && onEdit && (
                <button
                  onClick={onEdit}
                  className="p-1.5 rounded-lg hover:bg-quest-cream/10 transition-colors text-quest-cream/60 hover:text-quest-gold"
                  title="Edit customizations"
                >
                  <Edit size={16} />
                </button>
              )}

              {/* Remove Button */}
              <button
                onClick={onRemove}
                className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-quest-cream/40 hover:text-red-400"
                title="Remove from cart"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty Cart Component
function EmptyCart() {
  return (
    <div className="page-enter">
      <section className="max-w-md mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-quest-charcoal mx-auto mb-6 flex items-center justify-center">
          <ShoppingCart size={40} className="text-quest-cream/20" />
        </div>
        <h1 className="font-fantasy text-2xl text-quest-cream mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-quest-cream/60 mb-8">
          Looks like you haven&apos;t added anything yet. Check out our menu to find your next favorite drink!
        </p>
        <Link href="/menu">
          <Button variant="gold" rightIcon={<ChevronRight size={18} />}>
            Browse Menu
          </Button>
        </Link>
      </section>
    </div>
  );
}
