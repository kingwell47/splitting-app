import express from "express";

import authRoutes from "./routes/auth.routes.js";

const app = express();

const port = 5001;

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
