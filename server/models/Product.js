const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // e.g. "Cartier CT0532S"
    brand: { type: String, required: true },          // e.g. "Cartier"
    category: {
      type: String,
      enum: ["sunglasses", "eyeglasses", "lenses", "contact-lenses"],
      default: "sunglasses",
    },
    subCategory: { type: String, default: "premium-sunglasses" }, // for the filter/section this page shows
    gender: {
      type: String,
      enum: ["men", "women", "men,women", "unisex"],
      default: "men,women",
    },
    size: { type: String, enum: ["small", "medium", "large"], default: "medium" },
    price: { type: Number, required: true },
    image: { type: String, required: true },          // product photo URL
    colorSwatches: [{ type: String }],                 // hex codes / css gradients shown as the small circle under image
    badges: [{ type: String, enum: ["New", "Premium", "Hot selling", "Polarized"] }],
    material: { type: String, default: "Acetate" },
    shape: { type: String, default: "Square" },
    rim: { type: String, default: "Full rim" },
    color: { type: String, default: "Black" },
    inStock: { type: Boolean, default: true },
    description: { type: String },   // long-form product description
    // Contact-lens-specific specs (unused for glasses/sunglasses)
    waterContent: { type: String },  // e.g. "38% Water"
    diameter: { type: String },      // e.g. "14.0mm"
    baseCurve: { type: String },     // e.g. "8.4"
    powerRange: { type: String },    // e.g. "-0.50D to -6.00D (0.25 steps)"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
