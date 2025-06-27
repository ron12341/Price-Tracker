require("dotenv").config();
require("./db/connect");
const express = require("express");
const app = express();

// CORS
const cors = require("cors");
app.use(cors());

// JSON
app.use(express.json());

// Routes
const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Express backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
