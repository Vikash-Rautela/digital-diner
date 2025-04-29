const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MenuItem } = require("../models");
const connectMongoDB = require("../config/mongodb");

// Load environment variables
dotenv.config();

// Sample menu data
const menuItems = [
  // Appetizers
  {
    name: "Mozzarella Sticks",
    description: "Golden-fried mozzarella sticks served with marinara sauce",
    price: 7.99,
    category: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1548340748-6d3b8d6efa95?q=80&w=2787&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    name: "Loaded Nachos",
    description:
      "Crispy tortilla chips topped with melted cheese, jalapeños, guacamole, sour cream, and salsa",
    price: 9.99,
    category: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=2835&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    name: "Spinach Artichoke Dip",
    description: "Creamy spinach and artichoke dip served with toasted bread",
    price: 8.99,
    category: "Appetizers",
    image:
      "https://plus.unsplash.com/premium_photo-1663853051350-c669230c1daa?q=80&w=2787&auto=format&fit=crop",
    isAvailable: true,
  },

  // Mains
  {
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with lettuce, tomato, cheese, and our special sauce on a brioche bun",
    price: 12.99,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2899&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon fillet grilled to perfection with lemon butter sauce and seasonal vegetables",
    price: 18.99,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    name: "Chicken Alfredo Pasta",
    description:
      "Fettuccine pasta tossed with creamy Alfredo sauce and grilled chicken",
    price: 14.99,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1673108336796-8e9a8665c2c8?q=80&w=2787&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    name: "Margherita Pizza",
    description:
      "Classic pizza with tomato sauce, fresh mozzarella, basil, and olive oil",
    price: 13.99,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=2874&auto=format&fit=crop",
    isAvailable: true,
  },

  // Desserts
  {
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 7.99,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=2940&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    name: "New York Cheesecake",
    description:
      "Creamy classic cheesecake with a graham cracker crust and berry compote",
    price: 6.99,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=2787&auto=format&fit=crop",
    isAvailable: true,
  },

  // Drinks
  {
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemonade with mint leaves",
    price: 3.99,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?q=80&w=2940&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    name: "Iced Tea",
    description: "Refreshing house-brewed iced tea with lemon",
    price: 2.99,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1556679343-c1c1ed8aabc5?q=80&w=2864&auto=format&fit=crop",
    isAvailable: true,
  },
  {
    name: "Chocolate Milkshake",
    description:
      "Rich and creamy chocolate milkshake topped with whipped cream",
    price: 5.99,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=2787&auto=format&fit=crop",
    isAvailable: true,
  },
];

// Function to seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Delete existing menu items
    await MenuItem.deleteMany({});

    // Insert new menu items
    await MenuItem.insertMany(menuItems);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
