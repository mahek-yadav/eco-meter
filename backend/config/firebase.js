const admin = require("firebase-admin");

let firebaseReady = false;

function initializeFirebase() {
  if (firebaseReady || admin.apps.length > 0) {
    firebaseReady = true;
    return;
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    console.log("Firebase Admin not configured. Firebase features will be disabled.");
    return;
  }

  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    firebaseReady = true;
    console.log("Firebase Admin initialized");
  } catch (error) {
    console.error("Firebase initialization failed:", error.message);
  }
}

function isFirebaseReady() {
  return firebaseReady && admin.apps.length > 0;
}

module.exports = {
  admin,
  initializeFirebase,
  isFirebaseReady
};
