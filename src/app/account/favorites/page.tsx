'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, X, Plus, Star, Coffee } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { formatCurrency, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useFavoritesStore, type FavoriteItem } from '@/store/favorites-store';

export default function FavoritesPage() {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { favorites, removeFavorite, incrementOrderCount } = useFavoritesStore();
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Handle remove from favorites
  const handleRemove = async (menuItemId: string) => {
    setRemovingId(menuItemId);

    // Simulate API call delay
    setTimeout(() => {
      removeFavorite(menuItemId);
      setRemovingId(null);
    }, 300);
  };

  // Handle quick add to cart
  const handleQuickAdd = (favorite: FavoriteItem) => {
    // TODO: Load full menu item details and add with saved customizations
    console.log('[STUB] Adding favorite to cart:', favorite.name, favorite.customizations);

    // In production, this would:
    // 1. Fetch full menu item details
    // 2. Apply saved customizations
    // 3. Add to cart
    // addItem({ ...menuItem, customizations: favorite.customizations });

    // Increment order count
    incrementOrderCount(favorite.menuItemId);

    alert(`"${favorite.name}" added to cart with your saved preferences!`);
  };

  // Handle customize and add
  const handleCustomize = (favorite: FavoriteItem) => {
    // Navigate to menu item page to customize
    router.push(`/menu/${favorite.menuItemId}`);
  };

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Favorites</h1>
          <p className="section-subtitle">Your go-to orders, saved for quick reordering</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {favorites.length === 0 ? (
          <Card className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-quest-purple/20 flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-quest-gold" />
            </div>
            <h3 className="font-fantasy text-2xl text-quest-cream mb-3">No Favorites Yet</h3>
            <p className="text-quest-cream/60 mb-8 max-w-md mx-auto">
              Save your favorite menu items for quick reordering. Just tap the heart icon on any
              item!
            </p>
            <Link href="/menu">
              <Button variant="gold" size="lg">
                <Coffee size={20} />
                Browse Menu
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card className="bg-quest-purple/10 border-quest-purple/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-quest-purple/20 flex items-center justify-center">
                    <Heart size={24} className="text-quest-gold" />
                  </div>
                  <div>
                    <p className="text-quest-cream/50 text-xs uppercase">Total Favorites</p>
                    <p className="font-fantasy text-2xl text-quest-cream">{favorites.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-quest-charcoal/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-quest-gold/20 flex items-center justify-center">
                    <ShoppingCart size={24} className="text-quest-gold" />
                  </div>
                  <div>
                    <p className="text-quest-cream/50 text-xs uppercase">Times Reordered</p>
                    <p className="font-fantasy text-2xl text-quest-cream">
                      {favorites.reduce((sum, f) => sum + f.timesOrdered, 0)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-quest-charcoal/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Star size={24} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-quest-cream/50 text-xs uppercase">Top Category</p>
                    <p className="font-fantasy text-2xl text-quest-cream">
                      {favorites[0]?.category || 'None'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Favorites Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <FavoriteCard
                  key={favorite.id}
                  favorite={favorite}
                  isRemoving={removingId === favorite.menuItemId}
                  onRemove={() => handleRemove(favorite.menuItemId)}
                  onQuickAdd={() => handleQuickAdd(favorite)}
                  onCustomize={() => handleCustomize(favorite)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// Favorite Card Component
interface FavoriteCardProps {
  favorite: FavoriteItem;
  isRemoving: boolean;
  onRemove: () => void;
  onQuickAdd: () => void;
  onCustomize: () => void;
}

function FavoriteCard({ favorite, isRemoving, onRemove, onQuickAdd, onCustomize }: FavoriteCardProps) {
  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'overflow-hidden transition-all',
        isRemoving && 'opacity-50 scale-95'
      )}
    >
      {/* Image */}
      <div className="relative h-48 w-full bg-quest-charcoal">
        <Image
          src={favorite.imageUrl}
          alt={favorite.name}
          fill
          className="object-cover"
        />
        {/* Remove button */}
        <button
          onClick={onRemove}
          disabled={isRemoving}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-quest-dark/80 backdrop-blur-sm flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="ghost" size="sm">
            {favorite.category}
          </Badge>
        </div>

        {/* Times ordered badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="gold" size="sm">
            <Star size={12} className="mr-1" />
            Ordered {favorite.timesOrdered}x
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-fantasy text-lg text-quest-cream mb-2">{favorite.name}</h3>
        <p className="text-quest-cream/60 text-sm mb-3 line-clamp-2">
          {favorite.description}
        </p>

        {/* Saved customizations */}
        {favorite.customizations && (
          <div className="mb-3 space-y-1">
            <p className="text-quest-cream/40 text-xs uppercase mb-1">Saved Preferences:</p>
            <div className="flex flex-wrap gap-1">
              {favorite.customizations.size && (
                <Badge variant="ghost" size="sm">
                  {favorite.customizations.size}
                </Badge>
              )}
              {favorite.customizations.milk && (
                <Badge variant="ghost" size="sm">
                  {favorite.customizations.milk}
                </Badge>
              )}
              {favorite.customizations.sweetness !== undefined && (
                <Badge variant="ghost" size="sm">
                  {favorite.customizations.sweetness}% Sweet
                </Badge>
              )}
              {favorite.customizations.toppings?.map((topping) => (
                <Badge key={topping} variant="ghost" size="sm">
                  {topping}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Price and actions */}
        <div className="flex items-center justify-between pt-3 border-t border-quest-cream/10">
          <span className="font-bold text-xl text-quest-gold">
            {formatCurrency(favorite.price)}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCustomize}
              title="Customize"
            >
              <Plus size={16} />
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={onQuickAdd}
              disabled={isRemoving}
            >
              <ShoppingCart size={16} />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Last ordered */}
        {favorite.lastOrdered && (
          <p className="text-quest-cream/40 text-xs mt-2">
            Last ordered: {new Date(favorite.lastOrdered).toLocaleDateString()}
          </p>
        )}
      </div>
    </Card>
  );
}
