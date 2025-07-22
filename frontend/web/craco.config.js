const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@context": path.resolve(__dirname, "src/context"),
      "@components": path.resolve(__dirname, "src/components"),
      "@admin": path.resolve(__dirname, "src/pages/admin"),
      "@adminServices": path.resolve(__dirname, "src/services/admin"),
      "@publicServices": path.resolve(__dirname, "src/services/public"),
    },
  },
};
