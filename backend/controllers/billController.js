const Reading = require("../models/Reading");

function getMonthRange(year, month) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  return { start, end };
}

async function getBills(req, res, next) {
  try {
    const readings = await Reading.find({ user: req.user.id }).sort({ recordedAt: -1 });

    const totalKwh = readings.reduce((sum, item) => sum + item.energyKwh, 0);

    const ratePerKwh = Number(req.query.ratePerKwh || 8);
    const estimatedBill = totalKwh * ratePerKwh;

    res.json({
      totalReadings: readings.length,
      totalKwh: Number(totalKwh.toFixed(2)),
      ratePerKwh,
      estimatedBill: Number(estimatedBill.toFixed(2))
    });
  } catch (error) {
    next(error);
  }
}

async function predictBill(req, res, next) {
  try {
    const days = Math.max(Number(req.query.days || 30), 1);
    const ratePerKwh = Number(req.query.ratePerKwh || 8);

    const readings = await Reading.find({ user: req.user.id }).sort({
      recordedAt: -1
    });

    if (readings.length === 0) {
      return res.status(400).json({
        message: "Add readings before predicting a bill"
      });
    }

    const totalKwh = readings.reduce((sum, item) => sum + item.energyKwh, 0);
    const firstDate = new Date(readings[readings.length - 1].recordedAt);
    const lastDate = new Date(readings[0].recordedAt);

    const observedDays = Math.max(
      Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24)),
      1
    );

    const averageDailyKwh = totalKwh / observedDays;
    const predictedKwh = averageDailyKwh * days;
    const predictedBill = predictedKwh * ratePerKwh;

    res.json({
      observedDays,
      averageDailyKwh: Number(averageDailyKwh.toFixed(2)),
      predictionDays: days,
      predictedKwh: Number(predictedKwh.toFixed(2)),
      ratePerKwh,
      predictedBill: Number(predictedBill.toFixed(2))
    });
  } catch (error) {
    next(error);
  }
}

async function getMonthlyBill(req, res, next) {
  try {
    const now = new Date();
    const year = Number(req.query.year || now.getFullYear());
    const month = Number(req.query.month || now.getMonth() + 1);
    const ratePerKwh = Number(req.query.ratePerKwh || 8);

    if (month < 1 || month > 12) {
      return res.status(400).json({ message: "month must be between 1 and 12" });
    }

    const { start, end } = getMonthRange(year, month);

    const readings = await Reading.find({
      user: req.user.id,
      recordedAt: { $gte: start, $lt: end }
    });

    const totalKwh = readings.reduce((sum, item) => sum + item.energyKwh, 0);

    res.json({
      year,
      month,
      totalReadings: readings.length,
      totalKwh: Number(totalKwh.toFixed(2)),
      ratePerKwh,
      estimatedBill: Number((totalKwh * ratePerKwh).toFixed(2))
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getBills, predictBill, getMonthlyBill };
