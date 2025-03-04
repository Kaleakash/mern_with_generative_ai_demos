// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      //const response = await fetch('https://fakestoreapi.com/productsdetails');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="homepage">
      <h1>Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
