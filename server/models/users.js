import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    club: {
      type: String,
      required: true,
      enum: [
        /* list of clubs, WCE */
      ],
    },
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
      type: String,
      required: true,
      enum: ["representative", "advisor", "helper", "admin"],
    },
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
    },
    id_card: { type: String },
    password: { type: String },
    access_token: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("users", usersSchema);
