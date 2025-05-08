const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/saleController");

router.post("/record", SaleController.recordSale); // ✅ Saves a new sale
router.get("/", SaleController.getAllSales); // ✅ Fetch all recorded sales

module.exports = router;
