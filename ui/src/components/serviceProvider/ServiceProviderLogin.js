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
    try {
      const res = await axios.post(
        "http://localhost:4000/srv/serviceProvider/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/service-provider-home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const goToRegister = () => {
    navigate("/service-provider-register");
  };
  const goToUserLogin = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #f0f4f8, #cfe0e8)", // Light blue gradient background
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "700",
          }}
        >
          Service Provider Login
        </h3>
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
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
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontFamily: "'Roboto', sans-serif",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "20px" }}>
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
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontFamily: "'Roboto', sans-serif",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: "linear-gradient(to right, #43cea2, #185a9d)", // Blue-green gradient for button
              border: "none",
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #185a9d, #43cea2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #43cea2, #185a9d)")
            }
          >
            Submit
          </button>
        </form>
        <button
          onClick={goToRegister}
          style={{
            backgroundColor: "#6c63ff",
            color: "white",
            padding: "12px",
            marginTop: "20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "600",
            boxShadow: "0 5px 15px rgba(108, 99, 255, 0.3)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#574bff";
            e.currentTarget.style.boxShadow =
              "0 5px 15px rgba(87, 75, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#6c63ff";
            e.currentTarget.style.boxShadow =
              "0 5px 15px rgba(108, 99, 255, 0.3)";
          }}
        >
          New Service Provider
        </button>
        <button
          onClick={goToUserLogin}
          style={{
            backgroundColor: "#6c63ff",
            color: "white",
            padding: "12px",
            marginTop: "20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "600",
            boxShadow: "0 5px 15px rgba(108, 99, 255, 0.3)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#574bff";
            e.currentTarget.style.boxShadow =
              "0 5px 15px rgba(87, 75, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#6c63ff";
            e.currentTarget.style.boxShadow =
              "0 5px 15px rgba(108, 99, 255, 0.3)";
          }}
        >
          I am a user
        </button>
      </div>
    </div>
  );
}
