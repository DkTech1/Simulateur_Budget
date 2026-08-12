// src/components/ServiceSelector.jsx

import { services } from "../data/pricing";

const ServiceSelector = ({ selectedServices, onServicesChange }) => {
  const handleServiceChange = (serviceId) => {
    const isSelected = selectedServices.includes(serviceId);

    if (isSelected) {
      // Retirer le service de la sélection
      onServicesChange(
        selectedServices.filter((id) => id !== serviceId)
      );
    } else {
      // Ajouter le service à la sélection
      onServicesChange([...selectedServices, serviceId]);
    }
  };

  return (
    <section className="service-selector">
      <div className="section-header">
        <h2>Services souhaités</h2>
        <p>Sélectionnez les services nécessaires pour votre campagne.</p>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <label
            key={service.id}
            className={`service-option ${
              selectedServices.includes(service.id) ? "selected" : ""
            }`}
          >
            <input
              type="checkbox"
              value={service.id}
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceChange(service.id)}
            />

            <span className="service-checkbox"></span>

            <span className="service-info">
              <span className="service-name">{service.name}</span>

              <span className="service-price">
                À partir de {service.prices.EUR.toLocaleString("fr-FR")} €
                / mois
              </span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default ServiceSelector;