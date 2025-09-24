import jwt from "jsonwebtoken";

import config from "../config/config.js";

export const generateToken = (user) => {
  return jwt.sign({ user }, config.jwtSecret, {
    expiresIn: "5m",
  });
};

export const verifyToken = async (token) => {
  try {
    let decoded = await jwt.verify(token, config.jwtSecret);
    if (!decoded.user) throw new Error("Invalid Token");
    return decoded;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
