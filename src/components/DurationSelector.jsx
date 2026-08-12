// src/components/DurationSelector.jsx

import { durations } from "../data/pricing";

const DurationSelector = ({ months, onMonthsChange }) => {
  return (
    <section className="duration-selector">
      <div className="section-header">
        <h2>Durée d'engagement</h2>
        <p>
          Choisissez la durée de la campagne. Une réduction est appliquée
          automatiquement selon la durée sélectionnée.
        </p>
      </div>

      <div className="duration-list">
        {durations.map((duration) => (
          <label
            key={duration.months}
            className={`duration-option ${
              Number(months) === duration.months ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="duration"
              value={duration.months}
              checked={Number(months) === duration.months}
              onChange={() => onMonthsChange(duration.months)}
            />

            <span className="duration-radio"></span>

            <span className="duration-info">
              <span className="duration-label">
                {duration.label}
              </span>

              <span className="duration-discount">
                Réduction : {duration.discount * 100} %
              </span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default DurationSelector;