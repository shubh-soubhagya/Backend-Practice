import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  aadhaar: { type: String, required: true },
  address: { type: String, required: true },
  educationLevel: { type: String, required: true },
  applyingFor: { type: String, required: true },
  examCenter: { type: String, required: true },
  photoUrl: { type: String }, // Cloudinary URL
  applicationId: { type: String, required: true, unique: true },
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
