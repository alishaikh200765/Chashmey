const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    qty: Number,
    color: String,
    size: String,
    lensSummary: String, // human-readable summary of any attached prescription
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: String,
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "bank-transfer"],
      required: true,
    },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
