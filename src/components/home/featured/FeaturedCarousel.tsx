"use client";

import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Category } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/animation/reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PriceType = {
  currencySymb?: string;
  price: number;
  priceFloat?: number;
  comparePrice?: number;
  comparePriceFloat?: number;
};

function ProductPrice({
  currencySymb = "$",
  price,
  priceFloat = 0,
  comparePrice,
  comparePriceFloat,
}: PriceType) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-base">
        <sup>{currencySymb}</sup>
        <span className="text-xl font-normal">{price}</span>
        <sup>{priceFloat}</sup>
      </p>

      {comparePrice && comparePriceFloat && (
        <p className="opacity-60 text-[10px]">
          List price:{" "}
          <span className="line-through">
            {currencySymb} {comparePrice} {comparePriceFloat}
          </span>
        </p>
      )}
    </div>
  );
}

export function ProductCard({ index }: { index: number }) {
  return (
    <Link href={"/"} className="p-1">
      <Card className="relative group ring-border hover:ring-primary! select-none p-0 ring-0">
        <CardContent className="p-0">
          <span className="text-6xl font-bold text-neutral-100 absolute inset-0 z-0 opacity-40">
            {index + 1}
          </span>

          <div className="block w-full aspect-3/4 bg-black/50 group-hover:scale-105 transition-all duration-300" />
        </CardContent>

        <CardFooter className="flex-col gap-2 border-t-0 p-2">
          {/* product name */}
          <p className="line-clamp-4 text-base font-normal">
            Party Bluetooth Speaker - 240W Peak Loud Speaker, Dazzling Light
            Show, Deep Bass, IPX4 Waterproof, 15H
          </p>

          <div className="flex items-center gap-1.75 w-full">
            {/* review */}
            {/* - rating ratio */}
            <span className="text-xs">4.6</span>

            <div className="flex items-center gap-0.5">
              {/* - stars */}
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon
                  key={i}
                  icon={StarIcon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.5}
                  className="fill-amber-300 text-amber-300"
                />
              ))}
            </div>

            {/* - rating */}
            <span className="text-xs text-primary">(48.3K)</span>
          </div>

          {/* product info
              ***(e.g )
              #1: 10K+ bought in past month
              #2: Limited time deal or Ends in 03:12:45 or Save 32% with coupon
              #3: Delivery Jul 24 - Aug 11
              #4: Ships to Ghana
              #5: Carbon impact or Safer chemicals +1 more     <= sustainability
              */}
          <span className="text-start self-start">
            10K+ bought in past month
          </span>

          <Badge className="text-start self-start">Limited time deal</Badge>

          {/* price */}
          <div className="flex items-center gap-1 w-full">
            <ProductPrice
              price={24}
              priceFloat={99}
              comparePrice={29}
              comparePriceFloat={99}
            />
          </div>

          {/* color */}
          <div className="flex items-center gap-1 w-full">
            {/* - colors */}
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="size-2.5 bg-amber-300 aspect-square"
              />
            ))}
          </div>

          {/* add to cart button */}
          <Button className="mt-2 w-full">Add to cart</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

const FeaturedCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full lg:hidden"
    >
      <CarouselContent>
        {Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index} className="max-w-68">
            <Reveal variant="up" delay={index * 0.12}>
              <ProductCard index={index} />
            </Reveal>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="max-[480]:hidden left-0 -translate-x-full h-full ring-0 border-0" />
      <CarouselNext className="max-[480]:hidden right-0 translate-x-full h-full ring-0 border-0" />
    </Carousel>
  );
};

export default FeaturedCarousel;

{
  /* <Card className="relative group ring-border hover:ring-primary! aspect-square select-none">
                  <CardContent className="p-4 mt-auto">
                    <Image
                      src={_.image}
                      alt={_.slug}
                      fill
                      className="object-contain opacity-0 group-hover:opacity-100 transition-all duration-300"
                    />

                    <span className="text-9xl font-bold text-neutral-100 absolute inset-0 z-0 opacity-60">
                      {index + 1}
                    </span>
                    <div className="relative z-10">
                      <p className="text-lg font-semibold line-clamp-2 group-hover:text-white transition-colors duration-300 delay-150">
                        {_.title}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-0 bg-black/50 group-hover:h-full transition-all duration-300" />
                  </CardContent>
                </Card> */
}
