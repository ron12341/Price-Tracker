const alertService = require("../services/alert");

const setAlert = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  try {
    const alert = await alertService.addOrUpdateAlert(userId, productId, req.body);
    res.status(201).json(alert);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Failed to set alert",
      details: error.message,
    });
  }
};

const getAlerts = async (req, res) => {
  try {
    const alerts = await alertService.getUserAlerts(req.user.id);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch alerts",
      details: error.message,
    });
  }
};

module.exports = {
  setAlert,
  getAlerts,
};
