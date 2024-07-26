import { Router } from "express";
import { addMessage, getMessages } from "../controller/messageController.js";


const router = Router();

router.route("/").post(addMessage);
router.route("/:chatId").get(getMessages);

export default router;