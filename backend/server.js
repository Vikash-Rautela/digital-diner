const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/mongodb');
const { connectPostgreSQL, sequelize } = require('./config/postgresql');

// Load environment variables
dotenv.config();

// Connect to databases
connectMongoDB();
connectPostgreSQL();

// Initialize express application
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to The Digital Diner API' });
});

// Sync PostgreSQL models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('PostgreSQL database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});