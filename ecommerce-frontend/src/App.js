import React from "react";
import { Routes, Route } from "react-router-dom";

import CheckoutPage from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEditProduct from "./pages/AdminEditProduct";

/* --------------------------------------------------------------
   Inline pages – no separate .js files required
   (About, Contact, FAQ)
-------------------------------------------------------------- */
const About = () => (
  <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
    <h2>About Us</h2>
    <p>
      We are a modern e-commerce store built with React, React Router, and a
      custom cart context. Enjoy shopping!
    </p>
  </div>
);

const Contact = () => (
  <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
    <h2>Contact Us</h2>
    <p>Email: support@shop.com</p>
    <p>Phone: +91 98765 43210</p>
  </div>
);

const FAQ = () => (
  <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
    <h2>Frequently Asked Questions</h2>
    <details style={{ marginBottom: "1rem" }}>
      <summary style={{ fontWeight: "bold", cursor: "pointer" }}>
        How do I track my order?
      </summary>
      <p>Go to <strong>Orders</strong> page after logging in.</p>
    </details>

    <details style={{ marginBottom: "1rem" }}>
      <summary style={{ fontWeight: "bold", cursor: "pointer" }}>
        What is the return policy?
      </summary>
      <p>30-day return with original packaging.</p>
    </details>

    <details style={{ marginBottom: "1rem" }}>
      <summary style={{ fontWeight: "bold", cursor: "pointer" }}>
        Do you ship internationally?
      </summary>
      <p>Yes, we ship to over 50 countries.</p>
    </details>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Inline pages – no file needed */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </>
  );
} 

export default App;