const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// const applicationRoutes = require("./routes/applicationRoutes");
// app.use("/api/applications", applicationRoutes);

// create user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes); 
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes); // Always mount routes outside DB connect

// ✅ Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB via Mongoose");
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });
