const productService = require("../services/product");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProduct = await productService.updateProduct(id, updates);
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { updateProduct };
