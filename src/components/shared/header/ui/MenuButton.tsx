"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu05Icon } from "@hugeicons/core-free-icons";
import { useHeaderPanelStore } from "@/store/useHeaderPanelStore";

const MenuButton = () => {
  const activePanel = useHeaderPanelStore((s) => s.activePanel);
  const openPanel = useHeaderPanelStore((s) => s.openPanel);

  const isOpen = activePanel === "menu";

  return (
    <div className="relative md:hidden">
      <Button
        variant={"ghost"}
        size={"icon-lg"}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => openPanel(isOpen ? null : "menu")}
      >
        <HugeiconsIcon
          icon={Menu05Icon}
          size={16}
          color="currentColor"
          strokeWidth={2}
        />
      </Button>
    </div>
  );
};

export default MenuButton;