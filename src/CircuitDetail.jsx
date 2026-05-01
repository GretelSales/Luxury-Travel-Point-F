import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InterestModal from "./InterestModal";
import "./CircuitDetail.css";

const API_URL = "https://luxury-travel-point-b-oiyb.onrender.com/api/circuits";

export default function CircuitDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);

  // 🔹 interest modal
  const [interestOpen, setInterestOpen] = useState(false);

  useEffect(() => {
    const fetchCircuit = async () => {
      try {
        const lang = t("langCode") || "es";

        const res = await fetch(`${API_URL}/${id}/fullById?lang=${lang}`);

        if (!res.ok) throw new Error(t("circuit.errorLoad"));

        const data = await res.json();

        setCircuit(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCircuit();
  }, [id, t]);

  const handleInterestClick = () => {
    setInterestOpen(true);
  };

  const handleCloseInterest = () => {
    setInterestOpen(false);
  };

  if (loading) return <div className="loading">{t("common.loading")}</div>;

  if (error) return <div className="error">{error}</div>;

  if (!circuit) return null;

  const images = circuit.daysData?.flatMap((d) => d.images || []) || [];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <>
      <main className="circuit-page">
        {/* HERO */}

        <section className="circuit-hero">
          <div className="hero-overlay" />

          <div className="hero-content">
            <h1 className="circuit-title">{circuit.name}</h1>

            <div className="hero-price">
              {t("circuitos.from")} <strong>${circuit.base_price}</strong>
            </div>

            <div className="hero-meta">
              <span>
                {circuit.days} {t("circuitos.days")}
              </span>

              <span>
                {t("circuitos.start")}: {circuit.starting_point}
              </span>
            </div>
          </div>
        </section>

        {/* GALLERY */}

        <section className="gallery-frame">
          {images.length > 0 && (
            <>
              <button className="nav left" onClick={prevImage}>
                ‹
              </button>

              <img
                src={images[currentImage]}
                alt={`${t("common.image")} ${currentImage + 1}`}
                className="gallery-image"
              />

              <button className="nav right" onClick={nextImage}>
                ›
              </button>
            </>
          )}
        </section>

        {/* ITINERARY */}

        <section className="content-section">
          <div className="floating-frame">
            <h2>{t("circuitos.itinerary")}</h2>

            <ul className="itinerary">
              {circuit.daysData.map((day, i) => (
                <li key={i}>
                  <strong>
                    {t("circuitos.day")} {day.day} · {day.city}, {day.country}
                  </strong>

                  <p>{day.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* INCLUDES */}

        <section className="content-section">
          <div className="floating-frame">
            <h2>{t("circuitos.includes")}</h2>

            <ul className="includes">
              {circuit.includes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 🔹 FLOATING INTEREST BUTTON */}

        <button
          className="floating-interest-button"
          onClick={handleInterestClick}
        >
          {t("services.interestButton")}
        </button>
      </main>

      {/* 🔹 MODAL */}

      <InterestModal
        visible={interestOpen}
        onClose={handleCloseInterest}
        serviceType="circuit"
        serviceName={circuit.name}
        circuitName={circuit.name}
      />
    </>
  );
}
