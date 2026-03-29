import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Contact from "./Contact";
import AuthModal from "./AuthModal";
import Layout from "./Layout";
import OtrosServicios from "./OtrosServicios";
import CircuitDetail from "./CircuitDetail";
import Cars from "./cars";

export default function AppRoutes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("ltp_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("ltp_user");
    localStorage.removeItem("ltp_token");
    setUser(null);
  };

  const handleAuthSuccess = (u, token) => {
    localStorage.setItem("ltp_user", JSON.stringify(u));
    localStorage.setItem("ltp_token", token);
    setUser(u);
  };

  return (
    <Layout user={user} logout={logout} handleAuthSuccess={handleAuthSuccess}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/authModal" element={<AuthModal />} />
        <Route path="/circuit/:id" element={<CircuitDetail />} />
        <Route path="/cars" element={<Cars />} />
        <Route
          path="/other-services"
          element={
            <OtrosServicios
              user={user}
              logout={logout}
              handleAuthSuccess={handleAuthSuccess}
            />
          }
        />
      </Routes>
    </Layout>
  );
}
