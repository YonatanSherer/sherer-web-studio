/**
 * Centralized pricing configuration.
 * Edit prices here — one place only.
 */

export const PRICES = {
  landing:    { USD: 450,    ILS: 1500,  THB: 15000, EUR: 400  },
  business:   { USD: 1050,   ILS: 3500,  THB: 35000, EUR: 950  },
  multilingual:{ USD: 1650,  ILS: 5500,  THB: 55000, EUR: 1500 },
};

export const LANG_CURRENCY = {
  en: "USD",
  he: "ILS",
  th: "THB",
  ar: "ILS",
  es: "EUR",
  fr: "EUR",
  de: "EUR",
  ru: "EUR",
};

const LOCALE_MAP = {
  USD: "en-US",
  ILS: "he-IL",
  THB: "th-TH",
  EUR: "de-DE",
};

export function formatPrice(amount, currency) {
  const locale = LOCALE_MAP[currency] || "en-US";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount}`;
  }
}

export function usePricing(lang) {
  const currency = LANG_CURRENCY[lang] || "USD";
  const format = (amount) => formatPrice(amount, currency);
  return {
    currency,
    landingPrice: format(PRICES.landing[currency]),
    businessPrice: format(PRICES.business[currency]),
    multilingualPrice: format(PRICES.multilingual[currency]),
    budgetOptions: getBudgetOptions(lang, currency),
  };
}

function getBudgetOptions(lang, currency) {
  // Localized budget ranges shown in contact form
  if (currency === "ILS") {
    return [
      lang === "he" ? "מתחת ל-₪2,000" : lang === "ar" ? "أقل من ₪2,000" : "Under ₪2,000",
      "₪2,000 – ₪5,000",
      "₪5,000 – ₪10,000",
      "₪10,000+",
      lang === "he" ? "עדיין לא בטוח" : lang === "ar" ? "غير متأكد بعد" : "Not sure yet",
    ];
  }
  if (currency === "THB") {
    return ["ต่ำกว่า ฿15,000", "฿15,000 – ฿35,000", "฿35,000 – ฿60,000", "฿60,000+", "ยังไม่แน่ใจ"];
  }
  if (currency === "EUR") {
    const ns = { es: "Menos de €500", fr: "Moins de €500", de: "Unter €500", ru: "Менее €500" }[lang] || "Under €500";
    const nk = { es: "No estoy seguro aún", fr: "Pas encore sûr", de: "Noch nicht sicher", ru: "Ещё не знаю" }[lang] || "Not sure yet";
    return [ns, "€400 – €950", "€950 – €1,500", "€1,500+", nk];
  }
  // USD
  return ["Under $500", "$500 – $1,100", "$1,100 – $1,700", "$1,700+", "Not sure yet"];
}