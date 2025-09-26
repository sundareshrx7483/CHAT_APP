import Messages from "../model/Messages.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getchats = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // Find all messages where senderId or receiverId is userId
  const messages = await Messages.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  }).sort({ createdAt: -1 });

  // Use Map to group by chatWithUser and pick latest message
  const conversations = new Map();
  messages.forEach((msg) => {
    const chatWithUser = msg.senderId == userId ? msg.receiverId : msg.senderId;
    if (!conversations.has(chatWithUser)) {
      conversations.set(chatWithUser, msg); // Only set first (latest) message
    }
  });

  // Convert Map values to array
  const result = Array.from(conversations.values());
  return res.json(result);
});
