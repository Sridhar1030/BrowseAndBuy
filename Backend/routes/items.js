import express from "express";
const router = express.Router();
import Sell from "../models/Sell.js"; // Ensure the path is correct and includes the .js extension

router.get("/items/:category", async (req, res) => {
    try {
        const items = await Sell.find({ category: req.params.category });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/items/", async (req, res) => {
    try {
        const items = await Sell.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
