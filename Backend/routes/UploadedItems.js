import express from "express";
import Sell from "../models/Sell.js";
import User from "../models/User.js";

const router = express.Router();
router.get("/uploadedItems", async (req, res) => {
    const { userId } = req.query;
    console.log("Request received. Query:", req.query);

    try {
        if (!userId) {
            console.log("userId not provided");
            return res
                .status(400)
                .json({ message: "userId query parameter is required" });
        }

        const user = await User.findById(userId);
        console.log("User document:", user);

        if (!user) {
            console.log("User not found for userId:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        const productIds = user.ProductId.map((id) => id._id);
        console.log("ids", productIds);

        const productInfo = await Sell.find({ _id: { $in: productIds } });
        console.log("Product info retrieved:", productInfo);

        res.status(200).json({ productInfo });
    } catch (error) {
        console.error("Error getting uploaded items:", error);
        res.status(500).json({ message: "Get failed", error });
    }
});

export default router;
