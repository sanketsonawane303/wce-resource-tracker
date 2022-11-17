import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    unique: true,
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
  hod: { type: String, required: true },
});

export default mongoose.model("departments", departmentsSchema);
