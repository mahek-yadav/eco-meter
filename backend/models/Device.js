const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    room: {
      type: String,
      trim: true
    },
    powerRatingWatts: {
      type: Number,
      min: 0
    },
    status: {
      type: String,
      enum: ["on", "off"],
      default: "off"
    },
    isOnline: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
