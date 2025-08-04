import React,{useEffect,useState} from 'react'

const Fetchdata = () => {
const [orders, setOrders] = useState([]);

 useEffect(() => {
  fetch('http://192.168.29.132:5000/api/orders')
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched data:", data);  // 👈 Add this
      setOrders(data);
    })
    .catch((err) => console.error('Error:', err));
}, []);
  return (
    <div>
  <h2>Orders List</h2>
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
</div>

  )
}

export default Fetchdata
