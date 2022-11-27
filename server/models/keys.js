import mongoose from "mongoose";
import departmentList from "../constants/departments.js";

const keysSchema = new mongoose.Schema(
  {
    resource_name: { type: String, required: true },
    department: {
      type: String,
      required: true,
      enum: departmentList,
      default: "WCE",
    },
    key_code: { type: Number, required: true },
    is_available: { type: Boolean, default: false },
    holder_history: {
      type: [
        {
          from: { role: { type: String }, email: { type: String } },
          to: { role: { type: String }, email: { type: String } },
          timestamps: { type: Date },
          request_id: mongoose.Types.ObjectId,
          photo: String,
          id_card: String,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("keys", keysSchema);
