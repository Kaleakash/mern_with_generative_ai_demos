const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { numbers, target } = req.body;
    if (!Array.isArray(numbers) || typeof target !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    const index = numbers.indexOf(target);
    res.json({"msg":`The number ${target} is ${index !== -1 ? `found in  ${index} index` : 'not '} in the array`});
    //res.json({ found: index !== -1, index });
});

module.exports = router;
