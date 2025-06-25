const express = require("express");
require("./db/connect");

const app = express();
const productsRouter = require("./routes/products");

app.use(express.json());
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Express backend is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
