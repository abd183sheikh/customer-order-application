import React, { useEffect, useState } from 'react';

const Fetchorder = () => {
  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [error, setError] = useState('');

  const fetchAllOrders = () => {
    fetch('http://192.168.29.132:5000/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setError('');
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Failed to load orders');
      });
  };

  const fetchCustomerOrders = () => {
    fetch(`http://192.168.29.132:5000/api/orders/${customerId}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || 'Unknown error');
          });
        }
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setError('');
      })
      .catch(err => {
        setOrders([]);
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h2>Orders List</h2>
      <input
        type="text"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Enter customer ID"
      />
      <button onClick={fetchCustomerOrders}>Search</button>
      <button onClick={fetchAllOrders}>Show All</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orders.length === 0 ? (
        <p>Loading or no data available.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Gender</th>
              <th>Created At</th>
              <th>Returned At</th>
              <th>Shipped At</th>
              <th>Delivered At</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.order_id}</td>
                <td>{order.user_id}</td>
                <td>{order.status}</td>
                <td>{order.gender}</td>
                <td>{order.created_at}</td>
                <td>{order.returned_at}</td>
                <td>{order.shipped_at}</td>
                <td>{order.delivered_at}</td>
                <td>{order.num_of_item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Fetchorder;
