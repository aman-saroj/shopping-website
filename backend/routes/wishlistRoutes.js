const express = require('express');
const Wishlist = require('../models/Wishlist');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/add', protect, async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) wishlist = new Wishlist({ user: req.user._id });
  if (!wishlist.products.includes(productId)) wishlist.products.push(productId);
  await wishlist.save();
  res.json(wishlist);
});

router.get('/', protect, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
  res.json(wishlist || { products: [] });
});

module.exports = router;