const router = require("express").Router();
const { getAlerts, checkAlert } = require("../controllers/alertController");
const { protect } = require("../middleware/authMiddleware");
const { required } = require("../middleware/validate");

router.use(protect);

router.get("/", getAlerts);
router.post("/check", required(["readingId", "thresholdKwh"]), checkAlert);

module.exports = router;
