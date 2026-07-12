export interface ExchangeRates {
  /** Currency code all rates are expressed relative to, e.g. "USD". */
  base: string;
  /** Map of currency code -> rate relative to `base`. Includes the base itself at 1. */
  rates: Record<string, number>;
  /** Epoch ms when these rates were fetched — useful for staleness checks/debugging. */
  fetchedAt: number;
}