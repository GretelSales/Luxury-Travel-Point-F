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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17969.286881697044!2d-81.70346808662316!3d26.662620964067877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db71e2f63703e7%3A0x50504ab2ff72dc9!2s3418%2051st%20St%20W%2C%20Lehigh%20Acres%2C%20FL%2033971!5e0!3m2!1ses-419!2sus!4v1765844730944!5m2!1ses-419!2sus"></iframe>
        </div>
      </div>
    </div>
  );
}
