const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgresql");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Customer name is required" },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Phone number is required" },
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Total amount must be positive" },
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
    },
    pickupTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => {
        // Set default pickup time to 30 minutes from now
        const date = new Date();
        date.setMinutes(date.getMinutes() + 30);
        return date;
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order;
