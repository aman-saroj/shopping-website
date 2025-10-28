import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateItem, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <div>Cart is empty — <Link to="/">Go shopping</Link></div>
      ) : (
        <>
          <div>
            {cart.items.map(item => (
              <div key={item.product._id} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                <img src={item.product.image || "https://via.placeholder.com/100"} alt={item.product.name}
                     style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.product.name}</div>
                  <div>₹{item.product.price} x 
                    <input type="number" value={item.quantity} min="1"
                           onChange={e => updateItem(item.product._id, Number(e.target.value))}
                           style={{ width: 70, marginLeft: 8 }} />
                  </div>
                </div>
                <div>
                  <button onClick={() => removeItem(item.product._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <h3>Total: ₹{total}</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            <button onClick={() => clearCart()}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}
