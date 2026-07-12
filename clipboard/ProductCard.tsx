// src/components/product/ProductCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { Product, ProductImage, ProductReview } from "@/types/product";
import { RatingStars } from "./RatingStars";
import { PriceTag } from "./PriceTag";

const CardImage = ({
  imageUrl,
  alt = "Product image",
  href = "#",
  variant = "default",
}: ProductImage) => {
  const imageVariants: Record<
    NonNullable<ProductCardProps["variant"]>,
    string
  > = {
    default: "aspect-[3/4]",
    compact: "aspect-square",
    horizontal: "aspect-[4/3]",
    minimal: "aspect-square",
  };

  return (
    <Link href={href} className="relative block">
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          imageVariants[variant],
        )}
      >
        <Image
          src={imageUrl || "/images/placeholder-product.jpg"}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className={cn(
            "text-center object-cover transition-transform duration-500",
            variant !== "minimal" && "group-hover:scale-105",
          )}
        />
      </div>
    </Link>
  );
};

export interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal" | "minimal";
  className?: string;
}

const ProductCard = ({
  product,
  variant = "default",
  className,
}: ProductCardProps) => {
  const href = `/products/${product.slug}`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "relative group flex flex-col bg-background text-foreground transition-all",
        className,
      )}
    >
      <div className="relative">
        <CardImage
          imageUrl={product.image.imageUrl}
          alt={product.image.alt}
          href={href}
          variant={variant}
        />

        <div className="p-2">
          <Link
            href={href}
            className="mb-1 text-sm font-normal hover:underline underline-offset-2 line-clamp-2"
          >
            {product.name}
          </Link>

          <RatingStars
            rating={product.review.rating}
            reviewCount={product.review.count}
          />

          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            className="mt-2"
          />

          {!product.inStock && (
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-600">
              Out of stock
            </p>
          )}

          {product.variants && product.variants.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5">
              {product.variants.slice(0, 4).map((v) => (
                <span
                  key={v.value}
                  className={cn(
                    "border px-1.5 py-0.5 text-[9px] font-medium",
                    v.inStock
                      ? "border-border text-foreground"
                      : "border-border/40 text-muted-foreground/50 line-through",
                  )}
                >
                  {v.label}
                </span>
              ))}
              {product.variants.length > 4 && (
                <span className="text-[9px] text-muted-foreground">
                  +{product.variants.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
