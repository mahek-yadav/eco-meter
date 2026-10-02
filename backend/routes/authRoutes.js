const router = require("express").Router();
const { register, login, firebaseLogin } = require("../controllers/authController");
const { required } = require("../middleware/validate");

router.post("/register", required(["name", "email", "password"]), register);
router.post("/login", required(["email", "password"]), login);
router.post("/firebase-login", firebaseLogin);

module.exports = router;
