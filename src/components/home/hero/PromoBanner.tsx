"use client";

import { motion } from "framer-motion";
import type { Banner } from "@/data/hero";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

export function PromoBanner({
  banner,
  delay = 0,
}: {
  banner: Banner;
  delay?: number;
}) {
  return (
    <motion.a
      href={banner.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <motion.img
          src={banner.image}
          alt=""
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 transition-colors duration-500 group-hover:from-black/95" />
      </motion.div>

      <div className="relative z-10 p-5">
        <span className="font-mono-utility text-[10px] uppercase tracking-[0.2em] text-neutral-200">
          {banner.eyebrow}
        </span>
        <h3 className="mt-1.5 font-heading text-xl italic leading-tight text-neutral-200 sm:text-2xl">
          {banner.title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 font-body text-sm text-neutral-200/85">
          {banner.cta}
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            size={20}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.a>
  );
}
