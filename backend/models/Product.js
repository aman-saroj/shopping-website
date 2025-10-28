const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },  // image URL (we’ll upload later)
  category: { type: String },
  inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model("Product", productSchema);
