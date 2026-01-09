'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ShoppingCart, Heart, Share2, Zap, Leaf, AlertCircle } from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import { CustomizationModal } from '@/components/features/menu/customization-modal';
import { useCartStore, CartItem } from '@/store/cart-store';
import { useFeature } from '@/hooks/use-feature-flags';
import { MOCK_MENU_ITEMS } from '@/data/menu-mock';
import { formatCurrency, cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function MenuItemPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addItem } = useCartStore();
  const orderingEnabled = useFeature('ORDERING_ENABLED');

  const [showCustomization, setShowCustomization] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Find item by slug (will be replaced with database query when SUPABASE_ENABLED)
  const item = MOCK_MENU_ITEMS.find((i) => i.slug === resolvedParams.slug);

  if (!item) {
    return (
      <div className="page-enter min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-fantasy text-3xl text-quest-cream mb-4">
            Item Not Found
          </h1>
          <p className="text-quest-cream/60 mb-6">
            This menu item doesn't exist or has been removed.
          </p>
          <Link href="/menu">
            <Button variant="gold" size="lg">
              <ChevronLeft size={18} />
              Back to Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleQuickAdd = () => {
    setIsAdding(true);
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleCustomAdd = (customizations: Omit<CartItem, 'id'>) => {
    addItem(customizations);
  };

  // Related items (same category, different item)
  const relatedItems = MOCK_MENU_ITEMS.filter(
    (i) => i.category === item.category && i.id !== item.id && i.isAvailable
  ).slice(0, 3);

  return (
    <>
      <div className="page-enter min-h-screen pb-24">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-quest-dark via-quest-dark/50 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="ghost"
              size="md"
              onClick={() => router.back()}
              className="bg-black/50 backdrop-blur-sm"
            >
              <ChevronLeft size={18} />
              Back
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {item.isSeasonal && (
              <Badge variant="gold" size="md">
                Seasonal
              </Badge>
            )}
            {item.isFeatured && (
              <Badge variant="gold" size="md">
                <Zap size={12} className="mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <h1 className="font-fantasy text-4xl sm:text-5xl text-quest-cream mb-2">
                {item.name}
              </h1>
              <p className="text-xl text-quest-gold font-bold">
                {formatCurrency(item.price)}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <h2 className="font-fantasy text-2xl text-quest-cream mb-4">
                  Description
                </h2>
                <p className="text-quest-cream/80 leading-relaxed">
                  {item.description}
                </p>
              </Card>

              {/* Dietary Tags */}
              {item.dietaryTags.length > 0 && (
                <Card>
                  <h2 className="font-fantasy text-2xl text-quest-cream mb-4">
                    Dietary Information
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.dietaryTags.map((tag) => (
                      <Badge key={tag} variant="ghost" size="md">
                        <Leaf size={14} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Allergens */}
              {item.allergens.length > 0 && (
                <Card className="bg-yellow-500/10 border-yellow-500/30">
                  <div className="flex gap-3">
                    <AlertCircle className="text-yellow-500 flex-shrink-0" size={24} />
                    <div>
                      <h2 className="font-fantasy text-xl text-yellow-500 mb-2">
                        Allergen Information
                      </h2>
                      <p className="text-quest-cream/80 mb-2">
                        This item contains the following allergens:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.allergens.map((allergen) => (
                          <Badge key={allergen} variant="ghost" size="sm">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Related Items */}
              {relatedItems.length > 0 && (
                <div>
                  <h2 className="font-fantasy text-2xl text-quest-cream mb-4">
                    You Might Also Like
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {relatedItems.map((relatedItem) => (
                      <Link key={relatedItem.id} href={`/menu/${relatedItem.slug}`}>
                        <Card variant="interactive" padding="none" className="overflow-hidden h-full">
                          <div className="relative h-32">
                            <Image
                              src={relatedItem.image}
                              alt={relatedItem.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-quest-cream text-sm mb-1">
                              {relatedItem.name}
                            </h3>
                            <p className="text-quest-gold text-sm font-bold">
                              {formatCurrency(relatedItem.price)}
                            </p>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Nutrition Card */}
              <Card>
                <h3 className="font-fantasy text-lg text-quest-cream mb-4">
                  Nutrition Facts
                </h3>
                <div className="space-y-3">
                  {item.calories && (
                    <div className="flex justify-between items-center pb-3 border-b border-quest-cream/10">
                      <span className="text-quest-cream/70">Calories</span>
                      <span className="text-quest-cream font-medium">
                        {item.calories}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pb-3 border-b border-quest-cream/10">
                    <span className="text-quest-cream/70">Caffeine</span>
                    <span className={cn(
                      'font-medium',
                      item.caffeineLevel === 'high' && 'text-red-500',
                      item.caffeineLevel === 'medium' && 'text-yellow-500',
                      item.caffeineLevel === 'low' && 'text-green-500',
                      item.caffeineLevel === 'none' && 'text-quest-cream/50'
                    )}>
                      {item.caffeineLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-quest-cream/70">Category</span>
                    <Badge variant="ghost" size="sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              {orderingEnabled ? (
                <div className="space-y-3">
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={() => setShowCustomization(true)}
                    className="w-full"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Customize & Add
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleQuickAdd}
                    isLoading={isAdding}
                    className="w-full"
                  >
                    Quick Add (Default)
                  </Button>
                </div>
              ) : (
                <Card className="bg-quest-gold/10 border-quest-gold/30">
                  <p className="text-sm text-quest-cream/80 text-center">
                    Online ordering is currently disabled. Visit our admin settings to enable it.
                  </p>
                </Card>
              )}

              {/* Share Buttons */}
              <div className="flex gap-2">
                <Button variant="ghost" size="md" className="flex-1">
                  <Heart size={18} />
                </Button>
                <Button variant="ghost" size="md" className="flex-1">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Customization Modal */}
      <CustomizationModal
        isOpen={showCustomization}
        onClose={() => setShowCustomization(false)}
        item={item}
        onAddToCart={handleCustomAdd}
      />
    </>
  );
}
