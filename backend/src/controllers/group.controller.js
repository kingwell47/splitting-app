import Group from "../models/group.model.js";
import User from "../models/user.model.js";

export const createGroup = async (req, res) => {
  const { groupName, description, memberIds } = req.body;
  try {
    if (!groupName || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const currentUserId = req.user._id;
    const members = [currentUserId];

    // Validate and add additional members if provided
    if (memberIds && Array.isArray(memberIds)) {
      for (const id of memberIds) {
        // Ensure the ID is valid and not the same as the current user's ID
        if (id !== currentUserId && mongoose.Types.ObjectId.isValid(id)) {
          // Check if the user exists
          const userExists = await User.exists({ _id: id });
          if (userExists) {
            members.push(id);
          } else {
            return res
              .status(404)
              .json({ error: `User with ID ${id} not found` });
          }
        }
      }
    }

    const newGroup = new Group({ groupName, description, members });

    await newGroup.save();

    // Add the group to each member's list of groups
    await User.updateMany(
      { _id: { $in: members } },
      { $push: { groups: newGroup._id } }
    );

    res.status(201).json(newGroup);
  } catch (error) {
    console.log("Error in group controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find groups where the user is a member
    const groups = await Group.find({ members: userId });

    res.status(200).json(groups);
  } catch (error) {
    console.log("Error in group controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGroupDetails = async (req, res) => {
  try {
    //Get group details
    const groupId = req.params.id;
    const userId = req.user._id;

    res.status(200).json(groupId);
  } catch (error) {
    console.log("Error in group controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
