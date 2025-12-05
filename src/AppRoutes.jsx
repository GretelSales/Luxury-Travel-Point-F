import { Routes, Route } from "react-router-dom";
import App from "./App";
import Contact from "./Contact";
import AuthModal from "./AuthModal";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/authModal" element={<AuthModal />} />
    </Routes>
  );
}
