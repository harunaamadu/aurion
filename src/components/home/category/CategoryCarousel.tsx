"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";
import Reveal from "@/components/animation/reveal";

const allCategory: Category[] = [
  {
    id: "fas01",
    slug: "fashion",
    title: "Fashion & Jewellery",
    image: "https://picsum.photos/id/638/300/300",
    href: "/shop/fashion",
  },
  {
    id: "tec01",
    slug: "technology",
    title: "Technology & Gadgets",
    image: "https://picsum.photos/id/639/300/300",
    href: "/shop/technology",
  },
  {
    id: "hom01",
    slug: "home-decor",
    title: "Home & Decor",
    image: "https://picsum.photos/id/640/300/300",
    href: "/shop/home",
  },
  {
    id: "bea01",
    slug: "beauty",
    title: "Beauty & Personal Care",
    image: "https://picsum.photos/id/641/300/300",
    href: "/shop/beauty",
  },
  {
    id: "hea01",
    slug: "health",
    title: "Health & Wellness",
    image: "https://picsum.photos/id/642/300/300",
    href: "/shop/health",
  },
  {
    id: "spo01",
    slug: "sports",
    title: "Sports & Outdoors",
    image: "https://picsum.photos/id/643/300/300",
    href: "/shop/sports",
  },
  {
    id: "toy01",
    slug: "toys",
    title: "Toys & Games",
    image: "https://picsum.photos/id/644/300/300",
    href: "/shop/toys",
  },
  {
    id: "boo01",
    slug: "books",
    title: "Books & Stationery",
    image: "https://picsum.photos/id/645/300/300",
    href: "/shop/books",
  },
  {
    id: "gro01",
    slug: "groceries",
    title: "Groceries",
    image: "https://picsum.photos/id/646/300/300",
    href: "/shop/groceries",
  },
  {
    id: "pet01",
    slug: "pets",
    title: "Pet Supplies",
    image: "https://picsum.photos/id/647/300/300",
    href: "/shop/pets",
  },
  {
    id: "bab01",
    slug: "baby",
    title: "Baby Products",
    image: "https://picsum.photos/id/648/300/300",
    href: "/shop/baby",
  },
  {
    id: "aut01",
    slug: "automotive",
    title: "Automotive",
    image: "https://picsum.photos/id/649/300/300",
    href: "/shop/automotive",
  },
  {
    id: "off01",
    slug: "office",
    title: "Office Supplies",
    image: "https://picsum.photos/id/650/300/300",
    href: "/shop/office",
  },
  {
    id: "gar01",
    slug: "garden",
    title: "Garden & Outdoor Living",
    image: "https://picsum.photos/id/651/300/300",
    href: "/shop/garden",
  },
  {
    id: "foo01",
    slug: "food",
    title: "Food & Beverages",
    image: "https://picsum.photos/id/652/300/300",
    href: "/shop/food",
  },
  {
    id: "mus01",
    slug: "music",
    title: "Musical Instruments",
    image: "https://picsum.photos/id/653/300/300",
    href: "/shop/music",
  },
  {
    id: "art01",
    slug: "arts-crafts",
    title: "Arts & Crafts",
    image: "https://picsum.photos/id/654/300/300",
    href: "/shop/arts-crafts",
  },
  {
    id: "lux01",
    slug: "luxury",
    title: "Luxury Collection",
    image: "https://picsum.photos/id/655/300/300",
    href: "/shop/luxury",
  },
  {
    id: "gif01",
    slug: "gifts",
    title: "Gifts & Occasions",
    image: "https://picsum.photos/id/656/300/300",
    href: "/shop/gifts",
  },
  {
    id: "dig01",
    slug: "digital",
    title: "Digital Products",
    image: "https://picsum.photos/id/657/300/300",
    href: "/shop/digital",
  },
];

const CategoryCarousel = () => {
  const isMobile = useIsMobile();

  const autoplay = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <div className="py-0 md:py-12">
      <Carousel
        plugins={[autoplay.current]}
        opts={{
          align: isMobile ? "center" : "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {allCategory.map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/5 lg:basis-1/8"
            >
              <Reveal>
                <Link href={_.slug} className="p-1">
                  <Card className="relative group ring-border hover:ring-primary! aspect-square select-none">
                    <CardContent className="p-4 mt-auto">
                      <span className="text-9xl font-bold text-neutral-100 absolute inset-0 z-0 opacity-60">
                        {index + 1}
                      </span>
                      <div className="relative z-10">
                        <p className="text-lg font-semibold line-clamp-2 group-hover:text-white transition-colors duration-300 delay-150">
                          {_.title}
                        </p>
                      </div>
                      <Image
                        src={_.image}
                        alt={_.slug}
                        fill
                        className="object-contain opacity-0 group-hover:opacity-100 transition-all duration-300"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-0 bg-black/50 group-hover:h-full transition-all duration-300" />
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-[480]:hidden left-0 -translate-x-full h-full ring-0 border-0" />
        <CarouselNext className="max-[480]:hidden right-0 translate-x-full h-full ring-0 border-0" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
