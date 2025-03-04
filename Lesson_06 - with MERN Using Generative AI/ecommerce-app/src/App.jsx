// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add products to the cart
  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    setCartItems((prevCartItems) => {
      console.log('prevCartItems:', prevCartItems);
      return [...prevCartItems, product];
    })
  };

  // Function to remove products from the cart
  const removeFromCart = (product) => {
    setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== product.id));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
