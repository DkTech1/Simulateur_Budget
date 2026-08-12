
// src/utils/pdfGenerator.js

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Génère le PDF du devis
 *
 * @param {Object} simulation
 * @param {Array} simulation.selectedServices
 * @param {number} simulation.months
 * @param {number} simulation.channels
 * @param {string} simulation.currency
 * @param {Object} simulation.budget
 */
export const generateQuotePDF = ({
  selectedServices,
  months,
  channels,
  currency,
  budget,
}) => {
  const doc = new jsPDF();

  // FORMATAGE DES MONTANTS

  const formatAmount = (amount) => {
    const formattedAmount = Number(amount).toLocaleString("fr-FR");

    if (currency === "FCFA") {
      return `${formattedAmount} FCFA`;
    }

    if (currency === "USD") {
      return `${formattedAmount} $`;
    }

    return `${formattedAmount} €`;
  };

  // TITRE

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("S-Budget", 20, 20);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Devis — Campagne marketing", 20, 30);

  // INFORMATIONS CAMPAGNE

  doc.setFontSize(11);

  doc.text(
    `Durée d'engagement : ${months} mois`,
    20,
    45
  );

  doc.text(
    `Nombre de canaux : ${channels}`,
    20,
    52
  );

  doc.text(
    `Devise : ${currency}`,
    20,
    59
  );

  
  // SERVICES

  const serviceRows = selectedServices.map((service) => [
    service.name,
    `${formatAmount(service.prices[currency])} / mois`,
  ]);

  autoTable(doc, {
    startY: 70,
    head: [["Service", "Prix mensuel"]],
    body: serviceRows,
    theme: "grid",
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fontStyle: "bold",
    },
  });

  // BUDGET TOTAL

  const finalY = doc.lastAutoTable.finalY + 15;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Budget total estimé",
    20,
    finalY
  );

  doc.setFontSize(14);

  doc.text(
    formatAmount(budget.totalBudget),
    20,
    finalY + 10
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Sur ${months} mois`,
    20,
    finalY + 18
  );

  // PIED DE PAGE

  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(9);

  doc.text(
    "Document généré avec S-Budget",
    20,
    pageHeight - 10
  );

  // TÉLÉCHARGEMENT

  doc.save("devis-s-budget.pdf");
};