import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductVariant } from "@/types/product";

export interface CartLine {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface AppliedCoupon {
  code: string;
  discountPercent: number;
}

interface CartDerived {
  /** Sum of quantities across all lines. */
  itemCount: number;
  /** Sum of price x quantity, in the catalog's base currency (USD). */
  subtotal: number;
  /** Sum of (originalPrice - price) x quantity for discounted lines. */
  savings: number;
  /** Amount knocked off `subtotal` by the applied coupon, if any. */
  couponDiscount: number;
  /** subtotal - couponDiscount, floored at 0. Shipping is NOT included. */
  total: number;
}

interface CartState extends CartDerived {
  items: CartLine[];
  appliedCoupon: AppliedCoupon | null;

  /** Adds `qty` units. If the same product+variant is already in the cart, increments its quantity instead of duplicating the line. No-ops for qty <= 0. */
  addItem: (product: Product, selectedVariant?: ProductVariant, qty?: number) => void;
  /** Removes a line entirely, regardless of quantity. */
  removeItem: (productId: string, variantValue?: string) => void;
  /** Sets an exact quantity; quantities <= 0 remove the line. */
  updateQuantity: (productId: string, variantValue: string | undefined, quantity: number) => void;
  clear: () => void;

  applyCoupon: (code: string, discountPercent: number) => void;
  removeCoupon: () => void;
}

function sameLine(
  line: CartLine,
  productId: string,
  variantValue: string | undefined,
) {
  return (
    line.product.id === productId &&
    line.selectedVariant?.value === variantValue
  );
}

/** Single source of truth for every derived number. Called after every
 * mutation (and once after rehydration) so consumers can read plain
 * reactive values instead of calling selector functions themselves. */
function computeDerived(
  items: CartLine[],
  coupon: AppliedCoupon | null,
): CartDerived {
  let itemCount = 0;
  let subtotal = 0;
  let savings = 0;

  for (const line of items) {
    itemCount += line.quantity;
    subtotal += line.product.price * line.quantity;
    if (line.product.comparedPrice) {
      savings += (line.product.comparedPrice - line.product.price) * line.quantity;
    }
  }

  const couponDiscount = coupon ? (subtotal * coupon.discountPercent) / 100 : 0;
  const total = Math.max(subtotal - couponDiscount, 0);

  return { itemCount, subtotal, savings, couponDiscount, total };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      ...computeDerived([], null),

      addItem: (product, selectedVariant, qty = 1) => {
        if (qty <= 0) return; // guard: no-op / negative adds can't sneak a line to <=0 without going through updateQuantity's removal path

        set((state) => {
          const existing = state.items.find((line) =>
            sameLine(line, product.id, selectedVariant?.value),
          );

          const items = existing
            ? state.items.map((line) =>
                line === existing
                  ? { ...line, quantity: line.quantity + qty }
                  : line,
              )
            : [...state.items, { product, selectedVariant, quantity: qty }];

          return { items, ...computeDerived(items, state.appliedCoupon) };
        });
      },

      removeItem: (productId, variantValue) => {
        set((state) => {
          const items = state.items.filter(
            (line) => !sameLine(line, productId, variantValue),
          );
          return { items, ...computeDerived(items, state.appliedCoupon) };
        });
      },

      updateQuantity: (productId, variantValue, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantValue);
          return;
        }
        set((state) => {
          const items = state.items.map((line) =>
            sameLine(line, productId, variantValue)
              ? { ...line, quantity }
              : line,
          );
          return { items, ...computeDerived(items, state.appliedCoupon) };
        });
      },

      clear: () =>
        set((state) => ({ items: [], ...computeDerived([], state.appliedCoupon) })),

      applyCoupon: (code, discountPercent) => {
        set((state) => {
          const appliedCoupon: AppliedCoupon = { code, discountPercent };
          return { appliedCoupon, ...computeDerived(state.items, appliedCoupon) };
        });
      },

      removeCoupon: () => {
        set((state) => ({
          appliedCoupon: null,
          ...computeDerived(state.items, null),
        }));
      },
    }),
    {
      name: "aurion-cart",
      // Cart lines carry a full Product snapshot (price/name/image at time
      // of adding) rather than just an id -- this is what keeps the cart
      // working the same way regardless of whether products come from
      // Sanity, mock data, or (previously) Prisma. If the price changes in
      // Sanity after something's already in the cart, the cart still shows
      // what the shopper saw when they added it; re-add to refresh it.
      //
      // Only `items` is persisted -- appliedCoupon is intentionally
      // session-only (a promo shouldn't silently survive a reload with a
      // stale discount attached).
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        // Persisted state only contains `items`. Without this, itemCount/
        // subtotal/total would stay at their initial (empty-cart) values
        // after a reload until the next mutation recomputed them.
        if (state) {
          Object.assign(state, {
            appliedCoupon: null,
            ...computeDerived(state.items, null),
          });
        }
      },
    },
  ),
);