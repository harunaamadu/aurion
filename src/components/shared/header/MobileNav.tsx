"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AccountButton from "./ui/AccountButton";
import WishlistButton from "./ui/WishlistButton";
import CartButton from "./ui/CartButton";
import SearchButton from "./ui/SearchButton";

const MobileNav = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 w-full max-w-xs bg-background border z-100">
        <div className="flex items-center justify-evenly">
          <SearchButton />
          <AccountButton />
          <WishlistButton />
          <CartButton />
        </div>
      </nav>
    );
  }
};

export default MobileNav;
