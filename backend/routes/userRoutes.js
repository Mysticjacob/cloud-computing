const express = require("express");
const { buyProduct, getUserPurchases } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/buy", authMiddleware(["user"]), buyProduct);
router.get("/purchases", authMiddleware(["user"]), getUserPurchases);

module.exports = router;
