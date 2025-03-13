import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    expenseName: { type: String, required: true },
    amount: { type: Number, required: true },
    category: String,
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    splitDetails: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: Number,
      },
    ],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
