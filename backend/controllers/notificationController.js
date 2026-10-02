const User = require("../models/User");
const admin = require("firebase-admin");

async function registerToken(req, res, next) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "FCM token is required"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        fcmToken: token
      },
      {
        new: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.log(
      "FCM token registered for user:",
      req.user.id
    );

    res.json({
      message:
        "Push notifications enabled successfully."
    });
  } catch (error) {
    next(error);
  }
}

async function sendNotification(req, res, next) {
  try {
    const {
      token,
      title,
      body
    } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "FCM token is required"
      });
    }

    if (!title || !body) {
      return res.status(400).json({
        message:
          "Notification title and body are required"
      });
    }

    const message = {
      notification: {
        title,
        body
      },

      data: {
        type: "test"
      },

      token
    };

    const messageId =
      await admin
        .messaging()
        .send(message);

    console.log(
      "FCM test notification sent:",
      messageId
    );

    res.json({
      message:
        "Test notification sent successfully.",
      messageId
    });
  } catch (error) {
    console.error(
      "FCM send error:",
      error
    );

    /*
     * Convert Firebase errors into useful
     * messages for the frontend.
     */
    if (
      error.code ===
      "messaging/registration-token-not-registered"
    ) {
      return res.status(400).json({
        message:
          "This FCM device token is no longer valid. Enable notifications again."
      });
    }

    if (
      error.code ===
      "messaging/invalid-argument"
    ) {
      return res.status(400).json({
        message:
          "Firebase rejected the notification data or FCM token."
      });
    }

    next(error);
  }
}

module.exports = {
  registerToken,
  sendNotification
};