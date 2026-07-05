"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import Tutorial from "@/components/tutorial/Tutorial";

import { NAVLINKS, type MegaMenuItem } from "@/types/navigations";
import { cn } from "@/lib/utils";

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
      className="absolute inset-x-0 z-50 border-t bg-background shadow-xl mt-12"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 p-6">
        {items.map((item) => (
          <Link
            key={`${item.label}-${item.href}`}
            href={item.href}
            className="p-2 py-4 text-sm transition-colors hover:bg-muted hover:text-primary"
          >
            <div className="font-medium">{item.label}</div>
            {item.description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {item.description}
              </p>
            )}
          </Link>
        ))}
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

  useEffect(() => {
    const el = document.querySelector('[data-tutorial="megaMenu"]');
    if (el) setTutorialTarget(el);
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

  return (
    <>
      <nav aria-label="Main navigation" ref={navRef}>
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
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${link.label} menu`}
                      onClick={() => toggle(index)}
                      className="p-1 transition-colors hover:text-primary"
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

                <AnimatePresence>
                  {isOpen && hasMegaMenu && link.items && (
                    <MegaMenu items={link.items} top={headerHeight} />
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>
      <Tutorial
        targetElement={tutorialTarget}
        show={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </>
  );
};

export default memo(Navigation);
