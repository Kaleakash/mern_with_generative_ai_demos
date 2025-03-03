var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var productRoutes = require('./routes/productRoutes');
let url = 'mongodb://localhost:27017/retail_db'
var app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Set up routes
app.use('/', productRoutes);

// Start the server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Server is running on port ' + PORT);
});