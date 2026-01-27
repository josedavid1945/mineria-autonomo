import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "rgba(45, 38, 32, 0.95)", // Dark rustic transparency
      backdropFilter: "blur(10px)",
      boxShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
      padding: "12px 20px",
      borderBottom: "1px solid rgba(139, 94, 60, 0.2)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #a06e3b 0%, #8b5e3c 100%)", // Earthy gradient
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>
            🧠
          </div>
          <span style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #fcd34d 0%, #d97706 100%)", // Gold gradient
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)"
          }}>
            Sentimind
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 16px",
            background: "#383028", // Darker brown
            borderRadius: "30px",
            border: "1px solid #5c4735"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #a06e3b 0%, #8b5e3c 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f3f0eb",
              fontWeight: 700,
            }}>
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <span style={{ fontWeight: 600, color: "#e5e7eb" }}>
              {user?.username || "Usuario"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#fca5a5", // Light red
              background: "rgba(127, 29, 29, 0.2)", // Dark red transparency
              border: "1px solid #7f1d1d",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(127, 29, 29, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(127, 29, 29, 0.2)";
            }}
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </nav>
  );
}
