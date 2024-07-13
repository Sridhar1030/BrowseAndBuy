// routes/authRoute.js
import { Router } from "express";
import {
        signup,
        login,
        logout,
        changePassword,
        chatData,
    } from "../controller/authController.js";
import verifyJwt from "../middleware/auth.middleware.js";
import { createChatUser, FetchChatUser } from "../middleware/createChatUser.js";

const router = Router();

router.route("/signup").post(createChatUser, signup);
router.route("/login").post( login);
router.route("/logout").post(verifyJwt, logout);
router.route("/chat").get(verifyJwt, FetchChatUser, chatData);
router.route("/change-password").post(verifyJwt, changePassword);

export default router;
