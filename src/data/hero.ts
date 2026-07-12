export interface Slide {
  id: string;
  image: string;
  title: string;
  material: string;
}

export interface Banner {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
}

// Replace picsum ids with real product photography when available.
export const slides: Slide[] = [
  {
    id: "kessel",
    image: "https://picsum.photos/id/1080/1000/1000",
    title: "The Kessel Chair",
    material: "European ash, hand-finished in raw linseed.",
  },
  {
    id: "solvang",
    image: "https://picsum.photos/id/1060/1000/1000",
    title: "The Solvang Table",
    material: "Reclaimed oak with a hand-set brass inlay.",
  },
  {
    id: "amble",
    image: "https://picsum.photos/id/1074/1000/1000",
    title: "The Amble Lounge",
    material: "Boiled wool upholstery over a walnut frame.",
  },
];

export const banners: Banner[] = [
  {
    id: "autumn-edit",
    image: "https://picsum.photos/id/106/700/700",
    eyebrow: "New arrival",
    title: "The Autumn Edit",
    cta: "View the collection",
    href: "/collections/autumn-edit",
  },
  {
    id: "showroom",
    image: "https://picsum.photos/id/164/700/700",
    eyebrow: "By appointment",
    title: "Considered living, delivered",
    cta: "Book a showroom visit",
    href: "/showroom",
  },
];