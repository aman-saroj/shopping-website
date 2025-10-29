import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submit (add backend email later)
    alert(`Message sent! Name: ${form.name}, Email: ${form.email}, Message: ${form.message}`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Contact Us</h1>
      <p style={{ marginBottom: "20px" }}>Have questions? Fill out the form below, and we'll get back to you!</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows="5"
          style={inputStyle}
        />
        <button type="submit" style={btnStyle}>Send Message</button>
      </form>
      <div style={{ marginTop: "40px" }}>
        <h2>Our Contact Info</h2>
        <p>Email: support@shoppingwebsite.com</p>
        <p>Phone: +1-123-456-7890</p>
        <p>Address: 123 E-Commerce St, City, Country</p>
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
  backgroundColor: "#2196f3",
  color: "white",
  padding: "14px 28px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px"
};