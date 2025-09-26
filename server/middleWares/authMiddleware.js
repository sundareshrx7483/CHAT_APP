import { verifyToken } from "../utils/tokenUtils.js";
import { isTokenBlacklisted } from "../utils/tokenBlacklist.js";
import { StatusCodes } from "http-status-codes";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (isTokenBlacklisted(token)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token has been logged out" });
    }
    const decoded = await verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};

export default authMiddleware;
