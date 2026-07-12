// types/dashboard.ts (or wherever DashboardCard currently lives)

export type Trend = "up" | "down" | "neutral";

export type ValueFormat = "currency" | "number" | "percent" | "rating";

export interface ChangeItem {
  value: number;
  label: string; // e.g. "this month", "today", "this week"
  format?: ValueFormat; // defaults to the parent card's format if omitted
}

export type Change = string | ChangeItem[];

export interface DashboardCard {
  title: string;
  value: number;
  description: string;
  change: Change;
  trend: Trend;
  format?: ValueFormat; // how to render `value`; defaults to "number"
}

export type DashboardRole = "CUSTOMER" | "SELLER" | "ADMIN";

export type DashboardCards = Record<DashboardRole, DashboardCard[]>;

export const ROLE_SCOPE: Record<string, string> = {
  CUSTOMER: "account",
  SELLER: "store",
  ADMIN: "platform",
};

export function getTimeGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export type PanelTab = "menu" | "categories" | "settings";

export const MENU_LINKS = [
  { href: "/account/orders", label: "Track order" },
  { href: "/help", label: "Help center" },
  { href: "/contact", label: "Contact us" },
];

export const CATEGORY_LINKS = [
  { href: "/products?category=electronics", label: "Electronics" },
  { href: "/products?category=fashion", label: "Fashion" },
  { href: "/products?category=home", label: "Home & Living" },
  { href: "/products?category=beauty", label: "Beauty" },
  { href: "/products?category=deals", label: "Deals" },
];

export const LOGO_TEXT = process.env.NEXT_PUBLIC_WEBSITE_NAME ?? "Aurion";