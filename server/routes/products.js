const express = require("express");
const router = express.Router();
const {
  getProducts,
  getBrands,
  getProductById,
} = require("../controllers/productController");

router.get("/brands", getBrands);
router.get("/:id", getProductById);
router.get("/", getProducts);

module.exports = router;
