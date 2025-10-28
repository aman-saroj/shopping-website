const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/create', protect, createOrder);
router.get('/', protect, getUserOrders);

module.exports = router;