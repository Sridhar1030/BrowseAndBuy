import {Router} from "express";
import Sell from "../models/Sell.js";
import Orders from "../models/Orders.js";
import User from "../models/User.js";
import { purchase, bought } from "../controller/purchase.js";
const router = Router();

router.route("/purchase").post(purchase);
router.route("/bought").get(bought);


export default router


