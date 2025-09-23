import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../utils/asyncHandler.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = asyncHandler(async (req, res) => {
  const { userName, password, email } = req.body;

  req.body.password = await hashPassword(password);

  const user = await User.create({
    userName,
    password: req.body.password,
    email,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "User created successfully", user });
});

export const login = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await User.findOne({ $or: [{ userName }, { email }] });

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new UnauthenticatedError("Wrong Password!");
  }
  res.status(StatusCodes.OK).json({ msg: "Login successfull" });
});
