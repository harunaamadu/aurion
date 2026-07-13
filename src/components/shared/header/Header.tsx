"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Navigation from "./Navigation";
import { useClientHeight } from "@/hooks/use-header-height";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import HeaderActions from "./HeaderActions";

const Header = () => {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const headerHeight = useClientHeight(stickyRef);
  const hidden = useScrollDirection();

  return (
    <>
      {/* Normal flow — scrolls away naturally, not sticky */}
      <Container
        as="div"
        className="w-full bg-foreground/90 text-background/90! text-xs py-1.75"
      >
        <span>Announcement: Free shipping on orders over $50!</span>
      </Container>

      {/* Only this is sticky */}
      <motion.div
        ref={stickyRef}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm h-16 border-b"
      >
        <Container as="div" className="w-full h-full">
          <div className="flex items-center gap-8 md:gap-16 w-full h-full">
            <Link href="/" className="text-xl font-bold capitalize">
              aurion
            </Link>

            <div className="flex items-center justify-between gap-8 flex-1">
              <Navigation headerHeight={headerHeight} />
              <HeaderActions />
            </div>
          </div>
        </Container>
      </motion.div>
    </>
  );
};

export default Header;