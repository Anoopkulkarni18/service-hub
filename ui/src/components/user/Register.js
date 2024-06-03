import React, { useState } from "react";
import { axiosRequest } from "./util/fetchService";
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
    const res = await axiosRequest(
      "post",
      "http://localhost:4000/srv/user/register",
      formData
    );
    localStorage.setItem("token", res.token);
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
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #c1dfc4, #deecdd)", // Light green gradient background
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
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "700",
          }}
        >
          User Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="userEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="userEmail"
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
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
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
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="userMobileNumber">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="userMobileNumber"
              placeholder="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
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
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              placeholder="First Name"
              name="fname"
              value={formData.fname}
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
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              placeholder="Last Name"
              name="lname"
              value={formData.lname}
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
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Location"
              name="location"
              value={formData.location}
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
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: "linear-gradient(to right, #76b852, #8DC26F)", // Light green gradient for button
              border: "none",
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "linear-gradient(to right, #8DC26F, #76b852)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "linear-gradient(to right, #76b852, #8DC26F)")
            }
          >
            Register
          </button>
        </form>
        <div style={{ marginTop: "20px" }}>
          <button
            className="btn btn-link"
            onClick={goToLogin}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "600",
              textDecoration: "none",
              transition: "color 0.3s ease",
              padding: "10px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#007bff")}
          >
            Already a user
          </button>
          <button
            className="btn btn-link"
            onClick={goToServiceProvider}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "600",
              textDecoration: "none",
              transition: "color 0.3s ease",
              padding: "10px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#007bff")}
          >
            I am a service provider
          </button>
        </div>
      </div>
    </div>
  );
}
