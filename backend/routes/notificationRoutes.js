const express = require("express");

const {
  registerToken,
  sendNotification
} = require("../controllers/notificationController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/register-token",
  protect,
  registerToken
);

router.post(
  "/send",
  protect,
  sendNotification
);

module.exports = router;