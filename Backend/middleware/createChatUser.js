import { asyncHandler } from "../utils.js/asyncHandler.js";
import axios from "axios";

const createChatUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const response = await axios.post(
            "https://api.chatengine.io/users/",
            { username, secret: username, email, first_name: username },
            { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
        );

        req.chat = response.data;
        next();
    } catch (e) {
        req.chat = e.response.data;
        next();
    }
});

const FetchChatUser = asyncHandler(async (req, res, next) => {
    const { username } = req.body;

    try {
        const response = await axios.get("https://api.chatengine.io/users/me/", {
            headers: {
                "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
                "User-Name": username,
                "User-Secret": username,
            },
        });
        req.chat = response.data;
        next();
    } catch (e) {
        req.chat = e.response.data;
        next();
    }
});

export { createChatUser, FetchChatUser };
