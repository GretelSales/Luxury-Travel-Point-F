import React, { useState, useEffect } from "react"; // ✅ agregamos useEffect
import "./InterestModal.css";
import { useTranslation } from "react-i18next";
import { sendServiceInterest } from "./apiServiceInterest";
import { toast } from "react-toastify";

export default function InterestModal({
  visible,
  onClose,
  serviceType,
  serviceName,
  circuitName,
}) {
  const { t, i18n } = useTranslation();

  const user = JSON.parse(localStorage.getItem("ltp_user"));

  const [name, setName] = useState(""); // inicializamos vacío
  const [email, setEmail] = useState(""); // inicializamos vacío
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 autocompletar nombre y email si hay usuario
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
        service_type: serviceType,
        service_name: serviceName,
        circuit_name: circuitName || null,
        message,
        language: i18n.language,
        user_name: name,
        user_email: email,
        user_id: user?.id || null, // ✅ enviamos el id del usuario
      });

      toast.success(t("interest.success"));
      setMessage("");
    } catch (e) {
      toast.error(t("interest.error"));
    } finally {
      setLoading(false);
      onClose(); // cerramos siempre al finalizar
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
            {/* mostrar campos deshabilitados para usuarios autenticados */}
            <input value={name} disabled />
            <input value={email} disabled />
          </>
        )}

        <textarea
          placeholder={t("interest.message")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="ltp-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? t("interest.sending") : t("interest.send")}
        </button>
      </div>
    </div>
  );
}
