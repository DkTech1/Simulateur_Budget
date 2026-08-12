const ChannelInput = ({ channels, onChannelsChange, error }) => {
  const handleChange = (event) => {
    const value = event.target.value;

    // Autoriser temporairement le champ vide
    if (value === "") {
      onChannelsChange("");
      return;
    }

    const numericValue = Number(value);

    onChannelsChange(numericValue);
  };

  return (
    <section className="channel-input">
      <div className="section-header">
        <h2>Nombre de canaux gérés</h2>
        <p>
          Indiquez le nombre de plateformes ou de canaux à gérer.
        </p>
      </div>

      <div className="channel-field">
        <label htmlFor="channels">
          Nombre de canaux
        </label>

        <input
          id="channels"
          type="number"
          min="1"
          step="1"
          value={channels}
          onChange={handleChange}
          placeholder="Ex. 3"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "channels-error" : undefined}
        />

        {error && (
          <p id="channels-error" className="input-error">
            {error}
          </p>
        )}

        <p className="input-hint">
          Le premier canal est inclus. Chaque canal supplémentaire
          entraîne un coût additionnel.
        </p>
      </div>
    </section>
  );
};

export default ChannelInput;