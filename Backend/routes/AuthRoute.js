// routes/authRoute.js
import { Router } from "express";
import {
    signup,
    login,
    logout,
    changePassword,
    userData,
    updateUserDetail,
    resetPassword,
    forgotPassword,
    deleteAccount,
} from "../controller/authController.js";
import verifyJwt from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt, logout);
router.route("/userData").get(verifyJwt, userData);
router.route("/change-password").post(verifyJwt, changePassword);
router.route("/update-user").post(verifyJwt, updateUserDetail);
router.route("/delete-account").delete(verifyJwt, deleteAccount);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:id/:token").post(resetPassword);


export default router;
