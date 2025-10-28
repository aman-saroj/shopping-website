import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token || user.role !== 'admin') {
      navigate('/login');
    }

    API.get('/admin/products').then(res => setProducts(res.data)).catch(() => {});
    API.get('/admin/orders').then(res => setOrders(res.data)).catch(() => {});
  }, [navigate]);

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await API.delete(`/admin/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

        {/* Add Product */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h2>Add Product</h2>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const data = {
              name: form.name.value,
              price: +form.price.value,
              description: form.description.value,
              category: form.category.value,
              image: form.image.value,
              stock: +form.stock.value
            };
            await API.post('/admin/products', data);
            form.reset();
            window.location.reload();
          }}>
            <input name="name" placeholder="Name" required style={inputStyle} />
            <input name="price" type="number" placeholder="Price" required style={inputStyle} />
            <input name="description" placeholder="Description" style={inputStyle} />
            <input name="category" placeholder="Category" style={inputStyle} />
            <input name="image" placeholder="Image URL" style={inputStyle} />
            <input name="stock" type="number" placeholder="Stock" required style={inputStyle} />
            <button type="submit" style={btnStyle}>Add Product</button>
          </form>
        </div>

        {/* Products List */}
        <div style={{ flex: 2 }}>
          <h2>Products</h2>
          {products.map(p => (
            <div key={p._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "5px 0", borderRadius: "8px" }}>
              <strong>{p.name}</strong> - ₹{p.price}
              <div>
                <Link to={`/admin/edit/${p._id}`} style={{ marginRight: "10px" }}>Edit</Link>
                <button onClick={() => deleteProduct(p._id)} style={{ color: "red" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <h2 style={{ marginTop: "40px" }}>All Orders</h2>
      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #aaa", padding: "15px", margin: "10px 0", borderRadius: "8px" }}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
          <p><strong>Total:</strong> ₹{order.totalAmount} | <strong>Status:</strong> {order.status}</p>
          <div>
            {order.items.map(item => (
              <span key={item._id}>{item.name} × {item.quantity}, </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const inputStyle = { display: "block", width: "100%", padding: "8px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" };
const btnStyle = { padding: "10px 20px", background: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };