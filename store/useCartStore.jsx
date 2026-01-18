import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { ...product, quantity: 1 }],
            };
          }
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item._id === productId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getItemQuantity: (productId) => {
        const { items } = get();
        const item = items.find((item) => item._id === productId);
        return item?.quantity || 0;
      },
    }),
    {
      name: "hatbari-cart", // Saves to localStorage
      partialize: (state) => ({ items: state.items }), // Don't save isOpen state
    }
  )
);

export default useCartStore;
