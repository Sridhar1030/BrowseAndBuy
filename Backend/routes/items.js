// routes/items.js
const express = require('express');
const router = express.Router();
const Sell = require('../models/Sell');

router.get('/items/:category', async (req, res) => {
    try {
        const items = await Sell.find({ category: req.params.category });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
