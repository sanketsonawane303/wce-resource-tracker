import mongoose from "mongoose";
import departmentList from "../constants/departments.js";

const resourcesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    department: {
      type: String,
      required: true,
      enum: departmentList,
      default: "WCE",
    },
    is_room: { type: Boolean, required: true },
    capacity: String,
    is_available: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("resources", resourcesSchema);
