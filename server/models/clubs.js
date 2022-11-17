import mongoose from "mongoose";

const clubsSchema = new mongoose.Schema({
  club: {
    type: String,
    required: true,
    unique: true,
    enum: [
      /* list of clubs, WCE */
    ],
  },
  staff_advisor: { type: String, required: true },
});

export default mongoose.model("clubs", clubsSchema);
