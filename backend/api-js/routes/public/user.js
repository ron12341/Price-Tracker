const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.put("/me/tracked-products/:productId", userController.handleTrackProduct);

module.exports = router;
