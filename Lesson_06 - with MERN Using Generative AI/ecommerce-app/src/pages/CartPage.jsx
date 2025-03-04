// src/pages/CartPage.jsx
import React from 'react';

const CartPage = ({ cartItems, removeFromCart }) => {
  console.log('Cart Items:', cartItems);
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>
            <p>{item.name} - ${item.price}</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
