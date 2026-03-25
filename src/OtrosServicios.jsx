import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "./TopBar.jsx";
import "./OtrosServicios.css";
import InterestModal from "./InterestModal";

export default function OtrosServicios() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [promoBanner, setPromoBanner] = useState(null);
  const [loadingBanner, setLoadingBanner] = useState(true);

  const [interestOpen, setInterestOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [open, setOpen] = useState(null);
  const [remittancesData, setRemittancesData] = useState(null);
  const [loadingRemittances, setLoadingRemittances] = useState(true);
  const [otherBlocks, setOtherBlocks] = useState([]);

  const toggle = (idx) => {
    setOpen(open === idx ? null : idx);
  };

  // 🔹 abrir modal interés
  const handleInterestClick = (block) => {
    console.log("CLICK");
    console.log("Servicio seleccionado:", block);

    setSelectedService({
      name: block.title,
      type: block.type || "service",
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

  // efecto visual existente
  useEffect(() => {
    document.body.classList.add("dark-hero");
    return () => document.body.classList.remove("dark-hero");
  }, []);

  // 🔹 Filtrar bloques i18n sin remesas
  useEffect(() => {
    const allBlocks = t("services.blocks", { returnObjects: true }) || [];
    const filtered = allBlocks.filter((b) => b.type !== "remittances");
    setOtherBlocks(filtered);
    console.log("ALL BLOCKS:", allBlocks);
    console.log("FILTERED BLOCKS:", filtered);
  }, [i18n.language, t]);

  // 🔹 Fetch backend para remesas
  useEffect(() => {
    const fetchRemittances = async () => {
      try {
        setLoadingRemittances(true);

        const lang = i18n.language.startsWith("es") ? "es" : "en";
        const API_URL = import.meta.env.VITE_API_URL;

        const res = await axios.get(
          `${API_URL}/api/services-content?type=remittances&lang=${lang}`,
        );

        setRemittancesData(res.data);
      } catch (error) {
        console.error("Error loading remittances content", error);
      } finally {
        setLoadingRemittances(false);
      }
    };

    fetchRemittances();
  }, [i18n.language]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoadingBanner(true);

        const lang = i18n.language.startsWith("es") ? "es" : "en";
        const API_URL = import.meta.env.VITE_API_URL;

        const res = await axios.get(`${API_URL}/api/promo-banner?lang=${lang}`);

        setPromoBanner(res.data);
      } catch (error) {
        console.error("Error loading promo banner", error);
      } finally {
        setLoadingBanner(false);
      }
    };

    fetchBanner();
  }, [i18n.language]);

  // 🔹 Combinar bloques
  const renderedBlocks = remittancesData
    ? [...otherBlocks, { ...remittancesData, type: "remittances" }]
    : [...otherBlocks];
  console.log("RENDERED BLOCKS:", renderedBlocks);
  return (
    <>
      <TopBar darkMode={true} />

      <section className="services-page">
        <header className="services-header">
          <h1>{t("services.title")}</h1>
          <p className="services-subtitle">{t("services.subtitle")}</p>
        </header>
        {!loadingBanner && promoBanner && (
          <div className="promo-banner-container">
            <img
              src={promoBanner.image_url}
              alt={promoBanner.title || "promo"}
              className="promo-banner-image"
            />
          </div>
        )}
        <div className="services-grid">
          {renderedBlocks.map((block, idx) => {
            const isRemittances = block.type === "remittances";

            if (isRemittances && loadingRemittances) return null;

            return (
              <div
                key={idx}
                className={`service-card ${open === idx ? "open" : ""}`}
              >
                <div
                  className="service-card-header"
                  onClick={() => toggle(idx)}
                >
                  <h2>{block.title}</h2>

                  {block.badge && (
                    <span className="service-badge">{block.badge}</span>
                  )}
                </div>

                {block.summary && (
                  <p className="service-summary">{block.summary}</p>
                )}

                {open === idx && block.details && (
                  <div className="service-details">
                    <ul>
                      {block.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    {/* botón existente */}
                    {block.type === "car-rental" && (
                      <button
                        className="service-primary-action"
                        onClick={() => navigate("/cars")}
                      >
                        {t("services.viewCars")}
                      </button>
                    )}

                    {/* 🔹 NUEVO BOTÓN ME INTERESA */}
                    <button
                      className="service-interest-button"
                      onClick={() => handleInterestClick(block)}
                    >
                      {t("services.interestButton")}
                    </button>
                  </div>
                )}

                {block.details && (
                  <button
                    className="service-toggle"
                    onClick={() => toggle(idx)}
                  >
                    {open === idx ? t("services.less") : t("services.more")}
                  </button>
                )}

                {/* 🔹 botón visible también cuando está cerrado */}
                {open !== idx && (
                  <button
                    className="service-interest-button collapsed"
                    onClick={() => handleInterestClick(block)}
                  >
                    {t("services.interestButton")}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 🔹 MODAL INTERÉS */}
      <InterestModal
        visible={interestOpen}
        onClose={handleCloseInterest}
        serviceType={selectedService?.type}
        serviceName={selectedService?.name}
      />
    </>
  );
}
