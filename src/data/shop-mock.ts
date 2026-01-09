/**
 * Shop Products Mock Data
 *
 * Mock data for retail products (TCG, accessories, dice, merch)
 * Used by admin inventory management
 *
 * Will be replaced with Square inventory API integration
 */

export interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  game?: string;
  image: string;
  stock: number; // renamed from stockQuantity for admin consistency
  isPreorder: boolean;
  releaseDate: string | null;
}

export const MOCK_PRODUCTS: ShopProduct[] = [
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
    stock: 12,
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
    game: 'mtg',
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    stock: 4,
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
    game: 'mtg',
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    stock: 8,
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
    game: 'pokemon',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=400&auto=format&fit=crop',
    stock: 0,
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
    stock: 45,
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
    stock: 20,
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
    stock: 15,
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
    stock: 30,
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
    stock: 8,
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
    stock: 50,
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
    stock: 25,
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
    stock: 12,
    isPreorder: false,
    releaseDate: null,
  },
];
