const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { numbers, order = 'asc' } = req.body;

    if (!Array.isArray(numbers) || numbers.some(num => typeof num !== 'number')) {
        return res.status(400).json({ error: 'Invalid input, expected an array of numbers' });
    }

    let sortedNumbers = [...numbers].sort((a, b) => a - b);

    if (order === 'desc') {
        sortedNumbers.reverse(); // Reverse for descending order
    } else if (order !== 'asc') {
        return res.status(400).json({ error: 'Invalid order, use "asc" or "desc"' });
    }

    res.json({ sortedNumbers });
});

module.exports = router;
