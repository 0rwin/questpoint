'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Zap, ChevronLeft, ChevronRight, Leaf, ShoppingCart, Heart } from 'lucide-react';
import { Card, Badge, Input, Button } from '@/components/ui';
import { cn, formatCurrency } from '@/lib/utils';
import { MOCK_MENU_ITEMS } from '@/data/menu-mock';
import { MenuItem, DietaryTag } from '@/types/menu';
import { useFeature } from '@/hooks/use-feature-flags';
import { useCartStore } from '@/store/cart-store';
import { useFavoritesStore } from '@/store/favorites-store';

// Menu categories
const categories = [
  { id: 'all', label: 'All', icon: null },
  { id: 'coffee', label: 'Coffee', icon: '☕' },
  { id: 'boba', label: 'Boba', icon: '🧋' },
  { id: 'smoothie', label: 'Smoothies', icon: '🥤' },
  { id: 'food', label: 'Food', icon: '🍜' },
  { id: 'specialty', label: 'Specialty', icon: '✨' },
];

// Dietary filters
const dietaryFilters: { id: DietaryTag; label: string; icon: string }[] = [
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
  { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
  { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛' },
];

const ITEMS_PER_PAGE = 20;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<DietaryTag[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const orderingEnabled = useFeature('ORDERING_ENABLED');

  // Filter items based on category, search, and dietary filters
  const filteredItems = useMemo(() => {
    return MOCK_MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Search filter (substring matching)
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary filters (item must have ALL selected dietary tags)
      const matchesDietary =
        activeDietaryFilters.length === 0 ||
        activeDietaryFilters.every((filter) => item.dietaryTags.includes(filter));

      // Only show available items (staff can see seasonal)
      const isVisible = item.isAvailable;

      return matchesCategory && matchesSearch && matchesDietary && isVisible;
    });
  }, [activeCategory, searchQuery, activeDietaryFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, activeDietaryFilters]);

  // Group items by featured status
  const featuredItems = paginatedItems.filter((item) => item.isFeatured);
  const regularItems = paginatedItems.filter((item) => !item.isFeatured);

  const toggleDietaryFilter = (filter: DietaryTag) => {
    setActiveDietaryFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Menu</h1>
          <p className="section-subtitle">
            {filteredItems.length}+ crafted drinks and snacks to fuel your adventure
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-quest-dark/95 backdrop-blur-lg border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Search and Filter Toggle */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
              className="flex-1"
            />
            <Button
              variant={activeDietaryFilters.length > 0 ? 'gold' : 'ghost'}
              size="md"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              Filters
              {activeDietaryFilters.length > 0 && (
                <Badge variant="gold" size="sm">
                  {activeDietaryFilters.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Dietary Filters (collapsible) */}
          {showFilters && (
            <div className="mb-4 p-4 bg-quest-charcoal/50 rounded-lg border border-quest-cream/10 animate-fade-in">
              <p className="text-sm text-quest-cream/60 mb-2">Dietary Preferences</p>
              <div className="flex flex-wrap gap-2">
                {dietaryFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleDietaryFilter(filter.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                      activeDietaryFilters.includes(filter.id)
                        ? 'bg-quest-gold text-quest-dark'
                        : 'bg-quest-cream/5 text-quest-cream/60 hover:text-quest-cream hover:bg-quest-cream/10'
                    )}
                  >
                    <span>{filter.icon}</span>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  activeCategory === category.id
                    ? 'bg-quest-gold text-quest-dark'
                    : 'bg-quest-cream/5 text-quest-cream/60 hover:text-quest-cream hover:bg-quest-cream/10'
                )}
              >
                {category.icon && <span>{category.icon}</span>}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-quest-cream/60">No items found matching your filters.</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setActiveDietaryFilters([]);
                setActiveCategory('all');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-12">
              {/* Featured Items */}
              {featuredItems.length > 0 && (
                <div>
                  <h2 className="font-fantasy text-xl text-quest-gold mb-6 flex items-center gap-2">
                    <Zap size={20} />
                    Featured
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} orderingEnabled={orderingEnabled} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Items */}
              {regularItems.length > 0 && (
                <div>
                  {featuredItems.length > 0 && (
                    <h2 className="font-fantasy text-xl text-quest-cream mb-6">
                      All{' '}
                      {activeCategory !== 'all'
                        ? categories.find((c) => c.id === activeCategory)?.label
                        : 'Items'}
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} orderingEnabled={orderingEnabled} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-quest-cream/10">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        'w-10 h-10 rounded-lg font-medium transition-all',
                        currentPage === page
                          ? 'bg-quest-gold text-quest-dark'
                          : 'bg-quest-cream/5 text-quest-cream/60 hover:bg-quest-cream/10 hover:text-quest-cream'
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

// Menu Item Card Component
interface MenuItemCardProps {
  item: MenuItem;
  orderingEnabled: boolean;
}

function MenuItemCard({ item, orderingEnabled }: MenuItemCardProps) {
  const { addItem } = useCartStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const [isAdding, setIsAdding] = useState(false);
  const isFav = isFavorite(item.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);

    // Add to cart with default options
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });

    // Reset button state
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFav) {
      removeFavorite(item.id);
    } else {
      addFavorite({
        menuItemId: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.image,
        category: item.category,
      });
    }
  };

  return (
    <Link href={`/menu/${item.slug}`}>
      <Card variant="interactive" padding="none" className="overflow-hidden group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {item.isSeasonal && (
              <Badge variant="gold" size="sm">
                Seasonal
              </Badge>
            )}
            {item.dietaryTags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="ghost" size="sm">
                <Leaf size={10} className="mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          {/* Top right icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {/* Caffeine indicator */}
            {item.caffeineLevel !== 'none' && (
              <div
                className={cn(
                  'p-1.5 rounded-lg backdrop-blur-sm',
                  item.caffeineLevel === 'high'
                    ? 'bg-red-500/80'
                    : item.caffeineLevel === 'medium'
                    ? 'bg-yellow-500/80'
                    : 'bg-green-500/80'
                )}
                title={`${item.caffeineLevel} caffeine`}
              >
                <Zap size={14} className="text-white" />
              </div>
            )}

            {/* Favorite button */}
            <button
              onClick={handleToggleFavorite}
              className={cn(
                'p-1.5 rounded-lg backdrop-blur-sm transition-all',
                isFav
                  ? 'bg-quest-gold/90 text-quest-dark'
                  : 'bg-quest-dark/80 text-quest-cream/60 hover:text-quest-gold hover:bg-quest-dark/90'
              )}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={14}
                className={cn('transition-all', isFav && 'fill-current')}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-fantasy text-lg text-quest-cream group-hover:text-quest-gold transition-colors">
              {item.name}
            </h3>
            <span className="text-quest-gold font-bold whitespace-nowrap">
              {formatCurrency(item.price)}
            </span>
          </div>
          <p className="text-quest-cream/60 text-sm line-clamp-2 flex-1 mb-3">
            {item.description}
          </p>

          {/* Nutrition Info */}
          <div className="flex items-center gap-3 text-xs text-quest-cream/50 mb-3">
            {item.calories && <span>{item.calories} cal</span>}
            {item.allergens.length > 0 && (
              <span title={`Contains: ${item.allergens.join(', ')}`}>
                ⚠️ {item.allergens.length} allergen{item.allergens.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-quest-cream/10 flex items-center justify-between gap-2">
            <Badge variant="ghost" size="sm">
              {item.category}
            </Badge>

            {orderingEnabled ? (
              <Button
                variant="gold"
                size="sm"
                onClick={handleQuickAdd}
                isLoading={isAdding}
                className="flex items-center gap-1.5"
              >
                <ShoppingCart size={14} />
                {isAdding ? 'Added!' : 'Add'}
              </Button>
            ) : (
              <span className="text-quest-gold text-sm font-medium group-hover:underline">
                View Details →
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
