// routes/authRoutes.js
import express from "express";
import * as authController from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/token", authController.token);
router.post("/logout", authController.logout);
router.get("/getUser", authenticateToken, authController.getUser);

export default router;
