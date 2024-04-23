import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarServiceProvider() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/service-provider-login");
  };

  const handleLogin = () => {
    navigate("/service-provider-login");
  };

  const handleRegister = () => {
    navigate("/service-provider-register");
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

      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary mb-0 fixed-top">
      <div className="container-fluid">
        <Link to="/service-provider-home">
          <img src="#" alt="Logo" style={{ height: "50px" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            <button
              className="btn btn-outline-light ms-2"
              onClick={handleLogout}
            >
              Sign-out
            </button>
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
  );
}
