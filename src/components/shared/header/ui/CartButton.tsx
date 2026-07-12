"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import NavBadge from "./NavBadge";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";
import { CompVisibilityProp } from "@/types/components";

const CartButton = ({ className, desktopOnly }: CompVisibilityProp) => {
  const cartCount: number = useCartStore((s) => s.itemCount);

  return (
    <div
      className={cn("relative", desktopOnly && "max-md:hidden", className)}
    >
      <Button variant="ghost" size="icon-lg" asChild>
        <Link href="/cart" aria-label="View cart">
          <HugeiconsIcon
            icon={ShoppingCart02Icon}
            size={16}
            color="currentColor"
            strokeWidth={2}
          />
        </Link>
      </Button>

      <NavBadge
        variant="count"
        count={cartCount}
        className="pointer-events-none"
      />
    </div>
  );
};

export default CartButton;