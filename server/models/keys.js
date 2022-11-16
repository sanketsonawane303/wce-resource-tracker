import mongoose from "mongoose";

const keysSchema = new mongoose.Schema(
  {
    classroom: { type: String, required: true },
    department: {
      type: String,
      required: true,
      enum: [
        "Civil",
        "Mechanical",
        "Electrical",
        "Electronics",
        "Computer Science and Engineering",
        "Information Technology",
        "WCE",
      ],
      default: "WCE",
    },
    key_code: { type: Number, required: true },
    is_available: { type: Boolean, default: false },
    holder_history: { type: [String] },
  },
  { timestamps: true }
);

export default mongoose.model("keys", keysSchema);
