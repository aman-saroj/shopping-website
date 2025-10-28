import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const res = await API.post('/orders/create', {
        items: cart.items
      });

      alert(`Order placed! Total: ₹${res.data.order.totalAmount}`);
      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error("Checkout error:", err);
      alert('Checkout failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Checkout</h2>
      <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Order Summary</h3>
        {cart.items.map(item => (
          <div key={item.product._id} style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
            <span>{item.product.name} × {item.quantity}</span>
            <span>₹{item.product.price * item.quantity}</span>
          </div>
        ))}
        <hr />
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          Total: ₹{total}
        </div>
      </div>

      <button
        onClick={handleCheckout}
        style={{
          backgroundColor: "#ff5722",
          color: "white",
          padding: "14px 28px",
          fontSize: "18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100%"
        }}
      >
        Confirm Order
      </button>

      <p style={{ marginTop: "15px", fontSize: "14px", color: "#666", textAlign: "center" }}>
        Payment gateway will be added later. This is logic only.
      </p>
    </div>
  );
}