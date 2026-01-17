import { create } from "zustand";
import { persist } from "zustand/middleware";

// create() makes the store
// persist() saves to localStorage so cart survives page refresh
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            // If item exists, increase quantity
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // If new item, add to cart
            return {
              items: [...state.items, { ...product, quantity: 1 }],
            };
          }
        });
      },

      // Remove item from cart
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      // Clear entire cart
      clearCart: () => {
        set({ items: [] });
      },

      // Get total number of items
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      // Get total price
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Check if item is in cart
      isInCart: (productId) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },

      // Get item quantity
      getItemQuantity: (productId) => {
        const { items } = get();
        const item = items.find((item) => item.id === productId);
        return item?.quantity || 0;
      },
    }),
    {
      name: "hatbari-cart", // localStorage key
    }
  )
);
