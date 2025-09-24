import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError } from "../errors/customErrors.js";
import Messages from "../model/Messages.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  if (!senderId || !receiverId || !content)
    throw new BadRequestError("Please provide all values");

  const message = await Messages.create({
    senderId,
    receiverId,
    content,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Message sent successfully", data: message });
});

export const getMessage = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.query;
  if (!senderId || !receiverId) {
    throw new BadRequestError("Please provide both senderId and receiverId");
  }

  const messages = await Messages.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ createdAt: 1 });

  res.status(StatusCodes.OK).json({ messages });
});
