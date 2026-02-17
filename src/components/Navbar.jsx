import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user"); // ⭐ also clear user
    window.location.href = "/";
  };

  // ⭐ Auto-generate avatar from name (FIX)
  const avatarUrl = user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
      )}&background=3b82f6&color=fff&size=128`
    : "https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff";

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">🚀 DSA Visualizer</h2>
      </div>

      <div
        className="nav-right"
        style={{ display: "flex", alignItems: "center", gap: "15px" }}
      >
        {/* 👤 User Name */}
        {user && <span>Hi, {user.name}</span>}

        {/* 🖼 User Avatar (FIXED) */}
        {user && (
          <img
            src={avatarUrl}
            alt="User Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid #3b82f6",
              objectFit: "cover",
            }}
          />
        )}

        {/* 🔴 Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
