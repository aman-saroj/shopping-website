import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
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
    await API.put(`/admin/products/${id}`, data);
    navigate('/admin');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" defaultValue={product.name} required style={inputStyle} />
        <input name="price" type="number" defaultValue={product.price} required style={inputStyle} />
        <input name="description" defaultValue={product.description} style={inputStyle} />
        <input name="category" defaultValue={product.category} style={inputStyle} />
        <input name="image" defaultValue={product.image} style={inputStyle} />
        <input name="stock" type="number" defaultValue={product.stock} required style={inputStyle} />
        <button type="submit" style={btnStyle}>Update Product</button>
      </form>
    </div>
  );
}

const inputStyle = { display: "block", width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc" };
const btnStyle = { padding: "12px 24px", background: "#ff9800", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };