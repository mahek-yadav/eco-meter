const router = require("express").Router();
const {
  getBills,
  predictBill,
  getMonthlyBill
} = require("../controllers/billController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getBills);
router.get("/predict", predictBill);
router.get("/monthly", getMonthlyBill);

module.exports = router;
