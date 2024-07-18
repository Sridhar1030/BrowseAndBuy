import express from 'express';
import Sell from '../models/Sell.js';
import User from '../models/User.js'; // Correct import statement

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Received request body:", req.body);

    const newSell = new Sell({
        Item_Name: req.body.Item_Name,
        category: req.body.category,
        semester: req.body.semester,
        price: req.body.price,
        phone: req.body.phone,
        F_Name: req.body.F_Name,
        L_Name: req.body.L_Name,
        Image_ID: req.body.Image_ID,
        Approved: req.body.Approved !== undefined ? req.body.Approved : false,
        UserId: req.body.userId,
    });

    try {
        const savedItem = await newSell.save();
        const userId = req.body.userId;
        await User.findByIdAndUpdate(userId, { $push: { ProductId: savedItem._id } });
        console.log("New Sell Item Saved:", savedItem);
        res.status(200).json({
            message: "Saved successfully",
            newSell: savedItem,
        });
    } catch (error) {
        console.error("Error saving new sell item:", error);
        res.status(500).json({ message: "Save failed", error });
    }
});

export default router;
