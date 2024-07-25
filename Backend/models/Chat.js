import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
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
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
