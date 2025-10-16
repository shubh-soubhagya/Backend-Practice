import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Example of protected routes
router.get("/teacher-dashboard", protect, authorizeRoles("teacher"), (req, res) => {
  res.json({ message: `Welcome Teacher ${req.user.name}` });
});

router.get("/student-dashboard", protect, authorizeRoles("student"), (req, res) => {
  res.json({ message: `Welcome Student ${req.user.name}` });
});

export default router;
