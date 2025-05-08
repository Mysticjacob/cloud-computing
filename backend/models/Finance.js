const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema({
  month: String,
  revenue: Number,
  expenses: Number,
}, { timestamps: true });

module.exports = mongoose.model("Finance", FinanceSchema);
