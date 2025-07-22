const { listeners } = require("../models/ProductSuggestion");
const productSuggestionService = require("../services/productSuggestion");

const addProductSuggestion = async (req, res) => {
  try {
    const { name, query, stores, reason } = req.body;
    const userId = req.user.id;

    const result = await productSuggestionService.addProductSuggestion(
      userId,
      name,
      query,
      stores,
      reason
    );
    return res
      .status(201)
      .json({ message: "Product suggestion added", data: result });
  } catch (error) {
    console.error("Error adding product suggestion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllProductSuggestions = async (req, res) => {
  try {
    const result = await productSuggestionService.getAllProductSuggestions();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error getting product suggestions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getPendingProductSuggestions = async (req, res) => {
  try {
    const result =
      await productSuggestionService.getPendingProductSuggestions();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error getting pending product suggestions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const approveProductSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productSuggestionService.approveProductSuggestion(id);
    return res.json(result);
  } catch (error) {
    console.error("Error approving product suggestion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const bulkApproveProductSuggestions = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid or missing 'ids' array" });
  }

  try {
    const result = await productSuggestionService.bulkApproveAndCreate(ids);

    if (result.createdCount === 0 && result.errors.length > 0) {
      return res.status(400).json({
        error: "All suggestions failed",
        details: result.errors,
      });
    }

    if (result.errors.length > 0) {
      return res.status(207).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateProductSuggestion = async (req, res) => {
  const { id } = req.params;
  const { name, query, stores, reason } = req.body;
  const user = req.user;

  try {
    let updated;

    if (user.isAdmin) {
      updated = await productSuggestionService.updateProductSuggestionAsAdmin(
        id,
        { name, query, stores, reason }
      );
    } else {
      updated = await productSuggestionService.updateProductSuggestionAsOwner(
        id,
        { name, query, stores, reason },
        user.id
      );
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating product suggestion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const bulkDeleteProductSuggestions = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await productSuggestionService.bulkDeleteProductSuggestions(
      ids
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addProductSuggestion,
  getAllProductSuggestions,
  getPendingProductSuggestions,
  approveProductSuggestion,
  bulkApproveProductSuggestions,
  updateProductSuggestion,
  bulkDeleteProductSuggestions,
};
