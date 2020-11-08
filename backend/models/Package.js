const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  category: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    maxlength: 1500,
  },
  price: {
    type: String,
  },
  filename: {
    type: String,
  },
  showcaseImages: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("package", PackageSchema);
