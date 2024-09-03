import mongoose from "mongoose";
import { type } from "os";

// In school db
const studentSchema = new mongoose.Schema({
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
  // subjects: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Subject", // Reference to the Subject model. Now 1 teacher teach one subject.
  //     required: true,
  //   },
  // ],
});

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
