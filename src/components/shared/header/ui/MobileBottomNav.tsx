"use client";

import { motion } from "framer-motion";
import SearchButton from "./SearchButton";
import WishlistButton from "./WishlistButton";
import AccountButton from "./AccountButton";
import CartButton from "./CartButton";

const MobileBottomNav = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="hidden max-[425px]:block fixed bottom-0 z-101 inset-x-0 p-4 bg-background shadow-2xl border"
    >
      <nav className="flex items-center justify-evenly">
        {/* Search button */}
        <SearchButton />

        {/* Wishlink button link */}
        <WishlistButton />

        {/* Account button link */}
        <AccountButton />

        {/* Cart button link */}
        <CartButton />
      </nav>
    </motion.div>
  );
};

export default MobileBottomNav;