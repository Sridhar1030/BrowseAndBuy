import express from "express";
import Notification from "../models/Notification.js"; // Adjust the path

const router = express.Router();

router.put("/markAsRead", async (req, res) => {
    try {
        const { notificationId } = req.body;
        await Notification.findByIdAndUpdate(notificationId, { isRead: true });
        res.status(200).json({ message: "Notification marked as read" });
    } catch (err) {
        console.error("Error marking notification as read:", err);
        res.status(500).json({ error: "Failed to mark notification as read" });
    }
});

export default router;
