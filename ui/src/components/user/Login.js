import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "./util/fetchService";

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

    const res = await axiosRequest(
      "post",
      "http://localhost:4000/srv/user/login",
      formData
    );
    localStorage.setItem("token", res.token);
    navigate("/");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #c1dfc4, #deecdd)", // Light green gradient background
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
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
          User Login
        </h2>
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
            {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
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
              marginTop: "10px",
              background: "linear-gradient(to right, #76b852, #8DC26F)", // Light green gradient for button
              border: "none",
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #8DC26F, #76b852)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #76b852, #8DC26F)")}
          >
            Submit
          </button>
        </form>
        <button
          onClick={goToRegister}
          style={{
            backgroundColor: "#57c1eb", // Light blue background for register button
            color: "#fff",
            padding: "12px",
            marginTop: "20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "600",
            boxShadow: "0 2px 4px rgba(31, 64, 55, 0.2)",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4fa3d3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#57c1eb")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
