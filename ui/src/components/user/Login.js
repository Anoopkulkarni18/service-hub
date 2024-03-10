import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ServiceProviderLogin() {
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
      "http://localhost:4000/srv/serviceProvider/login",
      formData
    );
    localStorage.setItem("token", res.data.token);
    navigate("/service-provider-home");
  };

  const goToRegister = () => {
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
        Service Provider Login
      </h2>
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
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
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
          className="btn btn-success"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
            background: "#28a745",
            border: "none",
          }}
        >
          Submit
        </button>
      </form>
      <button
        onClick={goToRegister}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px",
          marginTop: "20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          boxShadow: "0 2px 4px rgba(0, 123, 255, 0.1)",
        }}
      >
        New Service Provider
      </button>
    </div>
  );
}
