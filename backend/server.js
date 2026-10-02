require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const { initializeFirebase } = require("./config/firebase");

const authRoutes = require("./routes/authRoutes");
const readingRoutes = require("./routes/readingRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const billRoutes = require("./routes/billRoutes");
const tipRoutes = require("./routes/tipRoutes");
const alertRoutes = require("./routes/alertRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.set("io", io);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "EcoMeter API is running",
    status: "success",
    socket: "Socket.io enabled"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/readings", readingRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("joinUserRoom", (userId) => {
    if (userId) {
      socket.join(`user:${userId}`);
      socket.emit("joinedRoom", { room: `user:${userId}` });
    }
  });

  socket.on("deviceControl", (data) => {
    io.emit("deviceControlUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB();
  initializeFirebase();

  httpServer.listen(PORT, () => {
    console.log(`EcoMeter API running on http://localhost:${PORT}`);
    console.log(`Socket.io running on the same server`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
