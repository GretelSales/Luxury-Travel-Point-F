// components/AuthModal.jsx
import React, { useState } from "react";
import axios from "axios";
import "./AuthModal.css";
import { useTranslation } from "react-i18next";

export default function AuthModal({
  visible,
  onClose,
  onAuthSuccess,
  initialMode = "login",
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  if (!visible) return null;

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "https://luxury-travel-point-frontend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, user } = res.data;
      localStorage.setItem("ltp_token", token);
      onAuthSuccess(user, token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Error en login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "https://luxury-travel-point-frontend.onrender.com/api/auth/register",
        {
          full_name: fullName,
          email,
          phone,
          password,
        }
      );
      const { token, user } = res.data;
      localStorage.setItem("ltp_token", token);
      onAuthSuccess(user, token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Error en registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {mode === "login" ? (
          <>
            <h2>{t("auth.loginTitle")}</h2>
            {error && <div className="auth-error">{error}</div>}
            <input
              placeholder={t("auth.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder={t("auth.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="ltp-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? t("auth.login") + "..." : t("auth.login")}
            </button>
            <div className="auth-footer">
              <button onClick={() => setMode("register")}>
                {t("auth.createAccount")}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>{t("auth.registerTitle")}</h2>
            {error && <div className="auth-error">{error}</div>}
            <input
              placeholder={t("auth.name")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              placeholder={t("auth.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder={t("auth.phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              placeholder={t("auth.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="ltp-btn"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading
                ? t("auth.createAccount") + "..."
                : t("auth.createAccount")}
            </button>
            <div className="auth-footer">
              <button onClick={() => setMode("login")}>
                {t("auth.haveAccount")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
