import mongoose from "mongoose";

const resourcesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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
    is_available: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("resources", resourcesSchema);
