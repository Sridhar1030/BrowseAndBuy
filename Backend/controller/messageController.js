import { Message } from "../models/Message.model.js";
import { ApiError } from "../utils.js/ApiErrorHandler.js";
import { ApiResponse } from "../utils.js/ApiResponse.js";
import { asyncHandler } from "../utils.js/asyncHandler.js";

const addMessage = asyncHandler(async (req, res, next) => {
    const { chatId, senderId, text } = req.body;

    const message = await Message.create({ chatId, senderId, text });

    if (!message) {
        return next(new ApiError(400, "Message not sent", {}));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Message sent successfully", message));
});

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const result = await Message.find({ chatId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { addMessage, getMessages };
