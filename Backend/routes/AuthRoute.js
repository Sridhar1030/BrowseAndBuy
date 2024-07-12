// routes/authRoute.js
import { Router } from "express";
import { signup, login, logout, changePassword } from "../controller/authController.js";
import verifyJwt  from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(verifyJwt, logout)
router.route("/change-password").post(verifyJwt, changePassword)


export default router;
