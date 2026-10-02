const router = require("express").Router();
const {
  createReading,
  getReadings,
  getReadingsByDevice
} = require("../controllers/readingController");
const { protect } = require("../middleware/authMiddleware");
const { required } = require("../middleware/validate");

router.use(protect);

router.post(
  "/",
  required(["device", "energyKwh"]),
  createReading
);

router.get("/", getReadings);
router.get("/device/:id", getReadingsByDevice);

module.exports = router;
