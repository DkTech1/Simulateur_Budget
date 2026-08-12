// src/App.jsx

import { useEffect, useMemo, useState } from "react";

import ServiceSelector from "./components/ServiceSelector";
import DurationSelector from "./components/DurationSelector";
import ChannelInput from "./components/ChannelInput";
import CurrencySelector from "./components/CurrencySelector";
import BudgetSummary from "./components/BudgetSummary";
import QuoteSummary from "./components/QuoteSummary";
import SimulationHistory from "./components/SimulationHistory";

import { calculateBudget } from "./utils/budgetCalculator";

const STORAGE_KEY = "budgetSimulatorState";
const HISTORY_KEY = "budgetSimulatorHistory";

function App() {
  // Services sélectionnés
  const [selectedServices, setSelectedServices] = useState(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);

      if (!savedState) {
        return [];
      }

      const parsedState = JSON.parse(savedState);

      return Array.isArray(parsedState.selectedServices)
        ? parsedState.selectedServices
        : [];
    } catch (error) {
      console.error(
        "Impossible de restaurer les services sauvegardés :",
        error
      );

      return [];
    }
  });

  // Durée
  const [months, setMonths] = useState(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);

      if (!savedState) {
        return 1;
      }

      const parsedState = JSON.parse(savedState);
      const savedMonths = Number(parsedState.months);

      return Number.isInteger(savedMonths) && savedMonths >= 1
        ? savedMonths
        : 1;
    } catch (error) {
      return 1;
    }
  });

  // Nombre de canaux
  const [channels, setChannels] = useState(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);

      if (!savedState) {
        return 1;
      }

      const parsedState = JSON.parse(savedState);
      const savedChannels = Number(parsedState.channels);

      return Number.isInteger(savedChannels) && savedChannels >= 1
        ? savedChannels
        : 1;
    } catch (error) {
      return 1;
    }
  });

  // Devise
  const [currency, setCurrency] = useState(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);

      if (!savedState) {
        return "EUR";
      }

      const parsedState = JSON.parse(savedState);

      return typeof parsedState.currency === "string"
        ? parsedState.currency
        : "EUR";
    } catch (error) {
      return "EUR";
    }
  });

  // Erreur liée au nombre de canaux
  const [channelError, setChannelError] = useState("");

  // Historique
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);

      if (!savedHistory) {
        return [];
      }

      const parsedHistory = JSON.parse(savedHistory);

      return Array.isArray(parsedHistory)
        ? parsedHistory
        : [];
    } catch (error) {
      console.error(
        "Impossible de restaurer l'historique des simulations :",
        error
      );

      return [];
    }
  });

  // Sauvegarde de la simulation actuelle
  useEffect(() => {
    const stateToSave = {
      selectedServices,
      months,
      channels,
      currency,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(stateToSave)
    );
  }, [selectedServices, months, channels, currency]);

  // Sauvegarde de l'historique
  useEffect(() => {
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history)
    );
  }, [history]);

  // Validation des paramètres
  const isValidChannels =
    channels !== "" &&
    Number.isInteger(Number(channels)) &&
    Number(channels) >= 1;

  const hasSelectedServices = selectedServices.length > 0;

  // Calcul du budget
  const budget = useMemo(() => {
    if (!hasSelectedServices || !isValidChannels) {
      return null;
    }

    return calculateBudget({
      selectedServices,
      months,
      channels: Number(channels),
      currency,
    });
  }, [
    selectedServices,
    months,
    channels,
    currency,
    hasSelectedServices,
    isValidChannels,
  ]);

  // Gestion du changement du nombre de canaux
  const handleChannelsChange = (value) => {
    setChannels(value);

    if (value === "") {
      setChannelError(
        "Veuillez indiquer le nombre de canaux."
      );
      return;
    }

    const numericValue = Number(value);

    if (!Number.isInteger(numericValue)) {
      setChannelError(
        "Le nombre de canaux doit être un nombre entier."
      );
      return;
    }

    if (numericValue <= 0) {
      setChannelError(
        "Le nombre de canaux doit être supérieur ou égal à 1."
      );
      return;
    }

    setChannelError("");
  };

  // Enregistrer une simulation
  const handleSaveSimulation = () => {
    if (
      !budget ||
      !hasSelectedServices ||
      !isValidChannels
    ) {
      return;
    }

    const simulation = {
      id: Date.now(),
      createdAt: new Date().toISOString(),

      selectedServices: [...selectedServices],

      serviceNames: budget.selectedServiceDetails.map(
        (service) => service.name
      ),

      months,
      channels: Number(channels),
      currency,

      totalBudget: budget.totalBudget,
    };

    setHistory((previousHistory) => [
      simulation,
      ...previousHistory,
    ]);
  };

  // Supprimer une simulation
  const handleDeleteSimulation = (simulationId) => {
    setHistory((previousHistory) =>
      previousHistory.filter(
        (simulation) => simulation.id !== simulationId
      )
    );
  };

  // Restaurer une ancienne simulation
  const handleRestoreSimulation = (simulation) => {
    setSelectedServices(
      Array.isArray(simulation.selectedServices)
        ? simulation.selectedServices
        : []
    );

    setMonths(Number(simulation.months) || 1);

    setChannels(Number(simulation.channels) || 1);

    setCurrency(simulation.currency || "EUR");

    setChannelError("");
  };

  return (
    <div className="app">

      {/* En-tête */}
      <header className="app-header">
        <div className="container">

          <p className="app-eyebrow">
            OUTIL INTERNE
          </p>

          <h1>
            Simulateur de budget campagne
          </h1>

          <p className="app-description">
            Estimez rapidement le budget d'une campagne
            marketing selon les services, la durée et le
            nombre de canaux sélectionnés.
          </p>

        </div>
      </header>

      {/* Contenu principal */}
      <main className="container app-content">

        <div className="simulator-grid">

          {/* Colonne de configuration */}
          <div className="configuration-panel">

            <ServiceSelector
              selectedServices={selectedServices}
              onServicesChange={setSelectedServices}
            />

            <DurationSelector
              months={months}
              onMonthsChange={setMonths}
            />

            <ChannelInput
              channels={channels}
              onChannelsChange={handleChannelsChange}
              error={channelError}
            />

            <CurrencySelector
              currency={currency}
              onCurrencyChange={setCurrency}
            />

          </div>

          {/* Colonne des résultats */}
          <div className="results-panel">

            <BudgetSummary
              budget={budget}
            />

            <QuoteSummary
              selectedServices={
                budget?.selectedServiceDetails || []
              }
              months={months}
              channels={channels}
              currency={currency}
              budget={budget}
            />

            {budget && (
              <div className="simulation-save">
                <button
                  type="button"
                  className="save-simulation-button"
                  onClick={handleSaveSimulation}
                >
                  Enregistrer la simulation
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Historique */}
        <SimulationHistory
          history={history}
          onDelete={handleDeleteSimulation}
          onRestore={handleRestoreSimulation}
        />

      </main>

      {/* Pied de page */}
      <footer className="app-footer">
        <div className="container">
          <p>
            Simulateur de budget campagne — Données
            tarifaires fictives à usage de test.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;