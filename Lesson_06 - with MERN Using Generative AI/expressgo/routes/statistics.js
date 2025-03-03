const express = require('express');
const router = express.Router();

// Helper function to calculate mode
const calculateMode = (numbers) => {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];

    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    });

    for (let num in frequency) {
        if (frequency[num] === maxFreq) {
            modes.push(Number(num));
        }
    }

    return modes.length === numbers.length ? [] : modes; // If all values occur once, return empty array
};

// Statistics Route
router.post('/', (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return res.status(400).json({ error: 'Invalid input, expected a non-empty array' });
    }

    // Calculate Mean
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / numbers.length;

    // Calculate Median
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sortedNumbers.length / 2);
    const median = sortedNumbers.length % 2 === 0
        ? (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2
        : sortedNumbers[mid];

    // Calculate Mode
    const mode = calculateMode(numbers);

    res.json({ mean, median, mode });
});

module.exports = router;
