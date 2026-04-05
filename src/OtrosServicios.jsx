import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "./TopBar.jsx";
import "./OtrosServicios.css";
import InterestModal from "./InterestModal";

export default function OtrosServicios({ user, logout, handleAuthSuccess }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [promoBanner, setPromoBanner] = useState(null);
  const [loadingBanner, setLoadingBanner] = useState(true);

  const [interestOpen, setInterestOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [open, setOpen] = useState(null);

  // 🔥 TODOS LOS SERVICIOS desde backend
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const toggle = (idx) => {
    setOpen(open === idx ? null : idx);
  };

  // 🔹 abrir modal interés
  const handleInterestClick = (service) => {
    setSelectedService({
      name: service.title,
      type: service.type || "service",
    });

    setInterestOpen(true);
  };

  const handleCloseInterest = () => {
    setInterestOpen(false);
    setSelectedService(null);
  };

  // idioma inicial (solo una vez)
  useEffect(() => {
    const alreadyInitialized = localStorage.getItem(
      "otherServicesLangInitialized",
    );
    if (!alreadyInitialized) {
      i18n.changeLanguage("es");
      localStorage.setItem("otherServicesLangInitialized", "true");
    }
  }, [i18n]);

  // efecto visual
  useEffect(() => {
    document.body.classList.add("dark-hero");
    return () => document.body.classList.remove("dark-hero");
  }, []);

  // 🔥 FETCH TODOS LOS SERVICIOS
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);

        const lang = i18n.language.startsWith("es") ? "es" : "en";

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/services-content/all?lang=${lang}`,
        );

        setServices(res.data || []);
      } catch (error) {
        console.error("Error loading services", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [i18n.language]);

  // 🔹 Banner
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoadingBanner(true);

        const lang = i18n.language.startsWith("es") ? "es" : "en";

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/banner?lang=${lang}`,
        );

        setPromoBanner(res.data);
      } catch (error) {
        console.error("Error loading promo banner", error);
      } finally {
        setLoadingBanner(false);
      }
    };

    fetchBanner();
  }, [i18n.language]);

  return (
    <>
      <TopBar
        user={user}
        logout={logout}
        handleAuthSuccess={handleAuthSuccess}
      />

      <section className="services-page">
        <header className="services-header">
          <h1>{t("services.title")}</h1>
          <p className="services-subtitle">{t("services.subtitle")}</p>
        </header>

        {/* 🔹 Banner */}
        {!loadingBanner && promoBanner && (
          <div className="promo-banner-container">
            <img
              src={promoBanner.image_url}
              alt={promoBanner.title || "promo"}
              className="promo-banner-image"
            />
          </div>
        )}

        {/* 🔹 SERVICES */}
        <div className="services-grid">
          {!loadingServices &&
            services.map((service, idx) => (
              <div
                key={service.id}
                className={`service-card ${open === idx ? "open" : ""}`}
              >
                {/* HEADER */}
                <div
                  className="service-card-header"
                  onClick={() => toggle(idx)}
                >
                  <h2>{service.title}</h2>

                  {/* 🔥 BADGE solo si existe */}
                  {service.badge && service.badge.trim() !== "" && (
                    <span className="service-badge">{service.badge}</span>
                  )}
                </div>

                {/* SUMMARY */}
                {service.summary && (
                  <p className="service-summary">{service.summary}</p>
                )}

                {/* DETAILS */}
                {open === idx && service.details && (
                  <div className="service-details">
                    <ul>
                      {service.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    {/* 🔹 acción especial */}
                    {service.type === "car-rental" && (
                      <button
                        className="service-primary-action"
                        onClick={() => navigate("/cars")}
                      >
                        {t("services.viewCars")}
                      </button>
                    )}

                    {/* 🔹 INTEREST */}
                    <button
                      className="service-interest-button"
                      onClick={() => handleInterestClick(service)}
                    >
                      {t("services.interestButton")}
                    </button>
                  </div>
                )}

                {/* TOGGLE */}
                {service.details && (
                  <button
                    className="service-toggle"
                    onClick={() => toggle(idx)}
                  >
                    {open === idx ? t("services.less") : t("services.more")}
                  </button>
                )}

                {/* 🔹 botón colapsado */}
                {open !== idx && (
                  <button
                    className="service-interest-button collapsed"
                    onClick={() => handleInterestClick(service)}
                  >
                    {t("services.interestButton")}
                  </button>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* 🔹 MODAL */}
      <InterestModal
        visible={interestOpen}
        onClose={handleCloseInterest}
        serviceType={selectedService?.type}
        serviceName={selectedService?.name}
      />
    </>
  );
}
