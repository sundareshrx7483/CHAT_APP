import { Router } from "express";
import { sendMessage, getMessage } from "../controllers/messageController.js";

const router = Router();

router.post("/", sendMessage);
router.get("/", getMessage);
export default router;
