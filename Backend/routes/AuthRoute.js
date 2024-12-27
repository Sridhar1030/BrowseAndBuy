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
    getUserData,
    getAllUsers,
    searchUsers,
} from "../controller/authController.js";
import verifyJwt from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(verifyJwt, logout);
router.route("/userData").get(verifyJwt, userData);
router.route("/getUserData").post(verifyJwt, getUserData);
router.route("/change-password").post(verifyJwt, changePassword);
router.route("/update-user").post(verifyJwt, updateUserDetail);
router.route("/delete-account").delete(verifyJwt, deleteAccount);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:id/:token").post(resetPassword);
router.route("/allUser").get(verifyJwt, getAllUsers)
router.get('/search',verifyJwt, searchUsers);



export default router;
