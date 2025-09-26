import { Router } from "express";
import { getchats } from "../controllers/chatController.js";
import authMiddleware from "../middleWares/authMiddleware.js";

const router = Router();

router.get("/:userId", authMiddleware, getchats);

export default router;
