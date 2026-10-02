const Reading = require("../models/Reading");
const Device = require("../models/Device");

async function createReading(req, res, next) {
  try {
    const { device, energyKwh, voltage, current, recordedAt } = req.body;

    const deviceDoc = await Device.findOne({
      _id: device,
      user: req.user.id
    });

    if (!deviceDoc) {
      return res.status(404).json({ message: "Device not found" });
    }

    const reading = await Reading.create({
      user: req.user.id,
      device,
      energyKwh,
      voltage,
      current,
      recordedAt
    });

    const io = req.app.get("io");

    io.to(`user:${req.user.id}`).emit("usageUpdate", reading);

    io.emit("liveUsage", {
      userId: req.user.id,
      reading
    });

    res.status(201).json({
      message: "Reading logged successfully",
      reading
    });
  } catch (error) {
    next(error);
  }
}

async function getReadings(req, res, next) {
  try {
    const filter = { user: req.user.id };

    if (req.query.from || req.query.to) {
      filter.recordedAt = {};
      if (req.query.from) filter.recordedAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.recordedAt.$lte = new Date(req.query.to);
    }

    const readings = await Reading.find(filter)
      .populate("device", "name type room")
      .sort({ recordedAt: -1 });

    res.json({ count: readings.length, readings });
  } catch (error) {
    next(error);
  }
}

async function getReadingsByDevice(req, res, next) {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    const readings = await Reading.find({
      user: req.user.id,
      device: req.params.id
    }).sort({ recordedAt: -1 });

    res.json({ device, count: readings.length, readings });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createReading,
  getReadings,
  getReadingsByDevice
};
