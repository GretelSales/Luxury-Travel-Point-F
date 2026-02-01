import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "./TopBar.jsx";
import "./OtrosServicios.css";

export default function OtrosServicios() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const [remittancesData, setRemittancesData] = useState(null);
  const [loadingRemittances, setLoadingRemittances] = useState(true);

  const blocks = t("services.blocks", { returnObjects: true }) || [];

  const toggle = (idx) => {
    setOpen(open === idx ? null : idx);
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

  // 🔥 Fetch SOLO para remesas
  useEffect(() => {
    const fetchRemittances = async () => {
      try {
        const lang = i18n.language.startsWith("es") ? "es" : "en";
        const res = await axios.get(
          `/api/services-content?type=remittances&lang=${lang}`,
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

  return (
    <>
      <TopBar darkMode={true} />

      <section className="services-page">
        <header className="services-header">
          <h1>{t("services.title")}</h1>
          <p className="services-subtitle">{t("services.subtitle")}</p>
        </header>

        <div className="services-grid">
          {blocks.map((block, idx) => {
            const isRemittances = block.type === "remittances";

            // 🧠 si es remesas, usamos backend
            const data =
              isRemittances && remittancesData ? remittancesData : block;

            // spinner silencioso
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
                  <h2>{data.title}</h2>
                  {data.badge && (
                    <span className="service-badge">{data.badge}</span>
                  )}
                </div>

                {data.summary && (
                  <p className="service-summary">{data.summary}</p>
                )}

                {open === idx && data.details && (
                  <div className="service-details">
                    <ul>
                      {data.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    {/* 👇 BOTÓN ESPECIAL SOLO PARA RENTA DE AUTOS */}
                    {block.type === "car-rental" && (
                      <button
                        className="service-primary-action"
                        onClick={() => navigate("/cars")}
                      >
                        {t("services.viewCars")}
                      </button>
                    )}
                  </div>
                )}

                {data.details && (
                  <button
                    className="service-toggle"
                    onClick={() => toggle(idx)}
                  >
                    {open === idx ? t("services.less") : t("services.more")}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
