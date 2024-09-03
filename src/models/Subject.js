import mongoose from "mongoose";

// In school db
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

export default mongoose.models.Subject ||
  mongoose.model("Subject", subjectSchema);
