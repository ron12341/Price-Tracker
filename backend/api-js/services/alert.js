const Alert = require("../models/Alert");
const scrapingService = require("./scraping");

class AlertService {
  addOrUpdateAlert = async (userId, productId, { targetPrice, isActive }) => {
    const result = await Alert.findOneAndUpdate(
      { user: userId, product: productId },
      {
        targetPrice,
        isActive,
        lastChecked: null,
      },
      {
        upsert: true,
        new: true,
      }
    );
    return { targetPrice: result.targetPrice, isActive: result.isActive };
  };

  getUserProductAlert = async (userId, productId) => {
    const result = await Alert.findOne({ user: userId, product: productId });

    return { targetPrice: result.targetPrice, isActive: result.isActive };
  };

  getUserAlerts = async (userId) => {
    const result = await Alert.find({ user: userId }).populate("product");
    return result;
  };

  checkAlerts = async () => {
    const alerts = await Alert.find({ isActive: true }).populate("product").populate("user");

    for (const alert of alerts) {
      try {
        // Throttle requests (1-3s between checks)
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

        const product = alert.product;
        const data = await scrapingService.scrapeProduct(product.query, product.stores, product.imageUrl);

        for (const store of data.stores) {
          if (store.price < alert.targetPrice) {
            await this.triggerAlert(alert, store.price);
            break;
          }
        }

        alert.lastChecked = new Date();
        await alert.save();
      } catch (error) {
        console.error(`Alert check failed for ${alert._id}:`, error);
      }
    }
  };

  triggerAlert = async (alert, price) => {
    // Send email
    await emailService.sendPriceAlert({
      email: alert.user.email,
      productName: alert.product.name,
      targetPrice: alert.targetPrice,
      currentPrice: price,
      productId: alert.product._id,
    });

    // Optional: In-app notification
    await Notification.create({
      user: alert.user._id,
      type: "price_alert",
      data: { productId: alert.product._id, price: price, targetPrice: alert.targetPrice },
    });

    // Deactivate alert if one-time
    alert.isActive = false;
    await alert.save();
  };
}

module.exports = new AlertService();
