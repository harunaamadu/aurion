"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

export function useScrollDirection(threshold = 10) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastY.current;

    // Ignore tiny jitters (mobile bounce, trackpad noise)
    if (Math.abs(diff) < threshold) return;

    // Always show near the top, regardless of direction
    if (y < 80) {
      setHidden(false);
    } else {
      setHidden(diff > 0); // scrolling down -> hide, scrolling up -> show
    }

    lastY.current = y;
  });

  return hidden;
}