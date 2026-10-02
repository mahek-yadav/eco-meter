require("dotenv").config();

const mongoose = require("mongoose");
const Tip = require("./models/Tip");

const tips = [
  {
    title: "Switch off unused appliances",
    description:
      "Turn off lights, fans, TVs, and other appliances when they are not being used.",
    category: "general",
    estimatedSavingPercent: 10
  },
  {
    title: "Use LED lighting",
    description:
      "Replace traditional bulbs with LED bulbs to reduce electricity consumption.",
    category: "lighting",
    estimatedSavingPercent: 15
  },
  {
    title: "Optimize AC temperature",
    description:
      "Set your air conditioner around 24–26°C and avoid unnecessarily low temperatures.",
    category: "cooling",
    estimatedSavingPercent: 20
  },
  {
    title: "Avoid standby power",
    description:
      "Unplug chargers and electronic devices when they are not being used for long periods.",
    category: "electronics",
    estimatedSavingPercent: 5
  },
  {
    title: "Use appliances efficiently",
    description:
      "Run high-energy appliances such as washing machines and dishwashers with full loads.",
    category: "appliances",
    estimatedSavingPercent: 12
  },
  {
    title: "Monitor high-energy devices",
    description:
      "Check your EcoMeter readings regularly to identify devices that consume more electricity.",
    category: "monitoring",
    estimatedSavingPercent: 10
  }
];

async function seedTips() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Tip.deleteMany({});

    await Tip.insertMany(tips);

    console.log("Tips added successfully.");
    console.log(`Total tips: ${tips.length}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding tips:", error.message);
    process.exit(1);
  }
}

seedTips();