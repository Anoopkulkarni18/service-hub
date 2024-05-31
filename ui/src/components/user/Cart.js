import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, dispatch } = useContext(CartContext);
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
      const response = await axios.get(`http://localhost:4000/srv/user/cart`, {
        headers: { token: localStorage.getItem("token") },
      });
      dispatch({ type: "UPDATE", value: response?.data?.cart || [] });
    };
    fetchCart();
  }, [dispatch]);

  //   const handleQuantityChange = (item, quantity) => {
  //     updateCart(item, quantity);
  //   };

  //   const handleRemoveItem = (item) => {
  //     removeFromCart(item);
  //   };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleBook = async () => {
    try {
      await axios.post("http://localhost:4000/srv/order/create", address, {
        headers: { token: localStorage.getItem("token") },
      });
      dispatch({ type: "UPDATE", value: [] });
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
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.key}>
          <p>
            {item.name} - Rs {item.price} - {item.quantity}nos
          </p>
          {/* <input
            type="number"
            value={item.quantity}
            // onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
            min="1"
          /> */}
        </div>
      ))}
      <div>
        <h3>Total: Rs {calculateTotal().toFixed(2)}</h3>
      </div>
      {cart.length ? (
        <div>
          <h2>Enter Address</h2>
          <input
            placeholder="Address Line 1"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="Address Line 2"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="City"
            name="city"
            value={address.city}
            onChange={handleChange}
          />
          <input
            placeholder="State"
            name="state"
            value={address.state}
            onChange={handleChange}
          />
          <input
            placeholder="Pincode"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="Mobile Number"
            name="userMobileNumber"
            value={address.userMobileNumber}
            onChange={handleChange}
          />
        </div>
      ) : (
        "Add Items to Proceed"
      )}
      <br />
      <button onClick={handleBook} disabled={cart.length ? false : true}>
        Book Service
      </button>
      <hr />
    </div>
  );
}
