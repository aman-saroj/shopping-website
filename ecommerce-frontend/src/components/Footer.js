import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "#333",
      color: "white",
      padding: "40px 20px",
      textAlign: "center",
      marginTop: "50px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h3>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/about" style={linkStyle}>About Us</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact Us</Link></li>
            <li><Link to="/faq" style={linkStyle}>FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3>Legal</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/privacy" style={linkStyle}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={linkStyle}>Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h3>Connect With Us</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <a href="https://facebook.com" style={socialStyle}>Facebook</a>
            <a href="https://twitter.com" style={socialStyle}>Twitter</a>
            <a href="https://instagram.com" style={socialStyle}>Instagram</a>
          </div>
        </div>
      </div>
      <p style={{ marginTop: "30px", fontSize: "14px" }}>
        © 2025 Shopping Website. All rights reserved.
      </p>
    </footer>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  margin: "8px 0"
};

const socialStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px"
};