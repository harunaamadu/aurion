"use client";

import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { calcDiscountPercent } from "@/lib/currency";

interface PriceTagProps {
  /** Amount in the catalog's base currency (USD) — never pass an already-converted value. */
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { whole: "text-lg", fraction: "text-xs", symbol: "text-xs" },
  md: { whole: "text-2xl", fraction: "text-sm", symbol: "text-sm" },
  lg: { whole: "text-3xl", fraction: "text-base", symbol: "text-base" },
};

export function PriceTag({
  price,
  originalPrice,
  size = "sm",
  className,
}: PriceTagProps) {
  const { formatParts, format, loading } = useCurrency();
  const sizes = SIZE_MAP[size];
  const discount = calcDiscountPercent(price, originalPrice);

  if (loading) {
    return <Skeleton className={cn("h-6 w-24", className)} />;
  }

  const { symbol, whole, fraction } = formatParts(price);

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      <div className="flex items-baseline font-semibold text-foreground">
        <span className={cn(sizes.symbol, "self-start")}>{symbol}</span>
        <span className={sizes.whole}>{whole}</span>
        {fraction && (
          <span className={cn(sizes.fraction, "self-start")}>.{fraction}</span>
        )}
      </div>

      {originalPrice !== undefined && originalPrice > price && (
        <div className="flex items-baseline font-semibold text-foreground">
          <span className="text-xs text-muted-foreground line-through">
            {format(originalPrice)}
          </span>

          {discount !== null && (
            <span
              className={cn(
                sizes.symbol,
                "ml-1 font-bold text-rose-400",
              )}
            >
              -{discount}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
