import { Currency } from "@/types/locale";

export const CURRENCIES: Currency[] = [
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
];

export const DEFAULT_CURRENCY = CURRENCIES[0];