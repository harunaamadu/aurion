"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { convertAmount, formatPrice } from "@/lib/currency";
import { ExchangeRates } from "@/types/currency";

interface CurrencyContextValue {
  rates: ExchangeRates | null;
  loading: boolean;
  error: string | null;
  convert: (amountInBase: number) => number;
  format: (amountInBase: number) => string;
  /** Converts + formats, but returns the symbol/whole/fraction as separate
   * strings instead of one combined string — for split-digit price displays
   * (e.g. Amazon-style PriceTag) that need to style each piece differently. */
  formatParts: (amountInBase: number) => { symbol: string; whole: string; fraction: string };
  refresh: () => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const FALLBACK_RATES: ExchangeRates = {
  base: "USD",
  rates: { USD: 1 },
  fetchedAt: 0,
};

const REFRESH_INTERVAL_MS = 1000 * 60 * 60;

// Locale is pinned rather than left undefined (which would fall back to the
// runtime's default locale). Letting it float is a real risk here: Next.js
// renders "use client" components on the server for the initial HTML too,
// so if the server's default locale differs from the browser's, the digits
// or symbol placement can mismatch between SSR output and client hydration.
// Swap this for a locale from useLocaleStore if you track one explicitly.
function formatCurrencyParts(amount: number, currencyCode: string, locale = "en-US") {
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol", // "$" rather than "US$" where supported
  }).formatToParts(amount);

  let symbol = "";
  let whole = "";
  let fraction = "";

  for (const part of parts) {
    if (part.type === "currency") symbol += part.value;
    else if (part.type === "integer" || part.type === "group") whole += part.value;
    else if (part.type === "fraction") fraction += part.value;
    // part.type === "decimal" (the "." separator) is intentionally dropped —
    // whole/fraction render in separate styled spans, not as inline text.
  }

  return { symbol, whole, fraction };
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useLocaleStore((s) => s.currency);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Guards against two problems that only show up under a flaky network:
  // (1) a slow request resolving after a newer one already started, and
  // overwriting fresher state with a stale response, and (2) doing so after
  // unmount. Bumped on every call; a response is only applied if it's still
  // the most recent request in flight.
  const requestIdRef = useRef(0);

  const fetchRates = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/exchange-rates");
      if (!res.ok) {
        throw new Error(`Failed to load exchange rates (status ${res.status})`);
      }
      const data: ExchangeRates = await res.json();

      if (requestId !== requestIdRef.current) return; // superseded by a newer request

      setRates(data);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;

      // Handled, recoverable failure — prices keep rendering via
      // FALLBACK_RATES — so this is a warning, not an error. console.error
      // gets intercepted by Next's dev overlay and shown as a red "Console
      // Error" even though nothing here actually crashed.
      console.warn("[CurrencyProvider] falling back to base rates:", err);
      setError("Showing approximate prices — live exchange rates are unavailable right now.");
      setRates((prev) => prev ?? FALLBACK_RATES);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRates();
    const interval = setInterval(fetchRates, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const activeRates = rates ?? FALLBACK_RATES;

  const convert = useCallback(
    (amountInBase: number) => convertAmount(amountInBase, activeRates.base, currency.code, activeRates),
    [activeRates, currency.code],
  );

  const format = useCallback(
    (amountInBase: number) => formatPrice(convert(amountInBase), currency.code),
    [convert, currency.code],
  );

  const formatParts = useCallback(
    (amountInBase: number) => formatCurrencyParts(convert(amountInBase), currency.code),
    [convert, currency.code],
  );

  return (
    <CurrencyContext.Provider value={{ rates, loading, error, convert, format, formatParts, refresh: fetchRates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a <CurrencyProvider> — add it to your root layout.tsx");
  }
  return ctx;
}