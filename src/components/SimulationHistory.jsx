// src/components/SimulationHistory.jsx

import React from "react";
import { services } from "../data/pricing";

const SimulationHistory = ({ history, onDelete, onRestore }) => {
  
  // État vide
  if (!history || history.length === 0) {
    return (
      <section className="simulation-history">
        <div className="section-header">
          <h2>Historique des simulations</h2>
          <p>Vos simulations enregistrées apparaîtront ici.</p>
        </div>

        <div className="history-empty">
          <div className="empty-icon" aria-hidden="true">
            <svg
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="empty-title">Aucune simulation enregistrée</p>
          <p className="empty-subtitle">
            Effectuez un calcul et cliquez sur "Enregistrer" pour conserver vos estimations.
          </p>
        </div>
      </section>
    );
  }

  // Liste des simulations
  return (
    <section className="simulation-history">
      <div className="section-header">
        <h2>Historique des simulations</h2>
        <p>Retrouvez et rechargez vos précédentes simulations de budget en un clic.</p>
      </div>

      <div className="history-list">
        {history.map((simulation) => {
          // Résolution des noms de services
          const simulationServices =
            simulation.serviceNames ||
            (Array.isArray(simulation.selectedServices)
              ? simulation.selectedServices.map((serviceId) => {
                  const service = services.find((item) => item.id === serviceId);
                  return service ? service.name : serviceId;
                })
              : []);

          return (
            <article key={simulation.id} className="history-item">
              {/* En-tête de la carte */}
              <div className="history-item-header">
                <div className="history-title-group">
                  <span className="history-badge">Simulation</span>
                  <h3>
                    {new Date(simulation.createdAt).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                </div>

                <div className="history-budget">
                  {Number(simulation.totalBudget || 0).toLocaleString("fr-FR")}{" "}
                  <span className="currency">
                    {simulation.currency === "EUR" ? "€" : simulation.currency}
                  </span>
                </div>
              </div>

              {/* Grille de détails */}
              <div className="history-details">
                {/* Services */}
                <div className="history-detail history-detail-full">
                  <span>Services sélectionnés</span>
                  <div className="services-tags">
                    {simulationServices.length > 0 ? (
                      simulationServices.map((srv, idx) => (
                        <span key={idx} className="service-tag">
                          {srv}
                        </span>
                      ))
                    ) : (
                      <p className="no-service">Aucun service sélectionné</p>
                    )}
                  </div>
                </div>

                {/* Durée */}
                <div className="history-detail">
                  <span>Durée</span>
                  <p>{simulation.months} mois</p>
                </div>

                {/* Canaux */}
                <div className="history-detail">
                  <span>Canaux</span>
                  <p>{simulation.channels}</p>
                </div>

                {/* Devise */}
                <div className="history-detail">
                  <span>Devise</span>
                  <p>{simulation.currency}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="history-actions">
                <button
                  type="button"
                  className="history-restore"
                  onClick={() => onRestore(simulation)}
                  title="Recharger cette simulation"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Recharger
                </button>

                <button
                  type="button"
                  className="history-delete"
                  onClick={() => onDelete(simulation.id)}
                  title="Supprimer de l'historique"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Supprimer
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SimulationHistory;