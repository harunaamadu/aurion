"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, FavouriteIcon, GitCompareIcon, ViewIcon } from "@hugeicons/core-free-icons";
import Tutorial from "@/components/tutorial/Tutorial";

import { NAVLINKS, type MegaMenuItem } from "@/types/navigations";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { sampleProduct } from "@/data/sample-product";

interface MegaMenuProps {
  items: MegaMenuItem[];
  top: number;
}

const MegaMenu = ({ items, top }: MegaMenuProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ top: `${top}px` }}
      className="fixed inset-x-0 z-50 border-t bg-background shadow-xl"
    >
      <div className="mx-auto grid sm:max-w-7xl lg:max-w-360 grid-cols-2 gap-6 p-6 sm:grid-cols-4 lg:grid-cols-5 lg:gap-8 lg:px-8">
        {items.map((item) => (
          <div key={`${item.label}-${item.href}`} className="p-2 py-4">
            <Link
              href={item.href}
              className="font-medium text-sm transition-colors hover:bg-muted hover:text-primary"
            >
              {item.label}
            </Link>

            <ul className="my-4">
              {item.subItems?.map((subItem) => (
                <li key={`${subItem.label}-${subItem.href}`}>
                  <Link
                    href={subItem.href}
                    className="block py-1 text-xs transition-colors hover:text-primary"
                  >
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>

            {item.hasBanner && item.bannerImage && (
              <Link
                href={item.href}
                className="my-4 relative group min-h-36 block overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent pointer-events-none -z-1" />
                <div className="flex flex-col gap-1.25 absolute bottom-2 left-2">
                  <h3 className="text-xl whitespace-pre-line font-bold font-heading leading-tight translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                    {item.bannerTitle}
                  </h3>

                  <span className="text-xs text-primary translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                    See All →
                  </span>
                </div>
                <Image
                  src={item.bannerImage}
                  alt={item.bannerAltText || ""}
                  className="group-hover:scale-105 transition-all duration-300 text-xs text-muted-foreground absolute inset-0 w-full h-full object-cover -z-2"
                  width={200}
                  height={100}
                />
              </Link>
            )}

            {item.description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        ))}

        {/* Random product card */}
        <ProductCard product={sampleProduct} />
      </div>
    </motion.nav>
  );
};

interface NavigationProps {
  headerHeight: number;
}
const Navigation = ({ headerHeight }: NavigationProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const [tutorialTarget, setTutorialTarget] = useState<HTMLElement | null>(
    null,
  );
  const [showTutorial, setShowTutorial] = useState(true);

  // Capture the mega-menu toggle button as soon as it mounts, via a callback
  // ref rather than a post-mount DOM query inside an effect.
  const megaMenuButtonRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) setTutorialTarget(node);
  }, []);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);

  // Close on outside click
  useEffect(() => {
    if (openIndex === null) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openIndex, close]);

  const activeLink = openIndex !== null ? NAVLINKS[openIndex] : null;
  const activeHasMegaMenu =
    !!activeLink?.megaMenu &&
    Array.isArray(activeLink.items) &&
    activeLink.items.length > 0;

  return (
    <>
      <nav
        aria-label="Main navigation"
        ref={navRef}
        className="hidden lg:block"
      >
        <ul className="flex items-center gap-6">
          {NAVLINKS.map((link, index) => {
            const hasMegaMenu =
              link.megaMenu &&
              Array.isArray(link.items) &&
              link.items.length > 0;
            const isOpen = openIndex === index;

            return (
              <li key={`${link.label}-${link.href}`} className="relative">
                <div className="flex items-center gap-1 text-sm">
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>

                  {hasMegaMenu && (
                    <button
                      ref={megaMenuButtonRef}
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${link.label} menu`}
                      onClick={() => toggle(index)}
                      className="p-1 transition-colors hover:text-primary relative z-103"
                      data-tutorial="megaMenu"
                    >
                      <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        size={14}
                        strokeWidth={1.5}
                        className={cn(
                          "transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Rendered once at nav level (not inside a narrow li) so it can
            span the full viewport width via fixed positioning. */}
        <AnimatePresence>
          {activeHasMegaMenu && activeLink?.items && (
            <MegaMenu items={activeLink.items} top={headerHeight} />
          )}
        </AnimatePresence>
      </nav>
      <Tutorial
        targetElement={tutorialTarget}
        show={showTutorial}
        onClose={() => setShowTutorial(false)}
        title="Mega Menu"
        description="Click the arrow to open the mega menu and explore more options."
      />
    </>
  );
};

export default memo(Navigation);
