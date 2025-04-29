const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the menu item"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    trim: true,
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: [0, "Price must be a positive number"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    enum: {
      values: ["Appetizers", "Mains", "Desserts", "Drinks"],
      message: "Category must be one of: Appetizers, Mains, Desserts, Drinks",
    },
  },
  image: {
    type: String,
    default: "default-food.jpg",
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
