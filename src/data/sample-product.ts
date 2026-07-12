import type { Product } from "@/types/product";

export const sampleProduct: Product = {
  id: "aria-utility-jacket",
  name: "Aria Utility Jacket",
  slug: "aria-utility-jacket",
  price: 89.99,
  comparedPrice: 100.99,
  category: "fashion",
  review: {
    rating: 0,
    count: 0,
  },
  colors: [
    {
      id: "red",
      label: "Crimson",
      swatch: "#f43f5e",
      image: "https://picsum.photos/seed/aria-red/600/800",
    },
    {
      id: "blue",
      label: "Ocean",
      swatch: "#3b82f6",
      image: "https://picsum.photos/seed/aria-blue/600/800",
    },
    {
      id: "white",
      label: "Snow",
      swatch: "#fafafa",
      image: "https://picsum.photos/seed/aria-white/600/800",
    },
  ],
  isTrending: true,
};
