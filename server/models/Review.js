const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewerName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String },              
    productName: { type: String },        
    size: { type: String },
    reviewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
