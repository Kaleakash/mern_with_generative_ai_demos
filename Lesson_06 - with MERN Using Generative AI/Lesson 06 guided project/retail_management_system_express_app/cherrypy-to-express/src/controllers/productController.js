var ProductModel = require('../models/productModel');

function ProductController() {}

ProductController.prototype.addProductPage = function(req, res) {
    res.render('addProduct');

}

ProductController.prototype.addProduct = function(req, res) {
    var newProduct = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });

    newProduct.save(function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        

        ProductModel.find({}, function(err, products) {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('viewProduct', { products: products });
        });

    });
};

ProductController.prototype.deleteProduct = function(req, res) {
    ProductModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        
        ProductModel.find({}, function(err, products) {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('viewProduct', { products: products });
    });

    });
};

ProductController.prototype.viewProduct = function(req, res) {
    ProductModel.find({}, function(err, products) {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('viewProduct', { products: products });
    });
};

module.exports = new ProductController();