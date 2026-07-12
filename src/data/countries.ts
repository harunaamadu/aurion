import { Country } from "@/types/locale";

// Starter set — extend with the full ISO 3166 list, or generate from
// `Intl.supportedValuesOf("region")` paired with a country-name lookup.
export const COUNTRIES: Country[] = [
  { code: "GH", name: "Ghana", flag: "🇬🇭", defaultCurrency: "GHS" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", defaultCurrency: "NGN" },
  { code: "US", name: "United States", flag: "🇺🇸", defaultCurrency: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", defaultCurrency: "GBP" },
  { code: "FR", name: "France", flag: "🇫🇷", defaultCurrency: "EUR" },
  { code: "DE", name: "Germany", flag: "🇩🇪", defaultCurrency: "EUR" },
  { code: "CA", name: "Canada", flag: "🇨🇦", defaultCurrency: "CAD" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];