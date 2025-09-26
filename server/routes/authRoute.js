import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleWares/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, register);

router.post("/login", validateLoginInput, login);

router.post("/logout", logout);

export default router;
