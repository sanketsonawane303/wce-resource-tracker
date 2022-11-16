import mongoose from "mongoose";

const requestsSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    resource: { type: String, required: true },
    time: {
      type: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
      },
    },
    letter: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved", "declined", "pending"],
      default: "pending",
    },
    approvals: [
      {
        type: new mongoose.Schema(
          {
            approver: { type: String, required: true },
            status: {
              type: String,
              enum: ["approved", "declined", "pending"],
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
  },
  { timestamps: true }
);

export default mongoose.model("requests", requestsSchema);
