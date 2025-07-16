const productSuggestionService = require("../services/productSuggestion");

const addProductSuggestion = async (req, res) => {
  try {
    const { name, query, stores } = req.body;
    const userId = req.user.id;

    const result = await productSuggestionService.addProductSuggestion(
      userId,
      name,
      query,
      stores
    );
    return res
      .status(201)
      .json({ message: "Product suggestion added", data: result });
  } catch (error) {
    console.error("Error adding product suggestion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getProductSuggestions = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await productSuggestionService.getAllProductSuggestions(
      userId
    );
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

module.exports = {
  addProductSuggestion,
  getProductSuggestions,
  getPendingProductSuggestions,
};
