import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface WishlistState {
  /** Full product snapshots, not just ids, so the dashboard wishlist section and header can render name/image/price without a refetch. */
  items: Product[];
  /** items.length, kept as a plain reactive value (not a getter) so
   * consumers can select it directly, e.g. useWishlistStore((s) => s.itemCount),
   * without needing to remember to call it. */
  itemCount: number;

  add: (product: Product) => void;
  remove: (productId: string) => void;
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,

      add: (product) => {
        set((state) => {
          if (state.items.some((p) => p.id === product.id)) return state;
          const items = [...state.items, product];
          return { items, itemCount: items.length };
        });
      },

      remove: (productId) => {
        set((state) => {
          const items = state.items.filter((p) => p.id !== productId);
          return { items, itemCount: items.length };
        });
      },

      toggle: (product) => {
        const exists = get().has(product.id);
        if (exists) get().remove(product.id);
        else get().add(product);
      },

      has: (productId) => get().items.some((p) => p.id === productId),

      clear: () => set({ items: [], itemCount: 0 }),
    }),
    {
      name: "hermes_wishlist",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        // itemCount isn't persisted -- recompute it once `items` rehydrates,
        // same reasoning as the cart store.
        if (state) {
          state.itemCount = state.items.length;
        }
      },
    },
  ),
);