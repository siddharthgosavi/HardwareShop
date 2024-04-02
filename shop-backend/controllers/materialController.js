// controllers/materialController.js
const Material = require("../models/Material");
const multer = require("multer");
const path = require("path");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/material-images/"); // Specify the directory to save uploaded images
  },
  filename: function (req, file, cb) {
    const materialName = req.body.material_name.replace(/\s+/g, "_").toLowerCase(); // Convert material name to lower case and replace spaces with underscores
    cb(null, materialName + "-" + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.addMaterial = async (req, res) => {
  try {
    upload.single("image");
    // Parse other form data
    const { category_id, material_name, price, unit_id, size_inches, type, diameter, color, brand_id } = req.body;

    // Get image URL
    const imageUrl = req.file ? "/material-images/" + req.file.filename : ""; // File path or URL of the uploaded image

    // Create new material
    const newMaterial = await Material.create({
      category_id,
      material_name,
      price,
      unit_id,
      size_inches,
      type,
      diameter,
      color,
      brand_id,
      image: imageUrl // Save image URL to the database
    });

    res.status(201).json(newMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
