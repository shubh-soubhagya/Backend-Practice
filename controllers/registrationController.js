import Registration from "../models/registrationModel.js";
import cloudinary from "../config/cloudinary.js";

export const createApplication = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      category,
      gender,
      phone,
      email,
      aadhaar,
      address,
      educationLevel,
      applyingFor,
      examCenter,
    } = req.body;

    let photoUrl = "";

    // If a file was uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "registrations",
      });
      photoUrl = result.secure_url;
    }

    // Generate unique Application ID
    const applicationId =
      "BRB" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const newApp = await Registration.create({
      fullName,
      dateOfBirth,
      category,
      gender,
      phone,
      email,
      aadhaar,
      address,
      educationLevel,
      applyingFor,
      examCenter,
      photoUrl,
      applicationId,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newApp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
