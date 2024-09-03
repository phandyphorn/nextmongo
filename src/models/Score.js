import mongoose from "mongoose";

// In school db
const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
});

export default mongoose.models.Score || mongoose.model("Score", scoreSchema);
