const { Order, OrderItem } = require("../models");
const { sequelize } = require("../config/postgresql");

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { customerName, phoneNumber, items } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create(
      {
        customerName,
        phoneNumber,
        totalAmount,
      },
      { transaction }
    );

    // Create order items
    const orderItems = [];
    for (const item of items) {
      const orderItem = await OrderItem.create(
        {
          OrderId: order.id,
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        },
        { transaction }
      );

      orderItems.push(orderItem);
    }

    await transaction.commit();

    res.status(201).json({
      success: true,
      data: {
        ...order.toJSON(),
        items: orderItems,
      },
    });
  } catch (error) {
    await transaction.rollback();

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get orders by phone number
// @route   GET /api/orders/:phoneNumber
// @access  Public
exports.getOrdersByPhone = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { phoneNumber: req.params.phoneNumber },
      include: [
        {
          model: OrderItem,
          attributes: ["menuItemId", "name", "price", "quantity"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No orders found for this phone number",
      });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
