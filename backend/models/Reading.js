const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true
    },
    energyKwh: {
      type: Number,
      required: true,
      min: 0
    },
    voltage: {
      type: Number,
      min: 0
    },
    current: {
      type: Number,
      min: 0
    },
    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reading", readingSchema);
