const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

// Check if DATABASE_URL is available (Heroku environment)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Important for connecting to Heroku Postgres
      },
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  // Local development environment
  sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      dialect: "postgres",
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
}

const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectPostgreSQL };
