# EcoMeter

EcoMeter is a full-stack energy monitoring and management application designed to help users monitor electricity consumption, manage connected devices, calculate electricity bills, receive personalized energy-saving recommendations, and get real-time usage alerts.

---

## 🔗 Live Links

- **Live Frontend:** https://ecometer-energyusagemonitor.netlify.app
- **Live Backend/API:** https://eco-meter-backend.onrender.com
- **Backend Health Check:** https://eco-meter-backend.onrender.com/api/health

---

# 📌 Project Overview

EcoMeter provides a centralized platform for monitoring and managing energy consumption.

The system allows users to:

- Register and log in securely
- Add and manage energy-consuming devices
- Turn devices ON/OFF
- Log energy consumption readings
- Monitor energy usage through a dashboard
- Calculate electricity bills
- Analyze recent energy consumption
- Receive personalized energy-saving recommendations
- View general energy-saving tips
- Set usage-based alerts
- Receive browser push notifications
- View real-time device status updates without refreshing the page

---

# ✨ Features

## 1. User Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- User roles including user and admin
- Firebase authentication support

## 2. Device Management

Users can:

- Create devices
- View their devices
- Turn devices ON/OFF
- Monitor device status

Device status changes are synchronized in real time using Socket.IO.

## 3. Energy Usage Tracking

Users can log energy consumption readings.

Each reading can be used to:

- Track electricity consumption
- Analyze recent usage
- Calculate average usage
- Generate personalized recommendations

## 4. Dashboard

The dashboard provides an overview of:

- Total energy usage
- Recent readings
- Device information
- Electricity cost
- Usage statistics

## 5. Electricity Bill Calculation

EcoMeter allows users to enter an electricity rate and calculate the estimated electricity cost based on energy consumption.

## 6. Personalized Energy Tips

EcoMeter analyzes recent energy readings and generates recommendations based on the user's average energy consumption.

The recommendations change according to the user's recent usage level.

For example:

- Low usage → efficiency recommendations
- Moderate usage → standby power and lighting recommendations
- High usage → high-consumption device and cooling recommendations

The system also displays:

- Number of readings analyzed
- Average energy usage
- Personalized recommendations

## 7. General Energy-Saving Tips

The system also supports general energy-saving tips covering areas such as:

- Lighting
- Cooling
- Electronics
- Appliances
- General energy conservation
- Energy monitoring

Administrators can add new tips.

## 8. Real-Time Communication

Socket.IO is used to provide real-time updates.

For example, when a device is turned ON or OFF in one browser tab, the updated status can appear in another connected tab without manually refreshing the page.

## 9. Usage Alerts

EcoMeter can detect when energy consumption exceeds a configured threshold.

The system can:

- Create a usage alert
- Send the alert through Socket.IO
- Send a Firebase Cloud Messaging notification

## 10. Browser Push Notifications

Firebase Cloud Messaging is used for browser notifications.

The system supports:

- Browser notification permission
- FCM device token registration
- Test notifications
- Usage alert notifications
- Foreground notifications
- Background notifications using a Firebase messaging service worker

---

# 🛠️ Technologies Used

## Frontend

- React
- Vite
- React Router
- Axios
- Socket.IO Client
- Firebase
- Lucide React
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Firebase Admin SDK
- Socket.IO
- CORS

## Database

- MongoDB Atlas

## Authentication & Notifications

- Firebase Authentication
- Firebase Cloud Messaging

## Deployment

- Netlify — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

# 📁 Project Structure

```text
eco-meter/
│
├── backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── firebase.js
│   │
│   ├── controllers/
│   │   ├── alertController.js
│   │   ├── authController.js
│   │   ├── billController.js
│   │   ├── deviceController.js
│   │   ├── notificationController.js
│   │   ├── readingController.js
│   │   └── tipController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── Alert.js
│   │   ├── Device.js
│   │   ├── Reading.js
│   │   ├── Tip.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── alertRoutes.js
│   │   ├── authRoutes.js
│   │   ├── billRoutes.js
│   │   ├── deviceRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── readingRoutes.js
│   │   └── tipRoutes.js
│   │
│   ├── package.json
│   ├── server.js
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │   ├── _redirects
│   │   └── firebase-messaging-sw.js
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── firebase.js
│   │   ├── messaging.js
│   │   ├── socket.js
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── index.html
│   ├── netlify.toml
│   └── .env
│
├── .gitignore
└── README.md


# EcoMeter Backend 

Backend project for Case Study 45 using:

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Firebase Authentication / Firebase Admin SDK
- Socket.io
- Firebase Cloud Messaging
- Modular routes, controllers, models and middleware

## 1. Prerequisites

Install:

1. Node.js 18+
2. MongoDB Community Server OR a MongoDB Atlas account
3. VS Code
4. Postman
5. A Firebase project (needed for Firebase features)

Check Node:

```bash
node -v
npm -v
```

## 2. Install dependencies

Inside the project folder:

```bash
npm install
```

## 3. Configure environment variables

Copy `.env.example` to `.env`.

Example:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/eco_meter
JWT_SECRET=my_super_secret_key_123
CLIENT_URL=http://localhost:4000
FIREBASE_SERVICE_ACCOUNT_JSON=
```

For MongoDB Atlas, replace `MONGO_URI` with the Atlas connection string.

