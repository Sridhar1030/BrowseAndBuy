// routes/items.js
import { Router } from 'express';
const router = Router();
import { find } from '../models/Sell';

router.get('/items/:category', async (req, res) => {
    try {
        const items = await find({ category: req.params.category });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/items/', async (req, res) => {
    try {
        const items = await find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
