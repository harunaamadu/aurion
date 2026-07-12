"use client";

import { useState } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";
import LocaleDialog from "./ui/LocaleDialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, MapPinHouseIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LocaleDropdown from "./ui/LocaleDropdown";

interface LocaleSwitchProps {
  className?: string;
  spanColor?: string;
  isMobile?: boolean;
}

export default function LocaleSwitcher({
  className,
  spanColor,
  isMobile,
}: LocaleSwitchProps) {
  const [open, setOpen] = useState(false);
  const country = useLocaleStore((s) => s.country);
  const currency = useLocaleStore((s) => s.currency);

  return (
    <>
      {isMobile ? (
        <Accordion
          type="single"
          collapsible
          // defaultValue="shipping"
          className="max-w-lg"
        >
          <AccordionItem value="shipping">
            <AccordionTrigger>
              <span className={cn("text-accent", spanColor)}>
                {country.name}
              </span>{" "}
              · {currency.code}
            </AccordionTrigger>

            <LocaleDropdown open={open} onOpenChange={setOpen} />
          </AccordionItem>
        </Accordion>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "flex shrink-0 items-center gap-1 text-accent/60 transition-colors hover:text-[#F6F3EC]",
            className,
          )}
        >
          <HugeiconsIcon
            icon={MapPinHouseIcon}
            size={14}
            color="currentColor"
            strokeWidth={1.5}
          />
          <span className="flex items-center gap-2">
            {country.flag}{" "}
            <span className={cn("text-accent", spanColor)}>{country.name}</span>{" "}
            · {currency.code}
          </span>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={12}
            color="currentColor"
            strokeWidth={1.5}
          />
        </button>
      )}

      <LocaleDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
