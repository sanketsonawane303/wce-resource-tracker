import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    mode: { type: String, enum: ["online", "offline"], default: "offline" },
    type: {
      type: String,
      enum: ["clubService", "bootcamp", "megaEvent", "event"],
      default: "event",
    },
    level: {
      type: String,
      enum: ["national", "state", "inter-national", "college"],
      default: "college",
    },
    description: { type: String, required: true },
    tags: { type: [String] },
    duration: { type: String, required: true },
    fees: { type: String, required: true },
    poster: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("events", eventsSchema);
