import mongoose from "mongoose";

// In school db
const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject", // Reference to the Subject model. Now 1 teacher teach one subject.
    required: true,
  },
});

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", teacherSchema);
