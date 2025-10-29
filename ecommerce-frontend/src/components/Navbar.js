import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    console.log("Saved user from localStorage:", savedUser);
    
    if (savedUser && savedUser !== "null") {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log("User role:", userData.role);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const wishlistCount = JSON.parse(localStorage.getItem("wishlist") || "[]").length;

  return (
    <nav style={{
      backgroundColor: "#222",
      padding: "16px 24px",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    }}>
      {/* LEFT SIDE - NAV LINKS */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/cart" style={linkStyle}>Cart ({cart.items?.length || 0})</Link>
        <Link to="/wishlist" style={linkStyle}>Wishlist ({wishlistCount})</Link>
        <Link to="/orders" style={linkStyle}>Orders</Link>
        
        {/* ADMIN LINK - ONLY SHOW FOR ADMINS */}
        {user && user.role === "admin" && (
          <Link 
            to="/admin" 
            style={{
              ...linkStyle,
              color: "#FFD700",
              fontWeight: "bold",
              background: "rgba(255, 215, 0, 0.1)",
              padding: "8px 16px",
              borderRadius: "6px"
            }}
          >
            🔧 Admin Panel
          </Link>
        )}
      </div>

      {/* RIGHT SIDE - USER INFO */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
        {user ? (
          <>
            <span style={{ fontSize: "14px" }}>
              Hi, <strong>{user.name}</strong> 
              {user.role === "admin" && " 👑"}
            </span>
            <button onClick={handleLogout} style={logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "15px"
};

const logoutBtn = {
  background: "#dc3545",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px"
};