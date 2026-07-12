"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ProductImage } from "@/types/product";

/**
 * Stacks the incoming image on top of the outgoing one and crossfades
 * between them with GSAP whenever `imageUrl` changes, then drops the old layer.
 *
 * Kept as a hook (rather than baked into ProductImage) so the animation
 * strategy can be swapped or reused without touching markup.
 */
export function useImageCrossfade(
  imageUrl: string,
  containerRef: RefObject<HTMLDivElement | null>
) {
  const [layers, setLayers] = useState<ProductImage[]>([
    { id: 0, imageUrl, alt: "image-fallback" },
  ]);
  const nextId = useRef(1);

  useEffect(() => {
    setLayers((prev) => {
      const current = prev[prev.length - 1];
      if (current.imageUrl === imageUrl) return prev;
      return [...prev, { id: nextId.current++, imageUrl, alt: "" }];
    });
  }, [imageUrl]);

  useEffect(() => {
    if (layers.length < 2) return;
    const container = containerRef.current;
    if (!container) return;

    const nodes = container.querySelectorAll<HTMLElement>("[data-image-layer]");
    const incoming = nodes[nodes.length - 1];
    const outgoing = nodes[nodes.length - 2];
    if (!incoming || !outgoing) return;

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => setLayers((prev) => prev.slice(prev.length - 1)),
    });

    tl.fromTo(
      incoming,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      0
    ).to(outgoing, { opacity: 0, duration: 0.35, ease: "power1.out" }, 0);

    return () => {
      tl.kill();
    };
  }, [layers, containerRef]);

  return layers;
}