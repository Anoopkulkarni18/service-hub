import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #ece9e6 0%, #ffffff 100%);
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
`;

const Container = styled.div`
  margin: 20px;
  max-width: 800px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: linear-gradient(135deg, #ff6f61 0%, #de4839 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const OrderItem = styled.div`
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OrderId = styled.h6`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1rem;
`;

const ServiceProviderCompletedOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `http://localhost:4000/srv/order/SPCompletedOrders`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Orders</Title>
        {orders.map((item) => {
          return (
            <OrderItem key={item.orderId}>
              <OrderId>OrderId: {item.orderId}</OrderId>
              <p>status: {item.status}</p>
            </OrderItem>
          );
        })}
      </Container>
    </>
  );
};

export default ServiceProviderCompletedOrders;
