import Video from "../models/videoModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Upload lecture (Teacher only)
export const uploadLecture = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "lectures",
    });

    // Save info in DB
    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: result.secure_url,
      uploadedBy: req.user._id,
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all videos (visible to all)
export const getAllLectures = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("uploadedBy", "name role")
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
