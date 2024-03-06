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
    localStorage.getItem("token", res.data.token);
    navigate("/service-provider-home");
  };
  const goToServiceProviderLogin = () => {
    navigate("/service-provider-login");
  };
  return (
    <div>
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
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceProviderCity">Enter Your City</label>
          <input
            type="text"
            className="form-control"
            id="serviceProviderCity"
            placeholder="Enter Your City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <button onClick={goToServiceProviderLogin}>Already a service provider</button>
    </div>
  );
}
