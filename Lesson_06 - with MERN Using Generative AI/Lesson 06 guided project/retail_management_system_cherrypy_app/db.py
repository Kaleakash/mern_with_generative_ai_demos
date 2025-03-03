from pymongo import MongoClient

class Database:
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017/")
        self.db = self.client["retail_db"]
        self.products = self.db["products"]

    def get_products(self):
        return list(self.products.find({}, {"_id": 0}))

    def add_product(self, name, price, stock):
        self.products.insert_one({"name": name, "price": float(price), "stock": int(stock)})

    def delete_product(self, name):
        self.products.delete_one({"name": name})
