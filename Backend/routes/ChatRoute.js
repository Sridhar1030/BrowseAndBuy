import { Router } from "express";
import { createChat, userChat, findChat } from "../controller/chatcontroller.js";

const router = Router();

router.route("/").post(createChat);
router.route("/:userId").get(userChat)
router.route("/find/:firstId/:secondID").get(findChat)

export default router;
