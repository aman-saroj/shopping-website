import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={{
      backgroundColor: "#333",
      padding: "15px 20px",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap"
    }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/cart" style={linkStyle}>Cart ({cart.items.length})</Link>
        <Link to="/orders" style={linkStyle}>Orders</Link>

        {/* ADMIN LINK - ONLY FOR ADMIN */}
        {user && user.role === "admin" && (
          <Link to="/admin" style={linkStyle}>Admin</Link>
        )}
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ fontSize: "14px" }}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={logoutBtn}>Logout</button>
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
  fontWeight: "500"
};

const logoutBtn = {
  background: "#f44336",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer"
};