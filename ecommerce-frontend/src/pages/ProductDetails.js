import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", display: "flex", gap: "30px" }}>
      <img
        src={product.image || "https://via.placeholder.com/400"}
        alt={product.name}
        style={{ width: "400px", height: "400px", objectFit: "cover", borderRadius: "10px" }}
      />
      <div>
        <h1>{product.name}</h1>
        <p style={{ fontSize: "24px", color: "#e91e63" }}>₹{product.price}</p>
        <p>{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <button
          onClick={() => addToCart(product, 1)}
          style={{
            backgroundColor: "#ff5722",
            color: "white",
            padding: "12px 24px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}