"use client";

import Reveal from "@/components/animation/reveal";
import { ProductCard } from "./FeaturedCarousel";

const MAX_FEATURED_PRODUCT: number = 12;

const FreaturedProductGrid = () => {
  return (
    <div className="hidden lg:grid grid-cols-5 gap-4 gap-y-8">
      {Array.from({ length: MAX_FEATURED_PRODUCT }).map((_, index) => (
        <Reveal key={index} variant="up" delay={index * 0.12}>
          <ProductCard index={index} />
        </Reveal>
      ))}
    </div>
  );
};

export default FreaturedProductGrid;
