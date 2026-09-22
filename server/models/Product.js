const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          
    brand: { type: String, required: true },          
    category: {
      type: String,
      enum: ["sunglasses", "eyeglasses", "lenses", "contact-lenses"],
      default: "sunglasses",
    },
    subCategory: { type: String, default: "premium-sunglasses" }, 
    gender: {
      type: String,
      enum: ["men", "women", "men,women", "unisex"],
      default: "men,women",
    },
    size: { type: String, enum: ["small", "medium", "large"], default: "medium" },
    price: { type: Number, required: true },
    image: { type: String, required: true },          
    colorSwatches: [{ type: String }],                 
    badges: [{ type: String, enum: ["New", "Premium", "Hot selling", "Polarized"] }],
    material: { type: String, default: "Acetate" },
    shape: { type: String, default: "Square" },
    rim: { type: String, default: "Full rim" },
    color: { type: String, default: "Black" },
    inStock: { type: Boolean, default: true },
    description: { type: String },   
    
    waterContent: { type: String },  
    diameter: { type: String },      
    baseCurve: { type: String },     
    powerRange: { type: String }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
