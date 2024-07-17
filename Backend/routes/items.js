import express from "express";
const router = express.Router();
import Sell from "../models/Sell.js"; // Ensure the path is correct and includes the .js extension

// Combined route for fetching items, with or without category filter
router.get("/items/:category?", async (req, res) => {
    try {
        const category = req.params.category;
        const query = category ? { category } : {};
        const items = await Sell.find(query);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
