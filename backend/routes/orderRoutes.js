const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdersByPhone,
} = require("../controllers/orderController");

// Routes for /api/orders
router.route("/").post(createOrder);

router.route("/:phoneNumber").get(getOrdersByPhone);

module.exports = router;
