const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./Routes/AuthRoute");

const app = express();
const { MONGO_URL, PORT } = process.env;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", authRoute);

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected successfully");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
