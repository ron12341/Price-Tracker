const productService = require("../services/product");
const alertService = require("../services/alert");

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

const getProduct = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { id } = req.params;
    const user = req.user;
    const product = await productService.getProduct(id);

    if (user) {
      const alert = await alertService.getUserProductAlert(user.id, id);
      return res.status(200).json({ product, alert });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { updateProduct, getProduct };
