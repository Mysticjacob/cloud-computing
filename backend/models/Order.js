const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  productName: String,
  price: Number,
  status: { type: String, enum: ["Processing", "Completed"], default: "Processing" },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
