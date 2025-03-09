const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/uber-videos";

async function connectToDb() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if connection fails
  }
}

module.exports = connectToDb;
