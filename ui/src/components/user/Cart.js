import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { axiosRequest } from "./util/fetchService";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%);
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
`;

const CartContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: linear-gradient(135deg, #ff6f61 0%, #de4839 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CartItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffebd6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItemText = styled.p`
  margin: 5px 0;
  font-size: 18px;
  color: #555;
`;

const Total = styled.h3`
  color: #333;
  text-align: center;
  margin-top: 20px;
  font-size: 1.5rem;
`;

const AddressContainer = styled.div`
  margin-top: 20px;
`;

const AddressInput = styled.input`
  display: block;
  margin: 10px 0;
  padding: 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const InlineAddressInput = styled(AddressInput)`
  display: inline-block;
  width: calc(50% - 5px);
  &:nth-child(odd) {
    margin-right: 5px;
  }
  &:nth-child(even) {
    margin-left: 5px;
  }
`;

const BookButton = styled.button`
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  text-align: center;
  display: block;
  margin: 20px auto 0;
`;

const Cart = () => {
  const navigate = useNavigate();
  const { cart, cartDispatch } = useContext(CartContext);
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    userMobileNumber: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axiosRequest(
        "get",
        `http://localhost:4000/srv/user/cart`,
        null,
        localStorage.getItem("token")
      );
      cartDispatch({ type: "UPDATE", value: response?.cart || [] });
    };
    fetchCart();
  }, [cartDispatch]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return Object.values(address).every((value) => value.trim() !== "");
  };

  const handleDelete = async (key) => {
    await axiosRequest(
      "post",
      "http://localhost:4000/srv/user/updateCart",
      {
        cart: cart.filter((item) => item.key !== key),
      },
      localStorage.getItem("token")
    );
    cartDispatch({
      type: "UPDATE",
      value: cart.filter((item) => item.key !== key),
    });
  };

  const handleBook = async () => {
    try {
      await axiosRequest(
        "post",
        "http://localhost:4000/srv/order/create",
        address,
        localStorage.getItem("token")
      );
      cartDispatch({ type: "UPDATE", value: [] });
      setAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        userMobileNumber: "",
      });
      navigate("/orders");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <GlobalStyle />
      <CartContainer>
        <Title>Your Cart</Title>
        {cart.map((item) => (
          <CartItem key={item.key}>
            <CartItemText>
              <strong>{item.name}</strong> - Rs {item.price} - {item.quantity}{" "}
              nos
            </CartItemText>
            <button
              onClick={() => {
                handleDelete(item.key);
              }}
            >
              X
            </button>
          </CartItem>
        ))}
        <Total>Total: Rs {calculateTotal().toFixed(2)}</Total>
        {cart.length ? (
          <AddressContainer>
            <Title>Enter Address</Title>
            <AddressInput
              placeholder="Address Line 1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleChange}
            />
            <AddressInput
              placeholder="Address Line 2"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleChange}
            />
            <InlineAddressInput
              placeholder="City"
              name="city"
              value={address.city}
              onChange={handleChange}
            />
            <InlineAddressInput
              placeholder="State"
              name="state"
              value={address.state}
              onChange={handleChange}
            />
            <AddressInput
              placeholder="Pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
            />
            <AddressInput
              placeholder="Mobile Number"
              name="userMobileNumber"
              value={address.userMobileNumber}
              onChange={handleChange}
            />
          </AddressContainer>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#888",
              marginTop: "20px",
            }}
          >
            Add Items to Proceed
          </p>
        )}
        <BookButton
          onClick={handleBook}
          disabled={!cart.length || !isFormValid()}
        >
          Book Service
        </BookButton>
      </CartContainer>
    </>
  );
};

export default Cart;
