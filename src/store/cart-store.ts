import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart item type
export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isRetail?: boolean; // True for retail products (TCG, accessories, etc.)
  customizations?: {
    size?: string;
    milk?: string;
    sweetness?: string;
    toppings?: string[];
    extras?: string[];
  };
  specialInstructions?: string;
}

// Cart state
interface CartState {
  items: CartItem[];
  orderType: 'pickup' | 'dine_in';
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateCustomizations: (id: string, customizations: CartItem['customizations']) => void;
  updateSpecialInstructions: (id: string, instructions: string) => void;
  setOrderType: (type: 'pickup' | 'dine_in') => void;
  clearCart: () => void;
  
  // Computed values (as functions)
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

// Tax rate (configurable)
const TAX_RATE = 0.0825; // 8.25%

// Generate unique ID for cart items
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orderType: 'pickup',
      
      addItem: (item) => {
        const id = generateId();
        set((state) => ({
          items: [...state.items, { ...item, id }],
        }));
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      
      updateCustomizations: (id, customizations) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, customizations } : item
          ),
        }));
      },
      
      updateSpecialInstructions: (id, specialInstructions) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, specialInstructions } : item
          ),
        }));
      },
      
      setOrderType: (orderType) => {
        set({ orderType });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      getTax: () => {
        return get().getSubtotal() * TAX_RATE;
      },
      
      getTotal: () => {
        return get().getSubtotal() + get().getTax();
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'questpoint-cart',
      // Only persist items and orderType
      partialize: (state) => ({
        items: state.items,
        orderType: state.orderType,
      }),
    }
  )
);
