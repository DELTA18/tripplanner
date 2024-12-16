const express = require('express');
const Package = require('../models/packageModel');
const router = express.Router();

router.get("/", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
  
    try {
      const packages = await Package.find()
        .skip(skip)
        .limit(parseInt(limit));
      const totalPackages = await Package.countDocuments();
  
      res.json({
        packages,
        totalPackages,
        totalPages: Math.ceil(totalPackages / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });

router.get('/:id', async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(package);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;