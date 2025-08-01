const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@middleware": path.resolve(__dirname, "src/middleware"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@context": path.resolve(__dirname, "src/context"),
      "@adminPages": path.resolve(__dirname, "src/pages/admin"),
      "@publicPages": path.resolve(__dirname, "src/pages/public"),
      "@authPages": path.resolve(__dirname, "src/pages/auth"),
      "@adminServices": path.resolve(__dirname, "src/services/admin"),
      "@publicServices": path.resolve(__dirname, "src/services/public"),
    },
  },
};
