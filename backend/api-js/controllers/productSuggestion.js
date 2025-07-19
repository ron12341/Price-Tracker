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
    return res.json(result);
  } catch (error) {
    console.error("Error getting product suggestions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getPendingProductSuggestions = async (req, res) => {
  try {
    const result =
      await productSuggestionService.getPendingProductSuggestions();
    return res.json(result);
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
    console.error("Error bulk approving product suggestions:", {
      ids,
      error: error.message,
      stack: error.stack,
    });

    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addProductSuggestion,
  getAllProductSuggestions,
  getPendingProductSuggestions,
  approveProductSuggestion,
  bulkApproveProductSuggestions,
};
