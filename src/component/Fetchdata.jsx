import React,{useEffect,useState} from 'react'

const Fetchdata = () => {
const [orders, setOrders] = useState([]);

 useEffect(() => {
  fetch('http://localhost:5000/api/orders')
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
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{JSON.stringify(order)}</li>
        ))}
      </ul>
    </div>
  )
}

export default Fetchdata
