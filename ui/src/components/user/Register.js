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
    <div>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="userEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userMobileNumber">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="userMobileNumber"
            placeholder="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="First Name"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <button onClick={goToLogin}>Already a user</button>
      <button onClick={goToServiceProvider}>I am a service provider</button>
    </div>
  );
}
