import Notification from "../models/Notification.js";
import { getIO } from "../socket.js";

export const sendNotification = async (
  userId,
  title,
  message,
  type = "INFO"
) => {

  // Save in database
  const notification = await Notification.create({
    userId,
    title,
    message,
    type,
  });

  // Send realtime
  const io = getIO();

  io.emit(`notification:${userId}`, notification);

};
