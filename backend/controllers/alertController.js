const Reading = require("../models/Reading");
const Alert = require("../models/Alert");
const User = require("../models/User");

const {
  admin,
  isFirebaseReady
} = require("../config/firebase");

async function getAlerts(req, res, next) {
  try {
    const alerts = await Alert.find({
      user: req.user.id
    })
      .populate("device", "name type")
      .sort({ createdAt: -1 });

    res.json({
      count: alerts.length,
      alerts
    });
  } catch (error) {
    next(error);
  }
}

async function checkAlert(req, res, next) {
  try {
    const {
      readingId,
      thresholdKwh
    } = req.body;

    const threshold = Number(thresholdKwh);

    if (!readingId) {
      return res.status(400).json({
        message: "readingId is required"
      });
    }

    if (!threshold || threshold <= 0) {
      return res.status(400).json({
        message:
          "thresholdKwh must be greater than 0"
      });
    }

    const reading = await Reading.findOne({
      _id: readingId,
      user: req.user.id
    }).populate(
      "device",
      "name type"
    );

    if (!reading) {
      return res.status(404).json({
        message: "Reading not found"
      });
    }

    /*
     * Check whether the reading crosses
     * the selected threshold.
     */
    if (reading.energyKwh <= threshold) {
      return res.json({
        alertTriggered: false,

        message:
          "Usage is within the threshold.",

        reading
      });
    }

    /*
     * Create the database alert.
     */
    const alert = await Alert.create({
      user: req.user.id,
      device: reading.device?._id,
      reading: reading._id,
      thresholdKwh: threshold,
      actualKwh: reading.energyKwh,
      message:
        `High energy usage detected: ` +
        `${reading.energyKwh} kWh`
    });

    /*
     * Send real-time Socket.io alert.
     */
    req.app
      .get("io")
      .to(`user:${req.user.id}`)
      .emit(
        "usageAlert",
        alert
      );

    /*
     * Find the user's saved FCM token.
     */
    const user = await User.findById(
      req.user.id
    ).select("fcmToken");

    let pushNotificationSent = false;

    if (
      isFirebaseReady() &&
      user?.fcmToken
    ) {
      try {
        const deviceName =
          reading.device?.name ||
          "your device";

        const fcmMessage = {
          notification: {
            title:
              "EcoMeter Usage Alert",

            body:
              `${deviceName} used ` +
              `${reading.energyKwh} kWh, ` +
              `which is above your ` +
              `${threshold} kWh threshold.`
          },

          data: {
            type: "usage_alert",

            readingId:
              String(reading._id),

            alertId:
              String(alert._id),

            energyKwh:
              String(reading.energyKwh),

            thresholdKwh:
              String(threshold)
          },

          token: user.fcmToken
        };

        const messageId =
          await admin
            .messaging()
            .send(fcmMessage);

        console.log(
          "Usage alert push notification sent:",
          messageId
        );

        pushNotificationSent = true;
      } catch (firebaseError) {
        console.error(
          "Usage alert FCM error:",
          firebaseError
        );

        /*
         * If the browser token has expired,
         * remove it so a new one can be
         * registered later.
         */
        if (
          firebaseError.code ===
          "messaging/registration-token-not-registered"
        ) {
          await User.findByIdAndUpdate(
            req.user.id,
            {
              $set: {
                fcmToken: null
              }
            }
          );

          console.log(
            "Invalid FCM token removed from user."
          );
        }
      }
    } else {
      console.log(
        "FCM notification not sent:",
        !isFirebaseReady()
          ? "Firebase Admin is not ready"
          : "User has no FCM token"
      );
    }

    res.status(201).json({
      alertTriggered: true,

      message:
        "High energy usage alert triggered.",

      alert,

      pushNotificationSent,

      reading
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAlerts,
  checkAlert
};