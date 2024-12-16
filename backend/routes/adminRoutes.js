
const Package = require("../models/packageModel");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// Hardcoded admin credentials for login validation
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Admin login route
router.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (name === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Admin login successful" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

router.use(authMiddleware);  

router.post("/packages", async (req, res) => {
  const abc = JSON.parse(req.query.newPkg);
  const { title, description, price, availableDates, coverImage, additionalImages } = abc;

  try {
    const newPackage = new Package({
      title,
      description,
      price,
      availableDates,
      coverImage,
      additionalImages,
    });
    
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/packages/:id", async (req, res) => {
  const { id } = req.params;
  const updates = JSON.parse(req.query.updatedPackage)
  try {
    const updatedPackage = await Package.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/packages/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/packages", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
