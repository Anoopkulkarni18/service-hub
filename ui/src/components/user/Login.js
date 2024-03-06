import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/srv/user/login",
      formData
    );
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };
  const goToRegister = () => {
    navigate("/register");
  };
  const goToServiceProvider = () => {
    navigate("/service-provider-register");
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button onClick={goToRegister}>New User</button>
      <button onClick={goToServiceProvider}>I am a service provider</button>
    </div>
  );
}
