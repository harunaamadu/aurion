"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon } from "@hugeicons/core-free-icons";
import { useSearchPanel } from "@/context/search-context";

const SearchButton = () => {
  const { isOpen: searchOpen, toggle: toggleSearch } = useSearchPanel();

  return (
    <div>
      <Button
        variant={"ghost"}
        size={"icon-lg"}
        aria-label={searchOpen ? "Close search" : "Open Search"}
        aria-expanded={searchOpen}
        aria-controls="search-panel"
        onClick={toggleSearch}
      >
        <HugeiconsIcon
          icon={Search02Icon}
          size={16}
          color="currentColor"
          strokeWidth={2}
        />
      </Button>
    </div>
  );
};

export default SearchButton;
