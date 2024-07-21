// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        senderName: {
            type: String,
            required: true,
        },
        receiverName: {
            type: String,
            required: true,
        },
        
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
