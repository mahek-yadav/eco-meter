const router = require("express").Router();
const {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  controlDevice
} = require("../controllers/deviceController");
const { protect } = require("../middleware/authMiddleware");
const { required } = require("../middleware/validate");

router.use(protect);

router.get("/", getDevices);
router.get("/:id", getDevice);
router.post("/", required(["name", "type"]), createDevice);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);
router.post("/:id/control", required(["status"]), controlDevice);

module.exports = router;
