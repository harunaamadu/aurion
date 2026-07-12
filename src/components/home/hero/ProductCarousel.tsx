"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import gsap from "gsap";
import type { Slide } from "@/data/hero";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const AUTOPLAY_MS = 5500;

export function ProductCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback(
    (next: number) => {
      setDirection(
        next > index || (index === slides.length - 1 && next === 0) ? 1 : -1,
      );
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [index, slides.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, next, prefersReducedMotion]);

  // GSAP ambient Ken Burns drift on the active slide
  useEffect(() => {
    if (!imageRef.current || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.04, xPercent: -1 },
        {
          scale: 1.12,
          xPercent: 1,
          duration: AUTOPLAY_MS / 1000 + 0.6,
          ease: "none",
        },
      );
    });
    return () => ctx.revert();
  }, [index, prefersReducedMotion]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -80) next();
    else if (swipe > 80) prev();
  };

  const slide = slides[index];

  return (
    <div
      className="group relative h-full w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <div
            ref={imageRef}
            className="absolute inset-0 h-full w-full will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Eyebrow */}
      <span className="pointer-events-none absolute left-6 top-6 z-10 font-mono-utility text-[11px] uppercase tracking-[0.2em] text-white/70">
        Aurion — Showroom
      </span>

      {/* Caption */}
      <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 flex items-end justify-between gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.2 }
                : { type: "spring", bounce: 0.55, duration: 0.9 }
            }
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-200">
              {String(index + 1).padStart(2, "0")} —{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-heading text-3xl italic text-neutral-50 sm:text-4xl">
              {slide.title}
            </h3>
            <p className="mt-1 max-w-xs font-body text-sm text-neutral-400">
              {slide.material}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-auto flex shrink-0 gap-2">
          <button
            aria-label="Previous piece"
            onClick={prev}
            className="flex size-10 items-center justify-center border border-border/30 text-neutral-200 transition-colors hover:border-primary hover:bg-primary hover:text-neutral-200"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Next piece"
            onClick={next}
            className="flex size-10 items-center justify-center border border-border/30 text-neutral-200 transition-colors hover:border-primary hover:bg-primary hover:text-neutral-200"
          >
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* Progress rail */}
      <div className="absolute inset-x-6 bottom-2 z-10 flex gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to ${s.title}`}
            onClick={() => goTo(i)}
            className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-neutral-200/20"
          >
            {i === index && !paused && !prefersReducedMotion && (
              <motion.span
                key={`${slide.id}-fill`}
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              />
            )}
            {i === index && (paused || prefersReducedMotion) && (
              <span className="absolute inset-y-0 left-0 w-full bg-neutral-200/60" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
