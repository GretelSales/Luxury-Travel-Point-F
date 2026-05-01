import React, { useEffect, useState } from "react";
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
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://luxury-travel-point-b-oiyb.onrender.com/api/company",
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error loading company info", err);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  const isES = i18n.language.startsWith("es");

  return (
    <div className="contact-container">
      <div className="contact-inner">
        {/* Info */}
        <div className="contact-info">
          <h2 className="contact-title">{t("contact.title")}</h2>

          {/* PHONE */}
          <div className="contact-card">
            <h3 className="contact-subtitle">
              <FontAwesomeIcon icon={faPhone} /> {t("contact.phoneTitle")}
            </h3>
            <p className="contact-text">{data.phone}</p>
          </div>

          {/* EMAIL */}
          <div className="contact-card">
            <h3 className="contact-subtitle">
              <FontAwesomeIcon icon={faEnvelope} /> {t("contact.emailTitle")}
            </h3>
            <p className="contact-text">{data.email}</p>
          </div>

          {/* ADDRESS */}
          <div className="contact-card">
            <h3 className="contact-subtitle">
              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              {t("contact.addressTitle")}
            </h3>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                isES ? data.address_es : data.address_en,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-address-link"
            >
              {isES ? data.address_es : data.address_en}
            </a>
          </div>

          {/* HOURS */}
          <div className="contact-card">
            <h3 className="contact-subtitle">
              <FontAwesomeIcon icon={faClock} /> {t("contact.hoursTitle")}
            </h3>

            <p className="contact-text">
              {isES ? data.hours_regular_es : data.hours_regular_en}
            </p>

            <p className="contact-text">
              {isES ? data.hours_appointment_es : data.hours_appointment_en}
            </p>
          </div>
        </div>

        {/* MAP */}
        <div className="contact-map">
          <iframe src={data.map_embed_url} loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
}
