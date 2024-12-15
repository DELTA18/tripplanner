const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  numberOfTravelers: { type: Number, required: true },
  specialRequests: { type: String },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
