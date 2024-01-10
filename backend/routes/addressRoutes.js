// routes/emailRoutes.js
import express from "express";
import { addAddress, getAddresses } from "../controllers/addressControler.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authenticateToken, addAddress);
router.get("/", authenticateToken, getAddresses);

export default router;
