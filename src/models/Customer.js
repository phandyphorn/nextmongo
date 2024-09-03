import mongoose from "mongoose";

// in posts db.
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);
