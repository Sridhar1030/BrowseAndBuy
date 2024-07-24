import { Chat } from "../models/Chat.Model.js";
import { ApiError } from "../utils.js/ApiErrorHandler.js";
import { asyncHandler } from "../utils.js/asyncHandler.js";
import { ApiResponse } from "../utils.js/ApiResponse.js";

const createChat = asyncHandler(async (req, res, next) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
        return next(
            new ApiError(400, "Both senderId and receiverId are required")
        );
    }

    const newChat = new Chat({
        members: [senderId, receiverId],
    });

    try {
        const result = await newChat.save();
        return res
            .status(200)
            .json(new ApiResponse(200, "chat is successfully create", result));
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the chat", {})
        );
    }
});

const userChat = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const chat = await Chat.find({
        members: {
            $in: [userId],
        },
    });

    if (!chat) {
        return next(new ApiError(404, "No chat found", {}));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "chat is successfully fetched", chat));
});

const findChat = asyncHandler(async (req, res, next) => {
    const chat = await Chat.findOne({
        members: { $all: [req.params.firstId, req.params.secondID] },
    });

    if (!chat) {
        return next(new ApiError(404, "No chat found", {}));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "chat is successfully fetched", chat));
});

export { createChat, userChat, findChat };
