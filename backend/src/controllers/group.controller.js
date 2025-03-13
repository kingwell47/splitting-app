import Group from "../models/group.model.js";
import User from "../models/user.model.js";

export const createGroup = async (req, res) => {
  const { groupName, description, memberIds } = req.body;
  try {
    if (!groupName || !description || !memberIds) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const members = await User.find({ _id: { $in: memberIds } });
    const group = new Group({ groupName, description, members });
  } catch (error) {}
};
