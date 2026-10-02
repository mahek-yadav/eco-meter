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

⚙️ Prerequisites
Before running the project locally, install:
Node.js
npm
MongoDB Atlas account
Firebase project
Git
🚀 Installation and Setup
Step 1: Clone the Repository
git clone https://github.com/mahek-yadav/eco-meter.git
Move into the project:
cd eco-meter
🔧 Backend Setup
Step 2: Open the Backend Folder
cd backend
Install the backend dependencies:
npm install
Step 3: Configure Backend Environment Variables
Create a file named:
.env
inside the backend folder.
Add:
PORT=4000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

FIREBASE_SERVICE_ACCOUNT_JSON=your_firebase_service_account_json
Environment Variables
Variable	Description
PORT	Port used by the backend
MONGO_URI	MongoDB Atlas connection string
JWT_SECRET	Secret used for JWT authentication
CLIENT_URL	Frontend URL used for CORS and Socket.IO
FIREBASE_SERVICE_ACCOUNT_JSON	Firebase Admin service account configuration
Do not commit the .env file to GitHub.
▶️ Start the Backend
From the backend folder:
npm start
For development:
npm run dev
The backend will run at:
http://localhost:4000
🧪 Backend Health Check
Open:
http://localhost:4000/api/health
A successful response should look like:
{
  "status": "ok",
  "database": "connected"
}
The root endpoint can also be checked at:
http://localhost:4000/
💻 Frontend Setup
Step 4: Open a New Terminal
From the project root:
cd frontend
Install frontend dependencies:
npm install
🔐 Frontend Environment Variables
Create:
.env
inside the frontend folder.
Add:
VITE_API_URL=http://localhost:4000/api

VITE_SOCKET_URL=http://localhost:4000

VITE_FIREBASE_API_KEY=your_firebase_api_key

VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain

VITE_FIREBASE_PROJECT_ID=your_firebase_project_id

VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id

VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_FIREBASE_VAPID_KEY=your_firebase_vapid_key
These values should be obtained from the Firebase project configuration.
▶️ Start the Frontend
From the frontend folder:
npm run dev
The frontend will normally run at:
http://localhost:5173
🔗 Local Application
Once both servers are running:
Frontend:
http://localhost:5173

Backend:
http://localhost:4000

Backend Health:
http://localhost:4000/api/health
🔔 Firebase Notifications Setup
EcoMeter uses Firebase Cloud Messaging for browser notifications.
The frontend contains:
frontend/public/firebase-messaging-sw.js
The service worker handles background notifications.
The browser must have notification permission enabled for push notifications to work.
🌐 Production Deployment
Frontend — Netlify
The frontend is deployed on Netlify.
Build Command
npm run build
Publish Directory
dist
Frontend Environment Variables
The following variables must be configured in Netlify:
VITE_API_URL
VITE_SOCKET_URL
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_VAPID_KEY
For production:
VITE_API_URL=https://YOUR-RENDER-BACKEND-URL/api

VITE_SOCKET_URL=https://YOUR-RENDER-BACKEND-URL
🖥️ Backend — Render
The backend is deployed on Render.
Root Directory
backend
Build Command
npm install
Start Command
npm start
Backend Environment Variables
Configure the following variables in Render:
PORT
MONGO_URI
JWT_SECRET
CLIENT_URL
FIREBASE_SERVICE_ACCOUNT_JSON
For production:
CLIENT_URL=https://YOUR-NETLIFY-FRONTEND-URL
🗄️ Database
EcoMeter uses MongoDB Atlas.
The backend connects to MongoDB using:
MONGO_URI
The database stores information such as:
Users
Devices
Energy readings
Tips
Alerts
🔐 Security
Sensitive configuration values are stored using environment variables.
The following files should not be committed to GitHub:
backend/.env
frontend/.env
The .gitignore file prevents these files and dependency folders from being uploaded.
Sensitive backend credentials such as the Firebase Admin service account and MongoDB connection string must never be placed directly in the source code.
📡 API Modules
The backend provides REST API modules for:
/api/auth
/api/readings
/api/devices
/api/bills
/api/tips
/api/alerts
/api/notifications
The backend also provides:
/api/health
for checking server and database status.
🔄 Real-Time Communication
Socket.IO provides real-time communication between the frontend and backend.
It is used for:
Device status updates
Real-time usage events
Usage alerts
Users do not need to refresh the page to see supported real-time changes.
📊 Usage Analysis
EcoMeter analyzes recent energy readings to calculate:
Number of readings analyzed
Average energy consumption
Based on the recent average usage, personalized recommendations are generated.
The recommendations are intended to help users reduce unnecessary electricity consumption.
🧪 Testing the Application
The following workflow can be used to test the application:
Authentication
Register a new user.
Log in.
Access the dashboard.
Devices
Create a device.
Turn the device ON.
Turn the device OFF.
Open the application in another browser tab and verify real-time updates.
Energy Usage
Add an energy reading.
Open the dashboard.
Verify the usage statistics.
Open the Tips page.
Verify the usage analysis and personalized recommendations.
Bills
Set the electricity rate.
Check the calculated electricity cost.
Alerts
Configure a usage threshold.
Add a reading above the threshold.
Verify that an alert is generated.
Notifications
Allow browser notifications.
Register the browser for notifications.
Send a test notification.
Verify the browser notification.
📌 Deployment URLs
Update the following section after deployment:
Frontend:
YOUR_NETLIFY_URL

Backend:
YOUR_RENDER_URL

Backend Health:
YOUR_RENDER_URL/api/health

GitHub:
https://github.com/mahek-yadav/eco-meter
👩‍💻 Author
Mahek Yadav
BTech CSE
ITM Skills University
📄 Project Type
Academic Full-Stack Project
📚 Summary
EcoMeter combines a React frontend with a Node.js/Express backend, MongoDB database, Firebase services, and Socket.IO real-time communication to provide an energy monitoring and management platform.
The project demonstrates:
Full-stack web development
REST API development
Database integration
Authentication
Real-time communication
Energy usage analysis
Push notifications
Cloud deployment
