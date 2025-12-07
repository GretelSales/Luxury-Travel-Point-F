import React, { useState } from "react"; // <--- IMPORTAR useState
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Contact from "./Contact";
import AuthModal from "./AuthModal";
import Layout from "./Layout";

export default function AppRoutes() {
  const [user, setUser] = useState(null);

  const logout = () => setUser(null);
  const handleAuthSuccess = (u) => setUser(u);

  return (
    <Layout user={user} logout={logout} handleAuthSuccess={handleAuthSuccess}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/authModal" element={<AuthModal />} />
      </Routes>
    </Layout>
  );
}
