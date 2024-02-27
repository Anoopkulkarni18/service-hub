import React, { useState } from "react";
import axios from "axios";

export default function ServiceProviderRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNumber: "",
    fname: "",
    lname: "",
  });

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
      "http://localhost:4000/srv/user/register",
      formData
    );
    localStorage.setItem("token", res.data.token);
  };
  return (
    <div>
      <form onSubmit={handleServiceProviderRegister}>
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

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
