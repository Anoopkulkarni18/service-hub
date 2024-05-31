import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `http://localhost:4000/srv/order/getAllOrders`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);
  return (
    <div>
      <h1>Orders</h1>
      {orders.map((item) => {
        return (
          <div key={item.orderId}>
            <p>OrderID : {item.orderId}</p>
            <p>Order Status : {item.status}</p>
            <p>Name : {item.userName}</p>
            <h6>Address: </h6>
            <p>
              {item.addressLine1 || "NA"}, {item.addressLine2 || "NA"},
            </p>
            <p>
              {item.city}, {item.state} - {item.pincode},
            </p>
            <p>
              {item.userMobileNumber || "Mobile Number"}, {item.userEmail}
            </p>
            <hr />
            <p>
              Service Partner Name: {item.serviceProviderName || "Not Assigned"}
            </p>
            <p>
              Service Partner MobileNumber:{" "}
              {item.serviceProviderName || "Not Assigned"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
