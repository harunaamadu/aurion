interface NavLink {
  label: string;
  href: string;
  items?: MegaMenuItem[]; // Optional property for nested navigation items
  megaMenu?: boolean; // Optional property to indicate if it's a mega menu
}

export interface MegaMenuItem {
  label: string;
  href: string;
  hasBanner?: boolean; // Optional property to indicate if the item has a banner
  bannerImage?: string; // Optional property for the banner image URL
  bannerAltText?: string; // Optional property for the banner image alt text
  subItems?: NavLink[]; // Optional property for nested navigation items
  description?: string;
}

export const MEGAMENU_ITEMS: MegaMenuItem[] = [
  {
    label: "Fashion",
    href: "/shop/fashion",
    hasBanner: true,
    bannerImage: "/images/fashion-banner.jpg",
    bannerAltText: "Fashion Banner",
    subItems: [
      { label: "Clothing", href: "/shop/fashion/clothing" },
      { label: "Shoes", href: "/shop/fashion/shoes" },
      { label: "Accessories", href: "/shop/fashion/accessories" },
      { label: "Jewelry", href: "/shop/fashion/jewelry" },
      { label: "Bags", href: "/shop/fashion/bags" },
    ],
    description:
      "Explore the latest trends in fashion, from clothing to accessories.",
  },
  {
    label: "Technology",
    href: "/shop/technology",
    hasBanner: true,
    bannerImage: "/images/technology-banner.jpg",
    bannerAltText: "Technology Banner",
    subItems: [
      { label: "Gadgets", href: "/shop/technology/gadgets" },
      { label: "Smartphones", href: "/shop/technology/smartphones" },
      { label: "Laptops", href: "/shop/technology/laptops" },
      { label: "Wearables", href: "/shop/technology/wearables" },
      { label: "Accessories", href: "/shop/technology/accessories" },
    ],
    description:
      "Discover cutting-edge technology products, from gadgets to wearables.",
  },
  {
    label: "Home & Living",
    href: "/shop/home-living",
    hasBanner: true,
    bannerImage: "/images/home-living-banner.jpg",
    bannerAltText: "Home & Living Banner",
    subItems: [
      { label: "Furniture", href: "/shop/home-living/furniture" },
      { label: "Decor", href: "/shop/home-living/decor" },
      { label: "Kitchen", href: "/shop/home-living/kitchen" },
      { label: "Bedding", href: "/shop/home-living/bedding" },
      { label: "Lighting", href: "/shop/home-living/lighting" },
    ],
    description:
      "Transform your home with our curated selection of furniture, decor, and bedding.",
  },
  {
    label: "Sports & Outdoors",
    href: "/shop/sports-outdoors",
    hasBanner: true,
    bannerImage: "/images/sports-outdoors-banner.jpg",
    bannerAltText: "Sports & Outdoors Banner",
    subItems: [
      {
        label: "Fitness Equipment",
        href: "/shop/sports-outdoors/fitness-equipment",
      },
      { label: "Outdoor Gear", href: "/shop/sports-outdoors/outdoor-gear" },
      { label: "Sports Apparel", href: "/shop/sports-outdoors/sports-apparel" },
      {
        label: "Camping & Hiking",
        href: "/shop/sports-outdoors/camping-hiking",
      },
    ],
    description:
      "Stay active and explore the great outdoors with our selection of sports and outdoor gear.",
  },
];

export const NAVLINKS: NavLink[] = [
  { label: "Today's Deals", href: "/deals" },
  { label: "Shop", href: "/shop", megaMenu: true, items: MEGAMENU_ITEMS },
  { label: "Gift Cards", href: "/gift-cards" },
  {
    label: "Registry & Gift",
    href: "/registry",
    items: [
      { label: "Wedding Registry", href: "/registry/wedding" },
      { label: "Baby Registry", href: "/registry/baby" },
    ],
  },
];
