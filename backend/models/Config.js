// models/Config.js
const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  maintenanceMode: { type: Boolean, default: false },
});

module.exports = mongoose.model("Config", configSchema);
