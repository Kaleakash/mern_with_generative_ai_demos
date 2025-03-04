// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const { name, price, image } = product;

  return (
    <div className="product-card">
      <img className="product-image" src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={() => {
        console.log('Adding to cart:', product);  
        onAddToCart(product)
      }
    
    }>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
