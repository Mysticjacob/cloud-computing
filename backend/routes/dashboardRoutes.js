const express = require("express");
const { getFinanceOverview, getSalesOverview } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/finance", authMiddleware(["finance", "investor"]), getFinanceOverview);
router.get("/sales", authMiddleware(["sales", "admin"]), getSalesOverview);

module.exports = router;
