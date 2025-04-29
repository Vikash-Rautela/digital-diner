const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoDB = require("./config/mongodb");
const { connectPostgreSQL, sequelize } = require("./config/postgresql");

dotenv.config();

connectMongoDB();
connectPostgreSQL();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Digital Diner API" });
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("PostgreSQL database synced");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
