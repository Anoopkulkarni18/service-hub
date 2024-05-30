import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNumber: "",
    fname: "",
    lname: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/srv/user/register",
      formData
    );
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToServiceProvider = () => {
    navigate("/service-provider-register");
  };

  return (
    <div
      style={{
        margin: "50px auto",
        maxWidth: "400px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        User Register
      </h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="userEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="userMobileNumber">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="userMobileNumber"
            placeholder="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="First Name"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
        >
          Register
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <button
          className="btn btn-link"
          onClick={goToLogin}
          style={{ marginRight: "10px" }}
        >
          Already a user
        </button>
        <button className="btn btn-link" onClick={goToServiceProvider}>
          I am a service provider
        </button>
      </div>
    </div>
  );
}
