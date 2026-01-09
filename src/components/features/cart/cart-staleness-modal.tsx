'use client';

import { Modal } from '@/components/ui/modal';
import { Button, Badge } from '@/components/ui';
import { AlertCircle, Check, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface StaleItem {
  cartItem: any;
  currentMenuItem?: any;
  status: 'removed' | 'price_changed' | 'unavailable';
  message: string;
  oldPrice?: number;
  newPrice?: number;
}

interface CartStalenessModalProps {
  isOpen: boolean;
  onClose: () => void;
  staleItems: StaleItem[];
  onDecision: (itemId: string, action: 'keep' | 'remove', newPrice?: number) => void;
}

export function CartStalenessModal({
  isOpen,
  onClose,
  staleItems,
  onDecision,
}: CartStalenessModalProps) {
  if (staleItems.length === 0) return null;

  const handleResolveAll = () => {
    // Remove all unavailable/removed items, update prices for changed items
    staleItems.forEach((staleItem) => {
      if (staleItem.status === 'removed' || staleItem.status === 'unavailable') {
        onDecision(staleItem.cartItem.id, 'remove');
      } else if (staleItem.status === 'price_changed' && staleItem.newPrice) {
        onDecision(staleItem.cartItem.id, 'keep', staleItem.newPrice);
      }
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cart Items Have Changed" size="md">
      <div className="space-y-6">
        {/* Warning Header */}
        <div className="flex gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
          <div className="text-sm">
            <p className="font-medium text-yellow-500 mb-1">
              Some items in your cart have changed
            </p>
            <p className="text-quest-cream/80">
              Review the changes below and decide which items to keep or remove.
            </p>
          </div>
        </div>

        {/* Changed Items */}
        <div className="space-y-3">
          {staleItems.map((staleItem, index) => (
            <div
              key={staleItem.cartItem.id}
              className="p-4 bg-quest-charcoal/50 border border-quest-cream/10 rounded-lg"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-quest-cream mb-1">
                    {staleItem.cartItem.name}
                  </h3>
                  <p className="text-sm text-quest-cream/60">
                    Quantity: {staleItem.cartItem.quantity}
                  </p>
                </div>
                <Badge
                  variant={
                    staleItem.status === 'removed' || staleItem.status === 'unavailable'
                      ? 'danger'
                      : 'gold'
                  }
                  size="sm"
                >
                  {staleItem.status === 'removed'
                    ? 'Removed'
                    : staleItem.status === 'unavailable'
                    ? 'Unavailable'
                    : 'Price Changed'}
                </Badge>
              </div>

              {/* Change Details */}
              <div className="mb-4 p-3 bg-quest-dark/50 rounded border border-quest-cream/10">
                <p className="text-sm text-quest-cream/70">{staleItem.message}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {staleItem.status === 'price_changed' ? (
                  <>
                    <Button
                      variant="gold"
                      size="sm"
                      onClick={() => {
                        onDecision(
                          staleItem.cartItem.id,
                          'keep',
                          staleItem.newPrice
                        );
                        // Remove this item from the list
                        const remaining = staleItems.filter(
                          (_, i) => i !== index
                        );
                        if (remaining.length === 0) {
                          onClose();
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5"
                    >
                      <Check size={14} />
                      Keep (Update Price)
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onDecision(staleItem.cartItem.id, 'remove');
                        const remaining = staleItems.filter(
                          (_, i) => i !== index
                        );
                        if (remaining.length === 0) {
                          onClose();
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 text-red-400"
                    >
                      <X size={14} />
                      Remove
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onDecision(staleItem.cartItem.id, 'remove');
                      const remaining = staleItems.filter(
                        (_, i) => i !== index
                      );
                      if (remaining.length === 0) {
                        onClose();
                      }
                    }}
                    className="w-full text-red-400"
                  >
                    Remove from Cart
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resolve All Button */}
        <div className="pt-4 border-t border-quest-cream/10">
          <Button variant="gold" size="lg" onClick={handleResolveAll} className="w-full">
            Accept All Changes
          </Button>
          <p className="text-xs text-quest-cream/40 text-center mt-2">
            This will update prices and remove unavailable items
          </p>
        </div>
      </div>
    </Modal>
  );
}
