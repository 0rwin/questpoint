'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, AlertCircle } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Button, Badge } from '@/components/ui';
import { MenuItem } from '@/types/menu';
import { CartItem } from '@/store/cart-store';
import { formatCurrency, cn } from '@/lib/utils';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  onAddToCart: (customizations: Omit<CartItem, 'id'>) => void;
}

// Mock customization options (will come from database when SUPABASE_ENABLED)
const MOCK_CUSTOMIZATIONS = {
  sizes: [
    { id: 'sm', label: 'Small (12oz)', priceModifier: -0.50, isDefault: false },
    { id: 'md', label: 'Medium (16oz)', priceModifier: 0, isDefault: true },
    { id: 'lg', label: 'Large (20oz)', priceModifier: 0.50, isDefault: false },
  ],
  milkOptions: [
    { id: 'whole', label: 'Whole Milk', priceModifier: 0, isDefault: true },
    { id: '2percent', label: '2% Milk', priceModifier: 0, isDefault: false },
    { id: 'oat', label: 'Oat Milk', priceModifier: 0.50, isDefault: false },
    { id: 'almond', label: 'Almond Milk', priceModifier: 0.50, isDefault: false },
    { id: 'soy', label: 'Soy Milk', priceModifier: 0.50, isDefault: false },
  ],
  sweetnessLevels: [
    { id: '0', label: '0% (Unsweetened)', priceModifier: 0, isDefault: false },
    { id: '25', label: '25%', priceModifier: 0, isDefault: false },
    { id: '50', label: '50%', priceModifier: 0, isDefault: false },
    { id: '75', label: '75%', priceModifier: 0, isDefault: false },
    { id: '100', label: '100% (Full)', priceModifier: 0, isDefault: true },
  ],
  toppings: [
    { id: 'boba', label: 'Tapioca Boba', priceModifier: 0.50, isDefault: false },
    { id: 'jelly', label: 'Lychee Jelly', priceModifier: 0.50, isDefault: false },
    { id: 'popping', label: 'Popping Pearls', priceModifier: 0.50, isDefault: false },
    { id: 'foam', label: 'Cheese Foam', priceModifier: 1.00, isDefault: false },
    { id: 'whip', label: 'Whipped Cream', priceModifier: 0.50, isDefault: false },
  ],
};

