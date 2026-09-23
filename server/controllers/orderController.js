const Order = require("../models/Order");

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { items, customer, paymentMethod, subtotal, discount, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }
    if (!customer?.name || !customer?.phone || !customer?.address || !customer?.city) {
      return res.status(400).json({ message: "Missing required customer details." });
    }

    const order = await Order.create({
      items,
      customer,
      paymentMethod,
      subtotal,
      discount,
      total,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
