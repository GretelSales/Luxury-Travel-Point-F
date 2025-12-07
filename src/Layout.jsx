import Topbar from "./TopBar";
import "./app.css";

export default function Layout({ children, user, logout, handleAuthSuccess }) {
  return (
    <>
      <Topbar
        user={user}
        logout={logout}
        handleAuthSuccess={handleAuthSuccess}
      />
      <div>{children}</div>
    </>
  );
}
