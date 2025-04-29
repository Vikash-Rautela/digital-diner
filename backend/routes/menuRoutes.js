const express = require("express");
const router = express.Router();
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
} = require("../controllers/menuController");

// Routes for /api/menu
router.route("/").get(getMenuItems).post(createMenuItem); // Bonus functionality

router.route("/:id").get(getMenuItem).put(updateMenuItem); // Bonus functionality

module.exports = router;
