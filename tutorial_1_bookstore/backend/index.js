import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoute from './routes/bookRoute.js';
import cors from "cors";

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware handling Cors
app.use(cors());
// option 2 : allow Custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get("/", (req, res) => {
  console.log(req.method, req.url);
  return res.status(200).send("Welcome To MERN Stack");
});

app.use('/books', bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
