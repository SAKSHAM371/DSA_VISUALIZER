const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/dsa_visualizer")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// 🔐 Auth Routes (NEW)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
