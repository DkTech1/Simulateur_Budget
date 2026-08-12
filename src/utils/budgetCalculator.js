import {
  services,
  durations,
  additionalChannelPrice,
} from "../data/pricing";

/**
 * Calcule le budget d'une campagne marketing.
 *
 * @param {Object} params
 * @param {string[]} params.selectedServices - IDs des services sélectionnés
 * @param {number} params.months - Durée d'engagement en mois
 * @param {number} params.channels - Nombre de canaux gérés
 * @param {string} params.currency - Devise choisie (EUR, FCFA ou USD)
 *
 * @returns {Object} Détail complet du calcul
 */
export const calculateBudget = ({
  selectedServices = [],
  months = 1,
  channels = 1,
  currency = "EUR",
}) => {
  // Recherche de la durée sélectionnée
  const duration = durations.find(
    (item) => item.months === Number(months)
  );

  // Si la durée n'existe pas, on utilise 1 mois sans réduction
  const discount = duration ? duration.discount : 0;

  // Sélection des services réellement choisis
  const selectedServiceDetails = services.filter((service) =>
    selectedServices.includes(service.id)
  );

  // Sous-total des services
  const subtotal = selectedServiceDetails.reduce(
    (total, service) => {
      return total + (service.prices[currency] || 0);
    },
    0
  );

  // Nombre de canaux supplémentaires
  const additionalChannels =
    Number(channels) > 1 ? Number(channels) - 1 : 0;

  // Coût des canaux supplémentaires
  const channelCost =
    additionalChannels * (additionalChannelPrice[currency] || 0);

  // Total mensuel avant réduction
  const monthlyTotal = subtotal + channelCost;

  // Montant de la réduction
  const discountAmount = monthlyTotal * discount;

  // Total mensuel après réduction
  const monthlyTotalAfterDiscount =
    monthlyTotal - discountAmount;

  // Budget total sur toute la durée
  const totalBudget =
    monthlyTotalAfterDiscount * Number(months);

  return {
    selectedServiceDetails,
    additionalChannels,
    subtotal,
    channelCost,
    monthlyTotal,
    discount,
    discountAmount,
    monthlyTotalAfterDiscount,
    totalBudget,
    currency,
    months: Number(months),
    channels: Number(channels),
  };
};