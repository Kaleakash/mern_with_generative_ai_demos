const express = require('express');
const bodyParser = require('body-parser');

const sortRoute = require('./routes/sort');
const searchRoute = require('./routes/search');
const statsRoute = require('./routes/statistics');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/sort', sortRoute);
app.use('/search', searchRoute);
app.use('/statistics', statsRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
