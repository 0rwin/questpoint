/**
 * Menu Item Types
 */

export type MenuCategory = 'coffee' | 'boba' | 'smoothie' | 'food' | 'specialty';

export type CaffeineLevel = 'none' | 'low' | 'medium' | 'high';

export type DietaryTag = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'nut-free';

export type Allergen =
  | 'milk'
  | 'eggs'
  | 'fish'
  | 'shellfish'
  | 'tree nuts'
  | 'peanuts'
  | 'wheat'
  | 'soy';

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // Must be in $X.00 or $X.50 increments
  category: MenuCategory;
  image: string;

  // Metadata
  isSeasonal: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  caffeineLevel: CaffeineLevel;

  // Nutrition & Dietary
  calories?: number;
  allergens: Allergen[];
  dietaryTags: DietaryTag[];

  // Database sync (for cart staleness detection)
  version?: number;
  lastUpdated?: Date;
}

export interface MenuCustomization {
  id: string;
  menuItemId: string;
  type: 'size' | 'milk' | 'sweetness' | 'topping' | 'extra';
  name: string;
  options: MenuCustomizationOption[];
  required: boolean;
  maxSelections?: number;
}

export interface MenuCustomizationOption {
  id: string;
  label: string;
  priceModifier: number; // Amount to add/subtract from base price
  isDefault: boolean;
  allergens?: Allergen[];
}
