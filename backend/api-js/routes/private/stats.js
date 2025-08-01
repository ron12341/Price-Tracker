const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const controller = require("../../controllers/stats");

router.use(authMiddleware, isAdmin);

router.get("/", controller.getCounts);

module.exports = router;
