import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleWares/validationMiddleware.js";

const router = Router();

export const registerRoute = router.post(
  "/register",
  validateRegisterInput,
  register
);

export const loginRoute = router.post("/login", validateLoginInput, login);

export default router;
