import Header from "@/components/shared/header/Header";
import Tutorial from "@/components/tutorial/Tutorial";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
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
      {children}
    </>
  );
}
