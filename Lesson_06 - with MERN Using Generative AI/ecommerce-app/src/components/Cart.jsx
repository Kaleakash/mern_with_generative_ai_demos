// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>
            <p>{item.name} - ${item.price}</p>
            <button onClick={() => onRemoveFromCart(item)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
