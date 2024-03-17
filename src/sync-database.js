// sync-database.js

// Import Sequelize instance
const sequelize = require("../src/db");

const Service = require("./models/Service");
const Vehicle = require("./models/Vehicle");
const Category = require("./models/Category");

// Define the sync function
async function syncDatabase() {
  try {
    // Sync models with the database
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    process.exit(1); // Exit with non-zero status code to indicate failure
  }
}

// Call the sync function to synchronize the database
syncDatabase();
