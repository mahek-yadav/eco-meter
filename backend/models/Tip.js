const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: "general"
    },
    estimatedSavingPercent: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tip", tipSchema);
