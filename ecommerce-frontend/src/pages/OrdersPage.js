import React, { useEffect, useState } from "react";
import API from "../api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "15px", borderRadius: "8px" }}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <div>
              {order.items.map(item => (
                <div key={item._id} style={{ display: "flex", alignItems: "center", gap: "10px", margin: "5px 0" }}>
                  <img src={item.image} alt="" style={{ width: 50, height: 50, objectFit: "cover" }} />
                  <span>{item.name} × {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}