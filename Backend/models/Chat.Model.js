import mongoose from "mongoose";

const ChatShema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

export const Chat = mongoose.model("Chat", ChatShema);
