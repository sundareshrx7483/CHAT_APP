import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../utils/asyncHandler.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { generateToken, verifyToken } from "../utils/tokenUtils.js";
import { addTokenToBlacklist } from "../utils/tokenBlacklist.js";

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

  if (!user) {
    throw new UnauthenticatedError("User not found!");
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new UnauthenticatedError("Wrong Password!");
  }

  user.onlineStatus = true;
  await user.save();

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
  });

  const userInfo = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    onlineStatus: user.onlineStatus,
  };

  res
    .status(StatusCodes.OK)
    .json({ msg: "Login Successfull!", token, user: userInfo });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }

  let decoded;
  decoded = await verifyToken(token);

  addTokenToBlacklist(token);

  const userId = decoded.user;
  const user = await User.findById(userId);
  if (user) {
    user.onlineStatus = false;
    await user.save();
    console.log("online status:", user.onlineStatus);
  }

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
});
