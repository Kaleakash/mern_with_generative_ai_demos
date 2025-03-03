import cherrypy
from jinja2 import Environment, FileSystemLoader
from db import Database

db = Database()
env = Environment(loader=FileSystemLoader('templates'))

class RetailApp:
    @cherrypy.expose
    def index(self):
        products = db.get_products()
        template = env.get_template("index.html")
        return template.render(products=products)

    @cherrypy.expose
    def add_product(self, name=None, price=None, stock=None):
        if name and price and stock:
            db.add_product(name, float(price), int(stock))
            raise cherrypy.HTTPRedirect("/")
        template = env.get_template("add_product.html")
        return template.render()

    @cherrypy.expose
    def delete_product(self, name):
        db.delete_product(name)
        raise cherrypy.HTTPRedirect("/")

if __name__ == "__main__":
    config = {
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "static"
        }
    }
    cherrypy.quickstart(RetailApp(), "/", config)
