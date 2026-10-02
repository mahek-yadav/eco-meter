const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device"
    },
    reading: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reading"
    },
    thresholdKwh: {
      type: Number,
      required: true,
      min: 0
    },
    actualKwh: {
      type: Number,
      required: true,
      min: 0
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["active", "read"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
