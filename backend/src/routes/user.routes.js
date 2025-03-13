import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { viewProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", protectRoute, viewProfile);

export default router;
