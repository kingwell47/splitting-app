// import User from "../models/user.model.js";

export const viewProfile = (req, res) => {
  try {
    const { email, fullName, profilePic, groups } = req.user;
    res.status(200).json({
      email,
      fullName,
      profilePic,
      groups,
    });
    // Needs more Information: Expenses, Groups, etc
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
