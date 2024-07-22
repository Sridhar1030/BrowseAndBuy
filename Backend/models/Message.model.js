import mongoose from "mongoose";

const MessageSchema = new mongoose.model(
    {
        chatID: {
            type: String,
        },
        senderID: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Message = mongoose.model("Message", MessageSchema);
