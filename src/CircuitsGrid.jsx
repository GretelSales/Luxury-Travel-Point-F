import React from "react";
import "./CircuitsGrid.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function CircuitsGrid({
  circuits,
  isLoading,
  hasActiveFilters,
}) {
  const { t } = useTranslation();

  const buildCitiesSummary = (circuit) => {
    const daysArr = circuit.daysData || circuit.days || [];
    const names = daysArr
      .map((d) => d.city || d.cities?.name || d.city_name || "")
      .filter(Boolean);
    const uniq = [...new Set(names)];
    const firstThree = uniq.slice(0, 3);
    return uniq.length > 3
      ? t("circuits.andMore", { cities: firstThree.join(", ") })
      : firstThree.join(", ");
  };

  return (
    <section className="circuits-section">
      <div className="circuits-section-inner">
        <div className="circuits-grid">
          {isLoading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>{t("circuits.loading")}</p>
            </div>
          )}

          {!isLoading && circuits?.length === 0 && hasActiveFilters && (
            <div className="no-results">
              <p className="no-results-text">{t("circuits.noResults")}</p>
              <p className="no-results-help">{t("circuits.noResultsHelp")}</p>
              <div className="no-results-actions">
                <a
                  href={`mailto:info@tudominio.com?subject=${encodeURIComponent(
                    t("circuits.contactEmailSubject")
                  )}&body=${encodeURIComponent(t("circuits.contactMessage"))}`}
                  className="no-results-link"
                >
                  {t("circuits.contactEmail")}
                </a>
                <a
                  href={`https://wa.me/1234567890?text=${encodeURIComponent(
                    t("circuits.contactMessage")
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-results-link"
                >
                  {t("circuits.contactWhatsapp")}
                </a>
              </div>
            </div>
          )}

          {!isLoading && circuits?.length === 0 && !hasActiveFilters && (
            <p className="no-circuits">{t("circuits.noCircuitsAvailable")}</p>
          )}

          {!isLoading &&
            circuits?.map((circuit) => {
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
                      alt={circuit.name || t("circuits.defaultAlt")}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/1200x800?text=Imagen+no+disponible";
                      }}
                    />
                  </div>

                  <div className="circuit-info">
                    <h3 className="circuits-title">
                      {circuit.name || circuit.title}
                    </h3>
                    <p className="circuit-cities">
                      {buildCitiesSummary(circuit)}
                    </p>
                    <div className="circuit-meta">
                      <div className="meta-left">
                        <div className="meta-price">
                          {t("circuits.from")} $
                          {circuit.base_price ??
                            circuit.price ??
                            circuit.basePrice}
                        </div>
                        <div className="meta-days">
                          {circuit.days ?? circuit.totalDays}{" "}
                          {t("circuits.days")}
                        </div>
                      </div>
                      <div className="meta-right">
                        <button
                          className="btn-cta"
                          onClick={() => navigate(`/circuit/${circuit.id}`)}
                        >
                          {t("circuits.viewDetails")}
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
