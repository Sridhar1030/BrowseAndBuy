import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        senderName: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Refers to the User model
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
