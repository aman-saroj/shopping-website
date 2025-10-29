import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!token || user.role !== "admin") {
      navigate("/login");
    }

    API.get("/admin/products")
      .then((res) => setProducts(res.data))
      .catch(() => {});

    API.get("/admin/orders")
      .then((res) => setOrders(res.data))
      .catch(() => {});
  }, [navigate]);

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await API.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    formData.append("name", form.name.value);
    formData.append("price", form.price.value);
    formData.append("description", form.description.value);
    formData.append("category", form.category.value);
    formData.append("stock", form.stock.value);
    if (imageFile) formData.append("image", imageFile);

    try {
      await API.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      form.reset();
      setImageFile(null);
      setImagePreview("");
      window.location.reload();
    } catch (err) {
      alert("Error adding product: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Admin Panel</h1>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* Add Product Form */}
        <div style={{ flex: 1, minWidth: "350px", background: "#f9f9f9", padding: "20px", borderRadius: "12px" }}>
          <h2 style={{ marginBottom: "15px" }}>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Product Name" required style={inputStyle} />
            <input name="price" type="number" placeholder="Price (₹)" required style={inputStyle} />
            <textarea name="description" placeholder="Description" style={{ ...inputStyle, height: "80px" }} />
            <input name="category" placeholder="Category (e.g. Electronics)" style={inputStyle} />
            <input name="stock" type="number" placeholder="Stock Quantity" required style={inputStyle} />

            {/* Image Upload */}
            <div style={{ margin: "10px 0" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "block", width: "100%", padding: "8px" }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "180px",
                    objectFit: "cover",
                    marginTop: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              )}
            </div>

            <button type="submit" style={btnStyle}>
              Add Product
            </button>
          </form>
        </div>

        {/* Products List */}
        <div style={{ flex: 2 }}>
          <h2 style={{ marginBottom: "15px" }}>All Products</h2>
          {products.length === 0 ? (
            <p>No products yet.</p>
          ) : (
            products.map((p) => (
              <div
                key={p._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  margin: "8px 0",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <div>
                  <strong>{p.name}</strong> — ₹{p.price}
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginLeft: "10px",
                        borderRadius: "6px",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </div>
                <div>
                  <Link
                    to={`/admin/edit/${p._id}`}
                    style={{ marginRight: "12px", color: "#007bff" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    style={{ color: "#dc3545", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Orders Section */}
      <h2 style={{ marginTop: "40px", fontSize: "24px" }}>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #aaa",
              padding: "16px",
              margin: "12px 0",
              borderRadius: "10px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>User:</strong> {order.user?.name} ({order.user?.email})
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount} | <strong>Status:</strong>{" "}
              <span style={{ color: order.status === "delivered" ? "green" : "orange" }}>
                {order.status}
              </span>
            </p>
            <div style={{ marginTop: "8px" }}>
              <strong>Items:</strong>{" "}
              {order.items.map((item) => (
                <span key={item._id}>
                  {item.name} × {item.quantity},{" "}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Styles
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const btnStyle = {
  padding: "12px 24px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  marginTop: "10px",
  width: "100%",
};