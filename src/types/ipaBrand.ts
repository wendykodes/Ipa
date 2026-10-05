// Configuration, Brand constants & Currency Exchange Engine for IPA Interiors International Ltd
export const BRAND_IDENTITY = {
  name: "IPA Interiors International Ltd",
  shortName: "IPA Interiors",
  motto: "For a touch of class",
  headquarters: {
    kampala: "Plot 14 Lumumba Avenue, Nakasero, Kampala, Uganda",
    london: "14 Eaton Place, Belgravia, London SW1X, UK",
    dubai: "Gate Village 04, DIFC, Dubai, UAE"
  },
  established: 2018,
  founder: "Lead Architectural & Interior Practice",
  contact: {
    email: "concierge@ipainteriors.com",
    phoneUganda: "+256 700 890 123",
    phoneLondon: "+44 20 7946 0912",
    phoneDubai: "+971 4 312 9000",
    instagram: "@ipainteriors_international_ltd",
    instagramUrl: "https://www.instagram.com/ipainteriors_international_ltd/"
  }
};

export type CurrencyCode = 'UGX' | 'GBP' | 'USD' | 'EUR' | 'AED';

export const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; rateToUgx: number; formatDecimals: number; name: string }> = {
  UGX: { symbol: "UGX ", rateToUgx: 1, formatDecimals: 0, name: "Ugandan Shilling (Base)" },
  GBP: { symbol: "£", rateToUgx: 4850, formatDecimals: 0, name: "British Pound Sterling" },
  USD: { symbol: "$", rateToUgx: 3750, formatDecimals: 0, name: "US Dollar" },
  EUR: { symbol: "€", rateToUgx: 4100, formatDecimals: 0, name: "Euro" },
  AED: { symbol: "AED ", rateToUgx: 1020, formatDecimals: 0, name: "UAE Dirham" }
};

export function formatMoney(amountInUgx: number, targetCurrency: CurrencyCode): string {
  const config = CURRENCY_CONFIG[targetCurrency];
  const converted = amountInUgx / config.rateToUgx;
  
  if (targetCurrency === 'UGX') {
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${config.symbol}${Math.round(converted).toLocaleString()}`;
}
