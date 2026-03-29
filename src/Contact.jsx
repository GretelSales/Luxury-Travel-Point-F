import React from "react";
import "./Contact.css";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

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
              <FontAwesomeIcon icon={faPhone} /> {t("contact.phoneTitle")}
            </h3>
            <p className="contact-text">{t("contact.phone")}</p>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <FontAwesomeIcon icon={faEnvelope} /> {t("contact.emailTitle")}
            </h3>
            <p className="contact-text">{t("contact.email")}</p>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              {t("contact.addressTitle")}
            </h3>

            <a
              href="https://maps.app.goo.gl/k6HnPFpBgfqXh1NKA"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-address-link"
            >
              {t("contact.address")}
            </a>
          </div>

          <div className="contact-card">
            <h3 className="contact-subtitle">
              <FontAwesomeIcon icon={faClock} /> {t("contact.hoursTitle")}
            </h3>

            <p className="contact-text">{t("contact.hoursRegular")}</p>

            <p className="contact-text">{t("contact.hoursAppointment")}</p>
          </div>
        </div>

        {/* Map section */}
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.5678422915344!2d-81.6919037239048!3d26.662315870805145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db71007fe3ff89%3A0x2d95c1a567dc5f65!2sLuxury%20Travel%20Point!5e0!3m2!1ses-419!2sus!4v1774802927874!5m2!1ses-419!2sus"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
