const mongoose = require('mongoose');
module.exports = mongoose.model('Wishlist', {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});