export function CustomizationModal({
  isOpen,
  onClose,
  item,
  onAddToCart,
}: CustomizationModalProps) {
  const [selectedSize, setSelectedSize] = useState(
    MOCK_CUSTOMIZATIONS.sizes.find((s) => s.isDefault)?.id || 'md'
  );
  const [selectedMilk, setSelectedMilk] = useState(
    MOCK_CUSTOMIZATIONS.milkOptions.find((m) => m.isDefault)?.id || 'whole'
  );
  const [selectedSweetness, setSelectedSweetness] = useState(
    MOCK_CUSTOMIZATIONS.sweetnessLevels.find((s) => s.isDefault)?.id || '100'
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Calculate total price
  const calculatePrice = () => {
    let total = item.price;

    // Add size modifier
    const size = MOCK_CUSTOMIZATIONS.sizes.find((s) => s.id === selectedSize);
    if (size) total += size.priceModifier;

    // Add milk modifier
    const milk = MOCK_CUSTOMIZATIONS.milkOptions.find((m) => m.id === selectedMilk);
    if (milk) total += milk.priceModifier;

    // Add toppings
    selectedToppings.forEach((toppingId) => {
      const topping = MOCK_CUSTOMIZATIONS.toppings.find((t) => t.id === toppingId);
      if (topping) total += topping.priceModifier;
    });

    return total * quantity;
  };

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    const size = MOCK_CUSTOMIZATIONS.sizes.find((s) => s.id === selectedSize);
    const milk = MOCK_CUSTOMIZATIONS.milkOptions.find((m) => m.id === selectedMilk);
    const sweetness = MOCK_CUSTOMIZATIONS.sweetnessLevels.find(
      (s) => s.id === selectedSweetness
    );
    const toppings = MOCK_CUSTOMIZATIONS.toppings.filter((t) =>
      selectedToppings.includes(t.id)
    );

    onAddToCart({
      menuItemId: item.id,
      name: item.name,
      price: calculatePrice() / quantity, // Price per item
      quantity,
      image: item.image,
      customizations: {
        size: size?.label,
        milk: milk?.label,
        sweetness: sweetness?.label,
        toppings: toppings.map((t) => t.label),
      },
      specialInstructions: specialInstructions || undefined,
    });

    onClose();
  };

  // Only show relevant customizations based on category
  const showMilkOptions = item.category === 'coffee' || item.category === 'boba';
  const showSweetness = item.category === 'boba' || item.category === 'specialty';
  const showToppings = item.category === 'boba' || item.category === 'specialty';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customize Your Order" size="lg">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Item Info */}
        <div>
          <div className="relative h-64 rounded-xl overflow-hidden mb-4">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-fantasy text-2xl text-quest-cream mb-2">
            {item.name}
          </h3>
          <p className="text-quest-cream/60 text-sm mb-4">{item.description}</p>

          {/* Nutrition & Allergens */}
          <div className="space-y-2">
            {item.calories && (
              <div className="flex items-center gap-2 text-sm text-quest-cream/70">
                <span className="font-medium">Calories:</span>
                <span>{item.calories}</span>
              </div>
            )}
            {item.allergens.length > 0 && (
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
                <div className="text-sm">
                  <p className="font-medium text-yellow-500 mb-1">Contains Allergens:</p>
                  <p className="text-quest-cream/70">
                    {item.allergens.join(', ')}
                  </p>
                </div>
              </div>
            )}
            {item.dietaryTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.dietaryTags.map((tag) => (
                  <Badge key={tag} variant="ghost" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Customizations */}
        <div className="space-y-6">
          {/* Size */}
          <div>
            <h4 className="font-medium text-quest-cream mb-3">Size</h4>
            <div className="space-y-2">
              {MOCK_CUSTOMIZATIONS.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                    selectedSize === size.id
                      ? 'bg-quest-gold/10 border-quest-gold text-quest-gold'
                      : 'bg-quest-charcoal/50 border-quest-cream/10 text-quest-cream/70 hover:border-quest-cream/30'
                  )}
                >
                  <span>{size.label}</span>
                  {size.priceModifier !== 0 && (
                    <span className="text-sm">
                      {size.priceModifier > 0 ? '+' : ''}
                      {formatCurrency(size.priceModifier)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Milk Options */}
          {showMilkOptions && (
            <div>
              <h4 className="font-medium text-quest-cream mb-3">Milk</h4>
              <div className="space-y-2">
                {MOCK_CUSTOMIZATIONS.milkOptions.map((milk) => (
                  <button
                    key={milk.id}
                    onClick={() => setSelectedMilk(milk.id)}
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                      selectedMilk === milk.id
                        ? 'bg-quest-gold/10 border-quest-gold text-quest-gold'
                        : 'bg-quest-charcoal/50 border-quest-cream/10 text-quest-cream/70 hover:border-quest-cream/30'
                    )}
                  >
                    <span>{milk.label}</span>
                    {milk.priceModifier !== 0 && (
                      <span className="text-sm">
                        +{formatCurrency(milk.priceModifier)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness */}
          {showSweetness && (
            <div>
              <h4 className="font-medium text-quest-cream mb-3">Sweetness Level</h4>
              <div className="grid grid-cols-5 gap-2">
                {MOCK_CUSTOMIZATIONS.sweetnessLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedSweetness(level.id)}
                    className={cn(
                      'p-2 rounded-lg border transition-all text-sm',
                      selectedSweetness === level.id
                        ? 'bg-quest-gold/10 border-quest-gold text-quest-gold'
                        : 'bg-quest-charcoal/50 border-quest-cream/10 text-quest-cream/70 hover:border-quest-cream/30'
                    )}
                  >
                    {level.id}%
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Toppings */}
          {showToppings && (
            <div>
              <h4 className="font-medium text-quest-cream mb-3">
                Add Toppings (optional)
              </h4>
              <div className="space-y-2">
                {MOCK_CUSTOMIZATIONS.toppings.map((topping) => (
                  <button
                    key={topping.id}
                    onClick={() => toggleTopping(topping.id)}
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                      selectedToppings.includes(topping.id)
                        ? 'bg-quest-gold/10 border-quest-gold text-quest-gold'
                        : 'bg-quest-charcoal/50 border-quest-cream/10 text-quest-cream/70 hover:border-quest-cream/30'
                    )}
                  >
                    <span>{topping.label}</span>
                    <span className="text-sm">
                      +{formatCurrency(topping.priceModifier)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <h4 className="font-medium text-quest-cream mb-3">
              Special Instructions (optional)
            </h4>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value.slice(0, 200))}
              placeholder="Extra ice, less foam, etc..."
              maxLength={200}
              rows={3}
              className="w-full px-4 py-3 bg-quest-charcoal/50 border border-quest-cream/10 rounded-lg text-quest-cream placeholder:text-quest-cream/40 focus:outline-none focus:border-quest-gold/50 transition-colors resize-none"
            />
            <p className="text-xs text-quest-cream/40 mt-1">
              {specialInstructions.length}/200
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="pt-4 border-t border-quest-cream/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-quest-cream/70">Quantity</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="text-quest-cream font-medium w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity === 10}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <Button
              variant="gold"
              size="lg"
              onClick={handleAddToCart}
              className="w-full"
            >
              Add to Cart - {formatCurrency(calculatePrice())}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
