const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, totalPrice, recipientName, address, phone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Keranjang tidak boleh kosong' });
    }

    const newOrder = new Order({
      user: req.user.id,
      items,
      totalPrice,
      recipientName,
      address,
      phone,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/my', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;