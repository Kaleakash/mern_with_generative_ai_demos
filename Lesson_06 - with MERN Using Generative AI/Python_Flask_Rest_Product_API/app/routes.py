from flask import Blueprint, request, jsonify
from app import db
from app.models import Product
from app.schemas import product_schema, products_schema

api = Blueprint('api', __name__)

# Add Product
@api.route('/product', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(**data)
    db.session.add(new_product)
    db.session.commit()
    return product_schema.jsonify(new_product), 201

# Get All Products
@api.route('/products', methods=['GET'])
def get_products():
    return products_schema.jsonify(Product.query.all())

# Get Single Product
@api.route('/product/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return product_schema.jsonify(product)

# Update Product
@api.route('/product/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(product, key, value)
    db.session.commit()
    return product_schema.jsonify(product)

# Delete Product
@api.route('/product/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"})
