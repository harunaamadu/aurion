"use client";

import Link from "next/link";
import { useHeaderPanelStore } from "@/store/useHeaderPanelStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MEGAMENU_ITEMS } from "@/types/navigations";

export function MobileCategoriesTab() {
  const openPanel = useHeaderPanelStore((s) => s.openPanel);
  const close = () => openPanel(null);

  return (
    <nav>
      {/* One shared Accordion so opening a category collapses the previous
          one, instead of each category being its own independent,
          permanently-open (missing `collapsible`) instance. */}
      <Accordion type="single" collapsible className="w-full">
        {MEGAMENU_ITEMS.map((category) => {
          const hasSubItems = !!category.subItems?.length;

          return (
            <AccordionItem value={category.href} key={category.href}>
              <div className="flex items-center justify-between">
                <Link
                  href={category.href}
                  onClick={close}
                  className="flex-1 py-3 text-sm transition-colors hover:text-primary"
                >
                  {category.label}
                </Link>

                {hasSubItems && (
                  <AccordionTrigger
                    aria-label={`Show ${category.label} subcategories`}
                  />
                )}
              </div>

              {hasSubItems && (
                <AccordionContent>
                  <div className="flex flex-col pl-2">
                    {category.subItems!.map((sublink) => (
                      <Link
                        href={sublink.href}
                        key={sublink.href}
                        onClick={close}
                        className="no-underline! py-3 text-sm transition-colors hover:text-primary"
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </nav>
  );
}