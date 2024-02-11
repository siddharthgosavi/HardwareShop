// controllers/materialController.js
const Material = require("../models/Material");

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
    const newMaterial = await Material.create(req.body);
    res.status(201).send("Material added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
