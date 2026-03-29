import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faGlobe,
  faBars,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Contact from "./Contact.jsx";
import AuthModal from "./AuthModal";
import "./TopBar.css";
import { useTranslation } from "react-i18next";

export default function TopBar({ user, logout, handleAuthSuccess }) {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const topbarRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const closeAllMenus = () => {
    setLangOpen(false);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleIconClick = () => {
    closeAllMenus();
    setDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (topbarRef.current && !topbarRef.current.contains(e.target)) {
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

  useEffect(() => {
    setDarkMode(true);
  }, []);

  return (
    <header className="ltp-topbar">
      <div className="ltp-left">
        <div className="ltp-logo">
          <img
            className="ltp-logo-mark"
            src="/images/iconoAvionDorado.png"
            alt="Airplane Logo"
          />
          <span className="ltp-brand">{t("brand")}</span>
        </div>

        <Link to="/">
          <div className="ltp-home-icon">
            <FontAwesomeIcon icon={faHouse} />
          </div>
        </Link>
      </div>

      <nav className="ltp-right" ref={topbarRef}>
        <Link className="ltp-link" to="/contact" onClick={closeAllMenus}>
          {t("nav.contact")}
        </Link>
        <Link to="/other-services" className="ltp-link">
          {t("nav.services")}
        </Link>

        {/* Language selector */}
        <div className="ltp-icon" title={t("lang.title")}>
          <FontAwesomeIcon
            icon={faGlobe}
            onClick={() => setLangOpen((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
          {langOpen && (
            <div className="user-dropdown language-menu">
              <button
                onClick={() => {
                  changeLanguage("es");
                  setLangOpen(false);
                }}
                className={i18n.language === "es" ? "active" : ""}
              >
                {t("lang.es")}
              </button>
              <button
                onClick={() => {
                  changeLanguage("en");
                  setLangOpen(false);
                }}
                className={i18n.language === "en" ? "active" : ""}
              >
                {t("lang.en")}
              </button>
            </div>
          )}
        </div>

        {/* User auth */}
        <div className="user-icon" onClick={handleIconClick}>
          <div className="ltp-user">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>

        {dropdownOpen && (
          <div className={`user-dropdown ${darkMode ? "dark-dropdown" : ""}`}>
            <div className="user-dropdown-header">
              {user ? user.full_name || user.email : t("auth.guest")}
            </div>
            {!user && (
              <div
                className="user-dropdown-item"
                onClick={() => {
                  setAuthOpen(true);
                  setDropdownOpen(false);
                }}
              >
                {t("auth.loginTitle")}
              </div>
            )}
            {user && (
              <div className="user-dropdown-item" onClick={logout}>
                {t("auth.logout")}
              </div>
            )}
          </div>
        )}

        {/* Social icons desktop */}
        <a
          href="https://wa.me/12392657294"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon whatsapp"
          title="WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/chare/1EjE5oAU7L/?mibextid=wwXlfr"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://www.instagram.com/luxurytravelpoint?igsh=NDZybGU1cXk1b2Fj"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.tiktok.com/@luxurytravelpoint?_r=1&_t=ZT-93wrlEwlAkP"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="TikTok"
          >
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>

        {/* Mobile menu */}
        <div
          className="mobile-menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
          {mobileMenuOpen && (
            <div className="mobile-dropdown">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                {t("nav.contact")}
              </Link>
              <Link
                to="/other-services"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.services")}
              </Link>
            </div>
          )}
        </div>

        <AuthModal
          visible={authOpen}
          onClose={() => setAuthOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </nav>
    </header>
  );
}
