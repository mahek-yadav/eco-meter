const router = require("express").Router();
const { getTips, createTip } = require("../controllers/tipController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { required } = require("../middleware/validate");

router.get("/", protect, getTips);

router.post(
  "/",
  protect,
  authorize("admin"),
  required(["title", "description"]),
  createTip
);

module.exports = router;
