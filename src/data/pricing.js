// src/data/pricing.js

// Tarifs des services par devise
export const services = [
  {
    id: "ads",
    name: "Publicité en ligne (Ads)",
    prices: {
      EUR: 800,
      FCFA: 525000,
      USD: 872,
    },
  },
  {
    id: "seo",
    name: "Référencement naturel (SEO)",
    prices: {
      EUR: 600,
      FCFA: 393000,
      USD: 654,
    },
  },
  {
    id: "social",
    name: "Gestion des réseaux sociaux",
    prices: {
      EUR: 450,
      FCFA: 295000,
      USD: 491,
    },
  },
  {
    id: "content",
    name: "Création de contenu",
    prices: {
      EUR: 500,
      FCFA: 328000,
      USD: 545,
    },
  },
];

// Durées d'engagement et réductions associées
export const durations = [
  {
    months: 1,
    label: "1 mois",
    discount: 0,
  },
  {
    months: 3,
    label: "3 mois",
    discount: 0.05,
  },
  {
    months: 6,
    label: "6 mois",
    discount: 0.1,
  },
  {
    months: 12,
    label: "12 mois",
    discount: 0.15,
  },
];

// Coût d'un canal supplémentaire par mois
export const additionalChannelPrice = {
  EUR: 150,
  FCFA: 98400,
  USD: 164,
};

// Devises disponibles
export const currencies = [
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
  {
    code: "FCFA",
    name: "Franc CFA",
    symbol: "FCFA",
  },
  {
    code: "USD",
    name: "Dollar américain",
    symbol: "$",
  },
];