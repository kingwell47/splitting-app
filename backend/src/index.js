import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config(); // Enables .env file
const app = express(); // Initializes the server

const port = process.env.PORT;

app.use(express.json()); // Enables extracting json data from req.body
app.use(cookieParser()); // Enables parsing of cookies

app.use("/api/auth", authRoutes); // Routes for Signup, Login, Logout
app.use("/api/user", userRoutes); // Routes for user related stuff
app.use("/api/groups", () => {}); // Routes for groups
app.use("/api/expenses", () => {}); // Routes for expenses

app.listen(port, () => {
  console.log("Server is running on PORT: " + port);
  connectDB();
});
