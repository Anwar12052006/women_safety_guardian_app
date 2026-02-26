import Notification from "../models/Notification.js";

// GET user notifications
export const getNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find({
      userId: req.user.userId,
    })
    .sort({ createdAt: -1 })
    .limit(20);

    res.json({
      success: true,
      data: notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
    });

  }

};


// MARK AS READ
export const markAsRead = async (req, res) => {

  try {

    await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true }
    );

    res.json({
      success: true,
      message: "Notification marked as read",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error updating notification",
    });

  }

};
