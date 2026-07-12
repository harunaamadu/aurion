"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";

import NavBadge from "./NavBadge";
import { useWishlistStore } from "@/store/useWishlistStore";
import { cn } from "@/lib/utils";
import { CompVisibilityProp } from "@/types/components";

const WishlistButton = ({
  className,
  desktopOnly,
}: CompVisibilityProp) => {
  const count = useWishlistStore((state) => state.itemCount);

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      asChild
      aria-label="View wishlist"
      className={cn(
        "relative",
        desktopOnly && "max-md:hidden",
        className
      )}
    >
      <Link href="/wishlist">
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={16}
          strokeWidth={2}
        />

        <NavBadge
          variant="count"
          count={count}
          className="pointer-events-none"
        />
      </Link>
    </Button>
  );
};

export default WishlistButton;