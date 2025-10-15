import express from "express";
import multer from "multer";
import { createApplication } from "../controllers/registrationController.js";

const router = express.Router();

// Multer setup for temporary storage
const upload = multer({ dest: "uploads/" });

router.post("/apply", upload.single("photo"), createApplication);

export default router;
