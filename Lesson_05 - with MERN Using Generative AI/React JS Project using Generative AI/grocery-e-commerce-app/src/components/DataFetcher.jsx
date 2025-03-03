import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));

    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));

    fetch('http://localhost:3000/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price} ({product.category})</li>
        ))}
      </ul>

      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>

      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>User ID: {order.userId}, Product ID: {order.productId}, Quantity: {order.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
