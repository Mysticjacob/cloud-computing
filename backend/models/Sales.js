const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now }, // ✅ Automatically stores the purchase date
  status: { type: String, enum: ["Completed", "Pending"], default: "Completed" }
});

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;
