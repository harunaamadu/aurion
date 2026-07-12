"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SearchIcon,
  Cancel01Icon,
  StarIcon,
  TrendingUpDownIcon,
} from "@hugeicons/core-free-icons";
import { useSearchPanel } from "@/context/search-context";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { type Product, SEARCH_CATEGORIES } from "@/types/product";
import { sampleProduct } from "@/data/sample-product";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SAMPLE_PRODUCTS = [sampleProduct];

const AllProduct = SAMPLE_PRODUCTS.filter((product) => product.isTrending)
  .sort(
    (a, b) =>
      (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
      (a.createdAt ? new Date(a.createdAt).getTime() : 0),
  )
  .map((product) => product.name)
  .slice(0, 10);

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent font-semibold text-foreground">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const TagChip = ({ tag }: { tag: Product["tag"] }) => {
  if (!tag || Array.isArray(tag)) return null;
  // NOTE: keys here are capitalized ("New", "Sale", "Hot") but
  // `ProductBadge` (and likely your real tag values) are lowercase
  // kebab-case ("best-seller", "new", "sale", "hot", "limited", "prime").
  // As written this map will silently fail to match real data and the
  // chip will just never render. Normalize casing on one side —
  // easiest fix is comparing against `tag.toLowerCase()`.
  const map: Record<string, string> = {
    New: "bg-foreground text-background",
    Sale: "bg-destructive text-destructive-foreground",
    Hot: "bg-amber-500 text-white",
  };
  if (!map[tag]) return null;
  return (
    <span
      className={cn(
        "px-1.5 py-px text-[9px] font-bold uppercase tracking-widest",
        map[tag],
      )}
    >
      {tag}
    </span>
  );
};

export const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    <HugeiconsIcon
      icon={StarIcon}
      size={12}
      color="grey"
      className="fill-amber-400"
    />
    <span className="text-[10px] text-muted-foreground leading-0">
      {rating}
    </span>
  </div>
);

const ResultCard = ({
  item,
  query,
  index,
}: {
  item: Product;
  query: string;
  index: number;
}) => (
  // Was: a plain <article> with an inline `animationDelay` style but no
  // animation class attached to it anywhere — the style did nothing.
  // Using framer-motion (already a dependency here) actually staggers
  // the entrance instead of silently no-op-ing.
  <motion.a
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.15, delay: index * 0.03 }}
    href={item.slug}
    className="group flex cursor-pointer items-center gap-4 border-b border-border/50 px-2 py-3 transition-colors hover:bg-muted/30"
  >
    <Image
      src={item.colors[0].image}
      alt={item.name}
      width={100}
      height={100}
      className="block size-14 shrink-0 border border-border/40 object-cover"
      aria-hidden="true"
    />

    <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
      <div className="flex flex-wrap items-center">
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {highlight(item.brand ?? "", query)}
        </span>
        <TagChip tag={item.tag} />
      </div>
      <p className="truncate text-sm font-medium leading-snug text-foreground">
        {highlight(item.name, query)}
      </p>

      <span className="text-[10px] capitalize text-muted-foreground leading-tight">
        {item.category}
      </span>

      <div className="flex items-center gap-1">
        <Stars rating={item.review.rating} />
        <span className="text-[10px] text-muted-foreground leading-0">
          ({item.review.count})
        </span>
      </div>
    </div>

    <div className="flex shrink-0 flex-col items-end">
      <span className="text-sm font-semibold text-foreground">
        ${item.price}
      </span>
      {item.comparedPrice && (
        <span className="text-[11px] text-muted-foreground line-through">
          ${item.comparedPrice}
        </span>
      )}
    </div>
  </motion.a>
);

