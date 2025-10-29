import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const { addToCart } = useCart();

  // ------------------- WISHLIST -------------------
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);
  // ------------------------------------------------

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Search + Filter + Sort
  useEffect(() => {
    let result = Array.isArray(products) ? [...products] : [];

    if (searchTerm) {
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOrder === "high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredProducts(result);
  }, [searchTerm, sortOrder, products]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
        Loading products...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px" }}>
        All Products
      </h2>

      {/* SEARCH & FILTER BAR */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "24px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            flex: "1",
            minWidth: "200px",
            maxWidth: "400px",
          }}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <option value="default">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

        {(searchTerm || sortOrder !== "default") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSortOrder("default");
            }}
            style={{
              padding: "12px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      <p style={{ color: "#555", marginBottom: "16px" }}>
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
          No products found. Try adjusting your search or filters.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                backgroundColor: "#fff",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.08)";
              }}
            >
              {/* WISHLIST HEART */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(product._id);
                }}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "20px",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                title={
                  isInWishlist(product._id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                {isInWishlist(product._id) ? "♥" : "♡"}
              </button>

              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/250?text=No+Image"
                  }
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    backgroundColor: "#f9f9f9",
                  }}
                  loading="lazy"
                />
                <h3
                  style={{
                    margin: "12px 0",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                    minHeight: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {product.name || "Unnamed Product"}
                </h3>
              </Link>

              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#28a745",
                  margin: "12px 0",
                }}
              >
                ₹{product.price || 0}
              </p>

              <button
                onClick={() => addToCart(product, 1)}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                  width: "100%",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#218838")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#28a745")
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}