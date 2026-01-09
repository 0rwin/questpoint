import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteItem {
  id: string;
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  timesOrdered: number;
  lastOrdered?: string;
  customizations?: {
    size?: string;
    milk?: string;
    sweetness?: number;
    toppings?: string[];
    specialInstructions?: string;
  };
}

interface FavoritesStore {
  favorites: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, 'id' | 'timesOrdered' | 'lastOrdered'>) => void;
  removeFavorite: (menuItemId: string) => void;
  isFavorite: (menuItemId: string) => boolean;
  getFavoriteById: (menuItemId: string) => FavoriteItem | undefined;
  incrementOrderCount: (menuItemId: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (item) => {
        const existing = get().favorites.find((f) => f.menuItemId === item.menuItemId);

        if (existing) {
          // Already favorited, don't add again
          return;
        }

        const newFavorite: FavoriteItem = {
          ...item,
          id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timesOrdered: 0,
          lastOrdered: undefined,
        };

        set((state) => ({
          favorites: [...state.favorites, newFavorite],
        }));

        // TODO: Sync with Supabase
        console.log('[STUB] Adding favorite to database:', newFavorite);
      },

      removeFavorite: (menuItemId) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.menuItemId !== menuItemId),
        }));

        // TODO: Remove from Supabase
        console.log('[STUB] Removing favorite from database:', menuItemId);
      },

      isFavorite: (menuItemId) => {
        return get().favorites.some((f) => f.menuItemId === menuItemId);
      },

      getFavoriteById: (menuItemId) => {
        return get().favorites.find((f) => f.menuItemId === menuItemId);
      },

      incrementOrderCount: (menuItemId) => {
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.menuItemId === menuItemId
              ? {
                  ...f,
                  timesOrdered: f.timesOrdered + 1,
                  lastOrdered: new Date().toISOString(),
                }
              : f
          ),
        }));

        // TODO: Update Supabase
        console.log('[STUB] Updating favorite order count in database:', menuItemId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'questpoint-favorites',
    }
  )
);
