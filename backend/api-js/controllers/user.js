const userService = require("../services/user");

const handleTrackProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    const result = await userService.handleTrackProduct(userId, productId);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
};

module.exports = { handleTrackProduct };
