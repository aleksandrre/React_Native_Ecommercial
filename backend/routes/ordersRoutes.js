import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addOrder, getOrders } from "../controllers/orderController.js";
const router = express.Router();

router.post("/", authenticateToken, addOrder);
router.get("/", authenticateToken, getOrders);

export default router;
