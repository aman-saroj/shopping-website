const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add Product
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product Added!", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
