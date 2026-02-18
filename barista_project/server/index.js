const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./Routes/AuthRoute");
const recipeRoute = require("./Routes/RecipeRoute");

const app = express();

// CORS with credentials
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/recipes", recipeRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
