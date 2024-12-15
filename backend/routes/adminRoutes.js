const express = require('express');
const Package = require('../models/packageModel');
const router = express.Router();

router.post('/packages', async (req, res) => {
  const { title, description, price, availableDates, coverImage, additionalImages } = req.body;

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


router.put('/packages/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPackage = await Package.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/packages/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
