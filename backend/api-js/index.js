require("dotenv").config();
require("./db/connect");
const express = require("express");
const app = express();

// CORS
const cors = require("cors");
app.use(cors());

// JSON
app.use(express.json());

//
// PUBLIC ROUTES
//
const productsRouter = require("./routes/public/products"); // Products
app.use("/products", productsRouter);

const productSuggestionRouter = require("./routes/public/productSuggestion"); // Product suggestions
app.use("/product-suggestions", productSuggestionRouter);

const authRouter = require("./routes/public/auth"); // Auth
app.use("/auth", authRouter);

const userRouter = require("./routes/public/user"); // User
app.use("/users", userRouter);

//
// PRIVATE ROUTES
//
const adminProductSuggestionRouter = require("./routes/private/productSuggestion"); // Product suggestions
app.use("/admin/product-suggestions", adminProductSuggestionRouter);

const adminProductsRouter = require("./routes/private/products"); // Products
app.use("/admin/products", adminProductsRouter);

const adminStatsRouter = require("./routes/private/stats"); // Stats
app.use("/admin/stats", adminStatsRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Express backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
