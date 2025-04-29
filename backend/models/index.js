// MongoDB models
const MenuItem = require("./mongodb/MenuItem");

// PostgreSQL models
const Order = require("./postgresql/Order");
const OrderItem = require("./postgresql/OrderItem");

module.exports = {
  // MongoDB models
  MenuItem,

  // PostgreSQL models
  Order,
  OrderItem,
};
