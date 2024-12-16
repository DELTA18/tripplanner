const express = require('express');
const Booking = require('../models/bookingModel');
const Package = require('../models/packageModel');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  const { packageId, customerName, email, phoneNumber, numberOfTravelers, specialRequests } = req.body;

  try {
    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });

    const totalPrice = pkg.price * numberOfTravelers;

    const booking = new Booking({
      packageId,
      customerName,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
