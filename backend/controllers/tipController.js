const Tip = require("../models/Tip");
const Reading = require("../models/Reading");

async function getTips(req, res, next) {
  try {
    // Get general tips from database
    const tips = await Tip.find().sort({ createdAt: -1 });

    // Get this user's recent readings
    const readings = await Reading.find({
      user: req.user.id
    })
      .populate("device", "name type")
      .sort({ recordedAt: -1 })
      .limit(10);

    let averageKwh = 0;

    if (readings.length > 0) {
      const totalKwh = readings.reduce(
        (sum, reading) =>
          sum + Number(reading.energyKwh || 0),
        0
      );

      averageKwh = totalKwh / readings.length;
    }

    const recommendations = [];

    // No usage recorded yet
    if (readings.length === 0) {
      recommendations.push({
        title: "Start logging your energy usage",
        description:
          "Log some energy readings so EcoMeter can analyze your usage and provide personalized recommendations.",
        category: "getting started"
      });
    }

    // Low usage
    else if (averageKwh <= 1) {
      recommendations.push({
        title: "Great energy efficiency!",
        description:
          `Your recent average usage is ${averageKwh.toFixed(
            2
          )} kWh. Keep maintaining your current energy-saving habits.`,
        category: "efficiency"
      });

      recommendations.push({
        title: "Use natural light",
        description:
          "Switch off lights during the day when natural sunlight is sufficient.",
        category: "lighting"
      });
    }

    // Medium usage
    else if (averageKwh <= 3) {
      recommendations.push({
        title: "Reduce standby power",
        description:
          `Your recent average usage is ${averageKwh.toFixed(
            2
          )} kWh. Unplug chargers and switch off electronics when they are not being used.`,
        category: "electronics"
      });

      recommendations.push({
        title: "Use LED lighting",
        description:
          "Replace traditional bulbs with LED bulbs to reduce electricity consumption.",
        category: "lighting"
      });
    }

    // High usage
    else {
      recommendations.push({
        title: "High energy usage detected",
        description:
          `Your recent average usage is ${averageKwh.toFixed(
            2
          )} kWh. Check which devices are consuming the most electricity.`,
        category: "high usage"
      });

      recommendations.push({
        title: "Optimize your cooling usage",
        description:
          "If you use an AC or fan frequently, avoid unnecessary operation and use a moderate AC temperature.",
        category: "cooling"
      });

      recommendations.push({
        title: "Monitor high-consumption devices",
        description:
          "Check your recent readings and identify devices with consistently high energy consumption.",
        category: "monitoring"
      });
    }

    res.json({
      count: tips.length,
      tips,
      usage: {
        readingsCount: readings.length,
        averageKwh: Number(averageKwh.toFixed(2))
      },
      recommendations
    });
  } catch (error) {
    next(error);
  }
}

async function createTip(req, res, next) {
  try {
    const tip = await Tip.create(req.body);

    res.status(201).json({
      message: "Tip created successfully",
      tip
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTips,
  createTip
};