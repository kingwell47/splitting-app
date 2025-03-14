import Group from "../models/group.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const checkGroupMembership = async (req, res, next) => {
  try {
    const groupId = req.params.groupId; // Assuming groupId is passed as a URL parameter
    const userId = req.user.id; // Assuming user ID is available in req.user

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ error: "Invalid Group ID" });
    }

    // Check first if the group is in the user's list of groups
    const user = await User.findOne({ _id: userId, groups: groupId });
    if (!user) {
      return res
        .status(403)
        .json({ error: "Access denied: You are not a member of this group" });
    }

    // Find the group by ID and check if the user is a member
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if the user's ID is in the group's members array
    const isMember = group.members.includes(userId);
    if (!isMember) {
      return res
        .status(403)
        .json({ error: "Access denied: You are not a member of this group" });
    }

    // User is a member; proceed to the next middleware or route handler
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while verifying group membership" });
  }
};
