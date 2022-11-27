import mongoose from "mongoose";
import departmentList from "../constants/departments.js";
import clubsList from "../constants/clubs.js";

const requestsSchema = new mongoose.Schema(
  {
    // applicant: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    applicant: { type: String, required: true },
    club: {
      type: String,
      required: true,
      enum: clubsList,
    },
    resources: {
      list: {
        type: [String],
        required: true,
        validate: [
          (val) => val.length >= 1,
          "{PATH} should atleast have 1 resource",
        ],
      },
      department: { type: String, required: true, enum: departmentList },
    },
    time: {
      type: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
      },
      required: true,
    },
    letter: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved", "declined", "pending", "changesRequired"],
      default: "pending",
    },
    approvals: [
      {
        type: new mongoose.Schema(
          {
            approver: { type: String, required: true },
            role: {
              type: String,
              enum: ["advisor", "hod"],
              required: true,
            },
            status: {
              type: String,
              enum: ["approved", "declined", "changesRequired"],
              required: true,
            },
            remarks: { type: String },
          },
          { timestamps: true }
        ),
      },
    ],
    report: { type: String },
    invite_status: { type: Boolean, required: true, default: false },
    key_holder: { photo: String, id_card: String },
  },
  { timestamps: true }
);

export default mongoose.model("requests", requestsSchema);
