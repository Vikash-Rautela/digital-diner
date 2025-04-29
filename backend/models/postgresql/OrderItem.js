const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgresql");
const Order = require("./Order");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    menuItemId: {
      type: DataTypes.STRING, // This will store MongoDB ObjectId as string
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: { args: [1], msg: "Quantity must be at least 1" },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Set up associations
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

module.exports = OrderItem;
