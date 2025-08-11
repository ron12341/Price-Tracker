const express = require("express");
const router = express.Router();
const alertController = require("../../controllers/alert");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", alertController.getAlerts);

router.post("/products/:id", alertController.setAlert);

module.exports = router;
