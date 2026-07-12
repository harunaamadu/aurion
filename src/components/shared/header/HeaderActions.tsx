"use client";

import SearchButton from "./ui/SearchButton";
import WishlistButton from "./ui/WishlistButton";
import AccountButton from "./ui/AccountButton";
import CartButton from "./ui/CartButton";
import MenuButton from "./ui/MenuButton";

const HeaderActions = () => {
  return (
    <div className="relative flex flex-1 items-center justify-end gap-3 md:gap-6">
      <nav className="flex items-center justify-end gap-3 md:gap-6">
        {/* Search button */}
        <SearchButton />

        {/* Wishlink button link */}
        <WishlistButton desktopOnly />

        {/* Account button link */}
        <AccountButton desktopOnly />

        {/* Cart button link */}
        <CartButton desktopOnly />
      </nav>

      {/* Menu button */}
      <MenuButton />
    </div>
  );
};

export default HeaderActions;
