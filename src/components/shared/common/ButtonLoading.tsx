"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Loading01Icon } from "@hugeicons/core-free-icons";

import { Button, type ButtonProps } from "@/components/ui/button";

interface ButtonLoadingProps extends ButtonProps {
  loading?: boolean;
  loadingLabel?: string;
  children?: React.ReactNode;
}

export default function ButtonLoading({
  loading = false,
  loadingLabel = "Loading",
  children,
  className,
  disabled,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={className}
      {...props}
    >
      {loading ? (
        <HugeiconsIcon
          icon={Loading01Icon}
          size={16}
          strokeWidth={2}
          className="animate-spin"
        />
      ) : (
        children
      )}
    </Button>
  );
}