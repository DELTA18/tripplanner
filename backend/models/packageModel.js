const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: [String], // Array of strings for available dates
  coverImage: { type: String, required: true }, // URL for the main cover image
  additionalImages: [String], // Array of URLs for additional images
});

module.exports = mongoose.model('Package', packageSchema);