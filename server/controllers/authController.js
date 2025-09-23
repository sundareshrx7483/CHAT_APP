import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../utils/asyncHandler.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const register = asyncHandler(async (req, res) => {
  const { userName, password, email } = req.body;

  req.body.password = await hashPassword(password);

  const user = await User.create({
    userName,
    password: req.body.password,
    email,
    role: req.body.role,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "User created successfully", user });
});

export const login = asyncHandler(async (req, res) => {
  res.status(200).send("login");
});
