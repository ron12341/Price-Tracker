const nodemailer = require("nodemailer");
const config = require("../config");

class EmailService {
  construction() {
    this.transporter = nodemailer.createTransport({
      service: config.email.service,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  async sendPriceAlert({ email, productName, targetPrice, currentPrice, productId }) {
    const mailOptions = {
      from: config.email.from,
      to: email,
      subject: `Price Alert for ${productName}`,
      html: `
      <h1>Price Alert!</h1>
        <p>The product <strong>${productName}</strong> has reached your target price!</p>
        <p><strong>Your Target Price:</strong> $${targetPrice.toFixed(2)}</p>
        <p><strong>Current Price:</strong> $${currentPrice.toFixed(2)}</p>
        <p><a href="${config.appUrl}/products/${productId}">View Product</a></p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Price alert email send to ${email}`);
    } catch (error) {
      console.error("Error sending price alert email:", error);
      throw error;
    }
  }
}

module.exports = new EmailService();
