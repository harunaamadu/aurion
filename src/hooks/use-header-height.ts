"use client";

import { useEffect, useState } from "react";

export function useClientHeight<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const updateHeight = () => {
      setHeight(el.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(el);

    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [ref]);

  return height;
}