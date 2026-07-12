import { ExchangeRates } from "@/types/currency";

/**
 * Converts an amount from one currency to another using rates expressed
 * relative to a common base (see ExchangeRates.base).
 * Falls back to returning the original amount if a rate is missing, rather
 * than throwing — a missing rate shouldn't break price rendering.
 */
export function convertAmount(
  amount: number,
  from: string,
  to: string,
  rates: ExchangeRates,
): number {
  if (from === to) return amount;

  const fromRate = rates.rates[from];
  const toRate = rates.rates[to];

  if (!fromRate || !toRate) {
    console.warn(
      `[currency] missing rate for ${from} or ${to}, returning unconverted amount`,
    );
    return amount;
  }

  const amountInBase = amount / fromRate;
  return amountInBase * toRate;
}

export function calcDiscountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Formats a numeric amount as a localized currency string via Intl.NumberFormat.
 * Falls back to a plain "CODE 12.34" string if the currency code isn't
 * recognized (e.g. an unsupported ISO 4217 code).
 */
export function formatPrice(
  amount: number,
  currencyCode: string,
  locale = "en",
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
}
