const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewerName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String },              // optional photo attached to the review
    productName: { type: String },        // e.g. "Ray Ban Wayfarer (Black)"
    size: { type: String },
    reviewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
