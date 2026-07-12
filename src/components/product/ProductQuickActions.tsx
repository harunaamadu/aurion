"use client";

import { motion, type Variants } from "framer-motion";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  FavouriteIcon,
  GitCompareIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export interface ProductQuickAction {
  icon: IconSvgElement;
  label: string;
  onClick?: () => void;
}

const defaultActions: ProductQuickAction[] = [
  { icon: FavouriteIcon, label: "Add to wishlist" },
  { icon: GitCompareIcon, label: "Compare" },
  { icon: ViewIcon, label: "Quick view" },
];

// No `animate` prop here on purpose: these inherit "rest" / "hover" from the
// nearest ancestor motion component (the Card), so no hover state needs to
// be lifted or drilled down manually.
const actionVariants: Variants = {
  rest: { opacity: 0, x: 16, scale: 0.6 },
  hover: (index: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut", delay: index * 0.06 },
  }),
};

interface ProductQuickActionsProps {
  actions?: ProductQuickAction[];
}

export function ProductQuickActions({
  actions = defaultActions,
}: ProductQuickActionsProps) {
  return (
    <div className="absolute top-2 right-2 z-10 flex flex-col bg-background text-foreground translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
      {actions.map((action, index) => (
        <motion.div key={action.label} custom={index} variants={actionVariants}>
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={action.label}
            onClick={action.onClick}
          >
            <HugeiconsIcon icon={action.icon} size={20} strokeWidth={1.5} />
          </Button>
        </motion.div>
      ))}
    </div>
  );
}