// src/components/CurrencySelector.jsx

import { currencies } from "../data/pricing";

const CurrencySelector = ({ currency, onCurrencyChange }) => {
  return (
    <section className="currency-selector">
      <div className="section-header">
        <h2>Devise</h2>
        <p>
          Choisissez la devise dans laquelle vous souhaitez afficher
          votre estimation.
        </p>
      </div>

      <div className="currency-list">
        {currencies.map((item) => (
          <label
            key={item.code}
            className={`currency-option ${
              currency === item.code ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="currency"
              value={item.code}
              checked={currency === item.code}
              onChange={() => onCurrencyChange(item.code)}
            />

            <span className="currency-radio"></span>

            <span className="currency-info">
              <span className="currency-name">
                {item.name}
              </span>

              <span className="currency-code">
                {item.code} ({item.symbol})
              </span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default CurrencySelector;