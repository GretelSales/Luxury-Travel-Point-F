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

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [promoBanner, setPromoBanner] = useState(null);
  const [loadingBanner, setLoadingBanner] = useState(true);

  const [interestOpen, setInterestOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [open, setOpen] = useState(null);

  const toggle = (idx) => {
    setOpen(open === idx ? null : idx);
  };

  const handleInterestClick = (block) => {
    setSelectedService({
      name: block.title,
      type: "service",
    });

    setInterestOpen(true);
  };

  const handleCloseInterest = () => {
    setInterestOpen(false);
    setSelectedService(null);
  };

  // idioma inicial
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

  // 🔹 FETCH SERVICIOS DESDE BACKEND
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);

        const lang = i18n.language.startsWith("es") ? "es" : "en";

        const res = await axios.get(
          `https://luxury-travel-point-backend.onrender.com/api/services-content?lang=${lang}`,
        );

        setServices(res.data);
      } catch (error) {
        console.error("Error loading services", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [i18n.language]);

  // 🔹 FETCH BANNER
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoadingBanner(true);

        const lang = i18n.language.startsWith("es") ? "es" : "en";

        const res = await axios.get(
          `https://luxury-travel-point-backend.onrender.com/api/banner?lang=${lang}`,
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

        {/* BANNER */}
        {!loadingBanner && promoBanner && (
          <div className="promo-banner-container">
            <img
              src={promoBanner.image_url}
              alt={promoBanner.title || "promo"}
              className="promo-banner-image"
            />
          </div>
        )}

        {/* SERVICIOS */}
        <div className="services-grid">
          {!loadingServices &&
            services.map((block, idx) => (
              <div
                key={block.id}
                className={`service-card ${open === idx ? "open" : ""}`}
              >
                {/* HEADER */}
                <div
                  className="service-card-header"
                  onClick={() => toggle(idx)}
                >
                  <h2>{block.title}</h2>

                  {/* 🔥 BADGE SOLO SI EXISTE */}
                  {block.badge && block.badge.trim() !== "" && (
                    <span className="service-badge">{block.badge}</span>
                  )}
                </div>

                {/* SUMMARY */}
                {block.summary && (
                  <p className="service-summary">{block.summary}</p>
                )}

                {/* DETAILS */}
                {open === idx && block.details && (
                  <div className="service-details">
                    <ul>
                      {block.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    <button
                      className="service-interest-button"
                      onClick={() => handleInterestClick(block)}
                    >
                      {t("services.interestButton")}
                    </button>
                  </div>
                )}

                {/* TOGGLE */}
                {block.details && (
                  <button
                    className="service-toggle"
                    onClick={() => toggle(idx)}
                  >
                    {open === idx ? t("services.less") : t("services.more")}
                  </button>
                )}

                {/* BOTÓN COLAPSADO */}
                {open !== idx && (
                  <button
                    className="service-interest-button collapsed"
                    onClick={() => handleInterestClick(block)}
                  >
                    {t("services.interestButton")}
                  </button>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* MODAL */}
      <InterestModal
        visible={interestOpen}
        onClose={handleCloseInterest}
        serviceType={selectedService?.type}
        serviceName={selectedService?.name}
      />
    </>
  );
}
