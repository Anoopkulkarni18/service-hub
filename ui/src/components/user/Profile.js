import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { axiosRequest } from "./util/fetchService";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%);
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
`;

const ProfileContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  background-color: #f3f3f3;
  padding: 20px;
`;

const ProfileCard = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* Added bottom margin */
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: linear-gradient(135deg, #ff6f61 0%, #de4839 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProfileDetail = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosRequest(
          "get",
          `http://localhost:4000/srv/user/getSingleUser`,
          null,
          localStorage.getItem("token")
        );
        setUser(response);
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
    <>
      <GlobalStyle />
      <ProfileContainer>
        <ProfileCard>
          <Title>Profile Details</Title>
          <ProfileDetail>
            <strong>Name:</strong> {user.fname} {user.lname}
          </ProfileDetail>
          <ProfileDetail>
            <strong>Email:</strong> {user.email}
          </ProfileDetail>
          <ProfileDetail>
            <strong>Mobile:</strong> {user.mobileNumber}
          </ProfileDetail>
          <ProfileDetail>
            <strong>Location:</strong> {user.location}
          </ProfileDetail>
        </ProfileCard>
      </ProfileContainer>
    </>
  );
};

export default Profile;
