import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import authRoutes from "./routes/AuthRoutes.js";
import mealRoutes from "./routes/MealRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: "30mb", extended: true })); //for send over req
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;

app.use("/auth", authRoutes);
app.use("/meal", mealRoutes);

// app.listen(PORT, () => {
//   console.log(`Server listening at port: ${PORT}`);
// });
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
