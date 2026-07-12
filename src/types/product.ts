export type ProductBadge =
  | "best-seller"
  | "new"
  | "sale"
  | "limited"
  | "prime"
  | "hot";

export const SEARCH_CATEGORIES = [
  "All",
  "fashion",
  "electronics",
  "home",
  "beauty",
  "sports",
  "toys",
  "books",
  "automotive",
] as const;

export type ProductCategory = (typeof SEARCH_CATEGORIES)[number];

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

/**
 * A single purchasable color/variant of a product.
 * `swatch` accepts any valid CSS color (hex, oklch, tailwind var, etc.)
 * so the selector never needs a hardcoded class map.
 */
export interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal" | "minimal";
  className?: string;
}

export interface ProductImage {
  id?: number;
  imageUrl: string;
  alt: string;
  href?: string;
  variant?: ProductCardProps["variant"];
}

export interface ProductColorOption {
  id: string;
  label: string;
  swatch: string;
  image: string;
}

export interface ProductReview {
  rating: number; // 1–5
  count: number;
  compact?: boolean;
}

export interface ProductVariant {
  label: string;
  value: string;
  inStock: boolean;
  /** Explicit swatch color for this option (e.g. "#1B2A4A"). Only meaningful when label is Color; if omitted, ColorVariantSelector falls back to a name-based guess. */
  hex?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  category?: ProductCategory;
  price: number;
  comparedPrice?: number;
  colors: [ProductColorOption, ...ProductColorOption[]]; // at least one color, guaranteed

  currency?: string; // default "$"

  review: ProductReview;

  badge?: ProductBadge;
  description?: string;

  tag?: string | string[];

  variants?: ProductVariant[];

  inStock?: boolean;
  stockCount?: number;
  freeShipping?: boolean;
  deliveryDays?: number;

  sold?: number;

  isWishlisted?: boolean;
  isTrending?: boolean;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  image: string;
  href?: string;
}
