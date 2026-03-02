import React, { useState, useEffect } from "react";
import "./InterestModal.css";
import { useTranslation } from "react-i18next";
import { sendServiceInterest } from "./apiServiceInterest";
import { toast } from "react-toastify";

export default function InterestModal({ visible, onClose, service, language }) {
  const { t } = useTranslation();

  // 🔹 Obtener usuario autenticado desde localStorage
  const user = JSON.parse(localStorage.getItem("ltp_user"));

  // 🔹 Estados para los campos
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Autocompletar campos si hay usuario
  useEffect(() => {
    if (user) {
      setName(user.full_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (!visible) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await sendServiceInterest({
        service_type: service?.type || "service",
        service_name: service?.name || "",
        circuit_id: service?.circuitId || null, // incluir circuito si aplica
        message,
        language,
        user_name: name,
        user_email: email,
        user_id: user?.id || null, // 🔹 enviamos el userId si existe
      });

      toast.success(t("interest.success"));
      setMessage("");
      onClose();
    } catch (e) {
      toast.error(t("interest.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interest-overlay" onClick={onClose}>
      <div className="interest-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{t("interest.title")}</h2>
        <p className="interest-subtitle">{t("interest.subtitle")}</p>

        {!user && (
          <>
            <input
              placeholder={t("interest.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder={t("interest.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        {user && (
          <>
            {/* Mostrar los campos pero deshabilitados para el usuario autenticado */}
            <input value={name} disabled />
            <input value={email} disabled />
          </>
        )}

        <textarea
          placeholder={t("interest.message")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="ltp-btn"
          onClick={handleSubmit}
          disabled={loading || !name || !email}
        >
          {loading ? t("interest.sending") : t("interest.send")}
        </button>
      </div>
    </div>
  );
}
