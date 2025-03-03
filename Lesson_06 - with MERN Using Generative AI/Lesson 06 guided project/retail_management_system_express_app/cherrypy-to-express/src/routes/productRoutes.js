const express = require('express');
const   routes = express.Router();

var productController = require('../controllers/productController');

routes.get('/', productController.viewProduct);
routes.get('/add', productController.addProductPage);
routes.post('/products/add', productController.addProduct);
routes.post('/products/delete/:id', productController.deleteProduct);


module.exports = routes;