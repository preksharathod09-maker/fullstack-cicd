const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Full Stack CI/CD Backend is Running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is working properly"
  });
});

app.get("/api/db-health", async (req, res) => {
  try {
    await client.db("admin").command({ ping: 1 });
    res.json({
      status: "success",
      message: "MongoDB connected successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "MongoDB connection failed"
    });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

startServer();