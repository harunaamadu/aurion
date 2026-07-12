export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  flag: string; // emoji flag, simplest cross-platform option with no extra asset
  defaultCurrency: string; // ISO 4217 code, references Currency.code
}

export interface Currency {
  code: string; // ISO 4217
  symbol: string;
  name: string;
}