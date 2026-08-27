require("dotenv").config(); // line 1

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// import mongoose from "mongoose";
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
console.log("MONGO URI VALUE:", process.env.MONGO_URI);
// 🔥 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));
// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "online"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});