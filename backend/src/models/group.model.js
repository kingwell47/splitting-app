import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    description: String,
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    private: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
