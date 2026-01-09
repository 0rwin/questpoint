'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, Package, Clock, AlertCircle, SlidersHorizontal, X } from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import { cn, formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

// Product categories
const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'tcg', label: 'TCG Products' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'dice', label: 'Dice & Tokens' },
  { id: 'merch', label: 'Merch' },
];

// TCG Game types
const gameTypes = [
  { id: 'all', label: 'All Games' },
  { id: 'mtg', label: 'Magic: The Gathering' },
  { id: 'pokemon', label: 'Pokémon' },
  { id: 'yugioh', label: 'Yu-Gi-Oh!' },
  { id: 'one-piece', label: 'One Piece' },
];

// Sort options
const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'name', label: 'Name: A-Z' },
];

// Mock products - will come from database/Square inventory
const products = [
  // TCG Products
  {
    id: '1',
    name: 'MTG: Duskmourn Play Booster Box',
    slug: 'mtg-duskmourn-play-booster-box',
    description: '36 Play Boosters. The newest set featuring horror-themed cards and mechanics.',
    price: 144.99,
    category: 'tcg',
    game: 'mtg',
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 12,
    isPreorder: false,
    releaseDate: null,
  },
  {
    id: '2',
    name: 'MTG: Duskmourn Collector Box',
    slug: 'mtg-duskmourn-collector-box',
    description: '12 Collector Boosters with extended art and special treatments.',
    price: 279.99,
    category: 'tcg',
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 4,
    isPreorder: false,
    releaseDate: null,
  },
  {
    id: '3',
    name: 'MTG: Commander Deck - Endless Punishment',
    slug: 'mtg-commander-endless-punishment',
    description: 'Ready-to-play 100-card Commander deck featuring new legends.',
    price: 54.99,
    category: 'tcg',
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 8,
    isPreorder: false,
    releaseDate: null,
  },
  {
    id: '4',
    name: 'Pokémon: Prismatic Evolutions ETB',
    slug: 'pokemon-prismatic-evolutions-etb',
    description: 'Elite Trainer Box with 9 booster packs, sleeves, and accessories.',
    price: 54.99,
    category: 'tcg',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 0,
    isPreorder: true,
    releaseDate: '2026-02-15',
  },
  // Accessories
  {
    id: '5',
    name: 'Dragon Shield Sleeves - Matte Black',
    slug: 'dragon-shield-matte-black',
    description: '100 premium card sleeves. Industry standard protection.',
    price: 12.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 45,
    isPreorder: false,
    releaseDate: null,
  },
  {
    id: '6',
    name: 'Ultra Pro Deck Box - Satin Tower',
    slug: 'ultra-pro-satin-tower',
    description: 'Holds 100+ sleeved cards with dice tray compartment.',
    price: 24.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 20,
    isPreorder: false,
    releaseDate: null,
  },
  {
    id: '7',
    name: 'Questpoint Playmat - Quest Begins',
    slug: 'questpoint-playmat-quest-begins',
    description: 'Custom 24x14 inch playmat with our signature artwork.',
    price: 29.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 15,
    isPreorder: false,
    releaseDate: null,
  },
  // Dice
  {
    id: '8',
    name: 'Chessex Polyhedral Set - Gemini Purple-Teal',
    slug: 'chessex-gemini-purple-teal',
    description: '7-piece RPG dice set with gold numbering.',
    price: 11.99,
    category: 'dice',
    image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 30,
    isPreorder: false,
    releaseDate: null,
  },
  {
    id: '9',
    name: 'Metal Dice Set - Antique Gold',
    slug: 'metal-dice-antique-gold',
    description: 'Premium zinc alloy dice with satisfying weight.',
    price: 34.99,
    category: 'dice',
    image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 8,
    isPreorder: false,
    releaseDate: null,
  },
  {
    id: '10',
    name: 'Spin-Down Life Counter Dice (5 pack)',
    slug: 'spindown-life-counter-5pack',
    description: 'D20 spin-down counters in assorted colors.',
    price: 7.99,
    category: 'dice',
    image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 50,
    isPreorder: false,
    releaseDate: null,
  },
  // Merch
  {
    id: '11',
    name: 'Questpoint T-Shirt - Logo',
    slug: 'questpoint-tshirt-logo',
    description: 'Soft cotton blend tee with embroidered logo.',
    price: 28.99,
    category: 'merch',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 25,
    isPreorder: false,
    releaseDate: null,
  },
  {
    id: '12',
    name: 'Questpoint Hoodie - Quest Begins',
    slug: 'questpoint-hoodie-quest-begins',
    description: 'Cozy fleece hoodie with back print.',
    price: 54.99,
    category: 'merch',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop',
    stockQuantity: 12,
    isPreorder: false,
    releaseDate: null,
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Separate in-stock and preorder
  const inStockProducts = filteredProducts.filter(p => !p.isPreorder && p.stockQuantity > 0);
  const preorderProducts = filteredProducts.filter(p => p.isPreorder);
  const outOfStockProducts = filteredProducts.filter(p => !p.isPreorder && p.stockQuantity === 0);

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Shop</h1>
          <p className="section-subtitle">
            TCG products, accessories, dice, and Questpoint merch
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-quest-dark/95 backdrop-blur-lg border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Search */}
          <div className="mb-4">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
              className="max-w-md"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  activeCategory === category.id
                    ? 'bg-quest-gold text-quest-dark'
                    : 'bg-quest-cream/5 text-quest-cream/60 hover:text-quest-cream hover:bg-quest-cream/10'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-quest-cream/20 mb-4" />
            <p className="text-quest-cream/60">No products found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* In Stock */}
            {inStockProducts.length > 0 && (
              <div>
                <h2 className="font-fantasy text-xl text-quest-cream mb-6">
                  Available Now
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {inStockProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Pre-orders */}
            {preorderProducts.length > 0 && (
              <div>
                <h2 className="font-fantasy text-xl text-quest-gold mb-6 flex items-center gap-2">
                  <Clock size={20} />
                  Pre-Orders
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {preorderProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Out of Stock */}
            {outOfStockProducts.length > 0 && (
              <div>
                <h2 className="font-fantasy text-xl text-quest-cream/50 mb-6">
                  Out of Stock
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {outOfStockProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Info Banner */}
      <section className="bg-quest-charcoal/30 border-t border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <AlertCircle size={24} className="text-quest-gold shrink-0" />
            <div>
              <p className="text-quest-cream font-medium">Pickup Only</p>
              <p className="text-quest-cream/60 text-sm">
                All orders are available for in-store pickup. We don't currently offer shipping.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stockQuantity: number;
    isPreorder: boolean;
    releaseDate: string | null;
  };
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const isOutOfStock = !product.isPreorder && product.stockQuantity === 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);

    // Add retail product to cart (no customizations needed)
    addItem({
      menuItemId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      isRetail: true,
    });

    // Reset button state
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Card 
      variant={isOutOfStock ? 'default' : 'interactive'} 
      padding="none" 
      className={cn(
        'overflow-hidden group h-full flex flex-col',
        isOutOfStock && 'opacity-60'
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-quest-charcoal">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            'object-cover transition-transform duration-500',
            !isOutOfStock && 'group-hover:scale-110'
          )}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isPreorder && (
            <Badge variant="warning" size="sm">
              <Clock size={10} className="mr-1" />
              Pre-Order
            </Badge>
          )}
          {isLowStock && !product.isPreorder && (
            <Badge variant="danger" size="sm">
              Only {product.stockQuantity} left
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="ghost" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Badge variant="ghost" size="sm" className="self-start mb-2">
          {product.category}
        </Badge>
        <h3 className="font-medium text-quest-cream group-hover:text-quest-gold transition-colors mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-quest-cream/50 text-sm line-clamp-2 flex-1 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-quest-cream/10">
          <span className="text-quest-gold font-bold text-lg">
            {formatCurrency(product.price)}
          </span>
          <Button
            size="sm"
            variant={isOutOfStock ? 'ghost' : 'purple'}
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            isLoading={isAdding}
            leftIcon={<ShoppingCart size={14} />}
          >
            {isAdding ? 'Adding...' : product.isPreorder ? 'Pre-Order' : isOutOfStock ? 'Sold Out' : 'Add'}
          </Button>
        </div>

        {product.releaseDate && (
          <p className="text-quest-cream/50 text-xs mt-2">
            Releases: {new Date(product.releaseDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        )}
      </div>
    </Card>
  );
}
