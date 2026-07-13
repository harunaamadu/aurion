"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checkbox } from "../ui/checkbox";

interface TutorialProps {
  /**
   * Stable, unique identifier for this tutorial's "don't show again" flag.
   * Defaults to a slug of `title`, but pass this explicitly if you reuse
   * <Tutorial /> for more than one callout — otherwise dismissing one
   * would silently suppress every tutorial that shares the same default.
   */
  id?: string;
  title?: string;
  description?: string;
  targetElement?: HTMLElement | null;
  onClose?: () => void;
  show?: boolean;
}

const GAP = 90; // space between the target and the callout
const CALLOUT_HALF_WIDTH = 160; // half of the callout's max width (max-w-xs = 20rem)
const EDGE_PADDING = 16; // minimum distance from the viewport edge
const MIN_SPACE_BELOW = 180; // flip the callout above the target if less room than this
const STORAGE_PREFIX = "tutorial-dismissed:";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const readDismissed = (key: string) => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    // Storage can throw in private browsing / disabled-storage contexts —
    // fail open (treat as "not dismissed") rather than crash.
    return false;
  }
};

const Tutorial = ({
  id,
  title = "Explore by category",
  description = "Tap here to browse Fashion, Technology, and more without leaving the page.",
  targetElement,
  onClose,
  show = true,
}: TutorialProps) => {
  const storageKey = `${STORAGE_PREFIX}${id ?? slugify(title)}`;

  const [rect, setRect] = useState<DOMRect | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  // Lazy-initialized so it reads localStorage on the client without ever
  // needing to touch it during SSR: the component renders null on the
  // server regardless (rect starts null there), so there's no hydration
  // mismatch from resolving this synchronously on first client render.
  const [dismissed, setDismissed] = useState(() => readDismissed(storageKey));

  // Hooks must run in the same order on every render, so this needs to sit
  // above any conditional `return null` below it — previously it ran only
  // on renders where `rect` was already set, which is a Rules-of-Hooks
  // violation and eventually throws "Rendered fewer hooks than expected".
  const hideForMobile = useIsMobile();

  // Track the target element's position so the callout can follow it
  useEffect(() => {
    if (!targetElement || !show || dismissed) return;

    const update = () => setRect(targetElement.getBoundingClientRect());
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
  }, [targetElement, show, dismissed]);

  if (!show || !rect || hideForMobile || dismissed) return null;

  const targetCenterX = rect.left + rect.width / 2;
  const placeAbove = window.innerHeight - rect.bottom < MIN_SPACE_BELOW;

  const top = placeAbove ? rect.top - GAP : rect.bottom + GAP;
  const left = Math.min(
    Math.max(targetCenterX, EDGE_PADDING + CALLOUT_HALF_WIDTH),
    window.innerWidth - EDGE_PADDING - CALLOUT_HALF_WIDTH,
  );
  // Keep the arrow pointing at the target's true center even when the
  // callout itself has been nudged inward to stay on-screen.
  const arrowOffset = Math.max(
    Math.min(targetCenterX - left, CALLOUT_HALF_WIDTH - 20),
    -(CALLOUT_HALF_WIDTH - 20),
  );

  const handleClose = () => {
    onClose?.();
  };

  const handleAccept = () => {
    if (dontShowAgain) {
      try {
        window.localStorage.setItem(storageKey, "1");
        setDismissed(true);
      } catch {
        // If storage isn't available the checkbox simply won't persist —
        // the tutorial still closes normally via onClose below.
      }
    }
    onClose?.();
  };

  return (
    <AlertDialog open onOpenChange={(next) => !next && handleClose()}>
      {/* Highlight ring around the target. Rendered through the same Radix
          Portal as the callout, so — like the callout — it's appended to
          <body> and overlays the whole document instead of being confined
          by the animated sticky header (which, via its Framer Motion
          `transform`, would otherwise create a containing block that
          breaks `position: fixed` descendants). */}
      <AlertDialogPortal>
        <div
          aria-hidden
          className="pointer-events-none fixed rounded-md ring-2 ring-primary ring-offset-2 ring-offset-background transition-[top,left,width,height] duration-150 z-101 bg-white flex items-center justify-center"
          style={{
            top: rect.top - 4,
            left: rect.left - 4,
            width: rect.width + 8,
            height: rect.height + 8,
          }}
        >
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={16}
            strokeWidth={1.5}
          />
        </div>
      </AlertDialogPortal>

      {/* No dark backdrop — the callout points directly at the target
          instead of dimming the rest of the page. The overlay is still
          rendered (showOverlay) purely to catch outside clicks below. */}
      <AlertDialogContent
        showOverlay={true}
        size="default"
        style={{
          top,
          left,
          transform: `translate(0%, ${placeAbove ? "-100%" : "0"})`,
        }}
        className="absolute w-auto text-left shadow-xl transition-[top,center] duration-150 z-101"
        // AlertDialog intentionally ignores outside clicks by default (it's
        // meant to force an explicit choice). This callout isn't a true
        // blocking alert, so we override that and close like a normal
        // popover would when the overlay is clicked.
        onInteractOutside={(event) => {
          event.preventDefault();
          handleClose();
        }}
      >
        {/* Pointer arrow, aimed at the target */}
        <span
          aria-hidden
          className={cn(
            "absolute size-2.5 rotate-45 border border-foreground/10 bg-popover",
            placeAbove
              ? "-bottom-1.25 border-t-0 border-l-0"
              : "-top-1.25 border-r-0 border-b-0",
          )}
          style={{ left: `calc(50% + ${arrowOffset}px - 5px)` }}
        />

        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="mr-auto flex items-center gap-2">
            <Checkbox
              id="dont-show-again"
              name="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked === true)}
            />
            <Label
              htmlFor="dont-show-again"
              className="text-xs font-normal text-muted-foreground"
            >
              Don&apos;t show this again
            </Label>
          </div>

          <AlertDialogAction onClick={handleAccept}>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Tutorial;