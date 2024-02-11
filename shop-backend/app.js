const express = require("express");
const bodyParser = require("body-parser");
const unitRoutes = require("./routes/unitRoutes");
const brandRoutes = require("./routes/brandRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const materialRoutes = require("./routes/materialRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const categoryInventoryRoutes = require("./routes/categoryInventoryRoutes");
const sequelize = require("./config/database");
const Category = require("./models/Category");

const app = express();
const port = process.env.PORT || 8081;

// Middleware
app.use(bodyParser.json());

// Define route handler for the root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to my Node.js application!");
});

// Routes
app.use("/units", unitRoutes);
app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);
app.use("/materials", materialRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/category-inventory", categoryInventoryRoutes);

async function addInitialCategories() {
  try {
    // Check if categories exist
    const existingCategories = await Category.findAll();
    if (existingCategories.length === 0) {
      // Add initial categories
      await Category.bulkCreate([{ material_category: "Sanitary Hardware" }, { material_category: "Agriculture Irrigation Fittings" }, { material_category: "CPVC Pipe Fitting" }, { material_category: "UPVC Pipe Fitting" }]);
      console.log("Initial categories added successfully.");
    } else {
      console.log("Categories already exist.");
    }
  } catch (error) {
    console.error("Error adding initial categories:", error);
  }
}

// Start the server
async function startServer() {
  try {
    // Sync models with database
    await sequelize.sync();
    console.log("Database synchronized successfully.");

    // Add initial categories if not already added
    await addInitialCategories();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
}

startServer();
