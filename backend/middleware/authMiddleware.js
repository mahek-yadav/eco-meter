const jwt = require("jsonwebtoken");
const { admin, isFirebaseReady } = require("../config/firebase");

async function protect(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  const token = header.split(" ")[1];

  // First try the application's JWT.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
      authType: "jwt"
    };
    return next();
  } catch (jwtError) {
    // If JWT fails, optionally try a Firebase ID token.
  }

  if (isFirebaseReady()) {
    try {
      const decodedFirebase = await admin.auth().verifyIdToken(token);
      req.user = {
        id: decodedFirebase.uid,
        firebaseUid: decodedFirebase.uid,
        email: decodedFirebase.email,
        role: decodedFirebase.role || "user",
        authType: "firebase"
      };
      return next();
    } catch (firebaseError) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  return res.status(401).json({ message: "Invalid or expired token" });
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}

module.exports = { protect, authorize };
