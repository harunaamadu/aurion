"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sun01Icon,
  Moon02Icon,
  ComputerIcon,
  Tick02Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const themes = [
  {
    name: "Light",
    value: "light",
    icon: Sun01Icon,
  },
  {
    name: "Dark",
    value: "dark",
    icon: Moon02Icon,
  },
  {
    name: "System",
    value: "system",
    icon: ComputerIcon,
  },
] as const;

const NavSettings = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Theme
      </p>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between text-sm">
            <span>Select Theme</span>
            <span className="flex items-center gap-1 opacity-80">
              {themes.find((t) => t.value === theme)?.name ?? "System"}
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={14}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </span>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-2 space-y-1">
          {themes.map(({ name, value, icon: Icon }) => (
            <Button
              key={value}
              variant="ghost"
              size={'lg'}
              onClick={() => setTheme(value)}
              className="items-center justify-start w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-full">
                  <HugeiconsIcon icon={Icon} size={18} />
                  {name}
                </div>

                {theme === value && (
                  <span className="ml-auto">
                    <HugeiconsIcon icon={Tick02Icon} size={16} />
                  </span>
                )}
              </div>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default NavSettings;
