const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { admin, isFirebaseReady } = require("../config/firebase");

function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    const token = createToken(user);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

async function firebaseLogin(req, res, next) {
  try {
    if (!isFirebaseReady()) {
      return res.status(503).json({
        message: "Firebase Admin is not configured"
      });
    }

    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Firebase idToken is required" });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user && decoded.email) {
      user = await User.findOne({ email: decoded.email });
    }

    if (!user) {
      user = await User.create({
        name: decoded.name || decoded.email?.split("@")[0] || "Firebase User",
        email: decoded.email || `${decoded.uid}@firebase.local`,
        password: await bcrypt.hash(`firebase-${decoded.uid}`, 10),
        firebaseUid: decoded.uid
      });
    } else if (!user.firebaseUid) {
      user.firebaseUid = decoded.uid;
      await user.save();
    }

    const token = createToken(user);

    res.json({
      message: "Firebase authentication successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, firebaseLogin };
