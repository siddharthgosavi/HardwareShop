const { Sequelize } = require("sequelize");

// Define database connection parameters
const sequelize = new Sequelize("shop-database", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false // Disable logging of SQL queries
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
