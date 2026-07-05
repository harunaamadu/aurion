"use client";

import React, { useEffect, useMemo, useState } from "react";

interface TutorialProps {
  x?: number;
  y?: number;
  targetElement?: HTMLElement | null;
  onClose?: () => void;
  show?: boolean;
}

const Tutorial = ({
  x,
  y,
  targetElement,
  onClose,
  show = true,
}: TutorialProps) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Get target element position
  useEffect(() => {
    if (!targetElement) return;

    const update = () => {
      setRect(targetElement.getBoundingClientRect());
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(targetElement);

    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [targetElement]);

  const spotlight = useMemo(() => {
    if (rect) {
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        radius: Math.max(rect.width, rect.height) / 2 + 12,
      };
    }

    return {
      x: x ?? window.innerWidth / 2,
      y: y ?? window.innerHeight / 2,
      radius: 80,
    };
  }, [rect, x, y]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-black/50"
      onClick={onClose}
    >
      {/* Spotlight cutout */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            circle ${spotlight.radius}px at ${spotlight.x}px ${spotlight.y}px,
            transparent 0%,
            transparent 40%,
            rgba(0,0,0,0.6) 70%
          )`,
        }}
      />

      {/* Optional hint box */}
      <div className="absolute left-1/2 top-1/2 max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 text-sm shadow-xl">
        <p className="font-medium">Tutorial Step</p>
        <p className="text-muted-foreground">
          This is where you can explain the feature.
        </p>

        <button
          onClick={onClose}
          className="mt-3 text-sm text-primary hover:underline"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default Tutorial;