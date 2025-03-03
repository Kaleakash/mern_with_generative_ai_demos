# CherryPy to Express Migration

This project is a migration from a CherryPy-based application to an Express.js framework using MongoDB as the database. The application allows users to add, view, and delete product details.

## Project Structure

```
cherrypy-to-express
├── src
│   ├── app.js
│   ├── controllers
│   │   ├── productController.js
│   ├── models
│   │   ├── productModel.js
│   ├── routes
│   │   ├── productRoutes.js
│   └── views
│       ├── addProduct.ejs
│       ├── deleteProduct.ejs
│       ├── viewProduct.ejs
├── package.json
├── .env
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cherrypy-to-express.git
   ```

2. Navigate to the project directory:
   ```
   cd cherrypy-to-express
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your MongoDB connection string in the `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Features

- **Add Product**: Users can add new products through a form.
- **View Products**: Users can view a list of all products with their details.
- **Delete Product**: Users can delete a product by selecting it from a list.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.