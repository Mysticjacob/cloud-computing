const express = require("express");
const { submitQuery, autoReply } = require("../controllers/queryController");

const router = express.Router();

router.post("/submit", submitQuery);
router.post("/reply", autoReply);

module.exports = router;
