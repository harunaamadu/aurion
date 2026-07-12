"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { ProductColorOption } from "@/types/product";

interface ProductColorSelectorProps {
  name: string;
  colors: readonly ProductColorOption[];
  value: string;
  onChange: (colorId: string) => void;
}

export function ProductColorSelector({
  name,
  colors,
  value,
  onChange,
}: ProductColorSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="flex items-center justify-center mb-3"
      aria-label="Color"
    >
      {colors.map((color) => {
        const inputId = `${name}-${color.id}`;
        const isSelected = value === color.id;

        return (
          <div key={color.id} className="flex items-center">
            <RadioGroupItem value={color.id} id={inputId} className="sr-only" />
            <Label
              htmlFor={inputId}
              title={color.label}
              style={{ backgroundColor: color.swatch }}
              className={cn(
                "relative flex size-5 cursor-pointer items-center justify-center border border-border ring-2 ring-transparent transition-all",
                isSelected && "ring-foreground"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none text-[10px] invert transition-opacity",
                  isSelected ? "opacity-100" : "opacity-0"
                )}
              >
                ✔
              </span>
              <span className="sr-only">{color.label}</span>
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}