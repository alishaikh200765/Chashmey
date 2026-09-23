require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const orderRoutes = require("./routes/orders");
const contactRoutes = require("./routes/contact");

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Chashmey.pk API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
