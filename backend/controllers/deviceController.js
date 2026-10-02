const Device = require("../models/Device");

async function getDevices(req, res, next) {
  try {
    const devices = await Device.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: devices.length, devices });
  } catch (error) {
    next(error);
  }
}

async function getDevice(req, res, next) {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json(device);
  } catch (error) {
    next(error);
  }
}

async function createDevice(req, res, next) {
  try {
    const device = await Device.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      message: "Device created successfully",
      device
    });
  } catch (error) {
    next(error);
  }
}

async function updateDevice(req, res, next) {
  try {
    const device = await Device.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json({
      message: "Device updated successfully",
      device
    });
  } catch (error) {
    next(error);
  }
}

async function deleteDevice(req, res, next) {
  try {
    const device = await Device.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json({ message: "Device deleted successfully" });
  } catch (error) {
    next(error);
  }
}

async function controlDevice(req, res, next) {
  try {
    const { status } = req.body;

    if (!["on", "off"].includes(status)) {
      return res.status(400).json({
        message: "status must be either on or off"
      });
    }

    const device = await Device.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true, runValidators: true }
    );

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    req.app.get("io").to(`user:${req.user.id}`).emit("deviceStatusUpdate", device);

    res.json({
      message: `Device turned ${status}`,
      device
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  controlDevice
};
