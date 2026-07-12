"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { COUNTRIES } from "@/data/countries";
import { CURRENCIES } from "@/data/currencies";
import { useLocaleStore } from "@/store/useLocaleStore";

interface LocaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LocaleDropdown({
  open,
  onOpenChange,
}: LocaleDialogProps) {
  const [query, setQuery] = useState("");
  const setLocale = useLocaleStore((s) => s.setLocale);

  const filtered = useMemo(
    () =>
      COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  function handleSelect(countryCode: string) {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    if (!country) return;
    const currency = CURRENCIES.find((c) => c.code === country.defaultCurrency);
    if (!currency) return;
    setLocale(country, currency);
    onOpenChange(false);
  }

  return (
    <AccordionContent>
      <Input
        placeholder="Search country"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      <div className="mt-2 max-h-64 space-y-1 overflow-y-auto">
        {filtered.map((country) => (
          <button
            key={country.code}
            onClick={() => handleSelect(country.code)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
          >
            <span>
              {country.flag} {country.name}
            </span>
            <span className="text-muted-foreground">
              {country.defaultCurrency}
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-3 py-6 text-center text-sm text-muted-foreground">
            No matches. Try another search.
          </p>
        )}
      </div>
    </AccordionContent>
  );
}
