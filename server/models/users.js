import mongoose from "mongoose";
import departmentList from "../constants/departments.js";
import clubsList from "../constants/clubs.js";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile_number: {
      type: String,
      trim: true,
      required: [true, "Mobile number is required"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: [
        {
          type: String,
          enum: ["representative", "advisor", "hod", "helper", "admin"],
        },
      ],
      required: true,
      validate: [(val) => val.length >= 1, "{PATH} should atleast have 1 role"],
    },
    department: {
      type: String,
      required: true,
      enum: departmentList,
    },
    representative_club: {
      type: String,
      enum: clubsList,
    },
    advisor_club: [
      {
        type: String,
        enum: clubsList,
      },
    ],
    password: { type: String },
    access_token: { type: String, default: null },
  },
  { timestamps: true }

);


export default mongoose.model("users", usersSchema);
