import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ServiceProviderOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `http://localhost:4000/srv/order/SPOrders`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(response.data.orders);
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);
  const handleAccept = async (orderId) => {
    await axios.get(`http://localhost:4000/srv/order/acceptOrder/${orderId}`, {
      headers: { token: localStorage.getItem("token") },
    });
    navigate("/service-provider-home");
  };
  return (
    <div style={{ margin: "20px" }}>
      <h2>Orders</h2>
      {orders.map((item) => {
        return (
          <div key={item.orderId}>
            <h6>OrderId: {item.orderId}</h6>
            <button onClick={() => handleAccept(item.orderId)}>Accept</button>
            <button>Decline</button>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceProviderOrders;
