import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkGroupMembership } from "../middleware/group.middleware.js";
import {
  createGroup,
  getGroupDetails,
  getUserGroups,
} from "../controllers/group.controller.js";

const router = express.Router();

//Create group
router.post("/", protectRoute, createGroup);
//Get all groups where user is a member
router.get("/", protectRoute, getUserGroups);
//Get the group details
router.get("/:groupId", protectRoute, checkGroupMembership, getGroupDetails);

export default router;
