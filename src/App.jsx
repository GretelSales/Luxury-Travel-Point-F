import React, { useState, useMemo, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AuthModal from "./AuthModal";
import MonthYearPicker from "./MonthYearPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobe,
  faMagnifyingGlass,
  faCalendarCheck,
  faTags,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import CircuitsGrid from "./CircuitsGrid";
import { Link, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [fecha, setFecha] = useState({ month: "", year: "" });
  const [query, setQuery] = useState("");
  const [openList, setOpenList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [circuits, setCircuits] = useState([]);
  const [filteredCircuits, setFilteredCircuits] = useState([]);
  const [monthYear, setMonthYear] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const uiRef = useRef(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Nueva lista REAL desde backend
  const [backendCountries, setBackendCountries] = useState([]);

  const closeAllMenus = () => {
    setOpenList(false);
    setLangOpen(false);
    setDropdownOpen(false);
  };

  // 🟦 Obtener países del backend una sola vez
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://luxury-travel-point-frontend.onrender.com/api/cities/countries"
        );

        // Si existe traducción, úsala; sino, muestra tal cual
        const translated = res.data.map((c) => {
          const translatedKey = t(`countries.${c}`);
          return translatedKey !== `countries.${c}` ? translatedKey : c;
        });

        setBackendCountries(translated);
      } catch (err) {
        console.error("Error fetching backend countries:", err);
      }
    };

    fetchCountries();
  }, [t]); // <- Se vuelve a traducir si cambia idioma

  useEffect(() => {
    const token = localStorage.getItem("ltp_token");
    if (token) {
      // pedir endpoint /api/auth/me
      fetch("https://luxury-travel-point-frontend.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((j) => {
          if (j.user) setUser(j.user);
          else localStorage.removeItem("ltp_token");
        })
        .catch(() => localStorage.removeItem("ltp_token"));
    }
  }, []);

  const handleIconClick = () => {
    if (user) setDropdownOpen((s) => !s);
    else setAuthOpen(true);
  };

  const handleAuthSuccess = (userData, token) => {
    setUser(userData);
    setDropdownOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("ltp_token");
    setUser(null);
    setDropdownOpen(false);
  };

  const handleFilterByCountry = () => {
    if (!selectedCountry) {
      setFilteredCircuits(circuits);
      return;
    }
    const handleFilterByDate = () => {
      if (!selectedDate) {
        setFilteredCircuits(circuits);
        return;
      }

      const filtered = circuits.filter((c) =>
        c.schedules.some((s) => s.start_date === selectedDate)
      );

      setFilteredCircuits(filtered);
    };

    const filtered = circuits.filter((c) =>
      c.countries.includes(selectedCountry)
    );

    setFilteredCircuits(filtered);
  };

  const resetFilters = () => {
    setSelectedCountry("");
    setQuery("");
    setFecha({ month: "", year: "" });
    setOpenList(false);

    // volver a mostrar todos los circuitos
    setFilteredCircuits(circuits);
    setResetKey((k) => k + 1);
  };
  const hasActiveFilters = selectedCountry || fecha.month || fecha.year;

  const applyFilters = () => {
    let tmp = [...circuits];

    // =====================
    //  FILTRO POR PAÍS
    // =====================
    if (selectedCountry) {
      tmp = tmp.filter((c) => (c.countries || []).includes(selectedCountry));
    }

    // =====================
    //  FILTRO POR FECHA (mes y año)
    // =====================
    if (fecha.month && fecha.year) {
      tmp = tmp.filter((c) =>
        c.schedules?.some((s) => {
          if (!s.start_date) return false;

          const d = new Date(s.start_date);
          const m = String(d.getMonth() + 1).padStart(2, "0"); // "03"
          const y = d.getFullYear().toString(); // "2025"

          return m === fecha.month && y === fecha.year;
        })
      );
    }

    setFilteredCircuits(tmp);
  };

  // 🔎 Filtrado dinámico del backend
  const filtered = useMemo(() => {
    if (!query) return backendCountries;
    const q = query.toLowerCase();
    return backendCountries.filter((c) => c.toLowerCase().includes(q));
  }, [query, backendCountries]);

  const handleFilter = async () => {
    if (!selectedCountry) return;

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/circuits/by-country/${selectedCountry}`
      );
      const filteredCircuits = await res.json();

      setCircuits(filteredCircuits);
    } catch (error) {
      console.error("Error fetching circuits by country", error);
    }
  };

  // Cerrar lista al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (uiRef.current && !uiRef.current.contains(e.target)) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const onSelectCountry = (c) => {
    setSelectedCountry(c);
    setQuery(c);
    setOpenList(false);
  };

  useEffect(() => {
    const loadCircuits = async () => {
      try {
        setIsLoading(true); // 🔹 Inicio carga
        const res = await axios.get(
          "https://luxury-travel-point-frontend.onrender.com/api/circuits/full",
          { params: { langCode: i18n.language } }
        );
        setCircuits(res.data);
        setFilteredCircuits(res.data);
      } catch (error) {
        console.error("Error loading circuits:", error);
      } finally {
        setIsLoading(false); // 🔹 Fin carga
      }
    };

    loadCircuits();
  }, [i18n.language]);

  return (
    <div className="ltp-app">
      {/* Hero */}
      <main className="ltp-hero">
        <div className="ltp-hero-overlay">
          <h1 className="ltp-hero-title">{t("hero.title")}</h1>

          <p className="ltp-hero-sub">{t("hero.subtitle")}</p>

          <div className="ltp-search-panel" ref={uiRef}>
            <div className="ltp-search-left">
              <label className="ltp-label">
                {t("search.destination.label")}
              </label>

              <div className="ltp-autocomplete">
                <div className="ltp-input-with-icon">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="search-icon"
                  />
                  <input
                    type="text"
                    placeholder={t("search.destination.placeholder")}
                    value={query}
                    onFocus={() => setOpenList(true)}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedCountry("");
                      setOpenList(true);
                    }}
                    aria-label={t("search.destination.label")}
                  />
                </div>

                {openList && (
                  <div className="ltp-list">
                    {filtered.length > 0 ? (
                      filtered.map((c) => (
                        <div
                          key={c}
                          className="ltp-list-item"
                          onClick={() => onSelectCountry(c)}
                        >
                          {c}
                        </div>
                      ))
                    ) : (
                      <div className="ltp-no-results">
                        <p className="ltp-no-results-text">
                          {t("search.noresults", { query })}
                        </p>

                        <p className="ltp-no-results-help">
                          {t("search.noresultsHelp")}
                        </p>

                        <div className="ltp-no-results-actions">
                          <a
                            href={`mailto:sales@luxurytravelpoint.com?subject=${encodeURIComponent(
                              t("search.contactEmailSubject")
                            )}&body=${encodeURIComponent(
                              t("search.contactMessage", { query })
                            )}`}
                            className="ltp-contact-link"
                          >
                            {t("search.contactEmail")}
                          </a>

                          <a
                            href={`https://wa.me/2392657294?text=${encodeURIComponent(
                              t("search.contactMessage", { query })
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ltp-contact-link"
                          >
                            {t("search.contactWhatsapp")}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="ltp-search-right">
              <label className="ltp-label">{t("search.date.label")}</label>
              <MonthYearPicker
                key={resetKey}
                value={fecha}
                onChange={(value) => setFecha(value)}
              />

              <p className="fecha-seleccionada">
                {t("selected")}{" "}
                {fecha.month && fecha.year
                  ? `${t(`monthNames.${fecha.month}`)} ${fecha.year}`
                  : t("nothing")}
              </p>
              <small className="ltp-hint">{t("search.date.hint")}</small>
            </div>
          </div>

          <div className="ltp-cta">
            <button
              className="ltp-btn"
              onClick={() => {
                applyFilters(); // <-- lo que ya tenías
                document.getElementById("circuitos-section")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {t("cta.button")}
            </button>
            {hasActiveFilters && (
              <button className="ltp-clear-filters" onClick={resetFilters}>
                {t("filters.clear")}
              </button>
            )}
          </div>
        </div>
      </main>

      {/* CIRCUITOS */}
      <div
        className="ltp-circuits-section ltp-section ltp-section-narrow"
        id="circuitos-section"
      >
        <h2 className="section-title">{t("ourCircuitsTitle")}</h2>

        <div className="circuits-scroll-container">
          <CircuitsGrid
            circuits={filteredCircuits}
            isLoading={isLoading}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <div className="ltp-why-us">
          <h2 className="section-title">{t("whyChooseUsTitle")}</h2>

          <div className="why-us-cards">
            <div className="why-us-card">
              <FontAwesomeIcon icon={faCalendarCheck} className="why-icon" />
              <h3>{t("whyGuaranteedDepartures")}</h3>
              <p>{t("whyGuaranteedDeparturesDesc")}</p>
            </div>

            <div className="why-us-card">
              <FontAwesomeIcon icon={faTags} className="why-icon" />
              <h3>{t("whyBestPrices")}</h3>
              <p>{t("whyBestPricesDesc")}</p>
            </div>

            <div className="why-us-card">
              <FontAwesomeIcon icon={faGlobe} className="why-icon" />
              <h3>{t("whyYearAvailability")}</h3>
              <p>{t("whyYearAvailabilityDesc")}</p>
            </div>

            <div className="why-us-card">
              <FontAwesomeIcon icon={faShieldHalved} className="why-icon" />
              <h3>{t("whySafety")}</h3>
              <p>{t("whySafetyDesc")}</p>
            </div>
          </div>
        </div>

        {/* Opiniones */}
        <section className="ltp-testimonials ltp-section ltp-section-narrow">
          <h2 className="testimonials-title">{t("reviewsTitle")}</h2>

          <div className="testimonials-wrapper">
            <div className="testimonial-card">
              <p className="testimonial-text">{t("review1Text")}</p>
              <div className="testimonial-author">
                <span className="name">{t("review1Name")}</span>
                <span className="stars">★★★★★</span>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">{t("review2Text")}</p>
              <div className="testimonial-author">
                <span className="name">{t("review2Name")}</span>
                <span className="stars">★★★★★</span>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">{t("review3Text")}</p>
              <div className="testimonial-author">
                <span className="name">{t("review3Name")}</span>
                <span className="stars">★★★★★</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
