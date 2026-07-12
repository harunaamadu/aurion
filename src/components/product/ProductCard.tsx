"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

import {
  ProductImage,
  ProductQuickActions,
  ProductColorSelector,
} from "./index";
import { PriceTag } from "./PriceTag";
import { RatingStars } from "./RatingStars";

interface ProductCardProps {
  product: Product;
}

// Empty variants object on the Card is what makes it the propagation root:
// children with matching "rest"/"hover" keys animate off this one hover
// state instead of each needing their own listeners.
const cardVariants: Variants = {
  rest: {},
  hover: {},
};

const viewButtonVariants: Variants = {
  rest: { y: "100%", opacity: 0 },
  hover: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export function ProductCard({ product }: ProductCardProps) {
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0].id);

  const selectedColor = useMemo(
    () =>
      product.colors.find((color) => color.id === selectedColorId) ??
      product.colors[0],
    [product.colors, selectedColorId],
  );

  return (
    <Card className="ring-0 p-0! border-none">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardVariants}
      >
        <CardContent className="relative group aspect-3/4 overflow-hidden p-0">
          <ProductImage
            imageUrl={selectedColor.image}
            alt={`${product.name} in ${selectedColor.label}`}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10"
            variants={viewButtonVariants}
          >
            <Button
              variant="secondary"
              className="w-full rounded-none text-xs"
              size={"lg"}
              asChild
            >
              <Link href={product.slug}>View Product</Link>
            </Button>
          </motion.div>

          <ProductQuickActions />
        </CardContent>
      </motion.div>

      <CardFooter className="flex flex-col items-start border-t-0 pt-0 leading-tight">
        <ProductColorSelector
          name={product.id}
          colors={product.colors}
          value={selectedColorId}
          onChange={setSelectedColorId}
        />

        <Link
          href={product.slug}
          className="text-sm font-normal hover:underline"
        >
          {product.name}
        </Link>

        <RatingStars
          rating={product.review.rating}
          reviewCount={product.review.count}
        />

        <PriceTag
          price={product.price}
          originalPrice={product.comparedPrice}
          className="mt-2"
        />
      </CardFooter>
    </Card>
  );
}
