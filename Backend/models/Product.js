import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
  category: {
    type: String,
    enum: [
      "electronics",
      "books",
      "stationery",
      "clothing",
      "footwear",
      "accessories",
      "sports",
      "snacks",
      "toiletries",
      "miscellaneous",
    ],
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  interestedBuyers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  condition: {
    type: String,
    enum: ["Brand new", "Like new", "Good", "Fair", "Old"],
    required: true,
  },
  status: {
    type: String,
    enum: ["sold", "available"],
    default: "available",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
