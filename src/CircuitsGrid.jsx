import React from "react";
import "./CircuitsGrid.css";
import { useNavigate } from "react-router-dom";

export default function CircuitsGrid({ circuits }) {
  // Helper: build cities summary (unique ordered names) and cut to 3
  const buildCitiesSummary = (circuit) => {
    const daysArr = circuit.daysData || circuit.days || [];
    const names = daysArr
      .map((d) => (d.city ? d.city : d.cities?.name || d.city_name || ""))
      .filter(Boolean);

    const uniq = [...new Set(names)];
    const firstThree = uniq.slice(0, 3);

    if (uniq.length > 3) return `${firstThree.join(", ")} y más`;
    return firstThree.join(", ");
  };
  const navigate = useNavigate();
  const fmt = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    if (isNaN(date)) return d;
    return date.toLocaleDateString();
  };

  return (
    <section className="circuits-section">
      <div className="circuits-section-inner">
        <div className="circuits-grid">
          {circuits?.length === 0 && (
            <p className="no-results">No hay circuitos para mostrar.</p>
          )}

          {circuits?.map((circuit) => {
            const imageUrl =
              circuit.mainImage ||
              circuit.images?.[0]?.image_url ||
              "https://placehold.co/1200x800?text=Sin+imagen";

            return (
              <article key={circuit.id} className="circuit-card">
                <div className="circuit-img-wrap">
                  <img
                    src={imageUrl}
                    className="circuit-img"
                    alt={circuit.name || "Circuito"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/1200x800?text=Imagen+no+disponible";
                    }}
                  />
                </div>

                <div className="circuit-info">
                  <h3 className="circuit-title">
                    {circuit.name || circuit.title}
                  </h3>

                  <div className="circuit-meta">
                    <div className="meta-left">
                      <div className="meta-price">
                        Desde $
                        {circuit.base_price ??
                          circuit.price ??
                          circuit.basePrice}
                      </div>
                      <div className="meta-days">
                        {circuit.days ?? circuit.totalDays} días
                      </div>
                    </div>

                    <div className="meta-right">
                      <button
                        className="btn-cta"
                        onClick={() => navigate(`/circuit/${circuit.id}`)}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
