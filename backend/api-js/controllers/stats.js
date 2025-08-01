const statsService = require("../services/stats");

const getCounts = async (req, res) => {
  try {
    const counts = await statsService.getCounts();
    return res.json(counts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getCounts };
