// src/pages/RegisterPage.js

import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form); // Use /auth/register

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // SAVE CLEAN USER (without token)
      const { token, ...cleanUser } = res.data;
      localStorage.setItem("user", JSON.stringify(cleanUser));

      alert('Registered & Logged in!');
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          style={inputStyle}
        />
        <button type="submit" style={btnStyle}>Register</button>
      </form>
    </div>
  );
}

// STYLES
const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

const btnStyle = {
  padding: "14px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px"
};