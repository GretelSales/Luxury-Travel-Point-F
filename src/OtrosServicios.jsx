import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar.jsx";
import "./OtrosServicios.css";
export default function OtrosServicios() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  const blocks = t("services.blocks", { returnObjects: true }) || [];

  const toggle = (idx) => {
    setOpen(open === idx ? null : idx);
  };

  useEffect(() => {
    document.body.classList.add("dark-hero");
    return () => document.body.classList.remove("dark-hero");
  }, []);

  return (
    <>
      <TopBar darkMode={true} />{" "}
      {/* 👈 necesario para que se vea bien la barra */}
      <section className="services-page">
        <header className="services-header">
          <h1>{t("services.title")}</h1>
          <p className="services-subtitle">{t("services.subtitle")}</p>
        </header>

        <div className="services-grid">
          {Array.isArray(blocks) &&
            blocks.map((block, idx) => (
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
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
