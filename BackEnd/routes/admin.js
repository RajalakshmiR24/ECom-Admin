// routes/adminRoutes.js
import express from "express";
import salesRoutes from "./sales.js";
import managementRoutes from "./management.js";
import generalRoutes from "./general.js";
import clientRoutes from "./client.js";
import authMiddleware from '../middleware/authMiddleware'; // Import the auth middleware

const router = express.Router();

// Admin route middleware (for admin authentication)
router.use(authMiddleware); // Apply authMiddleware to all admin routes

// Use the sub-routes for admin-specific operations
router.use("/sales", salesRoutes);
router.use("/management", managementRoutes);
router.use("/general", generalRoutes);
router.use("/client", clientRoutes);

export default router;
