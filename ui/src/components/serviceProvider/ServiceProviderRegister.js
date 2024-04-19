import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ServiceProviderRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNumber: "",
    fname: "",
    lname: "",
    city: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServiceProviderRegister = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/srv/serviceProvider/register",
      formData
    );
    localStorage.setItem("token", res.data.token);
    navigate("/service-provider-home");
  };

  const goToServiceProviderLogin = () => {
    navigate("/service-provider-login");
  };
  const goToUserRegister = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        margin: "50px auto",
        maxWidth: "400px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Service Provider Register
      </h2>
      <form onSubmit={handleServiceProviderRegister}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceProviderMobileNumber">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="serviceProviderMobileNumber"
            placeholder="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceProviderFname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="serviceProviderFname"
            placeholder="First Name"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceProviderLname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="serviceProviderLname"
            placeholder="Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceProviderCity">City</label>
          <input
            type="text"
            className="form-control"
            id="serviceProviderCity"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
            background: "#007bff",
            border: "none",
          }}
        >
          Register
        </button>
      </form>
      <button
        onClick={goToServiceProviderLogin}
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px",
          marginTop: "20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          boxShadow: "0 2px 4px rgba(40, 167, 69, 0.1)",
        }}
      >
        Already a Service Provider
      </button>
      <button
        onClick={goToUserRegister}
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px",
          marginTop: "20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          boxShadow: "0 2px 4px rgba(40, 167, 69, 0.1)",
        }}
      >
        I am a user
      </button>
    </div>
  );
}
