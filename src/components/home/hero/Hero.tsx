"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ProductCarousel } from "./ProductCarousel";
import { PromoBanner } from "./PromoBanner";
import { slides, banners } from "@/data/hero";
import Container from "@/components/shared/common/Container";

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-carousel]",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.8 },
      ).fromTo(
        "[data-hero-banner]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        "-=0.5",
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container
      ref={rootRef}
      as="section"
    >
      <div className="mx-auto grid w-full grid-cols-1 grid-rows-[380px_repeat(2,220px)] gap-4 md:grid-cols-[1fr_320px] md:grid-rows-[repeat(2,240px)] lg:grid-template-rows:[repeat(2,1fr)] md:h-120">
        <div data-hero-carousel className="row-span-1 md:row-span-2 md:h-full">
          <ProductCarousel slides={slides} />
        </div>

        <div data-hero-banner className="h-full">
          <PromoBanner banner={banners[0]} delay={0} />
        </div>

        <div data-hero-banner className="h-full">
          <PromoBanner banner={banners[1]} delay={0.1} />
        </div>
      </div>
    </Container>
  );
}

export default Hero;
