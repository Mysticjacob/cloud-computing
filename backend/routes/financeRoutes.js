const express = require("express");
const router = express.Router();
const FinanceController = require("../controllers/financeController");

router.get("/", FinanceController.getFinanceData); // ✅ Fetch financial summary

module.exports = router;
