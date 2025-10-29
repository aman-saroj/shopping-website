import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      
      // DEBUG: Check what's coming from API
      console.log("Login Response:", res.data);
      
      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // SAVE CLEAN USER (remove token from user object)
      const userData = {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      
      console.log("Saved user:", userData);

      alert("Login successful!");
      
      // Redirect based on role
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={btnStyle}>
          Login
        </button>
      </form>
      
      {/* TEST CREDENTIALS */}
      <div style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5", borderRadius: "5px" }}>
        <p><strong>Test Admin:</strong></p>
        <p>Email: admin@shop.com</p>
        <p>Password: admin123</p>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
};