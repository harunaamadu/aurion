import Header from "@/components/shared/header/Header";
import MobileNav from "@/components/shared/header/MobileNav";
import SearchPanel from "@/components/shared/header/search/SearchPanel";
import MobileMenuPanel from "@/components/shared/header/ui/MobileMenuPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse fashion and tech products on Aurion including clothing, shoes, accessories, gadgets, and wearable devices.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MobileMenuPanel />
      <MobileNav />
      <SearchPanel />
      {children}
    </>
  );
}
