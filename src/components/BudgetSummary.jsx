// src/components/BudgetSummary.jsx

const BudgetSummary = ({ budget }) => {
  // Aucun calcul disponible pour le moment
  if (!budget) {
    return (
      <section className="budget-summary">
        <div className="section-header">
          <h2>Estimation du budget</h2>
          <p>
            Sélectionnez vos services et vos paramètres pour
            obtenir une estimation.
          </p>
        </div>

        <div className="budget-empty">
          <p>
            Votre estimation apparaîtra ici.
          </p>
        </div>
      </section>
    );
  }

  const {
    subtotal,
    channelCost,
    additionalChannels,
    monthlyTotal,
    discount,
    discountAmount,
    monthlyTotalAfterDiscount,
    totalBudget,
    currency,
  } = budget;

  /**
   * Formatage des montants selon la devise.
   */
  const formatAmount = (amount) => {
    if (currency === "FCFA") {
      return `${amount.toLocaleString("fr-FR")} FCFA`;
    }

    if (currency === "USD") {
      return `${amount.toLocaleString("fr-FR")} $`;
    }

    return `${amount.toLocaleString("fr-FR")} €`;
  };

  return (
    <section className="budget-summary">
      <div className="section-header">
        <h2>Estimation du budget</h2>
        <p>
          Voici le détail de votre estimation mensuelle et
          globale.
        </p>
      </div>

      <div className="budget-details">

        {/* Sous-total des services */}
        <div className="budget-row">
          <span>Sous-total des services</span>
          <strong>{formatAmount(subtotal)}</strong>
        </div>

        {/* Coût des canaux supplémentaires */}
        <div className="budget-row">
          <div>
            <span>Canaux supplémentaires</span>

            {additionalChannels > 0 && (
              <small>
                {additionalChannels} canal
                {additionalChannels > 1 ? "x" : ""} supplémentaire
                {additionalChannels > 1 ? "s" : ""}
              </small>
            )}
          </div>

          <strong>{formatAmount(channelCost)}</strong>
        </div>

        {/* Total mensuel avant réduction */}
        <div className="budget-row budget-row-total">
          <span>Total mensuel</span>
          <strong>{formatAmount(monthlyTotal)}</strong>
        </div>

        {/* Réduction */}
        {discount > 0 && (
          <div className="budget-row budget-row-discount">
            <span>
              Réduction ({discount * 100} %)
            </span>

            <strong>
              - {formatAmount(discountAmount)}
            </strong>
          </div>
        )}

        {/* Total mensuel après réduction */}
        <div className="budget-row">
          <span>
            Total mensuel après réduction
          </span>

          <strong>
            {formatAmount(monthlyTotalAfterDiscount)}
          </strong>
        </div>

        {/* Budget total */}
        <div className="budget-total">
          <div>
            <span>Budget total</span>
            <small>
              Pour toute la durée de l'engagement
            </small>
          </div>

          <strong>{formatAmount(totalBudget)}</strong>
        </div>

      </div>
    </section>
  );
};

export default BudgetSummary;