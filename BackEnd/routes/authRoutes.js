
import express from "express";
import {
  register,
  login,
  refreshToken,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 
import {
  validateRegister,
  validateLogin,
  validateRefreshToken,
} from "../utils/validation.js"; 

const router = express.Router();

router.post("/register", validateRegister, register);


router.post("/login", validateLogin, login);


router.post("/refresh-token", validateRefreshToken, refreshToken);


router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Protected route accessed", user: req.user });
});

export default router; 