## 4. Run the project

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Open:

`http://localhost:4000`

Health check:

`http://localhost:4000/api/health`

## 5. Authentication flow

### Normal JWT

1. POST `/api/auth/register`
2. POST `/api/auth/login`
3. Copy the returned JWT token.
4. In Postman use:

```text
Authorization: Bearer YOUR_TOKEN
```

### Firebase Authentication

Create a Firebase project and enable an authentication provider such as Email/Password.

Generate a Firebase Admin service account from Firebase Console > Project settings > Service accounts.

Put the service account JSON into `FIREBASE_SERVICE_ACCOUNT_JSON` as one line.

The backend endpoint:

`POST /api/auth/firebase-login`

accepts:

```json
{
  "idToken": "FIREBASE_ID_TOKEN"
}
```

The backend verifies the Firebase ID token and returns its own JWT.

## 6. Main API endpoints

### Auth

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/firebase-login`

### Readings

- POST `/api/readings`
- GET `/api/readings`
- GET `/api/readings/device/:id`

### Devices

- GET `/api/devices`
- GET `/api/devices/:id`
- POST `/api/devices`
- PUT `/api/devices/:id`
- DELETE `/api/devices/:id`
- POST `/api/devices/:id/control`

### Bills

- GET `/api/bills`
- GET `/api/bills/predict`
- GET `/api/bills/monthly`

Optional query examples:

`/api/bills/predict?days=30&ratePerKwh=8`

`/api/bills/monthly?year=2026&month=9&ratePerKwh=8`

### Tips

- GET `/api/tips`
- POST `/api/tips` (admin only)

### Alerts

- GET `/api/alerts`
- POST `/api/alerts/check`

### Notifications

- POST `/api/notifications/send`

Firebase Admin must be configured for this endpoint.

## 7. Socket.io

Socket.io uses the same server and port.

Client example:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("liveUsage", (data) => {
  console.log("Live usage:", data);
});

socket.on("usageUpdate", (reading) => {
  console.log("Usage update:", reading);
});
```

For user-specific updates:

```javascript
socket.emit("joinUserRoom", "USER_ID");
```

When a reading is created, the server emits:

- `usageUpdate`
- `liveUsage`

When a high-usage alert is created:

- `usageAlert`

When a device is controlled:

- `deviceStatusUpdate`

## 8. Testing order in Postman

1. Register user.
2. Login and copy token.
3. Create device.
4. Copy device `_id`.
5. Create reading using that device ID.
6. Get readings.
7. Check readings by device.
8. Predict bill.
9. Get monthly bill.
10. Get tips.
11. If testing admin features, promote your test user to `admin` in MongoDB/Compass, then use the same JWT to add a tip.
12. Check an alert using a reading ID.
13. Test device control.
14. Test notification after configuring Firebase.

## 9. Example request bodies

### Register

```json
{
  "name": "Mahek",
  "email": "mahek@example.com",
  "password": "123456"
}
```

### Create device

```json
{
  "name": "Air Conditioner",
  "type": "AC",
  "room": "Bedroom",
  "powerRatingWatts": 1500
}
```

### Create reading

```json
{
  "device": "DEVICE_ID",
  "energyKwh": 2.5,
  "voltage": 230,
  "current": 6.5
}
```

### Control device

```json
{
  "status": "on"
}
```

### Check alert

```json
{
  "readingId": "READING_ID",
  "thresholdKwh": 2
}
```

### Create tip as admin

```json
{
  "title": "Switch off unused appliances",
  "description": "Turn off appliances when they are not being used.",
  "category": "saving",
  "estimatedSavingPercent": 10
}
```

## 10. Project structure

```text
eco-meter/
├── config/
│   ├── db.js
│   └── firebase.js
├── controllers/
│   ├── alertController.js
│   ├── authController.js
│   ├── billController.js
│   ├── deviceController.js
│   ├── notificationController.js
│   ├── readingController.js
│   └── tipController.js
├── middleware/
│   ├── authMiddleware.js
│   └── validate.js
├── models/
│   ├── Alert.js
│   ├── Device.js
│   ├── Reading.js
│   ├── Tip.js
│   └── User.js
├── routes/
│   ├── alertRoutes.js
│   ├── authRoutes.js
│   ├── billRoutes.js
│   ├── deviceRoutes.js
│   ├── notificationRoutes.js
│   ├── readingRoutes.js
│   └── tipRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── postman_collection.json
├── README.md
└── server.js
```

## 11. Deployment on Render

1. Push the project to GitHub.
2. Go to Render and create a new Web Service.
3. Connect the GitHub repository.
4. Build command:

```bash
npm install
```

5. Start command:

```bash
npm start
```

6. Add environment variables in Render:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`
   - `FIREBASE_SERVICE_ACCOUNT_JSON`
   - `PORT` (Render can provide its own port; the code already uses `process.env.PORT`)

7. Deploy.
8. Test:

```text
https://YOUR-RENDER-URL.onrender.com/
```

and:

```text
https://YOUR-RENDER-URL.onrender.com/api/health
```

## 12. Important security note

Do NOT upload `.env`, Firebase service-account JSON files, passwords, or secret keys to GitHub.

The project includes `.gitignore` entries for these sensitive files.
