import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Country, Currency } from "@/types/locale";
import { DEFAULT_COUNTRY } from "@/data/countries";
import { DEFAULT_CURRENCY } from "@/data/currencies";

interface LocaleState {
  country: Country;
  currency: Currency;
  /** True once the user has explicitly picked a locale — auto-detect must never override this. */
  isManualOverride: boolean;
  setLocale: (country: Country, currency: Currency) => void;
  /** Called by useGeoLocation on first load — ignored if the user already chose manually. */
  setAutoDetected: (country: Country, currency: Currency) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      country: DEFAULT_COUNTRY,
      currency: DEFAULT_CURRENCY,
      isManualOverride: false,
      setLocale: (country, currency) => set({ country, currency, isManualOverride: true }),
      setAutoDetected: (country, currency) => {
        if (!get().isManualOverride) set({ country, currency });
      },
    }),
    { name: "hermes_locale" },
  ),
);