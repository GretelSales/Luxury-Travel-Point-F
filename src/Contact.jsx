import React from "react";
import "./Contact.css";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="contact-container">
      <div className="contact-inner">
        {/* Info section */}
        <div className="contact-info">
          <h2 className="contact-title">{t("contact.title")}</h2>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <i className="fas fa-phone"></i> {t("contact.phoneTitle")}
            </h3>
            <p className="contact-text">{t("contact.phone")}</p>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <i className="fas fa-envelope"></i> {t("contact.emailTitle")}
            </h3>
            <p className="contact-text">{t("contact.email")}</p>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <i className="fas fa-map-marker-alt"></i>{" "}
              {t("contact.addressTitle")}
            </h3>
            <p className="contact-text">{t("contact.address")}</p>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <i className="fas fa-clock"></i> {t("contact.hoursTitle")}
            </h3>
            <p className="contact-text">{t("contact.weekdays")}</p>
            <p className="contact-text">{t("contact.saturday")}</p>
          </div>
        </div>

        {/* Map section */}
        <div className="contact-map">
          <iframe
            title={t("contact.mapTitle")}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.6633943884453!2d-80.39768222464184!3d25.595473413379337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9c4d58b3a6b3b%3A0x6a16c59a441d86a3!2s12450%20SW%20190th%20St%2C%20Miami%2C%20FL%2033177%2C%20USA!5e0!3m2!1sen!2sus!4v1718653400000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
