import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: userId } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/srv/user/getSingleUser`,
          { headers: { token: localStorage.getItem("token") } }
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "20px" }}>Profile Details</h2>
        <p style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>
          <strong>Name:</strong> {user.fname} {user.lname}
        </p>
        <p style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>
          <strong>Email:</strong> {user.email}
        </p>
        <p style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>
          <strong>Mobile:</strong> {user.mobileNumber}
        </p>
        <p style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>
          <strong>Location:</strong> {user.location}
        </p>
      </div>
    </div>
  );
}

export default Profile;
