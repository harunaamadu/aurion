import React from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <Button className="" aria-label="Open mobile menu" variant="ghost">
        <HugeiconsIcon
          icon={Menu01Icon}
          size={16}
          color="currentColor"
          strokeWidth={1.5}
        />
      </Button>
    </div>
  );
};

export default MobileMenu;
