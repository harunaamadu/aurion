"use client";

import { useRef } from "react";
import Image from "next/image";
import { useImageCrossfade } from "@/hooks/use-image-crossfade";
import { type ProductImage } from "@/types/product";

export function ProductImage({ imageUrl, alt }: ProductImage) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layers = useImageCrossfade(imageUrl, containerRef);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {layers.map((layer) => (
        <div key={layer.id} data-image-layer className="absolute inset-0">
          <Image
            src={layer.imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
