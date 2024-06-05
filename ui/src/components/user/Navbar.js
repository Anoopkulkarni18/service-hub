import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ServiceContext } from "./context/ServiceContext";

export default function Navbar() {
  const { serviceDispatch } = useContext(ServiceContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState(" ");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSearchChange = async (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/srv/service/search",
        { query: search }
      );

      console.log("Search results:", response);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleCart = () => {
    navigate("/cart");
  };
  const handleOrders = () => {
    navigate("/orders");
  };
  const handleLogoClick = () => {
    serviceDispatch({ type: "CLEAR" });
    navigate("/");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-secondary"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          marginBottom: "20px",
        }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  style={{ height: "60px", cursor: "pointer" }} // Set cursor to pointer
                  onClick={handleLogoClick}
                />
              </li>
            </ul>
            <form className="d-flex mx-auto">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <button
                className="btn btn-outline-light"
                onClick={handleSearch}
                type="submit"
              >
                Search
              </button>
            </form>
            {token ? (
              <>
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleProfile}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleOrders}
                >
                  orders
                </button>
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleCart}
                >
                  cart
                </button>
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Sign-out
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogin}
                >
                  SignIn
                </button>
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleRegister}
                >
                  SignUp
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
