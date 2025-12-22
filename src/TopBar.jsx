// src/components/Topbar.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobe,
  faEllipsisV,
  faBars,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
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

  const closeAllMenus = () => {
    setLangOpen(false);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };
  const handleIconClick = () => {
    closeAllMenus();
    setDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <header className="ltp-topbar">
      <div className="ltp-left">
        <div className="ltp-logo">
          <span className="ltp-logo-mark">✦</span>
          <span className="ltp-brand">{t("brand")}</span>
        </div>

        <Link to="/">
          <div className="ltp-home-icon">
            <FontAwesomeIcon icon={faHouse} />
          </div>
        </Link>
      </div>
      <nav className="ltp-right">
        <Link
          className="ltp-link"
          to="/contact"
          onClick={() => {
            closeAllMenus();
          }}
        >
          {t("nav.contact")}
        </Link>
        <Link to="/other-services" className="ltp-link">
          {t("nav.services")}
        </Link>

        <div className="ltp-icon" title={t("lang.title")}>
          <FontAwesomeIcon
            icon={faGlobe}
            onClick={() => {
              closeAllMenus();
              setLangOpen((prev) => !prev);
            }}
            style={{ cursor: "pointer" }}
          />
          {langOpen && (
            <div className="user-dropdown">
              <div className="user-dropdown-item">
                <button
                  onClick={() => {
                    changeLanguage("es");
                    setLangOpen(false);
                  }}
                  className={i18n.language === "es" ? "active" : ""}
                >
                  {t("lang.es")}
                </button>
              </div>
              <div className="user-dropdown-item">
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
            </div>
          )}
        </div>

        <div className="user-icon" onClick={handleIconClick}>
          <div className="ltp-user" style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>

        {dropdownOpen && (
          <div className="user-dropdown">
            <div className="user-dropdown-header">
              {user ? user.full_name || user.email : t("auth.guest")}
            </div>
            {!user && (
              <div
                className="user-dropdown-item"
                onClick={() => {
                  closeAllMenus();
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
        <div
          className="mobile-menu"
          onClick={() => {
            closeAllMenus();
            setMobileMenuOpen((prev) => !prev);
          }}
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
