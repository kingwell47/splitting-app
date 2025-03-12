import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";

dotenv.config(); //Enables .env file
const app = express(); //Initializes the server

const port = process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("Server is running on PORT: " + port);
  connectDB();
});
