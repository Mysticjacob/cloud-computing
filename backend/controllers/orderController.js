const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { userId, productName, price } = req.body;
    const newOrder = new Order({ userId, productName, price });

    await newOrder.save();

    // Send purchase confirmation
    await Notification.create({ userId, message: `✅ Purchase successful: ${productName} for $${price}` });

    res.json({ message: "✅ Order placed successfully!", newOrder });
  } catch (error) {
    res.status(500).json({ error: "❌ Error placing order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "❌ Error retrieving orders" });
  }
};

module.exports = { createOrder, getOrders };
