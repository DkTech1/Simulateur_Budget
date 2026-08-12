// src/components/QuoteSummary.jsx

import { useState } from "react";
import { generateQuotePDF } from "../utils/pdfGenerator";

const QuoteSummary = ({
  selectedServices,
  months,
  channels,
  currency,
  budget,
}) => {
  const [copied, setCopied] = useState(false);

  // Aucun service sélectionné
  if (!selectedServices || selectedServices.length === 0) {
    return (
      <section className="quote-summary">
        <div className="section-header">
          <h2>Récapitulatif du devis</h2>
          <p>
            Sélectionnez au moins un service pour générer
            votre devis.
          </p>
        </div>
      </section>
    );
  }

  const formatAmount = (amount) => {
    if (currency === "FCFA") {
      return `${amount.toLocaleString("fr-FR")} FCFA`;
    }

    if (currency === "USD") {
      return `${amount.toLocaleString("fr-FR")} $`;
    }

    return `${amount.toLocaleString("fr-FR")} €`;
  };

  // Copier le devis
  const handleCopyQuote = async () => {
    if (!budget) {
      return;
    }

    const servicesText = selectedServices
      .map(
        (service) =>
          `- ${service.name} : ${formatAmount(
            service.prices[currency]
          )} / mois`
      )
      .join("\n");

    const quoteText = `
DEVIS — CAMPAGNE MARKETING

SERVICES SÉLECTIONNÉS
${servicesText}

PARAMÈTRES DE LA CAMPAGNE
Durée d'engagement : ${months} mois
Nombre de canaux : ${channels}
Devise : ${currency}

BUDGET TOTAL ESTIMÉ
${formatAmount(budget.totalBudget)}

Sur ${months} mois
`.trim();

    try {
      await navigator.clipboard.writeText(quoteText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Impossible de copier le devis :",
        error
      );
    }
  };

  // Exporter le devis en PDF
  const handleExportPDF = () => {
    if (!budget) {
      return;
    }

    generateQuotePDF({
      selectedServices,
      months,
      channels,
      currency,
      budget,
    });
  };

  return (
    <section className="quote-summary">

      <div className="quote-header">
        <div>
          <h2>Récapitulatif du devis</h2>
          <p>Estimation de votre campagne marketing</p>
        </div>

        <span className="quote-status">
          Estimation
        </span>
      </div>

      <div className="quote-content">

        {/* Services sélectionnés */}
        <div className="quote-section">
          <h3>Services sélectionnés</h3>

          <ul className="quote-services">
            {selectedServices.map((service) => (
              <li key={service.id}>
                <span>{service.name}</span>

                <span>
                  {formatAmount(service.prices[currency])}
                  <small> / mois</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Paramètres de la campagne */}
        <div className="quote-section">
          <h3>Paramètres de la campagne</h3>

          <div className="quote-info">

            <div className="quote-info-row">
              <span>Durée d'engagement</span>

              <strong>
                {months} mois
              </strong>
            </div>

            <div className="quote-info-row">
              <span>Nombre de canaux</span>

              <strong>
                {channels}
              </strong>
            </div>

            <div className="quote-info-row">
              <span>Devise</span>

              <strong>
                {currency}
              </strong>
            </div>

          </div>
        </div>

        {/* Montant final */}
        {budget && (
          <>
            <div className="quote-total">

              <div>
                <span>Budget total estimé</span>

                <small>
                  Sur {months} mois
                </small>
              </div>

              <strong>
                {formatAmount(budget.totalBudget)}
              </strong>

            </div>

            {/* Boutons d'action */}
            <div className="quote-actions">

              {/* Copier le devis */}
              <button
                type="button"
                className="copy-quote-button"
                onClick={handleCopyQuote}
              >
                {copied
                  ? "✓ Devis copié"
                  : "📋 Copier le devis"}
              </button>

              {/* Exporter en PDF */}
              <button
                type="button"
                className="pdf-quote-button"
                onClick={handleExportPDF}
              >
                📄 Exporter en PDF
              </button>

            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default QuoteSummary;