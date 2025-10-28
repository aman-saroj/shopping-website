const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body; // Get items from frontend

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Validate each item
    for (let item of items) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product.name}` });
      }

      const price = product.price;
      const quantity = item.quantity || 1;
      totalAmount += price * quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price,
        quantity,
        image: product.image
      });
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount
    });

    await order.save();

    res.json({
      message: 'Order placed successfully!',
      order
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};