const EmptyState = ({ query }: { query: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20 text-center select-none">
    <HugeiconsIcon
      icon={SearchIcon}
      size={32}
      strokeWidth={1}
      className="text-muted-foreground/30"
    />
    <p className="text-sm text-muted-foreground">
      No results for{" "}
      <span className="font-semibold text-foreground">
        &ldquo;{query}&rdquo;
      </span>
    </p>
    <p className="text-xs text-muted-foreground/60">
      Try a different keyword or browse categories
    </p>
  </div>
);

const IdleState = ({ onTrending }: { onTrending: (t: string) => void }) => (
  <div className="flex flex-1 flex-col gap-6 px-2 py-6">
    <div>
      <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        <HugeiconsIcon icon={TrendingUpDownIcon} size={12} /> Trending
      </p>
      {AllProduct.length > 0 ? (
        <ul className="flex flex-col">
          {AllProduct.map((t) => (
            <li key={t}>
              <button
                type="button"
                onClick={() => onTrending(t)}
                className="group flex w-full items-center justify-between border-b border-border/40 px-2 py-3 text-left text-sm text-foreground transition-colors hover:bg-muted/30"
              >
                <span>{t}</span>
                <HugeiconsIcon
                  icon={SearchIcon}
                  size={14}
                  className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-xs opacity-60">No trending product at the moment</span>
      )}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const SearchPanel = () => {
  const { isOpen, close } = useSearchPanel();

  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Reset both query AND category together when the panel closes, so a
  // stale category filter from a previous session doesn't carry over
  // the next time the panel opens (the original only reset `query`).
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setActiveCategory("All");
    }
  }, [isOpen]);

  // Lock body scroll while the panel is open. The panel is `fixed`, so
  // without this the page behind it keeps scrolling underneath —
  // easy to miss since the overlay only covers the top of the viewport
  // by default, but still a real "misbehaving" bug on longer pages.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const handleTrending = useCallback((term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  }, []);

  // Was previously recomputed inline on every render with broken syntax
  // (a comment placeholder chained to `.filter`, which cannot compile).
  // Wrapped in useMemo now that it's pointed at a real array.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SAMPLE_PRODUCTS.filter((item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(q) ||
        (item.brand?.toLowerCase().includes(q) ?? false) ||
        (item.category?.toLowerCase().includes(q) ?? false);
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          id="search-panel"
          key="search-panel"
          role="search"
          aria-label="Site search"
          className="fixed top-0 left-0 right-0 z-50 bg-background overflow-hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div
            className="grid h-full w-full max-w-360 mx-auto px-4 py-4 md:px-6 lg:px-8"
            style={{ gridTemplateRows: "auto auto 1fr auto" }}
          >
            {/*
              Was: `next/form`'s <Form action=''>. next/form exists to
              progressively-enhance navigation to a *different* URL on
              submit — passing action='' makes it resubmit/navigate to
              the current page, which is a full page reload/remount and
              wipes all this component's state. This panel is a
              client-side, filter-as-you-type search with no real
              submission target, so a plain <form> with
              onSubmit={preventDefault} is what you actually want here
              (kept as a <form>, not a <div>, mainly so Enter-to-submit
              can still be safely swallowed instead of doing nothing at
              all).

              Just as important: every <button> inside a <form> defaults
              to type="submit" unless told otherwise. The Clear, Close,
              and "Close Search" buttons below had no explicit `type`,
              so clicking any of them would have submitted the form —
              i.e. triggered exactly the unwanted navigation above. All
              three now have type="button".
            */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-0 border-b border-border pb-4"
            >
              <Label
                htmlFor={inputId}
                className="flex size-9 shrink-0 items-center justify-center text-muted-foreground"
                aria-label="Search"
              >
                <HugeiconsIcon icon={SearchIcon} size={15} />
              </Label>

              <Input
                ref={inputRef}
                id={inputId}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands…"
                className="h-9 flex-1 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 dark:placeholder:text-neutral-700"
                autoComplete="off"
                spellCheck={false}
              />

              {hasQuery && (
                <span className="mr-3 shrink-0 bg-muted px-2 py-0.5 text-[11px] font-medium tabular-nums text-muted-foreground">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </span>
              )}

              {hasQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={14} />
                </Button>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={close}
                aria-label="Close search panel"
                className="ml-2 hidden shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground md:flex"
              >
                Close
              </Button>
            </form>

            {/* Category filter */}
            {hasQuery && (
              <div className="flex items-center gap-0 overflow-x-auto py-3 scrollbar-none">
                {SEARCH_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "shrink-0 border-b-2 px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-widest transition-colors",
                      activeCategory === cat
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Scrollable results */}
            <div className="overflow-y-auto">
              {!hasQuery && <IdleState onTrending={handleTrending} />}

              {hasQuery && hasResults && (
                <>
                  <p className="mb-1 px-2 pt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                    Search results
                  </p>
                  <ul>
                    {results.map((item, i) => (
                      <li key={item.id}>
                        <ResultCard item={item} query={query} index={i} />
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {hasQuery && !hasResults && <EmptyState query={query} />}
            </div>

            {/* Close button — bottom, mobile-first */}
            <div className="border-t border-border pt-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full text-[11px] uppercase tracking-widest"
                onClick={close}
              >
                Close Search
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default SearchPanel;
