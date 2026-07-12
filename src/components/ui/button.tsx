import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading01Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-8 gap-1.5 px-2.5",
        xs: "h-6 gap-1 px-2 text-xs",
        sm: "h-7 gap-1 px-2.5",
        lg: "h-9 gap-1.5 px-2.5",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  const sharedProps = {
    "data-slot": "button" as const,
    "data-variant": variant,
    "data-size": size,
    "data-loading": loading || undefined,
    disabled: isDisabled,
    "aria-busy": loading || undefined,
    "aria-disabled": isDisabled || undefined,
    className: cn(
      buttonVariants({ variant, size }),
      loading && "cursor-wait",
      className
    ),
    ...props,
  };

  // Slot requires exactly one React element child, so when asChild is true
  // we must pass `children` straight through untouched — we can't wrap it
  // with a spinner + span, or React throws "Slot failed to slot onto its
  // children". Loading UI is therefore only rendered for the plain button.
  if (asChild) {
    return <Comp {...sharedProps}>{children}</Comp>;
  }

  return (
    <Comp {...sharedProps}>
      {loading && (
        <HugeiconsIcon
          icon={Loading01Icon}
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="absolute inset-0 m-auto animate-spin"
        />
      )}

      <span
        className={cn(
          "inline-flex items-center justify-center gap-1.5",
          loading && "invisible"
        )}
      >
        {children}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };