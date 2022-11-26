import mongoose from "mongoose";

const requestsSchema = new mongoose.Schema(
  {
    // applicant: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    applicant: { type: String, required: true },
    club: {
      type: String,
      required: true,
      enum: [
        /* list of clubs, WCE */
        "Walchand Linux Users' Group",
        "Association of Computer Science and Engineering Students",
        "Student Association of Information Technology",
        "Google Developer Students' Club",
        "ACM Student Chapter",
      ],
    },
    resources: {
      list: {
        type: [String],
        required: true,
        validate: [
          (val) => val.length >= 1,
          "${PATH} should atleast have 1 resource",
        ],
      },
      department: { type: String, required: true },
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
              enum: ["representative", "advisor", "hod", "helper", "admin"],
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
