import express from "express";
import multer from "multer";
import { uploadLecture, getAllLectures } from "../controllers/videoController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup
const upload = multer({ dest: "uploads/" });

// Teacher uploads video
router.post(
  "/upload",
  protect,
  authorizeRoles("teacher"),
  upload.single("video"),
  uploadLecture
);

// Students (and everyone logged in) can view
router.get("/all", protect, getAllLectures);

export default router;
