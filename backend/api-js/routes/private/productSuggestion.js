const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const controller = require("../../controllers/productSuggestion");

router.use(authMiddleware, isAdmin);

router.get("/", controller.getAllProductSuggestions);

router.post("/:id/approve", controller.approveProductSuggestion);

router.post("/bulk-approve", controller.bulkApproveProductSuggestions);

router.put("/:id", controller.updateProductSuggestion);

router.post("/bulk-delete", controller.bulkDeleteProductSuggestions);

module.exports = router;
